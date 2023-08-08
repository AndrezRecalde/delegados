<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Parroquia extends Model
{
    use HasFactory;

    protected $hidden = ['pivot'];

    function supervisores() : BelongsToMany
    {
        return $this->belongsToMany(Supervisor::class, 'parroquia_super', 'parroquia_id' ,'supervisor_id');
    }
}
