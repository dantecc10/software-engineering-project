<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Illuminate\Http\Request;

class IncomeController extends Controller
{
    // Obtener todos los ingresos
    public function index()
    {
        return response()->json(Income::all());
    }

    // Obtener un ingreso por ID
    public function show($id)
    {
        return response()->json(Income::findOrFail($id));
    }

    // Crear un ingreso nuevo
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:platform_users,user_id',
            'date' => 'required|date',
            'type' => 'nullable|string|max:50',
            'amount' => 'required|numeric'
        ]);
        $income = Income::create($validated);
        return response()->json($income, 201);
    }

    // Actualizar un ingreso
    public function update(Request $request, $id)
    {
        $income = Income::findOrFail($id);
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:platform_users,user_id',
            'date' => 'required|date',
            'type' => 'nullable|string|max:50',
            'amount' => 'required|numeric'
        ]);
        $income->update($validated);
        return response()->json($income);
    }

    // Eliminar un ingreso
    public function destroy($id)
    {
        $income = Income::findOrFail($id);
        $income->delete();
        return response()->json(['message' => 'Ingreso eliminado']);
    }
}
