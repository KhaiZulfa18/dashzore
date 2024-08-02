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
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->integer('level')->default(1)->comment('0 = menu section, 1 = menu, 2 = submenu');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('title');
            $table->string('icon')->nullable();
            $table->string('url')->nullable();
            $table->integer('status')->default(0)->comment('0 = deletable, 1 = fixed');
            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->foreignId('deleted_by')->nullable()->constrained('users');
            $table->timestamps();

            $table->foreign('parent_id')->references('id')->on('menus')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
