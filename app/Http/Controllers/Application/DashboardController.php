<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Models\Coordinador;
use App\Models\Escaneador;
use App\Models\Jrvmovil;
use App\Models\Recinto;
use App\Models\Reconteo;
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

    function getTotalVeedoresForCantones(Request $request): JsonResponse
    {
        $totalVeedores = Veedor::whereIn('canton_id', $request->cantones)->count();
        return response()->json(['status' => 'success', 'totalVeedores' => $totalVeedores], 200);
    }

    function getTotalVeedoresForParroquias(Request $request): JsonResponse
    {
        $totalVeedores = Veedor::join('recintos as r', 'r.id', '=', 'veedores.recinto_id')
        ->whereIn('r.parroquia_id', $request->parroquias)
        ->count();

    return response()->json(['status' => 'success', 'totalVeedores' => $totalVeedores], 200);
    }

    function getTotalVeedoresForRecintos(Request $request): JsonResponse
    {
        $totalVeedores = Veedor::whereIn('recinto_id', $request->recintos)->count();
        return response()->json(['status' => 'success', 'totalVeedores' => $totalVeedores], 200);
    }

    function getTotalJuntasForCantones(Request $request): JsonResponse
    {
        $totalJuntas = Recinto::from('recintos as r')
            ->selectRaw('SUM(r.num_juntas) as totalJuntas')
            ->join('parroquias as p', 'p.id', '=', 'r.parroquia_id')
            ->join('cantones as c', 'c.id', '=', 'p.canton_id')
            ->whereIn('c.id', $request->cantones) // Aplica el filtro antes de obtener los datos
            ->pluck('totalJuntas') // Usamos pluck para obtener el valor como un array
            ->first(); // Obtener el primer valor

        return response()->json([
            'status' => 'success',
            'totalJuntas' => max(0, (int) $totalJuntas) // Asegura que sea un entero positivo
        ], 200);
    }

    function getTotalJuntasForParroquias(Request $request): JsonResponse
    {
        $totalJuntas = Recinto::from('recintos as r')
            ->selectRaw('SUM(r.num_juntas) as totalJuntas')
            ->join('parroquias as p', 'p.id', '=', 'r.parroquia_id')
            ->whereIn('r.parroquia_id', $request->parroquias) // Aplica el filtro antes de obtener los datos
            ->pluck('totalJuntas') // Usamos pluck para obtener el valor como un array
            ->first(); // Obtener el primer valor

        return response()->json([
            'status' => 'success',
            'totalJuntas' => max(0, (int) $totalJuntas) // Asegura que sea un entero positivo
        ], 200);
    }

    function getTotalJuntasForRecintos(Request $request): JsonResponse
    {
        $totalJuntas = Recinto::from('recintos as r')
            ->selectRaw('SUM(r.num_juntas) as totalJuntas')
            ->whereIn('r.id', $request->recintos) // Aplica el filtro antes de obtener los datos
            ->pluck('totalJuntas') // Usamos pluck para obtener el valor como un array
            ->first(); // Obtener el primer valor

        return response()->json([
            'status' => 'success',
            'totalJuntas' => max(0, (int) $totalJuntas) // Asegura que sea un entero positivo
        ], 200);
    }

    function getTotalVeedoresConfirmed(): JsonResponse
    {
        $totalConfirmados = Veedor::where('confirmado', 1)->count();
        return response()->json(['status' => 'success', 'totalConfirmados' => $totalConfirmados], 200);
    }

    function getTotalJrvMoviles(): JsonResponse
    {
        $totalJrvMoviles = Jrvmovil::count();
        return response()->json(['status' => 'success', 'totalJrvMoviles' => $totalJrvMoviles], 200);
    }

    function getTotalJrvReconteos(): JsonResponse
    {
        $totalJrvReconteos = Reconteo::count();
        return response()->json(['status' => 'success', 'totalJrvReconteos' => $totalJrvReconteos], 200);
    }

    function getTotalUsuarios(): JsonResponse
    {
        $totalUsuarios = User::count();
        return response()->json(['status' => 'success', 'totalUsuarios' => $totalUsuarios], 200);
    }

    function getTotalEscaneadores(): JsonResponse
    {
        $totalEscaneadores = Escaneador::count();
        return response()->json(['status' => 'success', 'totalEscaneadores' => $totalEscaneadores], 200);
    }

    function getTotalJuntas(): JsonResponse
    {
        $totalJuntas = Recinto::from('recintos as r')
            ->selectRaw('SUM(r.num_juntas) as totalJuntas')
            ->pluck('totalJuntas') // Usamos pluck para obtener el valor como un array
            ->first(); // Obtener el primer valor

        return response()->json([
            'status' => 'success',
            'totalJuntas' => max(0, (int) $totalJuntas) // Asegura que sea un entero positivo
        ], 200);
    }

    function getAvanceCantones(): JsonResponse
    {
        $avanceCantones = DB::select('CALL getAvanceCantones()');
        return response()->json(['status' => 'success', 'avanceCantones' => $avanceCantones], 200);
    }

    function getAvanceParroquial(): JsonResponse
    {
        $avanceParroquias = DB::select('CALL getAvanceParroquia()');
        return response()->json(['status' => 'success', 'avanceParroquias' => $avanceParroquias], 200);
    }

    function getAvanceParroquiaxCanton(Request $request): JsonResponse
    {
        $avanceParroquias = DB::select('CALL getAvanceParroquiaxCanton(?)', [$request->canton_id]);
        return response()->json(['status' => 'success', 'avanceParroquias' => $avanceParroquias], 200);
    }

    function getAvanceRecintos(Request $request): JsonResponse
    {
        $avanceRecintos = DB::select('CALL getAvanceRecinto(?)', [$request->parroquia_id]);
        return response()->json(['status' => 'success', 'avanceRecintos' => $avanceRecintos], 200);
    }

    /* function getTotalPayroll(): JsonResponse
    {

    } */
}
