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
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class VeedorController extends Controller
{
    function getVeedores(Request $request): JsonResponse
    {
        $cantones = $request->input('cantones', []);
        $parroquias = $request->input('parroquias', []);
        $recintos = $request->input('recintos', []);

        $veedores = Veedor::query()
            ->selectRaw('veedores.id,
            veedores.nombres as nombres_veedor,
            veedores.apellidos as apellidos_veedor,
            veedores.dni, veedores.telefono,
            veedores.coordinador_id,
            coord.nombres as nombres_coordinador,
            coord.apellidos as apellidos_coordinador,
            veedores.canton_id, c.nombre_canton as canton, veedores.recinto_id,
            r.nombre_recinto as recinto, veedores.junta_id, j.junta_nombre as junta, veedores.confirmado,
            CONCAT(u.nombres, " ", u.apellidos) as usuario_created,
            CONCAT(us.nombres, " ", us.apellidos) as usuario_updated')
            ->leftJoin('coordinadores as coord', 'coord.id', '=', 'veedores.coordinador_id')
            ->join('cantones as c', 'c.id', '=', 'veedores.canton_id')
            ->join('recintos as r', 'r.id', '=', 'veedores.recinto_id')
            ->leftJoin('juntas as j', 'j.id', '=', 'veedores.junta_id')
            ->leftJoin('users as u', 'u.id', '=', 'veedores.created_by')
            ->leftJoin('users as us', 'us.id', '=', 'veedores.updated_by')
            ->when(!empty($cantones), function ($query) use ($cantones) {
                return $query->whereInCantones($cantones);
            })
            ->when(!empty($recintos), function ($query) use ($recintos) {
                return $query->whereInRecintos($recintos);
            })
            ->when(!empty($parroquias), function ($query) use ($parroquias) {
                return $query->whereInParroquias($parroquias);
            })
            ->orderBy('veedores.id', 'DESC')
            ->get();

        return response()->json([
            'status' => 'success',
            'veedores' => $veedores
        ]);
    }

    function store(VeedorRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $data['created_by'] = Auth::id();
            Veedor::create($data);
            return response()->json(['status' => 'success', 'msg' => 'Creado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function update(VeedorRequest $request, int $id): JsonResponse
    {
        $veedor = Veedor::find($id);
        if ($veedor) {
            try {
                // Agregar el id del usuario autenticado al array validado antes de actualizar el registro
                $data = $request->validated();
                $data['updated_by'] = Auth::id();

                // Actualizar el registro con los datos y el id del actualizador
                $veedor->update($data);

                return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito'], 201);
            } catch (\Throwable $th) {
                return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
            }
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
            ->leftJoin('coordinadores as coord', 'coord.id', 'veed.coordinador_id')
            ->leftJoin('supervisores as super', 'super.id', 'coord.supervisor_id')
            ->join('cantones as c', 'c.id', 'veed.canton_id')
            ->join('recintos as r', 'r.id', 'veed.recinto_id')
            ->leftJoin('juntas as j', 'j.id', 'veed.junta_id')
            ->leftJoin('users as u', 'u.id', 'veed.created_by')
            ->leftJoin('users as us', 'us.id', 'veed.updated_by')
            ->canton($request->canton_id)
            ->parroquia($request->parroquia_id)
            ->recinto($request->recinto_id)
            ->coordinador($request->coordinador_id)
            ->supervisor($request->supervisor_id)
            ->selectRaw('veed.id,
                        veed.nombres as nombres_veedor,
                        veed.apellidos as apellidos_veedor,
                        veed.dni, veed.telefono,
                        super.id as supervisor_id,
                        super.nombres as nombres_supervisor,
                        super.apellidos as apellidos_supervisor,
                        coord.id as coordinador_id,
                        coord.nombres as nombres_coordinador,
                        coord.apellidos as apellidos_coordinador,
                        c.nombre_canton as canton,
                        r.nombre_recinto as recinto,
                        veed.confirmado, veed.junta_id, j.junta_nombre as junta,
                        CONCAT(u.nombres, " ", u.apellidos) as usuario_created,
                        CONCAT(us.nombres, " ", us.apellidos) as usuario_updated')
            ->orderBy('veed.id', 'DESC')
            ->get();

        if (sizeof($veedores) >= 1) {
            return response()->json(['status' => 'success', 'veedores' => $veedores], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen veedores en esa zona'], 404);
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
        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
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
