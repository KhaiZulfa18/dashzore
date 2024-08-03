<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'level' => $this->level,
            'url' => $this->url,
            'parent_id' => $this->parent_id,
            'parent' => $this->parent,
            'children' => $this->children,
            'icon' => $this->icon,
            'permissions' => $this->permissions,
        ];
    }
}
