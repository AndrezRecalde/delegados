<?php

namespace App\Http\Controllers\Application;

use App\Exports\JrvmovilExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\JrvmovilRequest;
use App\Imports\JrvmovilImport;
use App\Models\Jrvmovil;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class JrmovilController extends Controller
{
    function getJrvmoviles(): JsonResponse
    {
        $jrvmoviles = Jrvmovil::get(['id', 'nombres', 'apellidos', 'dni']);

        return response()->json(['status' => 'success', 'jrvmoviles' => $jrvmoviles], 200);
    }

    function store(JrvmovilRequest $request): JsonResponse
    {
        try {
            Jrvmovil::create($request->validated());

            return response()->json(['status' => 'success', 'msg' => 'Creado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'success', 'msg' => $th->getMessage()], 500);
        }
    }

    function update(JrvmovilRequest $request, int $id): JsonResponse
    {
        $jrvmovil = Jrvmovil::find($id);

        if ($jrvmovil) {
            $jrvmovil->update($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $jrvmovil = Jrvmovil::find($id);
        if ($jrvmovil) {
            $jrvmovil->delete();
            return response()->json(['status' => 'success', 'msg' => 'Eliminado con éxito'], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function massiveStore(Request $request)
    {
        try {
            if (!$request->hasFile('jrvmoviles_import')) {
                return response()->json(['status' => 'error', 'msg' => 'El archivo no existe'], 500);
            }

            Excel::import(new JrvmovilImport, $request->file('jrvmoviles_import'));
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

    function exportExcelJrvmoviles()
    {
        return Excel::download(new JrvmovilExport, 'jrvmoviles.xlsx');
    }
}
