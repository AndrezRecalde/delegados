<?php

namespace App\Exports;

use App\Models\Jrvmovil;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;

class JrvmovilExport implements FromCollection, WithHeadings, WithColumnWidths, WithStyles
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

    public function headings(): array
    {
        return [
            'Cédula (10 Digitos)',
            'Nombres Completos',
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */


    public function collection()
    {
        return Jrvmovil::get(['dni', 'nombres_completos']);
    }
}
