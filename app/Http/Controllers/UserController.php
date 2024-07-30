<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')) {
            $query->where('name','like','%'.request('name').'%')
                    ->orWhere('email','like','%'.request('name').'%');
        }

        $users = $query->with('roles')
                    ->orderBy($sortFields, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);

        return Inertia::render('User/Index', [
            'users' => UserResource::collection($users),
            // 'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // $user->assignRole($request->selectedRoles);

        return back();
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
    public function update(UserRequest $request, User $user)
    {
        //
        if($request->password)

            $user->update([
                'password' => bcrypt($request->password),
            ]);

        $user->update([
            'name' => $request->name,
        ]);

        // $user->syncRoles($request->selectedRoles);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
