<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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

// Rutas API para User
Route::get('/api/users', [UserController::class, 'index']);
Route::post('/api/users', [UserController::class, 'store']);
Route::get('/api/users/{id}', [UserController::class, 'show']);
Route::put('/api/users/{id}', [UserController::class, 'update']);
Route::delete('/api/users/{id}', [UserController::class, 'destroy']);