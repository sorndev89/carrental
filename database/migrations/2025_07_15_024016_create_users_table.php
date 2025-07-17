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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Primary key, ID ຫຼັກຂອງພະນັກງານ (ເພີ່ມຂຶ້ນອັດຕະໂນມັດ)
            $table->foreignId('role_id')->constrained('roles')->onDelete('restrict'); // Foreign key ເຊື່ອມໄປຫາຕາຕະລາງ roles, ປ້ອງກັນການລຶບບົດບາດຖ້າມີພະນັກງານທີ່ກ່ຽວຂ້ອງ
            $table->string('first_name'); // ຊື່ຕົ້ນຂອງພະນັກງານ
            $table->string('last_name'); // ນາມສະກຸນຂອງພະນັກງານ
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable(); // ເພດຂອງ ພະນັກງານ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->string('email')->unique(); // ອີເມວຂອງພະນັກງານ (ໃຊ້ສຳລັບ Login, ຕ້ອງບໍ່ຊ້ຳກັນ)
            $table->timestamp('email_verified_at')->nullable(); // Add this line
            $table->string('password'); // ລະຫັດຜ່ານທີ່ຖືກ Hash ແລ້ວ
            $table->string('phone_number', 20)->nullable(); // ເບີໂທຕິດຕໍ່ຂອງພະນັກງານ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->string('profile_image_url')->nullable(); // URL ຮູບໂປຣໄຟລ໌ຂອງພະນັກງານ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->string('status')->default('active')->nullable(); // ສະຖານຂອງພະນັກງານ
            $table->rememberToken(); // Add this line
            $table->timestamps(); // ຖັນ created_at ແລະ updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
