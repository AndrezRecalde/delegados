<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reconteo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombres',
        'apellidos',
        'dni'
    ];
}
