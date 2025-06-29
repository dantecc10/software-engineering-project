<?php

namespace App\Http\Controllers;

use App\Models\Frequency;
use Illuminate\Http\Request;

class FrequencyController extends Controller
{
    public function index() {
        return response()->json(Frequency::all());
    }

    public function show($id) {
        return response()->json(Frequency::findOrFail($id));
    }

    public function store(Request $request) {
        $frequency = Frequency::create($request->only(['frequency_name']));
        return response()->json($frequency, 201);
    }

    public function update(Request $request, $id) {
        $frequency = Frequency::findOrFail($id);
        $frequency->update($request->only(['frequency_name']));
        return response()->json($frequency);
    }

    public function destroy($id) {
        $frequency = Frequency::findOrFail($id);
        $frequency->delete();
        return response()->json(['message' => 'Frecuencia eliminada']);
    }
}
