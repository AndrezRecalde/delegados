<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Escaneador extends Model
{
    use HasFactory;

    protected $table = 'escaneadores';

    protected $fillable = [
        'nombres',
        'apellidos',
        'dni',
        'telefono',
        'canton_id',
        'parroquia_id',
        'recinto_id'
    ];

    function scopeCanton($query, $canton)
    {
        if ($canton > 0) {
            return $query->where('esc.canton_id', $canton);
        }
    }
}
