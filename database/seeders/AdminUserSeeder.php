<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Role; // Import Role Model
use App\Models\User; // Import User Model
use App\Models\Permission; // Import Permission Model

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. ສ້າງ Role 'Admin' ຖ້າຍັງບໍ່ມີ
        $adminRole = Role::firstOrCreate(
            ['name' => 'Admin'],
            ['description' => 'Administrator role with full access']
        );

        // ສ້າງ Role 'Staff' ຖ້າຍັງບໍ່ມີ
        $staffRole = Role::firstOrCreate(
            ['name' => 'Staff'],
            ['description' => 'Staff role with limited access']
        );

        // ສ້າງ Role 'Customer' ຖ້າຍັງບໍ່ມີ
        $customerRole = Role::firstOrCreate(
            ['name' => 'Customer'],
            ['description' => 'Customer role with limited access']
        );

        // 2. ສ້າງ User ທີ່ມີບົດບາດເປັນ Admin, staff, customer
        // ສ້າງ User ທີ່ມີບົດບາດເປັນ Admin
        User::firstOrCreate(
            ['email' => 'admin@mail.com'], // ກວດສອບດ້ວຍອີເມວເພື່ອບໍ່ໃຫ້ສ້າງຊ້ຳ
            [
                'role_id' => $adminRole->id,
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'gender' => 'Male',
                'password' => Hash::make('123456'), // ລະຫັດຜ່ານ: password
                'phone_number' => '02012345678',
                'profile_image_url' => null,
                'status' => 'active',
            ]
        );

        // ສ້າງ User ທີ່ມີບົດບາດເປັນ Staff
        User::firstOrCreate(
            ['email' => 'staff@mail.com'],
            [
                'role_id' => $staffRole->id,
                'first_name' => 'Staff',
                'last_name' => 'User',
                'gender' => 'Male',
                'password' => Hash::make('123456'),
                'phone_number' => '02087654321',
                'profile_image_url' => null,
                'status' => 'active',
            ]
        );

        // ສ້າງ User ທີ່ມີບົດບາດເປັນ Customer
        User::firstOrCreate(
            ['email' => 'customer@mail.com'],
            [
                'role_id' => $customerRole->id,
                'first_name' => 'Customer',
                'last_name' => 'User',
                'gender' => 'Male',
                'password' => Hash::make('123456'),
                'phone_number' => '02011223344',
                'profile_image_url' => null,
                'status' => 'active',
            ]
        );

        // 3. ສ້າງ Permissions
        $permissionGroups = [
            [
                'id' => 1,
                'name' => 'ລາຍການຈອງ',
                'key' => [
                    ['name' => 'ເບິ່ງ', 'key' => 'booking-view'],
                    ['name' => 'ສ້າງ', 'key' => 'booking-create'],
                    ['name' => 'ແກ້ໄຂ', 'key' => 'booking-edit'],
                    ['name' => 'ລົບ', 'key' => 'booking-delete']
                ]
            ],
            [
                'id' => 2,
                'name' => 'ການຊຳລະເງິນ',
                'key' => [
                    ['name' => 'ເບິ່ງ', 'key' => 'payment-view'],
                    ['name' => 'ແກ້ໄຂ', 'key' => 'payment-edit']
                ]
            ],
            [
                'id' => 3,
                'name' => 'ການຈັດການລົດ',
                'key' => [
                    ['name' => 'ເບິ່ງ', 'key' => 'car-view'],
                    ['name' => 'ສ້າງ', 'key' => 'car-create'],
                    ['name' => 'ແກ້ໄຂ', 'key' => 'car-edit'],
                    ['name' => 'ລົບ', 'key' => 'car-delete']
                ]
            ],
            [
                'id' => 4,
                'name' => 'ປະເພດລົດ',
                'key' => [
                    ['name' => 'ເບິ່ງ', 'key' => 'car-type-view'],
                    ['name' => 'ສ້າງ', 'key' => 'car-type-create'],
                    ['name' => 'ແກ້ໄຂ', 'key' => 'car-type-edit'],
                    ['name' => 'ລົບ', 'key' => 'car-type-delete']
                ]
            ],
            [
                'id' => 5,
                'name' => 'ການຈັດການລູກຄ້າ',
                'key' => [
                    ['name' => 'ເບິ່ງ', 'key' => 'customer-view'],
                    ['name' => 'ສ້າງ', 'key' => 'customer-create'],
                    ['name' => 'ແກ້ໄຂ', 'key' => 'customer-edit'],
                    ['name' => 'ລົບ', 'key' => 'customer-delete']
                ]
            ],
            [
                'id' => 6,
                'name' => 'ການຈັດການຜູ້ໃຊ້',
                'key' => [
                    ['name' => 'ເບິ່ງ', 'key' => 'user-view'],
                    ['name' => 'ສ້າງ', 'key' => 'user-create'],
                    ['name' => 'ແກ້ໄຂ', 'key' => 'user-edit'],
                    ['name' => 'ລົບ', 'key' => 'user-delete']
                ]
            ],
            [
                'id' => 7,
                'name' => 'ບົດບາດ ແລະ ສິດ',
                'key' => [
                    ['name' => 'ເບິ່ງ', 'key' => 'role-view'],
                    ['name' => 'ສ້າງ', 'key' => 'role-create'],
                    ['name' => 'ແກ້ໄຂ', 'key' => 'role-edit'],
                    ['name' => 'ລົບ', 'key' => 'role-delete']
                ]
            ],
            [
                'id' => 8,
                'name' => 'ການຈັດການການເງິນ',
                'key' => [
                    ['name' => 'ເບິ່ງ', 'key' => 'finance-view'],
                    ['name' => 'ສ້າງ', 'key' => 'finance-create'],
                    ['name' => 'ແກ້ໄຂ', 'key' => 'finance-edit'],
                    ['name' => 'ລົບ', 'key' => 'finance-delete']
                ]
            ],
            [
                'id' => 9,
                'name' => 'ລາຍງານ',
                'key' => [
                    ['name' => 'ເບິ່ງ', 'key' => 'report-view']
                ]
            ],
            [
                'id' => 10,
                'name' => 'ການຕັ້ງຄ່າລະບົບ',
                'key' => [
                    ['name' => 'ເບິ່ງ', 'key' => 'setting-view'],
                    ['name' => 'ແກ້ໄຂ', 'key' => 'setting-edit']
                ]
            ],
        ];

        foreach ($permissionGroups as $group) {
            Permission::firstOrCreate(
                ['name' => $group['name']],
                ['key' => $group['key']]
            );
        }

        // 4. ກຳນົດສິດທັງໝົດໃຫ້ກັບ Admin role
        $allPermissionKeys = [];
        foreach ($permissionGroups as $group) {
            $keys = array_map(function($perm) {
                return $perm['key'];
            }, $group['key']);
            $allPermissionKeys = array_merge($allPermissionKeys, $keys);
        }

        $adminRole->permissions = $allPermissionKeys;
        $adminRole->save();

        $this->command->info('Admin, Staff, and Customer users and permissions created successfully!');
    }
}
