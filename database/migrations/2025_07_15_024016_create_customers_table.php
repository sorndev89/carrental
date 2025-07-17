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
        Schema::create('customers', function (Blueprint $table) {
            $table->id(); // Primary key, ID ຫຼັກຂອງລູກຄ້າ (ເພີ່ມຂຶ້ນອັດຕະໂນມັດ)
            $table->string('first_name'); // ຊື່ຕົ້ນຂອງລູກຄ້າ
            $table->string('last_name'); // ນາມສະກຸນຂອງລູກຄ້າ
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable(); // ເພດຂອງລູກຄ້າ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            // $table->date('date_of_birth')->nullable(); // ວັນເດືອນປີເກີດຂອງລູກຄ້າ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->string('phone_number', 20)->unique(); // ເບີໂທລະສັບຂອງລູກຄ້າ (ໃຊ້ສຳລັບ Login, ຕ້ອງບໍ່ຊ້ຳກັນ)
            $table->string('email')->unique()->nullable(); // ອີເມວຂອງລູກຄ້າ (ສາມາດເປັນຄ່າວ່າງໄດ້, ຕ້ອງບໍ່ຊ້ຳກັນ)
            $table->string('address')->nullable(); // ທີ່ຢູ່ຂອງລູກຄ້າ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->string('id_card_number', 50)->unique()->nullable(); // ເລກບັດປະຈຳຕົວ (ສາມາດເປັນຄ່າວ່າງໄດ້, ຕ້ອງບໍ່ຊ້ຳກັນ)
            $table->string('driver_license_number', 50)->unique()->nullable(); // ເລກໃບຂັບຂີ່ (ສາມາດເປັນຄ່າວ່າງໄດ້, ຕ້ອງບໍ່ຊ້ຳກັນ)
            $table->date('license_expiry_date')->nullable(); // ວັນໝົດອາຍຸຂອງໃບຂັບຂີ່ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->string('profile_image_url')->nullable(); // URL ຮູບໂປຣໄຟລ໌ຂອງລູກຄ້າ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->timestamps(); // ຖັນ created_at ແລະ updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
