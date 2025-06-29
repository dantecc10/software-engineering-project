<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $table = 'Expense';
    protected $primaryKey = 'expense_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'category_id',
        'description',
        'date',
        'amount',
        'frequency_id',
        'next_date',
    ];
}
