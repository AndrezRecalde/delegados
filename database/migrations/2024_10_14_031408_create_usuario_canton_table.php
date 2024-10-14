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
        Schema::create('usuario_canton', function (Blueprint $table) {
            //$table->id();
            $table->unsignedInteger('usuario_id');
            $table->unsignedInteger('canton_id');
            $table->primary(['usuario_id', 'canton_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuario_canton');
    }
};
