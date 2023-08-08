<?php

namespace Database\Seeders;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::truncate();
        Role::truncate();

        $adminRole = Role::create(['name' => 'Administrador']);
        $digitadorRole = Role::create(['name' => 'Digitador']);

        $admin = New User;
        $admin->nombres_completos = "Cristhian Recalde";
        $admin->dni = '0802704171';
        $admin->password = Hash::make('azw123456');
        $admin->activo = 1;
        $admin->save();
        $admin->assignRole($adminRole);

        $admin = New User;
        $admin->nombres_completos = "Franklin Francis";
        $admin->dni = '0802580613';
        $admin->password = Hash::make('0802580613');
        $admin->activo = 1;
        $admin->save();
        $admin->assignRole($adminRole);

        $digitador = New User;
        $digitador->nombres_completos = "Silvana Jones";
        $digitador->dni = '0802826313';
        $digitador->password = Hash::make('0802826313');
        $digitador->activo = 1;
        $digitador->save();
        $digitador->assignRole($digitadorRole);

    }
}
