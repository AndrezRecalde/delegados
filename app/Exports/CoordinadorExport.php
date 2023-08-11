<?php

namespace App\Exports;

use App\Models\Coordinador;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;

class CoordinadorExport implements FromCollection, WithHeadings, WithColumnWidths, WithStyles
{

    public function columnWidths(): array
    {
        return [
            'A' => 50,
            'B' => 80,
            'C' => 80,
            'D' => 90,
            'E' => 150,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1')->getFont()->setBold(true);
        $sheet->getStyle('B1')->getFont()->setBold(true);
        $sheet->getStyle('C1')->getFont()->setBold(true);
        $sheet->getStyle('D1')->getFont()->setBold(true);
        $sheet->getStyle('E1')->getFont()->setBold(true);

    }

    /**
    * @return \Illuminate\Support\Collection
    */

    public function headings(): array
    {
        return [
            'Cédula (10 Dígitos)',
            'Nombres Completos',
            'Canton',
            'Parroquia',
        ];
    }

    public function collection()
    {
        $coordinadores = Coordinador::from('coordinadores as coord')
        ->selectRaw('coord.dni, coord.nombres_completos,
                    c.nombre_canton as canton,
                    parr.nombre_parroquia as parroquia')
        ->join('cantones as c', 'c.id', 'coord.canton_id')
        ->join('parroquias as parr', 'parr.id', 'coord.parroquia_id')
        ->orderBy('c.nombre_canton', 'ASC')
        ->get();

        return $coordinadores;
    }
}
