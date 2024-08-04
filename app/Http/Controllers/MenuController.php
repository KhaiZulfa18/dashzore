<?php

namespace App\Http\Controllers;

use App\Http\Resources\MenuResource;
use App\Http\Resources\PermissionResource;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Menu::query();

        $sortFields = request('sort_field', 'level');
        $sortDirection = request('sort_direction', 'asc');

        if(request('search')) {
            $query->where('title','like','%'.request('search').'%')
                    ->orWhere('url','like','%'.request('search').'%');
        }

        $menus = $query->with('permissions')
                    ->orderBy($sortFields, $sortDirection)
                    ->paginate(10)
                    ->withQueryString()
                    ->onEachSide(1);

        return Inertia::render('Menu/Index',[
            'menus' => MenuResource::collection($menus),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $menus = Menu::whereLevel(0)->orWhere(function($query) {
                        $query->whereLevel(1)->whereNull('url');
                    })->get();

        $permissions = Permission::whereLike('name', '%view%')->get();

        return Inertia::render('Menu/Create',[
            'menus' => MenuResource::collection($menus),
            'permissions' => PermissionResource::collection($permissions),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
