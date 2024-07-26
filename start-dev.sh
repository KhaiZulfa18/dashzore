#!/bin/bash

# Function to kill background processes on script exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p)
}

# Trap the EXIT signal to run cleanup function
trap cleanup EXIT

# Start Laravel server in the background
php artisan serve &

# Start Vite development server
npm run dev