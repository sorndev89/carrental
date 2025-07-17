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
        Schema::create('cars', function (Blueprint $table) {
            $table->id(); // Primary key, ID ຫຼັກຂອງລົດ (ເພີ່ມຂຶ້ນອັດຕະໂນມັດ)
            $table->foreignId('car_type_id')->constrained('car_types')->onDelete('restrict'); // Foreign key ເຊື່ອມໄປຫາຕາຕະລາງ car_types, ປ້ອງກັນການລຶບປະເພດລົດຖ້າມີລົດທີ່ໃຊ້ປະເພດນັ້ນຢູ່
            $table->string('make', 100); // ຍີ່ຫໍ້ຂອງລົດ (ຕົວຢ່າງ: 'Toyota', 'Honda')
            $table->string('model', 100); // ລຸ້ນຂອງລົດ (ຕົວຢ່າງ: 'Vios', 'Civic')
            $table->string('license_plate', 50)->unique(); // ປ້າຍທະບຽນລົດ (ຕ້ອງບໍ່ຊ້ຳກັນ)
            $table->decimal('daily_rate', 10, 2); // ລາຄາເຊົ່າຕໍ່ມື້ (ຕົວຢ່າງ: 100000.00)
            $table->string('image_url')->nullable(); // URL ຮູບພາບຂອງລົດ (ສາມາດເປັນຄ່າວ່າງໄດ້)
            $table->enum('status', ['available', 'rented', 'maintenance'])->default('available'); // ສະຖານະຂອງລົດ: ວ່າງ, ຖືກເຊົ່າ, ຢູ່ໃນການບຳລຸງຮັກສາ
            $table->timestamps(); // ຖັນ created_at ແລະ updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
