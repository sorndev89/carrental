<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');
        $status = $request->input('status', '');

        $query = Role::query();

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($status) {
            $query->where('status', $status);
        }

        if ($perPage === 'all') {
            $roles = $query->latest()->get();
            return response()->json(['roles' => $roles]);
        } else {
            $roles = $query->latest()->paginate($perPage);
            return response()->json(['roles' => $roles]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50|unique:roles,name',
            'status' => 'required|in:active,inactive',
            'permissions' => 'nullable|array', // Expecting an array of strings for permission keys
            'permissions.*' => 'string|max:255', // Each item in the array should be a string
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $role = new Role();
        $role->name = $request->name;
        $role->status = $request->status;
        $role->permissions = json_encode($request->permissions); // Store as JSON string
        $role->save();

        return response()->json(['role' => $role, 'message' => 'Role created successfully.'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::findOrFail($id);
        $role->permissions = $role->permissions; // Decode JSON string to array
        return response()->json(['role' => $role]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $role = Role::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50|unique:roles,name,' . $id,
            'status' => 'required|in:active,inactive',
            'permissions' => 'nullable',
            'permissions.*' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // return $request->permissions;

        $role->name = $request->name;
        $role->status = $request->status;
        $role->permissions = json_decode($request->permissions); // Store as JSON string
        $role->save();

        return response()->json(['role' => $role, 'message' => 'Role updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json(['message' => 'Role deleted successfully.']);
    }
}