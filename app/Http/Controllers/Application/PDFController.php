<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Models\Canton;
use App\Models\Coordinador;
use App\Models\Escaneador;
use App\Models\Jrvmovil;
use App\Models\Junta;
use App\Models\Parroquia;
use App\Models\Recinto;
use App\Models\Reconteo;
use App\Models\Supervisor;
use Illuminate\Http\Request;
use App\Models\Veedor;
use PDF;


class PDFController extends Controller
{

    function generateFootersPDF()
    {
        $data = [
            'title' =>  'Landscape de Veedores'
        ];
        $pdf = PDF::loadView('pdf.footers.footer', $data);
        return $pdf->download('footers.pdf');
    }

    function generateCardsVeedoresPDF(Request $request)
    {
        $veedores = Veedor::from('veedores as veed')
            ->leftJoin('coordinadores as coord', 'coord.id', 'veed.coordinador_id')
            ->leftJoin('supervisores as super', 'super.id', 'coord.supervisor_id')
            ->join('cantones as c', 'c.id', 'veed.canton_id')
            ->join('recintos as r', 'r.id', 'veed.recinto_id')
            ->join('parroquias as p', 'p.id', 'r.parroquia_id')
            ->leftJoin('juntas as j', 'j.id', 'veed.junta_id')
            ->canton($request->canton_id)
            ->parroquia($request->parroquia_id)
            ->recinto($request->recinto_id)
            ->coordinador($request->coordinador_id)
            ->supervisor($request->supervisor_id)
            ->selectRaw('veed.id,
                    veed.nombres as nombres_veedor,
                    veed.apellidos as apellidos_veedor,
                    veed.dni, veed.telefono,
                    super.nombres as nombres_supervisor,
                    super.apellidos as apellidos_supervisor,
                    coord.nombres as nombres_coordinador,
                    coord.apellidos as apellidos_coordinador,
                    c.nombre_canton as canton,
                    r.nombre_recinto as recinto,
                    p.nombre_parroquia as parroquia,
                    j.junta_nombre as junta')
            ->get();

        $data = [
            'title'     =>  'Reporte de Delegados',
            'veedores'  =>  $veedores
        ];

        $pdf = PDF::loadView('pdf.veedores.card', $data);

        return $pdf->download('veedores.pdf');
    }

    function generateTableVeedoresPDF(Request $request)
    {
        $veedores = Veedor::from('veedores as veed')
            ->leftJoin('coordinadores as coord', 'coord.id', 'veed.coordinador_id')
            ->leftJoin('supervisores as super', 'super.id', 'coord.supervisor_id')
            ->join('cantones as c', 'c.id', 'veed.canton_id')
            ->join('recintos as r', 'r.id', 'veed.recinto_id')
            ->canton($request->canton_id)
            ->recinto($request->recinto_id)
            ->coordinador($request->coordinador_id)
            ->supervisor($request->supervisor_id)
            ->selectRaw('veed.id,
                    veed.nombres as nombres_veedor,
                    veed.apellidos as apellidos_veedor,
                    veed.dni, veed.telefono,
                    super.nombres as nombres_supervisor,
                    super.apellidos as apellidos_supervisor,
                    coord.nombres as nombres_coordinador,
                    coord.apellidos as apellidos_coordinador,
                    c.nombre_canton as canton,
                    r.nombre_recinto as recinto')
            ->get();

        $data = [
            'title'     =>  'Reporte de Delegados',
            'veedores'  =>  $veedores
        ];

        $pdf = PDF::loadView('pdf.veedores.table', $data);

        return $pdf->setPaper('a4', 'portrait')->download('veedores.pdf');
    }

    function getCardsCoordinadoresPDF(Request $request)
    {
        $coordinadores = Coordinador::from('coordinadores as coord')
            ->selectRaw('coord.id,
                        coord.nombres as nombres_coordinador,
                        coord.apellidos as apellidos_coordinador,
                        coord.dni,
                        coord.telefono, coord.email,
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
            ->leftJoin('supervisores as super', 'super.id', 'coord.supervisor_id')
            ->join('recinto_coord as rc', 'rc.coordinador_id', 'coord.id')
            ->canton($request->canton_id)
            ->parroquia($request->parroquia_id)
            ->recinto($request->recinto_id)
            ->supervisor($request->supervisor_id)
            ->distinct()
            ->get();

        $data = [
            'title'     =>  'Reporte de Coordinadores',
            'coordinadores'  =>  $coordinadores
        ];

        $pdf = PDF::loadView('pdf.coordinadores.card', $data);

        return $pdf->download('coordinadores.pdf');
    }

    function getTableCoordinadoresPDF(Request $request)
    {
        $coordinadores = Coordinador::from('coordinadores as coord')
            ->selectRaw('coord.id,
                     coord.nombres as nombres_coordinador,
                     coord.apellidos as apellidos_coordinador,
                     coord.dni,
                     coord.telefono, coord.email,
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
            ->leftJoin('supervisores as super', 'super.id', 'coord.supervisor_id')
            ->join('recinto_coord as rc', 'rc.coordinador_id', 'coord.id')
            ->canton($request->canton_id)
            ->parroquia($request->parroquia_id)
            ->recinto($request->recinto_id)
            ->supervisor($request->supervisor_id)
            ->distinct()
            ->get();

        $data = [
            'title'     =>  'Reporte de Coordinadores',
            'coordinadores'  =>  $coordinadores
        ];

        $pdf = PDF::loadView('pdf.coordinadores.table', $data);

        return $pdf->setPaper('a4', 'landscape')->download('coordinadores.pdf');
    }

    function getCardsSupervisoresPDF(Request $request)
    {
        $supervisores = Supervisor::from('supervisores as super')
            ->selectRaw('super.id,
                            super.nombres as nombres_supervisor,
                            super.apellidos as apellidos_supervisor,
                            super.dni,super.telefono,
                            super.email, c.nombre_canton as canton')
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

        $data = [
            'title'     =>  'Reporte de Supervisores',
            'supervisores'  =>  $supervisores
        ];

        $pdf = PDF::loadView('pdf.supervisores.card', $data);

        return $pdf->download('supervisores.pdf');
    }

    function getTableSupervisoresPDF(Request $request)
    {
        $supervisores = Supervisor::from('supervisores as super')
            ->selectRaw('super.id,
                                    super.nombres as nombres_supervisor,
                                    super.apellidos as apellidos_supervisor,
                                    super.dni,super.telefono,
                                    super.email, c.nombre_canton as canton')
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

        $data = [
            'title'     =>  'Reporte de Supervisores',
            'supervisores'  =>  $supervisores
        ];

        $pdf = PDF::loadView('pdf.supervisores.table', $data);

        return $pdf->setPaper('a4', 'landscape')->download('supervisores.pdf');
    }

    function getTableEscaneadoresPDF(Request $request)
    {
        $escaneadores = Escaneador::from('escaneadores as esc')
            ->selectRaw('esc.id, esc.apellidos, esc.nombres, esc.dni, esc.telefono, esc.canton_id, c.nombre_canton as canton')
            ->join('cantones as c', 'c.id', 'esc.canton_id')
            ->canton($request->canton_id)
            ->get();

        $data = [
            'title'     =>  'Reporte de Escaneadores',
            'escaneadores'  =>  $escaneadores
        ];

        $pdf = PDF::loadView('pdf.escaneadores.table', $data);

        return $pdf->setPaper('a4', 'landscape')->download('escaneadores.pdf');
    }

    function getCardsEscaneadoresPDF(Request $request)
    {
        $escaneadores = Escaneador::from('escaneadores as esc')
            ->selectRaw('esc.id, esc.apellidos, esc.nombres, esc.dni,
             c.nombre_canton as canton, p.nombre_parroquia as parroquia,
             r.nombre_recinto as recinto')
            ->join('cantones as c', 'c.id', 'esc.canton_id')
            ->join('parroquias as p', 'p.id', 'esc.parroquia_id')
            ->join('recintos as r', 'r.id', 'esc.recinto_id')
            ->canton($request->canton_id)
            ->get();

        $data = [
            'title'     =>  'Reporte de Escaneadores',
            'escaneadores'  =>  $escaneadores
        ];

        $pdf = PDF::loadView('pdf.escaneadores.card', $data);

        return $pdf->download('escaneadores.pdf');
    }

    function getCardsJrvmovilesPDF()
    {
        $jrvmoviles = Jrvmovil::get(['id', 'dni', 'apellidos', 'nombres']);;

        $data = [
            'title'     =>  'Reporte de JRV Moviles',
            'jrvmoviles'  =>  $jrvmoviles
        ];

        $pdf = PDF::loadView('pdf.jrvmoviles.card', $data);

        return $pdf->download('jrvmoviles.pdf');
    }

    function getCardsJrvReconteosPDF()
    {
        $reconteos = Reconteo::get(['id', 'dni', 'apellidos', 'nombres']);;

        $data = [
            'title'     =>  'Reporte de JRV Moviles',
            'reconteos'  =>  $reconteos
        ];

        $pdf = PDF::loadView('pdf.reconteos.card', $data);

        return $pdf->download('reconteos.pdf');
    }



    /* FICHAS PUBLICAS */
    public function exportarDelegadoPDF(Request $request)
    {
        // Validar un array de delegados
        $validated = $request->validate([
            'delegados' => 'required|array|min:1',
            'delegados.*.apellidos' => 'required|string',
            'delegados.*.nombres' => 'required|string',
            'delegados.*.dni' => 'required|string',
            'delegados.*.canton_id' => 'required|integer',
            'delegados.*.parroquia' => 'required|string',
            'delegados.*.recinto' => 'required|string',
            'delegados.*.junta' => 'required|string',
        ]);

        $delegados = [];

        foreach ($validated['delegados'] as $delegado) {
            $canton = Canton::find($delegado['canton_id']);

            $delegados[] = [
                'apellidos_veedor' => $delegado['apellidos'],
                'nombres_veedor' => $delegado['nombres'],
                'dni' => $delegado['dni'],
                'canton' => $canton ? $canton->nombre_canton : 'No encontrado',
                'parroquia' => $delegado['parroquia'],
                'recinto' => $delegado['recinto'],
                'junta' => $delegado['junta'],
            ];
        }

        // Convertimos el array a una colección y aplicamos chunk
        $delegados = collect($delegados); // Convertir el array a colección

        // Cargar la vista y pasar TODOS los delegados usando chunk(2) para organizar
        $pdf = PDF::loadView('pdf.veedores.public.card', ['delegados' => $delegados])
            ->setOption(['isHtml5ParserEnabled' => true]);

        return $pdf->download('reporte.pdf');
    }

    function exportarCoordinadorPDF(Request $request)
    {
        // Validar un array de delegados
        $validated = $request->validate([
            'coordinadores' => 'required|array|min:1',
            'coordinadores.*.apellidos' => 'required|string',
            'coordinadores.*.nombres' => 'required|string',
            'coordinadores.*.dni' => 'required|string',
        ]);
        $coordinadores = [];

        foreach ($validated['coordinadores'] as $delegado) {

            $coordinadores[] = [
                'apellidos_coordinador' => $delegado['apellidos'],
                'nombres_coordinador' => $delegado['nombres'],
                'dni' => $delegado['dni']
            ];
        }
        $coordinadores = collect($coordinadores); // Convertir el array a colección

        // Cargar la vista y pasar TODOS los delegados usando chunk(2) para organizar
        $pdf = PDF::loadView('pdf.coordinadores.public.card', ['coordinadores' => $coordinadores])
            ->setOption(['isHtml5ParserEnabled' => true]);

        return $pdf->download('reporte.pdf');
    }
}
