<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlatformUsers extends Model
{
    protected $table = 'platform_users';
    protected $primaryKey = 'user_id';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'email',
        'password_hash',
    ];

    // protected $hidden = [
    //     'password_hash',
    // ];
}
