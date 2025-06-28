<?php

use Illuminate\Support\Facades\Route;

// Ruta principal, muestra la vista de bienvenida
Route::get('/', function () {
    return view('welcome');
});

// Ruta para la vista de inicio (index)
Route::get('/index', function () {
    // Muestra la vista index.blade.php
    return view('index');
});

// Ruta para la vista de login
Route::get('/login', function () {
    // Muestra la vista login.blade.php
    return view('login');
});
