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

// Rutas API para platform_users (usando UserController)
Route::get('/api/users', [UserController::class, 'index']);
Route::post('/api/users', [UserController::class, 'store']);
Route::get('/api/users/{id}', [UserController::class, 'show']);
Route::put('/api/users/{id}', [UserController::class, 'update']);
Route::delete('/api/users/{id}', [UserController::class, 'destroy']);

// Rutas API para categories
Route::get('/api/categories', [CategoryController::class, 'index']);
Route::post('/api/categories', [CategoryController::class, 'store']);
Route::get('/api/categories/{id}', [CategoryController::class, 'show']);
Route::put('/api/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/api/categories/{id}', [CategoryController::class, 'destroy']);

// Rutas API para frequencies
Route::get('/api/frequencies', [FrequencyController::class, 'index']);
Route::post('/api/frequencies', [FrequencyController::class, 'store']);
Route::get('/api/frequencies/{id}', [FrequencyController::class, 'show']);
Route::put('/api/frequencies/{id}', [FrequencyController::class, 'update']);
Route::delete('/api/frequencies/{id}', [FrequencyController::class, 'destroy']);

// Rutas API para incomes
Route::get('/api/incomes', [IncomeController::class, 'index']);
Route::post('/api/incomes', [IncomeController::class, 'store']);
Route::get('/api/incomes/{id}', [IncomeController::class, 'show']);
Route::put('/api/incomes/{id}', [IncomeController::class, 'update']);
Route::delete('/api/incomes/{id}', [IncomeController::class, 'destroy']);

// Rutas API para expenses
Route::get('/api/expenses', [ExpenseController::class, 'index']);
Route::post('/api/expenses', [ExpenseController::class, 'store']);
Route::get('/api/expenses/{id}', [ExpenseController::class, 'show']);
Route::put('/api/expenses/{id}', [ExpenseController::class, 'update']);
Route::delete('/api/expenses/{id}', [ExpenseController::class, 'destroy']);

// Rutas API para alerts
Route::get('/api/alerts', [AlertController::class, 'index']);
Route::post('/api/alerts', [AlertController::class, 'store']);
Route::get('/api/alerts/{id}', [AlertController::class, 'show']);
Route::put('/api/alerts/{id}', [AlertController::class, 'update']);
Route::delete('/api/alerts/{id}', [AlertController::class, 'destroy']);