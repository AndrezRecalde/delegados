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

    protected $canton_id, $parroquia_id, $recinto_id, $supervisor_id, $coordinador_id;

    public function __construct(int $canton_id, int $parroquia_id, int $recinto_id, int $supervisor_id, int $coordinador_id) {
        $this->canton_id = $canton_id;
        $this->parroquia_id = $parroquia_id;
        $this->recinto_id = $recinto_id;
        $this->supervisor_id = $supervisor_id;
        $this->coordinador_id = $coordinador_id;

    }

    public function columnWidths(): array
    {
        return [
            'A' => 50,
            'B' => 80,
            'C' => 50,
            'D' => 80,
            'E' => 80,
            'F' => 90,
            'G' => 90,
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
            'Cédula (10 Digitos)',
            'Nombres Completos',
            'Teléfono',
            'Canton',
            'Parroquia',
            'Recinto',
            'Coordinador'
        ];
    }



    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $veedores = Veedor::from('veedores as veed')
            ->selectRaw('veed.dni, veed.apellidos, veed.nombres, veed.telefono,
                    c.nombre_canton as canton,
                    p.nombre_parroquia as parroquia,
                    r.nombre_recinto as recinto,
                    coord.nombres_completos as coordinador')
            ->leftJoin('cantones as c', 'c.id', 'veed.canton_id')
            ->leftJoin('recintos as r', 'r.id', 'veed.recinto_id')
            ->leftJoin('parroquias as p', 'p.id', 'r.parroquia_id')
            ->leftJoin('coordinadores as coord', 'coord.id', 'veed.coordinador_id')
            ->leftJoin('supervisores as super', 'super.id', 'coord.supervisor_id')
            ->canton($this->canton_id)
            ->parroquia($this->parroquia_id)
            ->recinto($this->recinto_id)
            ->supervisor($this->supervisor_id)
            ->coordinador($this->coordinador_id)
            ->orderBy('c.nombre_canton', 'ASC')
            ->get();

        return $veedores;
    }
}
