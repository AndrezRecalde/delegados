<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Models\Canton;
use App\Models\Parroquia;
use App\Models\Recinto;
use Illuminate\Http\Request;

class StateController extends Controller
{
    /* public function getCantones(Request $request)
    {
        // Verifica si hay un array de IDs en el request
        $cantones = $request->input('cantones', []);

        // Si hay IDs, filtramos por esos IDs, sino obtenemos todos los cantones activos
        $cantones = Canton::where('activo', 1)
            ->when(!empty($cantones), function ($query) use ($cantones) {
                $query->whereInCantones($cantones);
            })
            ->get(['id', 'nombre_canton']);

        return response()->json(['status' => 'success', 'cantones' => $cantones], 200);
    } */

    public function getCantones(Request $request)
    {
        // Verifica si hay un array de IDs en el request

        // Si hay IDs, filtramos por esos IDs, sino obtenemos todos los cantones activos
        $cantones = Canton::where('activo', 1)
            ->byCantonId($request->cantones)
            ->get(['id', 'nombre_canton']);

        return response()->json(['status' => 'success', 'cantones' => $cantones], 200);
    }

    public function getParroquias(Request $request)
    {
        $parroquias = Parroquia::where('canton_id', $request->canton_id)->get(['id', 'nombre_parroquia']);

        return response()->json(['status' => 'success', 'parroquias' => $parroquias], 200);
    }

    public function getRecintos(Request $request)
    {
        $recintos = Recinto::where('parroquia_id', $request->parroquia_id)->get(['id', 'nombre_recinto']);

        return response()->json(['status' => 'success', 'recintos' => $recintos], 200);
    }

    public function getAllRecintos(Request $request)
    {
        $recintos = Recinto::from('recintos as r')
            ->join('parroquias as parr', 'parr.id', 'r.parroquia_id')
            ->join('cantones as c', 'c.id', 'parr.canton_id')
            ->where('c.id', $request->canton_id)
            ->selectRaw('r.id, r.nombre_recinto')
            ->get();

        return response()->json(['status' => 'success', 'recintos' => $recintos], 200);
    }
}
