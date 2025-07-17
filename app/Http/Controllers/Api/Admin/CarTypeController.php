<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CarType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page');
        $search = $request->input('search', '');

        $query = CarType::where('name', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%");

        if ($perPage === 'all') {
            $carTypes = $query->latest()->get();
            return response()->json(['car_types' => ['data' => $carTypes]]); // Wrap in 'data' for consistency with paginated response
        } else {
            $perPage = (int) $perPage; // Cast to integer
            $carTypes = $query->latest()->paginate($perPage);
            return response()->json(['car_types' => $carTypes]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:car_types',
            'description' => 'nullable|string',
        ]);

        $carType = new CarType();
        $carType->name = $request->name;
        $carType->description = $request->description;
        $carType->save();

        return response()->json(['car_type' => $carType, 'message' => 'Car type created successfully.'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $carType = CarType::findOrFail($id);
        return response()->json(['car_type' => $carType]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $carType = CarType::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:100|unique:car_types,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $carType->name = $request->name;
        $carType->description = $request->description;
        $carType->save();

        return response()->json(['car_type' => $carType, 'message' => 'Car type updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $carType = CarType::findOrFail($id);
        $carType->delete();

        return response()->json(['message' => 'Car type deleted successfully.']);
    }
}