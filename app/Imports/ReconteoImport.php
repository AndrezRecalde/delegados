<?php

namespace App\Imports;

use App\Models\Reconteo;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ReconteoImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Reconteo([
            'dni'                => $row['dni'],
            'nombres_completos'  => $row['nombres_completos'],
        ]);
    }

    function rules() : array
    {
        return [
            'dni'               => 'required|unique:jrvmoviles',
            'nombres_completos' => 'required',
        ];
    }
}
