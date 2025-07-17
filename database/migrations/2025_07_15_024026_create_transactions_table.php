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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id(); // Primary key, ID ຫຼັກຂອງທຸລະກຳ (ເພີ່ມຂຶ້ນອັດຕະໂນມັດ)
            $table->foreignId('booking_id')->nullable()->constrained('bookings')->onDelete('set null'); // Foreign key ເຊື່ອມໄປຫາຕາຕະລາງ bookings (ສາມາດເປັນຄ່າວ່າງໄດ້), ຕັ້ງຄ່າເປັນ null ຖ້າການຈອງຖືກລຶບ
            $table->foreignId('recorded_by')->constrained('users')->onDelete('restrict'); // Foreign key ເຊື່ອມໄປຫາຕາຕະລາງ users, ປ້ອງກັນການລຶບຜູ້ໃຊ້ຖ້າມີທຸລະກຳທີ່ບັນທຶກໂດຍຜູ້ໃຊ້ນັ້ນ
            $table->enum('type', ['income', 'expense']); // ປະເພດຂອງທຸລະກຳ: ລາຍຮັບ ຫຼື ລາຍຈ່າຍ
            $table->decimal('amount', 10, 2); // ຈຳນວນເງິນຂອງທຸລະກຳ
            $table->text('description')->nullable(); // ລາຍລະອຽດຂອງທຸລະກຳ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->timestamp('transaction_date')->useCurrent(); // ວັນທີ ແລະ ເວລາຂອງທຸລະກຳ (ຄ່າເລີ່ມຕົ້ນແມ່ນເວລາປັດຈຸບັນ)
            $table->timestamps(); // ຖັນ created_at ແລະ updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
