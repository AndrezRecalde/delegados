<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Models\Junta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JuntaController extends Controller
{
    function getJuntas(Request $request) : JsonResponse
    {
        $juntas = Junta::where('recinto_id', $request->recinto_id)->get(['id', 'junta_nombre']);

        return response()->json(['status' => 'success', 'juntas' => $juntas], 200);
    }
}
