<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    // Obtener todos los gastos
    public function index()
    {
        return response()->json(Expense::all());
    }

    // Obtener un gasto por ID
    public function show($id)
    {
        return response()->json(Expense::findOrFail($id));
    }

    // Crear un gasto nuevo
    public function store(Request $request)
    {
        $expense = Expense::create($request->only([
            'user_id', 'category_id', 'description', 'date', 'amount', 'frequency_id', 'next_date'
        ]));
        return response()->json($expense, 201);
    }

    // Actualizar un gasto
    public function update(Request $request, $id)
    {
        $expense = Expense::findOrFail($id);
        $expense->update($request->only([
            'user_id', 'category_id', 'description', 'date', 'amount', 'frequency_id', 'next_date'
        ]));
        return response()->json($expense);
    }

    // Eliminar un gasto
    public function destroy($id)
    {
        $expense = Expense::findOrFail($id);
        $expense->delete();
        return response()->json(['message' => 'Gasto eliminado']);
    }
}
