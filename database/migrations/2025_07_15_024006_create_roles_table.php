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
        Schema::create('roles', function (Blueprint $table) {
            $table->id(); // Primary key, ID ຫຼັກຂອງບົດບາດ (ເພີ່ມຂຶ້ນອັດຕະໂນມັດ)
            $table->string('name', 50)->unique(); // ຊື່ຂອງບົດບາດ (ເຊັ່ນ: 'Admin', 'Staff', 'Customer'), ຕ້ອງບໍ່ຊ້ຳກັນ
            $table->json('permissions')->nullable(); // ເກັບ array ຂອງສິດຍ່ອຍທີ່ role ນັ້ນມີ (ຕົວຢ່າງ: ["booking-view", "booking-create"])
            $table->text('description')->nullable(); // ຄຳອະທິບາຍເພີ່ມເຕີມກ່ຽວກັບບົດບາດ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->enum('status', ['active', 'inactive'])->default('active'); // ສະຖານຂອງບົດບາດ
            $table->timestamps(); // ຖັນ created_at ແລະ updated_at ສຳລັບບັນທຶກເວລາສ້າງ ແລະ ອັບເດດ
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
