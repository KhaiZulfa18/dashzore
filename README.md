# Dashzore

Dashzore is a simple starter kit using Laravel 11, Inertia.js, React, Tailwind CSS, and Daisy UI. It includes user management, role and permission management, and dynamic menu management.

## Built with

- **Laravel 11** with Inertia.js
- **React** for the frontend
- **Tailwind CSS** and **Daisy UI** for styling

## Features
- Users Management 
- Roles & Permissions
- Dynamic Menu Management 

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KhaiZulfa18/dashzore.git
   cd dashzore
   ```

2. Install dependencies:
    ```bash
    composer install
    npm install
    ```
3. Set up the environment:
    ```bash 
    cp .env.example .env
    php artisan key:generate
    ```
4. Configure the .env file and run migrations:
    ```bash
    php artisan migrate --seed
    ```
5. Compile assets and start the development server:
    ```bash 
    npm run dev
    php artisan serve
    ```
    or
    ```bash 
    bash start-dev.sh 
    ```
    `Note: If you use bash start-dev.sh, the server will listen on port 8080.`

## Access
email: `admin@gmail.com`\
password: `password`

## License
This project is open-source and available under the MIT License.