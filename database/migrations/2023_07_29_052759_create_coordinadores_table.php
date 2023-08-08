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
        Schema::create('coordinadores', function (Blueprint $table) {
            $table->id();
            $table->string('nombres_completos');
            $table->string('dni')->unique();
            $table->string('email')->nullable();
            $table->string('telefono');
            $table->unsignedInteger('supervisor_id');
            $table->unsignedInteger('canton_id');
            $table->unsignedInteger('parroquia_id');
            /* Tiene varios recintos */
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coordinadores');
    }
};
