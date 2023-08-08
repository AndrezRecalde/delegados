<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Models\Coordinador;
use App\Models\Escaneador;
use App\Models\Recinto;
use App\Models\Supervisor;
use App\Models\User;
use App\Models\Veedor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    function getTotalSupervisores(): JsonResponse
    {
        $totalSupervisores = Supervisor::count();

        return response()->json(['status' => 'success', 'totalSupervisores' => $totalSupervisores], 200);
    }

    function getTotalCoordinadores(): JsonResponse
    {
        $totalCoordinadores = Coordinador::count();
        return response()->json(['status' => 'success', 'totalCoordinadores' => $totalCoordinadores], 200);
    }

    function getTotalVeedores(): JsonResponse
    {
        $totalVeedores = Veedor::count();
        return response()->json(['status' => 'success', 'totalVeedores' => $totalVeedores], 200);
    }

    function getTotalVeedoresConfirmed(): JsonResponse
    {
        $totalConfirmados = Veedor::where('confirmado', 1)->count();
        return response()->json(['status' => 'success', 'totalConfirmados' => $totalConfirmados], 200);
    }

    function getTotalUsuarios(): JsonResponse
    {
        $totalUsuarios = User::count();
        return response()->json(['status' => 'success', 'totalUsuarios' => $totalUsuarios], 200);
    }

    function getTotalEscaneadores() : JsonResponse
    {
        $totalEscaneadores = Escaneador::count();
        return response()->json(['status' => 'success', 'totalEscaneadores' => $totalEscaneadores], 200);

    }

    function getTotalJuntas(): JsonResponse
    {
        $totalJuntas = Recinto::from('recintos as r')
            ->selectRaw('SUM(r.num_juntas) as totalJuntas')
            ->first();
        return response()->json(['status' => 'success', 'totalJuntas' => $totalJuntas], 200);
    }

    function getAvanceCantones(): JsonResponse
    {
        $avanceCantones = DB::select('CALL getAvanceCantones()');
        return response()->json(['status' => 'success', 'avanceCantones' => $avanceCantones], 200);
    }

    /* function getTotalPayroll(): JsonResponse
    {

    } */
}
