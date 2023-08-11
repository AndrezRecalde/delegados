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
            'Nombres Completos',
            'Cédula (10 Digitos)',
        ];
    }

    public function collection()
    {
        $escaneadores = Escaneador::orderBy('canton_id', 'ASC')->get(['dni', 'nombres_completos']);

        return $escaneadores;
    }
}
