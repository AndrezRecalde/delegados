<?php

namespace App\Imports;

use App\Models\Escaneador;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class EscaneadorImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Escaneador([
            'dni'                => $row['dni'],
            'nombres_completos'  => $row['nombres_completos'],
            'telefono'           => $row['telefono'],
            'canton_id'          => $row['canton_id'],
        ]);
    }
    function rules() : array
    {
        return [
            'dni'               => 'required|unique:coordinadores',
            'nombres_completos' => 'required',
            'telefono'          => 'required',
            'canton_id'         => 'required',
        ];
    }
}
