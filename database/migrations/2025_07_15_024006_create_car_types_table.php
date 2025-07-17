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
        Schema::create('car_types', function (Blueprint $table) {
            $table->id(); // Primary key, ID ຫຼັກຂອງປະເພດລົດ (ເພີ່ມຂຶ້ນອັດຕະໂນມັດ)
            $table->string('name', 100); // ຊື່ຂອງປະເພດລົດ (ຕົວຢ່າງ: 'ລົດເກ໋ງ', 'ລົດກະບະ', 'ລົດຕູ້')
            $table->text('description')->nullable(); // ຄຳອະທິບາຍເພີ່ມເຕີມກ່ຽວກັບປະເພດລົດ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->timestamps(); // ຖັນ created_at ແລະ updated_at ສຳລັບບັນທຶກເວລາສ້າງ ແລະ ອັບເດດ
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_types');
    }
};
