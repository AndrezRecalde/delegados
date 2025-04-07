<?php

namespace App\Http\Controllers\Application;

use App\Exports\ReconteoExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\ReconteoRequest;
use App\Imports\ReconteoImport;
use App\Models\Reconteo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ReconteoController extends Controller
{
    function getJrvReconteos(): JsonResponse
    {
        $jrvreconteos = Reconteo::get(['id', 'nombres', 'apellidos', 'dni']);

        return response()->json(['status' => 'success', 'jrvreconteos' => $jrvreconteos], 200);
    }

    function store(ReconteoRequest $request): JsonResponse
    {
        try {
            Reconteo::create($request->validated());

            return response()->json(['status' => 'success', 'msg' => 'Creado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'success', 'msg' => $th->getMessage()], 500);
        }
    }

    function update(ReconteoRequest $request, int $id): JsonResponse
    {
        $reconteo = Reconteo::find($id);

        if ($reconteo) {
            $reconteo->update($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $reconteo = Reconteo::find($id);
        if ($reconteo) {
            $reconteo->delete();
            return response()->json(['status' => 'success', 'msg' => 'Eliminado con éxito'], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function massiveStore(Request $request)
    {
        try {
            if (!$request->hasFile('reconteos_import')) {
                return response()->json(['status' => 'error', 'msg' => 'El archivo no existe'], 500);
            }

            Excel::import(new ReconteoImport, $request->file('reconteos_import'));
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

    function exportExcelReconteos()
    {
        return Excel::download(new ReconteoExport, 'reconteos.xlsx');
    }
}
