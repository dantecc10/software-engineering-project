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

// Rutas API para platform_users
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Rutas API para categories
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

// Rutas API para frequencies
Route::get('/frequencies', [FrequencyController::class, 'index']);
Route::post('/frequencies', [FrequencyController::class, 'store']);
Route::get('/frequencies/{id}', [FrequencyController::class, 'show']);
Route::put('/frequencies/{id}', [FrequencyController::class, 'update']);
Route::delete('/frequencies/{id}', [FrequencyController::class, 'destroy']);

// Rutas API para incomes
Route::get('/incomes', [IncomeController::class, 'index']);
Route::post('/incomes', [IncomeController::class, 'store']);
Route::get('/incomes/{id}', [IncomeController::class, 'show']);
Route::put('/incomes/{id}', [IncomeController::class, 'update']);
Route::delete('/incomes/{id}', [IncomeController::class, 'destroy']);

// Rutas API para expenses
Route::get('/expenses', [ExpenseController::class, 'index']);
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::get('/expenses/{id}', [ExpenseController::class, 'show']);
Route::put('/expenses/{id}', [ExpenseController::class, 'update']);
Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);

// Rutas API para alerts
Route::get('/alerts', [AlertController::class, 'index']);
Route::post('/alerts', [AlertController::class, 'store']);
Route::get('/alerts/{id}', [AlertController::class, 'show']);
Route::put('/alerts/{id}', [AlertController::class, 'update']);
Route::delete('/alerts/{id}', [AlertController::class, 'destroy']);