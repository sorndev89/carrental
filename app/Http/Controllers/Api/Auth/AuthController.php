<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login', 'logout']]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        // dd($credentials);
        if (! $token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'ອີເມວລ໌ ຫຼື ລະຫັດຜ່ານບໍ່ຖຶກຕ້ອງ!'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function me()
    {
        // return response()->json(Auth::guard('api')->user());
         $user = Auth::guard('api')->user();
         if ($user) {
             $user->load('role'); // ໂຫຼດ role
             return response()->json([
                 'user' => $user,
                 'user_type' => $user->role->name ?? null,
                 'permissions' => $user->role->permissions ?? [], // ເພີ່ມ permissions ຈາກຖັນ JSON
            ]);
        }
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout()
    {
        try {
            Auth::guard('api')->logout();
            return response()->json(['message' => 'Successfully logged out']);
        } catch (\Exception $e) {
            // If token is invalid or expired, still return success for logout
            return response()->json(['message' => 'Successfully logged out (token invalid or expired)']);
        }
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::guard('api')->refresh());
    }

    protected function respondWithToken($token)
    {
        $user = Auth::guard('api')->user();
        $user->load('role'); // ໂຫຼດ role

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => Auth::guard('api')->user()->load('role'),
            'user_type' => Auth::guard('api')->user()->role->name ?? null,
            'permissions' => $user->role->permissions ?? [], // ເພີ່ມ permissions ຈາກຖັນ JSON
        ]);
    }
}
