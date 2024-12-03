<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $tickets = $user->tickets;

        return response()->json(['user' => $user, 'tickets' => $tickets]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        $user = $request->user();

        $user->update(array_filter([
            'first_name' => $validated['first_name'] ?? null,
            'last_name' => $validated['last_name'] ?? null,
            'password' => isset($validated['password']) ? bcrypt($validated['password']) : null,
        ]));

        return response()->json(['message' => 'Profile updated successfully!', 'user' => $user]);
    }

    public function edit()
    {
        $user = auth()->user();
        return response()->json(['user' => $user]);
    }
}
