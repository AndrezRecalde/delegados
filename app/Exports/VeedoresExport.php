<?php

namespace App\Exports;

use App\Models\Veedor;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;

class VeedoresExport implements FromCollection, WithHeadings, WithColumnWidths, WithStyles
{


    public function columnWidths(): array
    {
        return [
            'A' => 50,
            'B' => 80,
            'C' => 50,
            'D' => 80,
            'E' => 80,
            'F' => 90,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1')->getFont()->setBold(true);
        $sheet->getStyle('B1')->getFont()->setBold(true);
        $sheet->getStyle('C1')->getFont()->setBold(true);
        $sheet->getStyle('D1')->getFont()->setBold(true);
        $sheet->getStyle('E1')->getFont()->setBold(true);
        $sheet->getStyle('F1')->getFont()->setBold(true);

    }

    /**
     * @return \Illuminate\Support\Collection
     */

    public function headings(): array
    {
        return [
            'Cédula (10 Digitos)',
            'Nombres Completos',
            'Telefono',
            'Canton',
            'Parroquia',
            'Recinto'
        ];
    }



    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $veedores = Veedor::from('veedores as veed')
            ->selectRaw('veed.dni, veed.nombres_completos, veed.telefono,
                    c.nombre_canton as canton,
                    p.nombre_parroquia as parroquia,
                    r.nombre_recinto as recinto')
            ->join('cantones as c', 'c.id', 'veed.canton_id')
            ->join('recintos as r', 'r.id', 'veed.recinto_id')
            ->join('parroquias as p', 'p.id', 'r.parroquia_id')
            ->orderBy('c.nombre_canton', 'ASC')
            ->get();

        return $veedores;
    }
}
