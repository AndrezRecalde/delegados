<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserPassword;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateActivo;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function getUsuarios(): JsonResponse
    {
        $usuarios = User::from('users as u')
            ->selectRaw('u.id, u.nombres_completos, u.dni, u.activo')
            ->with([
                'roles' => function($query){
                    return $query->select('roles.id','roles.name');
                }
            ])
            ->where('u.id', '<>', 1)
            ->get();

        return response()->json(['status' => 'success', 'usuarios' => $usuarios], 200);
    }

    function store(UserRequest $request): JsonResponse
    {
        try {
            $usuario = User::create($request->validated());
            $usuario->assignRole($request->roles);
            return response()->json(['status' => 'success', 'msg' => 'Creado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function update(UserRequest $request, int $id): JsonResponse
    {
        $usuario = User::find($id);

        try {
            if ($usuario) {
                $usuario->update($request->validated());
                if ($request->filled('roles')) {
                    $usuario->roles()->detach();
                    $usuario->assignRole($request->roles);
                }
                return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $usuario = User::find($id);

        if ($usuario) {
            $usuario->delete();
            return response()->json(['status' => 'success', 'msg' => 'Eliminado'], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function updatePassword(UserPassword $request, int $id): JsonResponse
    {
        $usuario = User::find($id);
        try {
            if ($usuario) {
                $usuario->update($request->validated());
                return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function updateActivo(UserUpdateActivo $request, int $id): JsonResponse
    {
        $usuario = User::find($id);
        if ($usuario) {
            $usuario->update($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }
}
