<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FrequencyController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\AlertController;
use App\Http\Controllers\AuthController;

// Ruta principal, muestra la vista de bienvenida
Route::get('/', function () {
    return view('index');
});

// Ruta para el index de la aplicación
Route::get('/index', function () {
    return view('index');
});

// Ruta para la vista de login personalizada
Route::get('/login', function () {
    return view('login');
});

// Ruta para procesar el login (POST)
Route::post('/login', [AuthController::class, 'login']);

// Ruta para la vista de 404 personalizada
Route::get('/404', function () {
    return view('404');
});

// Ruta para la vista de preguntas frecuentes
Route::get('/faq', function () {
    return view('faq');
});

// Ruta para la vista de signup
Route::get('/signup', function () {
    return view('signup');
});

// Ruta para la vista de calendario
Route::get('/calendar', function () {
    return view('calendar');
});

// Ruta para el testimonials
Route::get('/testimonials', function () {
    return view('testimonials');
});

// Ruta para cerrar sesión
Route::post('/logout', [AuthController::class, 'logout']);

// Ruta para la vista de perfil de usuario
Route::get('/profile', function () {
    return view('profile');
})->middleware('web');
Route::post('/profile', [App\Http\Controllers\UserController::class, 'updateProfile'])->middleware('web');