<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Coordinador extends Model
{
    use HasFactory;

    protected $table = 'coordinadores';

    protected $fillable = [
        'nombres_completos',
        'dni',
        'email',
        'telefono',
        'supervisor_id',
        'canton_id',
        'parroquia_id'
    ];

    function recintos(): BelongsToMany
    {
        return $this->belongsToMany(Recinto::class, 'recinto_coord', 'coordinador_id','recinto_id');
    }

    function scopeCanton($query, $canton)
    {
        if($canton > 0){
            return $query->where('coord.canton_id', $canton);
        }
    }

    function scopeParroquia($query, $parroquia)
    {
        if($parroquia > 0){
            return $query->where('coord.parroquia_id', $parroquia);
        }
    }

    function scopeRecinto($query, $recinto)
    {
        if($recinto > 0){
            return $query->where('rc.recinto_id', $recinto);
        }
    }

    function scopeSupervisor($query, $supervisor)
    {
        if($supervisor > 0){
            return $query->where('coord.supervisor_id', $supervisor);
        }
    }

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($coordinador) {
            $coordinador->recintos()->detach();
        });
    }
}
