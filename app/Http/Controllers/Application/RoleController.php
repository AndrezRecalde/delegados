<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    function getRoles(): JsonResponse
    {
        $roles = Role::get(['id', 'name']);

        return response()->json(['status' => 'success', 'roles' => $roles], 200);
    }
}
