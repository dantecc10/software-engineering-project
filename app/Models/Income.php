<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    protected $table = 'incomes';
    protected $primaryKey = 'income_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'date',
        'type',
        'amount',
    ];
}
