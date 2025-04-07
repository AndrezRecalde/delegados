<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jrvmovil extends Model
{
    use HasFactory;

    protected $table = 'jrvmoviles';

    protected $fillable = [
        'nombres',
        'apellidos',
        'dni'
    ];
}
