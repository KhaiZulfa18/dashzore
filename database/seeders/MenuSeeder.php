<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuNavigation = [
            [
                'title' => 'Overview',
                'href' => null,
                'icon' => null,
                'level' => 0,
                'children' => [
                    [
                        'title' => 'Dashboard',
                        'href' => '/dashboard',
                        'icon' => 'IconTable',
                        'level' => 1,
                        'permissions' => ['dashboard'],
                    ],
                ],
            ],
            [
                'title' => 'User Management',
                'href' => null,
                'icon' => null,
                'level' => 0,
                'children' => [
                    [
                        'title' => 'User',
                        'href' => '/user',
                        'icon' => 'IconUsersGroup',
                        'level' => 1,
                        'permissions' => ['user-view'],
                    ],
                    [
                        'title' => 'Access Control',
                        'href' => null,
                        'icon' => 'IconMasksTheater',
                        'level' => 1,
                        'children' => [
                            [
                                'title' => 'Role',
                                'href' => '/role',
                                'icon' => null,
                                'level' => 2,
                                'permissions' => ['role-view'],
                            ],
                            [
                                'title' => 'Permission',
                                'href' => '/permission',
                                'icon' => null,
                                'level' => 2,
                                'permissions' => ['permission-view'],
                            ],
                        ],
                    ],
                    [
                        'title' => 'Menu',
                        'href' => '/menu',
                        'icon' => 'IconCategory',
                        'level' => 1,
                        'permissions' => ['menu-view'],
                    ],
                ],
            ],
        ];

        $this->createMenus($menuNavigation);
    }

    /**
     * Recursive method to create menus and their children.
     */
    private function createMenus(array $menus, $parentId = null)
    {
        foreach ($menus as $menuData) {
            $menu = Menu::create([
                'title' => $menuData['title'],
                'parent_id' => $parentId,
                'icon' => $menuData['icon'],
                'url' => $menuData['href'],
                'level' => $menuData['level'],
                'status' => 1,
                'created_by' => 1,
            ]);

            if (isset($menuData['permissions'])) {
                foreach ($menuData['permissions'] as $permissionName) {
                    $permission = Permission::firstOrCreate(['name' => $permissionName]);
                    $menu->permissions()->attach($permission);
                }
            }

            if (isset($menuData['children'])) {
                $this->createMenus($menuData['children'], $menu->id);
            }
        }
    }
}
