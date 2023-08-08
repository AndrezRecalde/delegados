<?php

namespace App\Imports;

use App\Models\Veedor;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class VeedoresImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Veedor([
            'dni'               => $row['dni'],
            'nombres_completos' => $row['nombres_completos'],
            'telefono'          => $row['telefono'],
            'coordinador_id'    => $row['coordinador_id'],
            'canton_id'         => $row['canton_id'],
            'recinto_id'        => $row['recinto_id']
        ]);
    }

    function rules() : array
    {
        return [
            'dni'               => 'required|unique:veedores',
            'nombres_completos' => 'required',
            'telefono'          => 'required',
            'coordinador_id'    => 'required',
            'canton_id'         => 'required',
            'recinto_id'        => 'required'
        ];
    }
}
