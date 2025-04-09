<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veedor extends Model
{
    use HasFactory;

    protected $table = 'veedores';

    protected $fillable = [
        'nombres',
        'apellidos',
        'dni',
        'telefono',
        'coordinador_id',
        'canton_id',
        'recinto_id',
        'junta_id',
        'confirmado',
        'created_by',
        'updated_by'
    ];

    public function recinto()
    {
        return $this->belongsTo(Recinto::class, 'recinto_id');
    }

    function scopeCanton($query, $canton_id)
    {
        if ($canton_id) {
            return $query->where('veed.canton_id', $canton_id);
        }
    }

    function scopeParroquia($query, $parroquia_id)
    {
        if ($parroquia_id) {
            return $query->where('r.parroquia_id', $parroquia_id);
        }
    }

    function scopeRecinto($query, $recinto_id)
    {
        if ($recinto_id > 0) {
            return $query->where('veed.recinto_id', $recinto_id);
        }
    }

    function scopeCoordinador($query, $coordinador_id)
    {
        if ($coordinador_id > 0) {
            return $query->where('veed.coordinador_id', $coordinador_id);
        }
    }

    function scopeSupervisor($query, $supervisor_id)
    {
        if ($supervisor_id > 0) {
            return $query->where('super.id', $supervisor_id);
        }
    }

    public function scopeWhereInCantones($query, array $cantones)
    {
        if (sizeof($cantones) > 0) {
            return $query->whereIn('veedores.canton_id', $cantones);
        }
    }

    public function scopeWhereInRecintos($query, array $recintos)
    {
        if (sizeof($recintos) > 0) {
            return $query->whereIn('veedores.recinto_id', $recintos);
        }
    }

    public function scopeWhereInParroquias($query, array $parroquias)
    {
        if (sizeof($parroquias) > 0) {
            return $query->whereHas('recinto', function ($q) use ($parroquias) {
                $q->whereIn('parroquia_id', $parroquias);
            });
        }
    }
}
