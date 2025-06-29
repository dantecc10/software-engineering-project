<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index() {
        return response()->json(Expense::all());
    }

    public function show($id) {
        return response()->json(Expense::findOrFail($id));
    }

    public function store(Request $request) {
        $expense = Expense::create($request->only([
            'user_id', 'category_id', 'description', 'date', 'amount', 'frequency_id', 'next_date'
        ]));
        return response()->json($expense, 201);
    }

    public function update(Request $request, $id) {
        $expense = Expense::findOrFail($id);
        $expense->update($request->only([
            'user_id', 'category_id', 'description', 'date', 'amount', 'frequency_id', 'next_date'
        ]));
        return response()->json($expense);
    }

    public function destroy($id) {
        $expense = Expense::findOrFail($id);
        $expense->delete();
        return response()->json(['message' => 'Gasto eliminado']);
    }
}
