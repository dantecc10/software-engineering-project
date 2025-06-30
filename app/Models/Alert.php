<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    protected $table = 'alerts';
    protected $primaryKey = 'alert_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'message',
        'scheduled_date',
        'active',
    ];
}
