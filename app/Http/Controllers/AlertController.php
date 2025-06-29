<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    public function index() {
        return response()->json(Alert::all());
    }

    public function show($id) {
        return response()->json(Alert::findOrFail($id));
    }

    public function store(Request $request) {
        $alert = Alert::create($request->only(['user_id', 'message', 'scheduled_date', 'active']));
        return response()->json($alert, 201);
    }

    public function update(Request $request, $id) {
        $alert = Alert::findOrFail($id);
        $alert->update($request->only(['user_id', 'message', 'scheduled_date', 'active']));
        return response()->json($alert);
    }

    public function destroy($id) {
        $alert = Alert::findOrFail($id);
        $alert->delete();
        return response()->json(['message' => 'Alerta eliminada']);
    }
}
