<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //
    protected $fillable = [
        'first_name',
        'last_name',
        'gender',
        'email',
        'phone_number',
        'address',
        'id_card_number',
        'driver_license_number',
        'license_expiry_date',
        'profile_image_url',
    ];

}
