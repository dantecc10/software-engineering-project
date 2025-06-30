<!DOCTYPE html>
<html data-bs-theme="light" lang="es-mx">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Modificar Perfil - Cash Flow</title>
    <link rel="stylesheet" href="{{ asset('assets/bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/bss-overrides.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/cashflow.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <nav class="navbar navbar-expand-md fixed-top py-3 navbar-shrink" id="mainNav">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="{{ asset('/') }}"><span>Cash Flow</span></a>
            <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
                <span class="visually-hidden">Toggle navigation</span>
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item"><a class="nav-link" href="{{ asset('/index') }}">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ asset('calendar') }}">Calendario</a></li>
                </ul>
                @php
                    $user = null;
                    if(session('user_id')) {
                        $user = \App\Models\PlatformUsers::find(session('user_id'));
                    }
                @endphp
                @if($user)
                    <div class="dropdown">
                        <button class="btn btn-primary shadow dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ $user->name }}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="{{ url('/profile') }}">Modificar perfil</a></li>
                            <li>
                                <form method="POST" action="{{ url('/logout') }}">
                                    @csrf
                                    <button class="dropdown-item" type="submit">Salir</button>
                                </form>
                            </li>
                        </ul>
                    </div>
                @else
                    <a class="btn btn-primary shadow" role="button" href="{{ asset('login') }}">Iniciar sesión</a>
                @endif
            </div>
        </div>
    </nav>
    <div class="container py-5" style="margin-top: 80px;">
        <h2 class="mb-4">Modificar Perfil</h2>
        @php
            $user = \App\Models\PlatformUsers::find(session('user_id'));
        @endphp
        @if($user)
        <form method="POST" action="{{ url('/profile') }}">
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="name" name="name" value="{{ $user->name }}" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input type="email" class="form-control" id="email" name="email" value="{{ $user->email }}" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Nueva contraseña (opcional)</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Dejar en blanco para no cambiar">
            </div>
            <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </form>
        @else
            <div class="alert alert-danger">No se encontró el usuario.</div>
        @endif
    </div>
    <script src="{{ asset('https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js') }}"></script>
</body>
</html>
