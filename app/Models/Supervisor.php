<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supervisor extends Model
{
    use HasFactory;

    protected $table = 'supervisores';

    protected $fillable = [
        'nombres_completos',
        'dni',
        'email',
        'telefono',
        'canton_id'
    ];

    function veedores(): HasMany
    {
        return $this->hasMany(Veedor::class);
    }

    function parroquias(): BelongsToMany
    {
        return $this->belongsToMany(Parroquia::class, 'parroquia_super', 'supervisor_id', 'parroquia_id');
    }

    function scopeCanton($query, $canton)
    {
        if ($canton > 0) {
            return $query->where('c.id', $canton);
        }
    }

    function scopeParroquia($query, $parroquia)
    {
        if ($parroquia > 0) {
            return $query->where('ps.parroquia_id', $parroquia);
        }
    }


    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($supervisor) {
            $supervisor->parroquias()->detach();
            $supervisor->veedores()->detach();
        });
    }
}
