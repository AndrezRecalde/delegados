<?php

namespace App\Exports;

use App\Models\Escaneador;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;

class EscaneadorExport implements FromCollection, WithHeadings, WithColumnWidths, WithStyles
{

    public function columnWidths(): array
    {
        return [
            'A' => 50,
            'B' => 80,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1')->getFont()->setBold(true);
        $sheet->getStyle('B1')->getFont()->setBold(true);
    }

    /**
     * @return \Illuminate\Support\Collection
     */


    public function headings(): array
    {
        return [
            'Cédula (10 Digitos)',
            'Nombres Completos',
            'Canton'
        ];
    }

    public function collection()
    {
        $escaneadores = Escaneador::from('escaneadores as esc')
            ->selectRaw('esc.dni, esc.nombres_completos,
                 c.nombre_canton as canton')
            ->join('cantones as c', 'c.id', 'esc.canton_id')
            ->leftJoin('parroquias as p', 'p.id', 'esc.parroquia_id')
            ->leftJoin('recintos as r', 'r.id', 'esc.recintos_id')
            ->orderBy('c.nombre_canton', 'ASC')
            ->get();

        return $escaneadores;
    }
}
