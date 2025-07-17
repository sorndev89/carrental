<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = \Request::get('per_page');
        $sortBy = \Request::get('sort_by', 'id');
        $sortDirection = \Request::get('sort_direction', 'desc');
        $search = \Request::get('search', null);
        $status = \Request::get('status', null);

        $users = User::query();

        if ($search) {
            $users->where('name', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%')
                  ->orWhere('phone_number', 'like', '%' . $search . '%');
        }
        if($status) {
            $users->where('users.status', '=', $status);
        }

        $users = $users->join('roles', 'users.role_id', '=', 'roles.id')
        ->select('users.*', 'roles.name as role_name');

        $users->orderBy($sortBy, $sortDirection);

        if ($perPage === 'all') {
            $users = $users->get();
            return response()->json(['users' => ['data' => $users]], 200); // Wrap in 'data' for consistency
        } else {
            $perPage = (int) $perPage; // Cast to integer
            $users = $users->paginate($perPage);
            return response()->json(['users' => $users], 200);
        }

       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            // 'last_name' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            // 'password' => 'required|string|min:6',
            // 'phone_number' => 'nullable|string|max:255',
            'role_id' => 'required|integer|exists:roles,id'
      
        ]);

        $image_path = 'assets/img/';
        $image_upload = null;

        // check if have file upload
        if ($request->file('profile_image_url')) {
                $image = $request->file('profile_image_url');
                $image_upload = $image_path.time().'.'.$image->getClientOriginalExtension();
                $image->move(public_path($image_path), $image_upload);
        }





        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->gender = $request->gender;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->phone_number = $request->phone_number;
        $user->profile_image_url = $image_upload;
        $user->role_id = $request->role_id;
        $user->status = $request->status;
        $user->save();




        return response()->json(['message' => 'User created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json(['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'first_name' => 'required|string|max:255',
            // 'last_name' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            // 'password' => 'required|string|min:6',
            // 'phone_number' => 'nullable|string|max:255',
            'role_id' => 'required|integer|exists:roles,id'
        ]);

        $image_path = 'assets/img/';
        $image_upload = null;

        // check if have file upload
        if ($request->file('profile_image_url')) {

            // remove old image
            if ($user->profile_image_url) {
                    if(file_exists(public_path($user->profile_image_url))) {
                        unlink(public_path($user->profile_image_url));
                    }
                }

                // upload new image


                $image = $request->file('profile_image_url');
                $image_upload = $image_path.time().'.'.$image->getClientOriginalExtension();
                $image->move(public_path($image_path), $image_upload);
        } else {
            $image_upload = $user->profile_image_url;
        }



        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->gender = $request->gender;
        $user->email = $request->email;
        if ($request->password) {
            $user->password = $request->password;
        }
        $user->phone_number = $request->phone_number;
        $user->profile_image_url = $image_upload;
        $user->role_id = $request->role_id;
        if(isset($request->status) && $request->status) {
            $user->status = $request->status;
        }
        $user->save();

        return response()->json(['message' => 'User updated successfully'],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {   
        $image_path = 'assets/img/';
        $user = User::findOrFail($id);
        if ($user->profile_image_url) {
                    if(file_exists(public_path($user->profile_image_url))) {
                        unlink(public_path($user->profile_image_url));
                    }
                }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
