<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Http\Requests\SupervisorRequest;
use App\Imports\SupervisoresImport;
use App\Models\Supervisor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class SupervisorController extends Controller
{
    function getSupervisores(): JsonResponse
    {
        $supervisores = Supervisor::from('supervisores as s')
            ->selectRaw('s.id, s.nombres_completos, s.dni, s.email, s.telefono,
                         s.canton_id, c.nombre_canton as canton')
            ->with([
                'parroquias' => function ($query) {
                    return $query->select('parroquias.id', 'parroquias.nombre_parroquia');
                }
            ])
            ->join('cantones as c', 'c.id', 's.canton_id')
            ->get();
        return response()->json(['status' => 'success', 'supervisores' => $supervisores], 200);
    }

    function getSupervisoresForCanton(Request $request): JsonResponse
    {
        $supervisores = Supervisor::from('supervisores as s')
            ->selectRaw('s.id, s.nombres_completos, s.dni, s.email, s.telefono,
                         s.canton_id, c.nombre_canton as canton')
            ->with([
                'parroquias' => function ($query) {
                    return $query->select('parroquias.id', 'parroquias.nombre_parroquia');
                }
            ])
            ->join('cantones as c', 'c.id', 's.canton_id')
            ->canton($request->canton_id)
            ->get();
        return response()->json(['status' => 'success', 'supervisores' => $supervisores], 200);
    }

    function store(SupervisorRequest $request): JsonResponse
    {
        try {
            $supervisor = Supervisor::create($request->validated());
            $supervisor->parroquias()->attach($request->parroquia_id);
            return response()->json(['status' => 'success', 'msg' => 'Creado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function update(SupervisorRequest $request, int $id): JsonResponse
    {
        $supervisor = Supervisor::find($id);
        if ($supervisor) {
            $supervisor->update($request->validated());

            if ($request->filled('parroquia_id')) {
                $supervisor->parroquias()->detach();
                $supervisor->parroquias()->sync($request->parroquia_id);
            }
            return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $supervisor = Supervisor::find($id);

        if ($supervisor) {
            $supervisor->delete();
            return response()->json(['status' => 'success', 'msg' => 'Eliminado con éxito'], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function searchSupervisores(Request $request): JsonResponse
    {
        $supervisores = Supervisor::from('supervisores as super')
            ->selectRaw('super.id, super.nombres_completos,
                         super.dni,super.telefono,
                        super.email,
                        super.canton_id, c.nombre_canton as canton')
            ->with([
                'parroquias' => function ($query) {
                    $query->select('parroquias.id', 'parroquias.nombre_parroquia');
                }
            ])
            ->join('cantones as c', 'c.id', 'super.canton_id')
            ->join('parroquia_super as ps', 'ps.supervisor_id', 'super.id')
            ->canton($request->canton_id)
            ->parroquia($request->parroquia_id)
            ->distinct()
            ->get();

        if (sizeof($supervisores) >= 1) {
            return response()->json(['status' => 'success', 'supervisores' => $supervisores], 201);
        } else {
            return response()->json(['status' => 'error', 'msg' => "No existen supervisores en esa zona"], 404);
        }
    }

    function massiveStore(Request $request)
    {
        try {
            if(!$request->hasFile('supervisores_import')) {
                return response()->json(['status' => 'error', 'msg' => 'El archivo no existe'], 500);
            }

            Excel::import(new SupervisoresImport, $request->file('supervisores_import'));
            return response()->json(['status' => 'success', 'msg' => 'Archivo subido con éxito'], 201);

        } catch (\Maatwebsite\Excel\Validators $e){
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
}
