<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'car_id' => 'required|exists:cars,id',
            'pickup_date' => 'required|date|after_or_equal:today',
            'return_date' => 'required|date|after_or_equal:pickup_date',
            'total_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Check for overlapping bookings
        $isCarUnavailable = Booking::where('car_id', $request->car_id)
            ->whereIn('booking_status', ['Confirmed', 'Awaiting Payment'])
            ->where(function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('pickup_date', '<=', $request->return_date)
                      ->where('return_date', '>=', $request->pickup_date);
                });
            })->exists();

        if ($isCarUnavailable) {
            return response()->json(['message' => 'ຂໍອະໄພ, ລົດຄັນນີ້ບໍ່ວ່າງໃນຊ່ວງເວລາທີ່ທ່ານເລືອກ.'], 409);
        }

        $booking = null;

        DB::transaction(function () use ($request, &$booking) {
            // 1. Create Booking
            $booking = Booking::create([
                'customer_id' => Auth::id(),
                'car_id' => $request->car_id,
                'pickup_date' => $request->pickup_date,
                'return_date' => $request->return_date,
                'total_price' => $request->total_price,
                'booking_status' => 'Awaiting Payment', // New status
            ]);

            // 2. Create associated Payment
            Payment::create([
                'booking_id' => $booking->id,
                'customer_id' => Auth::id(),
                'amount' => $request->total_price,
                'status' => 'Pending', // Default status
                'payment_method' => 'Not specified', // Default value
                'payment_date' => now(), // Placeholder, will be updated on upload
            ]);
        });

        return response()->json([
            'message' => 'ການຈອງຂອງທ່ານຖືກສ້າງຂຶ້ນສຳເລັດແລ້ວ. ກະລຸນາຊຳລະເງິນເພື່ອຢືນຢັນ.',
            'booking' => $booking
        ], 201);
    }

    public function uploadSlip(Request $request, $bookingId)
    {
        $validator = Validator::make($request->all(), [
            'slip_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // 2MB Max
            'payment_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $booking = Booking::where('id', $bookingId)
                        ->where('customer_id', Auth::id())
                        ->firstOrFail();

        $payment = $booking->payment;

        if (!$payment || $payment->status !== 'Pending') {
            return response()->json(['message' => 'ບໍ່ສາມາດອັບໂຫຼດຫຼັກຖານສຳລັບການຈອງນີ້ໄດ້.'], 403);
        }

        $image_path = 'slips/'; // Define the path for slips
        $image_upload = null;

        if ($request->file('slip_image')) {
            // Remove old image if it exists
            if ($payment->slip_image_url && file_exists(public_path($payment->slip_image_url))) {
                unlink(public_path($payment->slip_image_url));
            }

            // Upload new image
            $image = $request->file('slip_image');
            $image_upload = $image_path . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path($image_path), $image_upload);
        }

        // Update payment record
        $payment->update([
            'slip_image_url' => $image_upload,
            'payment_date' => $request->payment_date,
            'payment_method' => 'Bank Transfer', // Or get from request
        ]);

        return response()->json([
            'message' => 'ອັບໂຫຼດຫຼັກຖານສຳເລັດແລ້ວ. ກະລຸນາລໍຖ້າການກວດສອບ.',
            'payment' => $payment
        ]);
    }
}