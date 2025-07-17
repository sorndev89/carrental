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
        Schema::create('permissions', function (Blueprint $table) {
            $table->id(); // Primary key, ID ຫຼັກຂອງສິດ (ເພີ່ມຂຶ້ນອັດຕະໂນມັດ)
            $table->string('name', 50); // ຊື່ຂອງກຸ່ມສິດ ຕ້ອງບໍ່ຊ້ຳກັນ
            $table->json('key')->nullable(); //ເກັບ array ຂອງສິດຍ່ອຍທີ່ role ນັ້ນມີ (ຕົວຢ່າງ: ["booking-view", "booking-create"])
            $table->timestamps(); // ຖັນ created_at ແລະ updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
