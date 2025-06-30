<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Obtener todas las categorías
    public function index()
    {
        return response()->json(Category::all());
    }

    // Obtener una categoría por ID
    public function show($id)
    {
        return response()->json(Category::findOrFail($id));
    }

    // Crear una categoría nueva
    public function store(Request $request)
    {
        $category = Category::create($request->only(['category_name']));
        return response()->json($category, 201);
    }

    // Actualizar una categoría
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->only(['category_name']));
        return response()->json($category);
    }

    // Eliminar una categoría
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Categoría eliminada']);
    }
}
