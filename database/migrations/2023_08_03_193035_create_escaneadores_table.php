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
        Schema::create('escaneadores', function (Blueprint $table) {
            $table->id();
            $table->string('nombres_completos');
            $table->string('dni')->unique();
            $table->string('telefono');
            $table->unsignedInteger('canton_id');
            $table->unsignedInteger('parroquia_id');
            $table->unsignedInteger('recinto_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('escaneadores');
    }
};
