<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolePermissionTableSeeder::class);

        $user = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
        ]);

        $user->assignRole('super-admin');

        User::factory(20)->create();

        $this->call(MenuSeeder::class);
    }
}
