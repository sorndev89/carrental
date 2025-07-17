<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');

        $query = Customer::query();

        if ($search) {
            $query->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%");
        }

        if ($perPage === 'all') {
            $customers = $query->latest()->get();
            return response()->json(['customers' => ['data' => $customers]]);
        } else {
            $perPage = (int) $perPage;
            $customers = $query->latest()->paginate($perPage);
            return response()->json(['customers' => $customers]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'gender' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers',
            'phone_number' => 'required|string|max:255',
            // 'address' => 'nullable|string|max:255',
            // 'id_card_number' => 'nullable|string|max:255',
            // 'driver_license_number' => 'nullable|string|max:255',
            // 'license_expiry_date' => 'nullable|date',
            // 'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $image_path = 'assets/img/customers/';
        $image_upload = null;

        if ($request->hasFile('profile_image')) {
            $image = $request->file('profile_image');
            $image_upload = $image_path . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path($image_path), $image_upload);
        }

        $customer = new Customer();
        $customer->first_name = $request->first_name;
        $customer->last_name = $request->last_name;
        $customer->gender = $request->gender;
        $customer->email = $request->email;
        $customer->phone_number = $request->phone_number;
        $customer->address = $request->address;
        $customer->id_card_number = $request->id_card_number;
        $customer->driver_license_number = $request->driver_license_number;
        $customer->license_expiry_date = $request->license_expiry_date;
        $customer->profile_image_url = $image_upload;
        $customer->save();

        return response()->json(['customer' => $customer, 'message' => 'Customer created successfully.'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $customer = Customer::findOrFail($id);
        return response()->json(['customer' => $customer]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $customer = Customer::findOrFail($id);

        $request->validate([
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'gender' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:customers,email,' . $id,
            'phone_number' => 'sometimes|required|string|max:255',
            // 'address' => 'nullable|string|max:255',
            // 'id_card_number' => 'nullable|string|max:255',
            // 'driver_license_number' => 'nullable|string|max:255',
            // 'license_expiry_date' => 'nullable|date',
            // 'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $image_path = 'assets/img/customers/';
        $image_upload = null;

        if ($request->hasFile('profile_image')) {
            if ($customer->profile_image_url && file_exists(public_path($customer->profile_image_url))) {
                unlink(public_path($customer->profile_image_url));
            }
            $image = $request->file('profile_image');
            $image_upload = $image_path . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path($image_path), $image_upload);
            $customer->profile_image_url = $image_upload;
            
        } else if ($request->input('profile_image_url') === null) {
            if ($customer->profile_image_url && file_exists(public_path($customer->profile_image_url))) {
                unlink(public_path($customer->profile_image_url));
            }
            $customer->profile_image_url = null;
        }

        $customer->first_name = $request->first_name;
        $customer->last_name = $request->last_name;
        $customer->gender = $request->gender;
        $customer->email = $request->email;
        $customer->phone_number = $request->phone_number;
        $customer->address = $request->address;
        $customer->id_card_number = $request->id_card_number;
        $customer->driver_license_number = $request->driver_license_number;
        $customer->license_expiry_date = $request->license_expiry_date;
        $customer->save();

        return response()->json(['customer' => $customer, 'message' => 'Customer updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::findOrFail($id);

        if ($customer->profile_image_url && file_exists(public_path($customer->profile_image_url))) {
            unlink(public_path($customer->profile_image_url));
        }

        $customer->delete();

        return response()->json(['message' => 'Customer deleted successfully.']);
    }
}