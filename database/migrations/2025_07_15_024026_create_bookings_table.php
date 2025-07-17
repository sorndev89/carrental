<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id(); // Primary key, ID ຫຼັກຂອງການຈອງ (ເພີ່ມຂຶ້ນອັດຕະໂນມັດ)
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade'); // Foreign key ເຊື່ອມໄປຫາຕາຕະລາງ customers, ລຶບການຈອງຖ້າລູກຄ້າຖືກລຶບ
            $table->foreignId('car_id')->constrained('cars')->onDelete('restrict'); // Foreign key ເຊື່ອມໄປຫາຕາຕະລາງ cars, ປ້ອງກັນການລຶບລົດຖ້າມີການຈອງທີ່ກ່ຽວຂ້ອງ
            $table->date('pickup_date'); // ວັນທີຮັບລົດ
            $table->date('return_date'); // ວັນທີສົ່ງລົດຄືນ
            $table->decimal('total_price', 10, 2); // ລາຄາລວມທັງໝົດຂອງການຈອງ
            $table->enum('booking_status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending'); // ສະຖານະການຈອງ: ລໍຖ້າ, ຢືນຢັນແລ້ວ, ຍົກເລີກ, ສຳເລັດ
            $table->timestamps(); // ຖັນ created_at ແລະ updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
