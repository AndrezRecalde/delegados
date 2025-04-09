<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    function login(LoginRequest $request): JsonResponse
    {
        try {

            if (!Auth::attempt($request->validated())) {
                return response()->json([
                    'msg' => 'Credenciales Incorrectas'
                ], 401);
            }

            $user = User::from('users as u')
                ->selectRaw('u.id, CONCAT(u.nombres, " ", u.apellidos) as nombres_completos, u.dni, r.name as role')
                ->join('model_has_roles as mhr', 'mhr.model_id', 'u.id')
                ->join('roles as r', 'r.id', 'mhr.role_id')
                ->where('u.dni', $request->dni)
                ->where('u.activo', 1)
                ->first();

            if ($user) {
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json([
                    'status'        => 'success',
                    'access_token'  => $token,
                    'token_type'    =>  'Bearer',
                    'user'          =>  $user
                ]);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Usuario no activo'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function refresh(): JsonResponse
    {
        $user = User::from('users as u')
            ->selectRaw('u.id, CONCAT(u.nombres, " ", u.apellidos) as nombres_completos, u.dni, r.name as role')
            ->join('model_has_roles as mhr', 'mhr.model_id', 'u.id')
            ->join('roles as r', 'r.id', 'mhr.role_id')
            ->where('u.id', Auth::user()->id)
            ->first();

        if ($user) {
            auth()->user()->tokens()->delete();
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'status' => 'success',
                'access_token'  => $token,
                'token_type'    =>  'Bearer',
                'user'          =>  $user
            ]);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'Usuario no activo'], 401);
        }
    }

    function profile(): JsonResponse
    {
        $profile = User::from('users as u')
            ->selectRaw('u.id, CONCAT(u.nombres, " ", u.apellidos) as nombres_completos, u.dni, r.name as role')
            ->join('model_has_roles as mhr', 'mhr.model_id', 'u.id')
            ->join('roles as r', 'r.id', 'mhr.role_id')
            ->where('u.id', Auth::user()->id)
            ->first();

        return response()->json(['status' => 'success', 'profile' => $profile], 200);
    }

    function logout(): JsonResponse
    {
        auth()->user()->tokens()->delete();
        //Auth::logout();
        return response()->json([
            'status' => 'success',
            'msg'   =>  'Sesión cerrada'
        ], 200);
    }
}
