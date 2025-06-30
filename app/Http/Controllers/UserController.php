<?php

namespace App\Http\Controllers;

use App\Models\PlatformUsers;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Obtener todos los usuarios
    public function index()
    {
        return response()->json(PlatformUsers::all());
    }

    // Obtener un usuario por ID
    public function show($id)
    {
        return response()->json(PlatformUsers::findOrFail($id));
    }

    // Crear un usuario nuevo
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:platform_users,email',
            'password_hash' => 'required|string|min:3'
        ]);
        $user = PlatformUsers::create($validated);
        return response()->json($user, 201);
    }

    // Actualizar un usuario
    public function update(Request $request, $id)
    {
        $user = PlatformUsers::findOrFail($id);
        $user->update($request->only(['name', 'email', 'password_hash']));
        return response()->json($user);
    }

    // Eliminar un usuario
    public function destroy($id)
    {
        $user = PlatformUsers::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado']);
    }

    // Actualizar perfil del usuario autenticado
    public function updateProfile(Request $request)
    {
        $user = \App\Models\PlatformUsers::find(session('user_id'));
        if (!$user) {
            return redirect('/profile')->withErrors(['msg' => 'Usuario no encontrado']);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'nullable|string|min:3'
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        if (!empty($validated['password'])) {
            $user->password_hash = $validated['password'];
        }
        $user->save();

        return redirect('/profile')->with('success', 'Perfil actualizado correctamente');
    }
}
