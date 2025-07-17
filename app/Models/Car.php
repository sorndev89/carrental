<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CarType;

class Car extends Model
{
    protected $fillable = [
        'car_type_id',
        'make',
        'model',
        'license_plate',
        'daily_rate',
        'image_url',
        'status',
    ];

    public function carType()
    {
        return $this->belongsTo(CarType::class);
    }
}
