<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Frequency extends Model
{
    protected $table = 'frecuencies'; // <-- ahora apunta a la tabla frecuencies
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = ['frequency_name'];
}