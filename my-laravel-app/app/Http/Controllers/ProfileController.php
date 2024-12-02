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

        $user = auth()->user();

        // Update fields
        if ($request->filled('first_name')) {
            $user->first_name = $validated['first_name'];
        }

        if ($request->filled('last_name')) {
            $user->last_name = $validated['last_name'];
        }

        if ($request->filled('password')) {
            $user->password = bcrypt($validated['password']);
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully!']);
    }

    public function edit()
    {
        $user = auth()->user();
        return response()->json(['user' => $user]);
    }
}
