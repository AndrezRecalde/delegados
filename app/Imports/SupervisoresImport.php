<?php

namespace App\Imports;

use App\Models\Supervisor;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class SupervisoresImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Supervisor([
            'dni'               => $row['dni'],
            'nombres_completos' => $row['nombres_completos'],
            'email'             => $row['email'],
            'telefono'          => $row['telefono'],
            'canton_id'         => $row['canton_id'],
        ]);
    }
    function rules() : array
    {
        return [
            'dni'               => 'required|unique:supervisores',
            'nombres_completos' => 'required',
            'email'             => 'required',
            'telefono'          => 'required',
            'canton_id'         => 'required',
        ];
    }
}
