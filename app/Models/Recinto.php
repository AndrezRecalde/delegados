<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Recinto extends Model
{
    use HasFactory;

    protected $hidden = ['pivot'];

    function coordinadores() : BelongsToMany
    {
        return $this->belongsToMany(Coordinador::class, 'recinto_coord', 'recinto_id', 'coordinador_id');
    }
}
