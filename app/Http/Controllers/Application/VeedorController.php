<?php

namespace App\Http\Controllers\Application;

use App\Exports\VeedoresExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\VeedorRequest;
use App\Http\Requests\VeedorUpdateConfirm;
use App\Imports\VeedoresImport;
use App\Models\Veedor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class VeedorController extends Controller
{
    function getVeedores(): JsonResponse
    {
        $veedores = Veedor::from('veedores as veed')
            ->selectRaw('veed.id, veed.nombres_completos, veed.dni, veed.telefono,
                        veed.coordinador_id, coord.nombres_completos as coordinador,
                        veed.canton_id, c.nombre_canton as canton, veed.recinto_id,
                        r.nombre_recinto as recinto, veed.junta_id, j.junta_nombre as junta, veed.confirmado')
            ->join('coordinadores as coord', 'coord.id', 'veed.coordinador_id')
            ->join('cantones as c', 'c.id', 'veed.canton_id')
            ->join('recintos as r', 'r.id', 'veed.recinto_id')
            ->leftJoin('juntas as j', 'j.id', 'veed.junta_id')
            ->orderBy('veed.id', 'DESC')
            ->get();

        return response()->json(['status' => 'success', 'veedores' => $veedores], 200);
    }

    function store(VeedorRequest $request): JsonResponse
    {
        try {
            Veedor::create($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Creado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function update(VeedorRequest $request, int $id): JsonResponse
    {
        $veedor = Veedor::find($id);
        if ($veedor) {
            $veedor->update($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $veedor = Veedor::find($id);
        if ($veedor) {
            $veedor->delete();
            return response()->json(['status' => 'success', 'msg' => 'Eliminado con éxito'], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function updateConfirmado(VeedorUpdateConfirm $request, int $id): JsonResponse
    {
        $veedor = Veedor::find($id);

        if ($veedor) {
            $veedor->update($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function searchVeedores(Request $request): JsonResponse
    {
        $veedores = Veedor::from('veedores as veed')
            ->join('coordinadores as coord', 'coord.id', 'veed.coordinador_id')
            ->join('supervisores as super', 'super.id', 'coord.supervisor_id')
            ->join('cantones as c', 'c.id', 'veed.canton_id')
            ->join('recintos as r', 'r.id', 'veed.recinto_id')
            ->leftJoin('juntas as j', 'j.id', 'veed.junta_id')
            ->canton($request->canton_id)
            ->parroquia($request->parroquia_id)
            ->recinto($request->recinto_id)
            ->coordinador($request->coordinador_id)
            ->supervisor($request->supervisor_id)
            ->selectRaw('veed.id, veed.nombres_completos,
                        veed.dni, veed.telefono,
                        super.nombres_completos as supervisor,
                        coord.nombres_completos as coordinador,
                        c.nombre_canton as canton,
                        r.nombre_recinto as recinto,
                        veed.confirmado, veed.junta_id, j.junta_nombre as junta')
            ->orderBy('veed.id', 'DESC')
            ->get();

        if (sizeof($veedores) >= 1) {
            return response()->json(['status' => 'success', 'veedores' => $veedores]);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen veedores en esa zona']);
        }
    }

    function massiveStore(Request $request)
    {
        try {
            if (!$request->hasFile('veedores_import')) {
                return response()->json(['status' => 'error', 'msg' => 'El archivo no existe'], 500);
            }

            Excel::import(new VeedoresImport, $request->file('veedores_import'));
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

    function exportExcelVeedores(Request $request)
    {
        return Excel::download(new VeedoresExport(
            $request->canton_id,
            $request->parroquia_id,
            $request->recinto_id,
            $request->supervisor_id,
            $request->coordinador_id,
        ), 'veedores.xlsx');
    }
}
