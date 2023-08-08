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
        Schema::create('veedores', function (Blueprint $table) {
            $table->id();
            $table->string('nombres_completos');
            $table->string('dni')->unique();
            $table->string('telefono');
            $table->unsignedInteger('coordinador_id');
            $table->unsignedInteger('canton_id');
            $table->unsignedInteger('recinto_id'); /* Recinto donde cuida el voto */
            $table->boolean('confirmado')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('veedores');
    }
};
