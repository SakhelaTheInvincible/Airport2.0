<?php

namespace App\Http\Controllers;

use App\Models\Airport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function index()
    {
        $airports = Cache::remember('airports', 3600, fn() => Airport::all());
        
        return response()->json($airports);
    }
}
