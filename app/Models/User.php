<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     *  get all permissions users
     */
    public function getPermissions()
    {
        return $this->getAllPermissions()->mapWithKeys(function($permission){
            return [
                $permission['name'] => true
            ];
        });
    }

    /**
     * check role isSuperAdmin
     */
    public function isSuperAdmin()
    {
        return $this->hasRole('super-admin');
    }

    /**
     * Retrieves the menu for the current user.
     *
     * This function retrieves the menu for the current user by first obtaining
     * the permissions of the user. It then calls the `getMenuRecursive`
     * function with the obtained permissions.
     *
     * @return array The menu items for the current user.
     */
    public function getMenu()
    {
        $userPermissions = $this->getAllPermissions()->pluck('name')->toArray();

        return $this->getMenuRecursive(null, $userPermissions);
    }

    /**
     * Retrieves the menu items recursively based on the parent ID and user permissions.
     *
     * @param int $parentId The ID of the parent menu item.
     * @param array $userPermissions The array of user permissions.
     * @return array The filtered menu items.
     */
    private function getMenuRecursive($parentId, $userPermissions)
    {
        $menus = Menu::where('parent_id', $parentId)->get();

        $filteredMenus = [];

        foreach ($menus as $menu) {
            $menuPermissions = $menu->permissions->pluck('name')->toArray();

            $getChildren = $this->getMenuRecursive($menu->id, $userPermissions);

            if (!empty($getChildren) || empty($menuPermissions) || array_intersect($menuPermissions, $userPermissions)) {
                $menuItem = [
                    'title' => $menu->title,
                    'href' => $menu->url,
                    'icon' => $menu->icon,
                    'level' => $menu->level,
                ];

                if (!empty($getChildren)) {
                    $menuItem['children'] = $getChildren;
                }

                $filteredMenus[] = $menuItem;
            }
        }

        return $filteredMenus;
    }
}
