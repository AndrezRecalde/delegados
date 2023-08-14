<?php

namespace App\Imports;

use App\Models\Jrvmovil;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class JrvmovilImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Jrvmovil([
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
