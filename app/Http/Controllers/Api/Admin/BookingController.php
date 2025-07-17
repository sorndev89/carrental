<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');
        $bookingStatus = $request->input('booking_status', '');

        $query = Booking::with(['customer', 'car'])
            ->where(function ($q) use ($search) {
                $q->whereHas('customer', function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                });
                $q->orWhereHas('car', function ($q) use ($search) {
                    $q->where('make', 'like', "%{$search}%")
                        ->orWhere('model', 'like', "%{$search}%")
                        ->orWhere('license_plate', 'like', "%{$search}%");
                });
            });

        if ($bookingStatus) {
            $query->where('booking_status', $bookingStatus);
        }

        $bookings = $query->latest()->paginate($perPage);

        return response()->json(['bookings' => $bookings]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'car_id' => 'required|exists:cars,id',
            'pickup_date' => 'required|date',
            'return_date' => 'required|date|after_or_equal:pickup_date',
            'total_price' => 'required|numeric',
            'booking_status' => 'required|in:pending,confirmed,cancelled,completed',
        ]);

        $booking = new Booking();
        $booking->customer_id = $request->customer_id;
        $booking->car_id = $request->car_id;
        $booking->pickup_date = $request->pickup_date;
        $booking->return_date = $request->return_date;
        $booking->total_price = $request->total_price;
        $booking->booking_status = $request->booking_status;
        $booking->save();



        return response()->json(['booking' => $booking, 'message' => 'Booking created successfully.'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $booking = Booking::with(['customer', 'car'])->findOrFail($id);
        return response()->json(['booking' => $booking]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $booking = Booking::findOrFail($id);
        // $original_status = $booking->booking_status;

        $validatedData = $request->validate([
            'customer_id' => 'sometimes|required|exists:users,id',
            'car_id' => 'sometimes|required|exists:cars,id',
            'pickup_date' => 'sometimes|required|date',
            'return_date' => 'sometimes|required|date|after_or_equal:pickup_date',
            'total_price' => 'sometimes|required|numeric',
            'booking_status' => 'sometimes|required|in:Awaiting Payment,confirmed,cancelled,completed,In Progress,pending',
        ]);

        // $booking->update($validatedData);
        
        $booking->customer_id = $request->customer_id;                                                                                 
        $booking->car_id = $request->car_id;                                                                                           
        $booking->pickup_date = $request->pickup_date;                                                                                 
        $booking->return_date = $request->return_date;                                                                                 
        $booking->total_price = $request->total_price;                                                                                 
        $booking->booking_status = $request->booking_status;                                                                           
        $booking->save();

        // If the booking status is changed to 'Confirmed' by an admin,
        // and it wasn't 'Confirmed' before, create a corresponding payment record.
        // This is useful for walk-in or phone bookings confirmed directly by an admin.
        // if ($booking->booking_status === 'confirmed' ) {
        //     Payment::updateOrCreate(
        //         ['booking_id' => $booking->id],
        //         [
        //             'customer_id' => $booking->customer_id,
        //             'amount' => $booking->total_price,
        //             'status' => 'Pending', // Admin still needs to go to Payments Review to mark it as 'Paid'
        //             'payment_method' => 'Walk-in / Direct', // Default for admin-confirmed bookings
        //             'payment_date' => now(),
        //         ]
        //     );
        // }

        return response()->json(['booking' => $booking, 'message' => 'Booking updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();

        return response()->json(['message' => 'Booking deleted successfully.']);
    }

    // --- Payment Management ---

    public function getPayments(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');
        $status = $request->input('status', '');

        $query = Payment::with(['customer', 'booking.car'])
            ->where(function ($q) use ($search) {
                $q->where('transaction_id', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($q) use ($search) {
                        $q->where('first_name', 'like', "%{$search}%")
                          ->orWhere('last_name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('booking', function ($q) use ($search) {
                        $q->where('id', 'like', "%{$search}%");
                    });
            });

        if ($status) {
            $query->where('status', $status);
        }

        $payments = $query->latest()->paginate($perPage);

        return response()->json(['payments' => $payments]);
    }

    public function approvePayment(Request $request, $paymentId)
    {
        $payment = Payment::findOrFail($paymentId);

        if ($payment->status !== 'Pending') {
            return response()->json(['message' => 'Only pending payments can be approved.'], 422);
        }

        $payment->status = 'Paid';
        $payment->approved_by = Auth::id();
        $payment->approved_at = now();
        $payment->save();

        // Update booking status as well
        $payment->booking->booking_status = 'Confirmed';
        $payment->booking->save();


        return response()->json(['payment' => $payment, 'message' => 'Payment approved successfully.']);
    }

    public function rejectPayment(Request $request, $paymentId)
    {
        $payment = Payment::findOrFail($paymentId);

        if ($payment->status !== 'Pending') {
            return response()->json(['message' => 'Only pending payments can be rejected.'], 422);
        }

        $payment->status = 'Failed';
        $payment->save();

        // Optionally, you can also update the booking status
        $payment->booking->booking_status = 'Cancelled';
        $payment->booking->save();

        return response()->json(['payment' => $payment, 'message' => 'Payment rejected successfully.']);
    }
}