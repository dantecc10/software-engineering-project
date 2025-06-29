<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Obtener todos los usuarios
    public function index() {
        return response()->json(User::all());
    }

    // Obtener un usuario por ID
    public function show($id) {
        return response()->json(User::findOrFail($id));
    }

    // Crear un usuario nuevo
    public function store(Request $request) {
        $user = User::create($request->only(['name', 'email', 'password_hash']));
        return response()->json($user, 201);
    }

    // Actualizar un usuario
    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->update($request->only(['name', 'email', 'password_hash']));
        return response()->json($user);
    }

    // Eliminar un usuario
    public function destroy($id) {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado']);
    }
}
