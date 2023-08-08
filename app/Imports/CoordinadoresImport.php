<?php

namespace App\Imports;

use App\Models\Coordinador;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class CoordinadoresImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Coordinador([
            'dni'                => $row['dni'],
            'nombres_completos'  => $row['nombres_completos'],
            'email'              => $row['email'],
            'telefono'           => $row['telefono'],
            'supervisor_id'      => $row['supervisor_id'],
            'canton_id'          => $row['canton_id'],
            'parroquia_id'       => $row['parroquia_id']
        ]);
    }

    function rules() : array
    {
        return [
            'dni'               => 'required|unique:coordinadores',
            'nombres_completos' => 'required',
            'email'             => 'required',
            'telefono'          => 'required',
            'supervisor_id'     => 'required',
            'canton_id'         => 'required',
            'parroquia_id'      => 'required'
        ];
    }
}
