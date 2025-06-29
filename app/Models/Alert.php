<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    protected $table = 'Alert';
    protected $primaryKey = 'alert_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'message',
        'scheduled_date',
        'active',
    ];
}
