<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page');
        $search = $request->input('search', '');
        $status = $request->input('status', '');

        $query = Car::with('carType')
            ->where(function ($q) use ($search) {
                $q->where('make', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%")
                    ->orWhere('license_plate', 'like', "%{$search}%");
            });

        if ($status) {
            $query->where('status', $status);
        }

        if ($perPage === 'all') {
            $cars = $query->latest()->get();
            return response()->json(['cars' => ['data' => $cars]]); // Wrap in 'data' for consistency
        } else {
            $perPage = (int) $perPage; // Cast to integer
            $cars = $query->latest()->paginate($perPage);
            return response()->json(['cars' => $cars]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // 'car_type_id' => 'required|exists:car_types,id',
            'make' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'license_plate' => 'required|string|max:50|unique:cars',
            'daily_rate' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:available,rented,maintenance',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $image_path = 'assets/img/cars/';
        $image_upload = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_upload = $image_path . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path($image_path), $image_upload);
        }

        $car = new Car();
        $car->car_type_id = $request->car_type_id;
        $car->make = $request->make;
        $car->model = $request->model;
        $car->license_plate = $request->license_plate;
        $car->daily_rate = $request->daily_rate;
        $car->image_url = $image_upload;
        $car->status = $request->status;
        $car->save();

        return response()->json(['car' => $car, 'message' => 'Car created successfully.'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $car = Car::with('carType')->findOrFail($id);
        return response()->json(['car' => $car]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $car = Car::findOrFail($id);

        $validator = Validator::make($request->all(), [
            // 'car_type_id' => 'sometimes|required|exists:car_types,id',
            'make' => 'sometimes|required|string|max:100',
            'model' => 'sometimes|required|string|max:100',
            'license_plate' => 'sometimes|required|string|max:50|unique:cars,license_plate,' . $id,
            'daily_rate' => 'sometimes|required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'sometimes|required|in:available,rented,maintenance',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $image_path = 'assets/img/cars/';
        $image_upload = null;

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($car->image_url && file_exists(public_path($car->image_url))) {
                unlink(public_path($car->image_url));
            }
            $image = $request->file('image');
            $image_upload = $image_path . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path($image_path), $image_upload);
            $car->image_url = $image_upload;
        } else if ($request->input('image_url') === null) {
            // If image is explicitly set to null (e.g., user removed it)
            if ($car->image_url && file_exists(public_path($car->image_url))) {
                unlink(public_path($car->image_url));
            }
            $car->image_url = null;
        } else {
            // Keep existing image if no new image is uploaded and not explicitly removed
            // $car->image_url remains unchanged
        }

        $car->car_type_id = $request->car_type_id;
        $car->make = $request->make;
        $car->model = $request->model;
        $car->license_plate = $request->license_plate;
        $car->daily_rate = $request->daily_rate;
        $car->status = $request->status;
        $car->save();

        return response()->json(['car' => $car, 'message' => 'Car updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::findOrFail($id);

        // Delete image if it exists
        if ($car->image_url && file_exists(public_path($car->image_url))) {
             unlink(public_path($car->image_url));
        }

        $car->delete();

        return response()->json(['message' => 'Car deleted successfully.']);
    }
}