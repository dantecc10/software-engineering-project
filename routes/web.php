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
Route::get('/login', function () {
    return view('login');
});
// Ruta para la vista de 404 personalizada
Route::get('/404', function () {
    return view('404');
});