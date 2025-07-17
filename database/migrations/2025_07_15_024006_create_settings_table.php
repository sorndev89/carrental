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
        Schema::create('settings', function (Blueprint $table) {
            $table->id(); // Primary key, ID ຫຼັກຂອງການຕັ້ງຄ່າ (ເພີ່ມຂຶ້ນອັດຕະໂນມັດ)
            $table->string('key')->unique(); // ຊື່ຂອງການຕັ້ງຄ່າ (ຕົວຢ່າງ: 'system_name', 'logo_url'), ຕ້ອງບໍ່ຊ້ຳກັນ
            $table->text('value')->nullable(); // ຄ່າຂອງການຕັ້ງຄ່ານັ້ນໆ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->timestamps(); // ຖັນ created_at ແລະ updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
