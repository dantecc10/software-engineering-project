<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        return response()->json(Category::all());
    }

    public function show($id) {
        return response()->json(Category::findOrFail($id));
    }

    public function store(Request $request) {
        $category = Category::create($request->only(['category_name']));
        return response()->json($category, 201);
    }

    public function update(Request $request, $id) {
        $category = Category::findOrFail($id);
        $category->update($request->only(['category_name']));
        return response()->json($category);
    }

    public function destroy($id) {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Categoría eliminada']);
    }
}
