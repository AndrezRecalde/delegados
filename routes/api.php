<?php

use App\Http\Controllers\Application\CoordinadorController;
use App\Http\Controllers\Application\DashboardController;
use App\Http\Controllers\Application\EscaneadorController;
use App\Http\Controllers\Application\JrmovilController;
use App\Http\Controllers\Application\JuntaController;
use App\Http\Controllers\Application\PDFController;
use App\Http\Controllers\Application\ReconteoController;
use App\Http\Controllers\Application\RoleController;
use App\Http\Controllers\Application\StateController;
use App\Http\Controllers\Application\SupervisorController;
use App\Http\Controllers\Application\UserController;
use App\Http\Controllers\Application\VeedorController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/auth/login', [AuthController::class, 'login']);

Route::group(
    ['middleware' => ['auth:sanctum']],
    function () {
        Route::get('/refresh', [AuthController::class, 'refresh']);
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        /* Dashboard */
        Route::get('/totales/supervisores',  [DashboardController::class, 'getTotalSupervisores']);
        Route::get('/totales/coordinadores',  [DashboardController::class, 'getTotalCoordinadores']);
        Route::get('/totales/veedores',  [DashboardController::class, 'getTotalVeedores']);
        Route::get('/totales/veedores/confirmados',  [DashboardController::class, 'getTotalVeedoresConfirmed']);
        Route::get('/totales/jrv/moviles',  [DashboardController::class, 'getTotalJrvMoviles']);
        Route::get('/totales/jrv/reconteos',  [DashboardController::class, 'getTotalJrvReconteos']);


        Route::get('/totales/usuarios',  [DashboardController::class, 'getTotalUsuarios']);
        Route::get('/totales/escaneadores',  [DashboardController::class, 'getTotalEscaneadores']);
        Route::get('/totales/juntas',  [DashboardController::class, 'getTotalJuntas']);
        Route::get('/avance/cantones',  [DashboardController::class, 'getAvanceCantones']);
        Route::get('/avance/parroquias',  [DashboardController::class, 'getAvanceParroquial']);
        Route::post('/avance/parroquia',  [DashboardController::class, 'getAvanceParroquiaxCanton']);
        Route::post('/avance/recintos',  [DashboardController::class, 'getAvanceRecintos']);

        Route::post('/totales/veedores/cantones', [DashboardController::class, 'getTotalVeedoresForCantones']);
        Route::post('/totales/veedores/parroquias', [DashboardController::class, 'getTotalVeedoresForParroquias']);
        Route::post('/totales/veedores/recintos', [DashboardController::class, 'getTotalVeedoresForRecintos']);

        Route::post('/totales/juntas/cantones', [DashboardController::class, 'getTotalJuntasForCantones']);
        Route::post('/totales/juntas/parroquias', [DashboardController::class, 'getTotalJuntasForParroquias']);
        Route::post('/totales/juntas/recintos', [DashboardController::class, 'getTotalJuntasForRecintos']);



        /* Usuarios */
        Route::get('/usuarios/listar',  [UserController::class, 'getUsuarios']);
        Route::post('/usuario/create',  [UserController::class, 'store']);
        Route::put('/usuario/update/{id}', [UserController::class, 'update']);
        Route::put('/usuario/update/password/{id}', [UserController::class, 'updatePassword']);
        Route::put('/usuario/update/activo/{id}',   [UserController::class, 'updateActivo']);
        Route::delete('/usuario/delete/{id}', [UserController::class, 'destroy']);

        /* Roles */
        Route::get('/roles/listar', [RoleController::class, 'getRoles']);

        /* Juntas */
        Route::post('/juntas/recinto', [JuntaController::class, 'getJuntas']);

        /* States */
        Route::post('cantones', [StateController::class, 'getCantones']);
        Route::post('parroquias', [StateController::class, 'getParroquias']);
        Route::post('recintos', [StateController::class, 'getRecintos']);
        Route::post('/todos/recintos', [StateController::class, 'getAllRecintos']);


        /* Supervisores */
        Route::post('/supervisores/listar', [SupervisorController::class, 'getSupervisores']);
        Route::post('/supervisor/create',  [SupervisorController::class, 'store']);
        Route::put('/supervisor/update/{id}',   [SupervisorController::class, 'update']);
        Route::delete('/supervisor/delete/{id}', [SupervisorController::class, 'destroy']);
        Route::post('/supervisores/search',  [SupervisorController::class, 'searchSupervisores']);  /* TODO FINISH */
        Route::post('/supervisores/import', [SupervisorController::class, 'massiveStore']); /* TODO FINISH */
        Route::post('/supervisores/canton', [SupervisorController::class, 'getSupervisoresForCanton']);
        Route::post('/supervisor/dni',  [SupervisorController::class, 'getSupervisorForDNI']);


        /* Coordinadores */
        Route::get('/coordinadores/listar', [CoordinadorController::class, 'getCoordinadores']);
        Route::post('/coordinador/create',  [CoordinadorController::class, 'store']);
        Route::put('/coordinador/update/{id}',   [CoordinadorController::class, 'update']);
        Route::delete('/coordinador/delete/{id}', [CoordinadorController::class, 'destroy']);
        Route::post('/coordinadores/search', [CoordinadorController::class, 'searchCoordinadores']); /* TODO FINISH */
        Route::post('/coordinadores/import', [CoordinadorController::class, 'massiveStore']); /* TODO FINISH */
        Route::post('/coordinadores/canton', [CoordinadorController::class, 'getCoordinadoresForCanton']);
        Route::post('/coordinadores/export/excel', [CoordinadorController::class, 'exportExcelCoordinadores']);
        Route::post('/coordinador/dni',  [CoordinadorController::class, 'getCoordinadorForDNI']);


        /* Veedores */
        Route::post('/veedores/listar', [VeedorController::class, 'getVeedores']);
        Route::post('/veedor/create',  [VeedorController::class, 'store']);
        Route::put('/veedor/update/{id}',   [VeedorController::class, 'update']);
        Route::delete('/veedor/delete/{id}', [VeedorController::class, 'destroy']);
        Route::post('/veedores/search', [VeedorController::class, 'searchVeedores']);
        Route::put('/veedor/update/confirmado/{id}', [VeedorController::class, 'updateConfirmado']);
        Route::post('/veedores/import', [VeedorController::class, 'massiveStore']);
        Route::post('/veedores/export/excel', [VeedorController::class, 'exportExcelVeedores']);



        /* Escaneadores */
        Route::get('/escaneadores/listar', [EscaneadorController::class, 'getEscaneadores']);
        Route::post('/escaneador/create',  [EscaneadorController::class, 'store']);
        Route::put('/escaneador/update/{id}',   [EscaneadorController::class, 'update']);
        Route::delete('/escaneador/delete/{id}', [EscaneadorController::class, 'destroy']);
        Route::post('/escaneadores/search', [EscaneadorController::class, 'searchEscaneadores']);
        Route::post('/escaneadores/import', [EscaneadorController::class, 'massiveStore']);
        Route::post('/escaneadores/export/excel', [EscaneadorController::class, 'exportExcelCoordinadores']);

        /* JrvMoviles */
        Route::get('/jrvmoviles/listar', [JrmovilController::class, 'getJrvmoviles']);
        Route::post('/jrvmovil/create',  [JrmovilController::class, 'store']);
        Route::put('/jrvmovil/update/{id}',   [JrmovilController::class, 'update']);
        Route::delete('/jrvmovil/delete/{id}', [JrmovilController::class, 'destroy']);
        Route::post('/jrvmoviles/import', [JrmovilController::class, 'massiveStore']);
        Route::get('/jrvmoviles/export/excel', [JrmovilController::class, 'exportExcelJrvmoviles']);

        /* Jrv Reconteo */
        Route::get('/reconteos/listar', [ReconteoController::class, 'getJrvReconteos']);
        Route::post('/reconteo/create',  [ReconteoController::class, 'store']);
        Route::put('/reconteo/update/{id}',   [ReconteoController::class, 'update']);
        Route::delete('/reconteo/delete/{id}', [ReconteoController::class, 'destroy']);
        Route::post('/reconteos/import', [ReconteoController::class, 'massiveStore']);
        Route::get('/reconteos/export/excel', [ReconteoController::class, 'exportExcelReconteos']);

        /* Exportacion de PDF */
        Route::post('/exportar/pdf/cards/veedores', [PDFController::class, 'generateCardsVeedoresPDF']);
        Route::post('/exportar/pdf/table/veedores', [PDFController::class, 'generateTableVeedoresPDF']);
        Route::post('/exportar/pdf/cards/coordinadores', [PDFController::class, 'getCardsCoordinadoresPDF']);
        Route::post('/exportar/pdf/table/coordinadores', [PDFController::class, 'getTableCoordinadoresPDF']);
        Route::post('/exportar/pdf/cards/supervisores', [PDFController::class, 'getCardsSupervisoresPDF']);
        Route::post('/exportar/pdf/table/supervisores', [PDFController::class, 'getTableSupervisoresPDF']);
        Route::post('/exportar/pdf/cards/escaneadores', [PDFController::class, 'getCardsEscaneadoresPDF']);
        Route::post('/exportar/pdf/table/escaneadores', [PDFController::class, 'getTableEscaneadoresPDF']);
        Route::post('/exportar/pdf/cards/jrvmoviles', [PDFController::class, 'getCardsJrvmovilesPDF']);
        Route::post('/exportar/pdf/cards/reconteos', [PDFController::class, 'getCardsJrvReconteosPDF']);


    }
);
