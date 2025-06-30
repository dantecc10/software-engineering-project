@extends('layouts.app') {{-- Si tienes un layout, si no, elimina esta línea y usa HTML completo --}}
@section('content')
<div class="container py-5">
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
@endsection
