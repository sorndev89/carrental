<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'customer_id',
        'amount',
        'payment_method',
        'payment_date',
        'transaction_id',
        'slip_image_url',
        'status',
        'approved_by',
        'approved_at',
    ];

    protected $casts = [
        'payment_date' => 'datetime',
        'approved_at' => 'datetime',
        'amount' => 'decimal:2',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}