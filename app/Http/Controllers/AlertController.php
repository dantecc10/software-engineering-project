<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    // Obtener todas las alertas
    public function index()
    {
        return response()->json(Alert::all());
    }

    // Obtener una alerta por ID
    public function show($id)
    {
        return response()->json(Alert::findOrFail($id));
    }

    // Crear una alerta nueva
    public function store(Request $request)
    {
        $alert = Alert::create($request->only(['user_id', 'message', 'scheduled_date', 'active']));
        return response()->json($alert, 201);
    }

    // Actualizar una alerta
    public function update(Request $request, $id)
    {
        $alert = Alert::findOrFail($id);
        $alert->update($request->only(['user_id', 'message', 'scheduled_date', 'active']));
        return response()->json($alert);
    }

    // Eliminar una alerta
    public function destroy($id)
    {
        $alert = Alert::findOrFail($id);
        $alert->delete();
        return response()->json(['message' => 'Alerta eliminada']);
    }
}
