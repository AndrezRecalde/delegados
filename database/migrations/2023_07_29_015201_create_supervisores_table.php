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
        Schema::create('supervisores', function (Blueprint $table) {
            $table->id();
            $table->string('nombres_completos');
            $table->string('dni')->unique();
            $table->string('email')->nullable();
            $table->string('telefono');
            $table->unsignedInteger('canton_id');
            /* Tiene varias parroquias */
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supervisores');
    }
};
