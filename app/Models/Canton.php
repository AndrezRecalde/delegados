<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Canton extends Model
{
    use HasFactory;

    protected $table = 'cantones';

    public function scopeWhereInCantones($query, array $cantones)
    {
        if (sizeof($cantones) > 0) {
            return $query->whereIn('id', $cantones);
        }
    }

    function scopeByCantonId($query, $canton_id)
    {
        if ($canton_id) {
            return $query->where('id', $canton_id);
        }

    }
}
