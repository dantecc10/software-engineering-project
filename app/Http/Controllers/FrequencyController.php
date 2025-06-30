<?php

namespace App\Http\Controllers;

use App\Models\Frequency;
use Illuminate\Http\Request;

class FrequencyController extends Controller
{
    // Obtener todas las frecuencias
    public function index()
    {
        return response()->json(Frequency::all());
    }

    // Obtener una frecuencia por ID
    public function show($id)
    {
        return response()->json(Frequency::findOrFail($id));
    }

    // Crear una frecuencia nueva
    public function store(Request $request)
    {
        $frequency = Frequency::create($request->only(['frequency_name']));
        return response()->json($frequency, 201);
    }

    // Actualizar una frecuencia
    public function update(Request $request, $id)
    {
        $frequency = Frequency::findOrFail($id);
        $frequency->update($request->only(['frequency_name']));
        return response()->json($frequency);
    }

    // Eliminar una frecuencia
    public function destroy($id)
    {
        $frequency = Frequency::findOrFail($id);
        $frequency->delete();
        return response()->json(['message' => 'Frecuencia eliminada']);
    }
}
