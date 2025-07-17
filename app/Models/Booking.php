<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use App\Models\Car;

class Booking extends Model
{
    protected $fillable = [
        'customer_id',
        'car_id',
        'pickup_date',
        'return_date',
        'total_price',
        'booking_status',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
