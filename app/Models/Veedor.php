<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veedor extends Model
{
    use HasFactory;

    protected $table = 'veedores';

    protected $fillable = [
        'nombres_completos',
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

    function scopeCanton($query, $canton_id)
    {
        if ($canton_id) {
            $canton_id = is_array($canton_id) ? $canton_id : [$canton_id];
            return $query->whereIn('veed.canton_id', $canton_id);
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
            return $query->whereIn('veed.canton_id', $cantones);
        }
    }
}
