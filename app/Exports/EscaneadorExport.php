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
    protected $canton_id;

    public function __construct(int $canton_id) {
        $this->canton_id = $canton_id;
    }

    public function columnWidths(): array
    {
        return [
            'A' => 50,
            'B' => 80,
            'C' => 80,
            'D' => 80,
            'E' => 80,
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

    public function headings(): array
    {
        return [
            'Cédula (10 Digitos)',
            'Nombres Completos',
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
        $escaneadores = Escaneador::from('escaneadores as esc')
            ->selectRaw('esc.dni, esc.nombres_completos,
                 c.nombre_canton as canton,
                 p.nombre_parroquia as parroquia,
                 r.nombre_recinto as recinto')
            ->join('cantones as c', 'c.id', 'esc.canton_id')
            ->leftJoin('parroquias as p', 'p.id', 'esc.parroquia_id')
            ->leftJoin('recintos as r', 'r.id', 'esc.recinto_id')
            ->canton($this->canton_id)
            ->orderBy('c.nombre_canton', 'ASC')
            ->get();

        return $escaneadores;
    }
}
