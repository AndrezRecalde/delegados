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
            'D' => 90,
            'E' => 150,
            'F' => 90,
            'G' => 90
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
        $sheet->getStyle('G1')->getFont()->setBold(true);
    }

    /**
    * @return \Illuminate\Support\Collection
    */

    public function headings(): array
    {
        return [
            'Cédula (10 Dígitos)',
            'Nombres',
            'Apellidos',
            'Teléfono',
            'Canton',
            'Parroquia',
            'Recinto',
            'Supervisor',
        ];
    }

    public function collection()
    {
        $coordinadores = Coordinador::from('coordinadores as coord')
        ->selectRaw('coord.dni,
                    coord.nombres as nombres_coordinador,
                    coord.apellidos as apellidos_coordinador,
                    coord.telefono,
                    c.nombre_canton as canton,
                    parr.nombre_parroquia as parroquia,
                    rec.nombre_recinto as recinto,
                    super.nombres_completos as supervisor')
        ->join('cantones as c', 'c.id', 'coord.canton_id')
        ->join('recinto_coord as rc', 'rc.coordinador_id', 'coord.id')
        ->join('recintos as rec', 'rec.id', 'rc.recinto_id')
        ->join('parroquias as parr', 'parr.id', 'coord.parroquia_id')
        ->join('supervisores as super', 'super.id', 'coord.supervisor_id')
        ->canton($this->canton_id)
        ->orderBy('c.nombre_canton', 'ASC')
        ->get();

        return $coordinadores;
    }
}
