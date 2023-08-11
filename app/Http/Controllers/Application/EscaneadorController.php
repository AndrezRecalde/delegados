<?php

namespace App\Http\Controllers\Application;

use App\Exports\CoordinadorExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\EscaneadorRequest;
use App\Imports\EscaneadorImport;
use App\Models\Escaneador;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class EscaneadorController extends Controller
{
    function getEscaneadores(): JsonResponse
    {
        $escaneadores = Escaneador::from('escaneadores as esc')
            ->selectRaw('esc.id, esc.nombres_completos, esc.dni,
                                 esc.telefono, esc.canton_id,
                                c.nombre_canton as canton,
                                p.nombre_parroquia as parroquia,
                                r.nombre_recinto as recinto')
            ->join('cantones as c', 'c.id', 'esc.canton_id')
            ->leftJoin('parroquias as p', 'p.id', 'esc.parroquia_id')
            ->leftJoin('recintos as r', 'r.id', 'esc.recinto_id')
            ->get();
        return response()->json(['status' => 'success', 'escaneadores' => $escaneadores], 200);
    }

    function store(EscaneadorRequest $request): JsonResponse
    {
        try {
            Escaneador::create($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Creado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function update(EscaneadorRequest $request, int $id): JsonResponse
    {
        $escaneador = Escaneador::find($id);
        if ($escaneador) {
            $escaneador->update($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $escaneador = Escaneador::find($id);
        if ($escaneador) {
            $escaneador->delete();
            return response()->json(['status' => 'success', 'msg' => 'Eliminado con éxito'], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function searchEscaneadores(Request $request): JsonResponse
    {
        $escaneadores = Escaneador::from('escaneadores as esc')
            ->selectRaw('esc.id, esc.nombres_completos, esc.dni, esc.telefono,
                         esc.canton_id, c.nombre_canton as canton,
                         p.nombre_parroquia as parroquia,
                         r.nombre_recinto as recinto')
            ->join('cantones as c', 'c.id', 'esc.canton_id')
            ->join('parroquias as p', 'p.id', 'esc.parroquia_id')
            ->join('recintos as r', 'r.id', 'esc.recinto_id')
            ->canton($request->canton_id)
            ->get();

        if (sizeof($escaneadores) >= 1) {
            return response()->json(['status' => 'success', 'escaneadores' => $escaneadores], 201);
        } else {
            return response()->json(['status' => 'error', 'msg' => "No existen escaneadores en esa zona"], 404);
        }
    }

    function massiveStore(Request $request)
    {
        try {
            if (!$request->hasFile('escaneadores_import')) {
                return response()->json(['status' => 'error', 'msg' => 'El archivo no existe'], 500);
            }

            Excel::import(new EscaneadorImport, $request->file('escaneadores_import'));
            return response()->json(['status' => 'success', 'msg' => 'Archivo subido con éxito'], 201);
        } catch (\Maatwebsite\Excel\Validators $e) {
            $failures = $e->failures();
            foreach ($failures as $failure) {
                $failure->row();
                $failure->attribute();
                $failure->errors();
                $failure->values();
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function exportExcelCoordinadores()
    {
        return Excel::download(new CoordinadorExport, 'escaneadores.xlsx');
    }
}
