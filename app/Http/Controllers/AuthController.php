<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PlatformUsers;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar campos
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Buscar usuario por email
        $user = PlatformUsers::where('email', $credentials['email'])->first();
        if ($user && $user->password_hash === $credentials['password']) {
            // Aquí puedes guardar el usuario en sesión si lo deseas
            session(['user_id' => $user->user_id]);
            return redirect('/index');
        }

        return back()->withErrors(['email' => 'Credenciales incorrectas']);
    }
}
