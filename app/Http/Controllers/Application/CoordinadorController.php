<?php

namespace App\Http\Controllers\Application;

use App\Exports\CoordinadorExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\CoordinadorRequest;
use App\Imports\CoordinadoresImport;
use App\Models\Coordinador;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class CoordinadorController extends Controller
{
    function getCoordinadores(): JsonResponse
    {
        $coordinadores = Coordinador::from('coordinadores as coord')
            ->selectRaw('coord.id,
                                    coord.nombres as nombres_coordinador,
                                    coord.apellidos as apellidos_coordinador,
                                    coord.dni, coord.email, coord.telefono,
                                    coord.supervisor_id,
                                    s.nombres as nombres_supervisor,
                                    s.apellidos as apellidos_supervisor,
                                    coord.canton_id, c.nombre_canton as canton,
                                    coord.parroquia_id, p.nombre_parroquia as parroquia')
            ->with([
                'recintos'  =>  function ($query) {
                    return $query->select('recintos.id', 'recintos.nombre_recinto');
                }
            ])
            ->join('supervisores as s', 's.id', 'coord.supervisor_id')
            ->join('cantones as c', 'c.id', 'coord.canton_id')
            ->join('parroquias as p', 'p.id', 'coord.parroquia_id')
            ->orderBy('coord.id', 'DESC')
            ->get();
        return response()->json(['status' => 'success', 'coordinadores' => $coordinadores], 200);
    }

    function getCoordinadoresForCanton(Request $request): JsonResponse
    {
        $coordinadores = Coordinador::from('coordinadores as coord')
            ->selectRaw('coord.id,
                                    coord.nombres as nombres_coordinador,
                                    coord.apellidos as apellidos_coordinador,
                                    coord.dni, coord.email, coord.telefono,
                                    coord.supervisor_id,
                                    s.nombres as nombres_supervisor,
                                    s.apellidos as apellidos_supervisor,
                                    coord.canton_id, c.nombre_canton as canton,
                                    coord.parroquia_id, p.nombre_parroquia as parroquia')
            ->with([
                'recintos'  =>  function ($query) {
                    return $query->select('recintos.id', 'recintos.nombre_recinto');
                }
            ])
            ->join('supervisores as s', 's.id', 'coord.supervisor_id')
            ->join('cantones as c', 'c.id', 'coord.canton_id')
            ->join('parroquias as p', 'p.id', 'coord.parroquia_id')
            ->canton($request->canton_id)
            ->orderBy('coord.id', 'DESC')
            ->get();

        return response()->json(['status' => 'success', 'coordinadores' => $coordinadores], 200);
    }

    function store(CoordinadorRequest $request): JsonResponse
    {
        try {
            $coordinador = Coordinador::create($request->validated());
            $coordinador->recintos()->attach($request->recinto_id);
            return response()->json(['status' => 'success', 'msg' => 'Creado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function update(CoordinadorRequest $request, int $id): JsonResponse
    {
        $coordinador = Coordinador::find($id);
        if ($coordinador) {
            $coordinador->update($request->validated());

            if ($request->filled('recinto_id')) {
                $coordinador->recintos()->detach();
                $coordinador->recintos()->sync($request->recinto_id);
            }
            return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function destroy(int $id): JsonResponse
    {
        $coordinador = Coordinador::find($id);
        if ($coordinador) {
            $coordinador->delete();
            return response()->json(['status' => 'success', 'msg' => 'Eliminado con éxito'], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No encontrado'], 404);
        }
    }

    function searchCoordinadores(Request $request): JsonResponse
    {
        $coordinadores = Coordinador::from('coordinadores as coord')
            ->selectRaw('coord.id,
                                    coord.nombres as nombres_coordinador,
                                    coord.apellidos as apellidos_coordinador,
                                    coord.dni, coord.telefono, coord.email,
                                    super.nombres as nombres_supervisor,
                                    super.apellidos as apellidos_supervisor,
                                    c.nombre_canton as canton,
                                    parr.nombre_parroquia as parroquia')
            ->with([
                'recintos' => function ($query) {
                    return $query->select('recintos.id', 'recintos.nombre_recinto');
                }
            ])
            ->join('cantones as c', 'c.id', 'coord.canton_id')
            ->join('parroquias as parr', 'parr.id', 'coord.parroquia_id')
            ->join('supervisores as super', 'super.id', 'coord.supervisor_id')
            ->join('recinto_coord as rc', 'rc.coordinador_id', 'coord.id')
            ->canton($request->canton_id)
            ->parroquia($request->parroquia_id)
            ->recinto($request->recinto_id)
            ->supervisor($request->supervisor_id)
            ->orderBy('coord.id', 'DESC')
            ->distinct()
            ->get();

        if (sizeof($coordinadores) >= 1) {
            return response()->json(['status' => 'success', 'coordinadores' => $coordinadores], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => "No existen supervisores en esa zona"], 404);
        }
    }

    function massiveStore(Request $request)
    {
        try {
            if(!$request->hasFile('coordinadores_import')) {
                return response()->json(['status' => 'error', 'msg' => 'El archivo no existe'], 500);
            }

            Excel::import(new CoordinadoresImport, $request->file('coordinadores_import'));
            return response()->json(['status' => 'success', 'msg' => 'Archivo subido con éxito'], 201);

        } catch (\Maatwebsite\Excel\Validators\ValidationException $e){
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

    function exportExcelCoordinadores(Request $request)
    {
        return Excel::download(new CoordinadorExport(
            $request->canton_id
        ), 'coordinadores.xlsx');
    }
}
