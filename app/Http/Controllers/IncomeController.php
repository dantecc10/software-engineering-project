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
        $income = Income::create($request->only(['user_id', 'date', 'type', 'amount']));
        return response()->json($income, 201);
    }

    // Actualizar un ingreso
    public function update(Request $request, $id)
    {
        $income = Income::findOrFail($id);
        $income->update($request->only(['user_id', 'date', 'type', 'amount']));
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
