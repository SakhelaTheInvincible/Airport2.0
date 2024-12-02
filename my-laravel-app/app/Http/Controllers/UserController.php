<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['tickets.sourceAirport', 'tickets.destinationAirport'])
            ->paginate(10);

        return response()->json($users);
    }
}
