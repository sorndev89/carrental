<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');

        $query = Permission::query();

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($perPage === 'all') {
            $permissions = $query->latest()->get();
            return response()->json(['permissions' => $permissions]);
        } else {
            $permissions = $query->latest()->paginate($perPage);
            return response()->json(['permissions' => $permissions]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50|unique:permissions,name',
            'key' => 'nullable|array',
            // 'key.*' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $permission = new Permission();
        $permission->name = $request->name;
        
        $keys = $request->key;
        if (!is_array($keys)) {
            $keys = [];
        }
        $permission->key = $keys; // Eloquent will handle JSON encoding due to 'array' cast
        $permission->save();

        return response()->json(['permission' => $permission, 'message' => 'Permission group created successfully.'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $permission = Permission::findOrFail($id);
        // The 'key' attribute is automatically decoded to an array due to the cast in the Permission model.
        return response()->json(['permission' => $permission]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $permission = Permission::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50|unique:permissions,name,' . $id,
            'key' => 'nullable',
            // 'key.*' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $permission->name = $request->name;
    
        //---------
        // $keys = json_decode($request->key);
        //  return $request->key;
        // if (!is_array($keys)) {
        //     $keys = [];
        // }
      
        $permission->key = json_decode($request->key_new); // Eloquent will handle JSON encoding due to 'array' cast


        $permission->save();

        return response()->json(['permission' => $permission, 'message' => 'Permission group updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return response()->json(['message' => 'Permission group deleted successfully.']);
    }
}