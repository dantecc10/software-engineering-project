<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Frequency extends Model
{
    protected $table = 'Frequency';
    protected $primaryKey = 'frequency_id';
    public $timestamps = false;

    protected $fillable = [
        'frequency_name',
    ];
}
