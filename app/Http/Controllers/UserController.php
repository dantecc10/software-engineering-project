<?php

namespace App\Http\Controllers;

use App\Models\platform_users; // Asegúrate de que este modelo exista y esté correctamente definido
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Obtener todos los usuarios
    public function index()
    {
        return response()->json(platform_users::all());
    }

    // Obtener un usuario por ID
    public function show($id)
    {
        return response()->json(platform_users::findOrFail($id));
    }

    // Crear un usuario nuevo
    public function store(Request $request)
    {
        $user = platform_users::create($request->only(['name', 'email', 'password_hash']));
        return response()->json($user, 201);
    }

    // Actualizar un usuario
    public function update(Request $request, $id)
    {
        $user = platform_users::findOrFail($id);
        $user->update($request->only(['name', 'email', 'password_hash']));
        return response()->json($user);
    }

    // Eliminar un usuario
    public function destroy($id)
    {
        $user = platform_users::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado']);
    }
}
