<?php

use Illuminate\Support\Facades\Route;

// Ruta principal, muestra la vista de bienvenida
Route::get('/', function () {
    return view('welcome');
});

// Ruta para la vista de inicio (index)
Route::get('/index', function () {
    return view('index');
});

// Ruta para la vista de login personalizada
<<<<<<< HEAD
Route::get('/login', function () {
=======
Route::get('/custom-login', function () {
    // Muestra la vista login.blade.php
>>>>>>> 6a500da09cfd77cc4569255ca95ea1de857e1fe3
    return view('login');
});