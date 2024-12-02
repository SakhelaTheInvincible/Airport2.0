<?php

namespace App\Http\Controllers;

use App\Models\Airport;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // Get all airports
        $airports = Airport::all();

        // Return as JSON for Next.js to consume
        return response()->json($airports);
    }
}
