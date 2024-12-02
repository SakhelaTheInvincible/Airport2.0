<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

// Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('login', [LoginController::class, 'login'])->name('login');
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');
});

// Public Routes
Route::get('/homepage', [HomeController::class, 'index'])->name('homepage');

// Ticket Routes
Route::get('/tickets/search', [TicketController::class, 'search'])->name('tickets.search');

// Authenticated Routes
Route::middleware('auth:api')->group(function () {

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    
    // Ticket Purchase Routes
    Route::post('/tickets/buy', [TicketController::class, 'buy'])->name('tickets.buy');
    
    // Admin Routes
    Route::middleware('admin')->get('/admin/tickets', [UserController::class, 'index'])->name('admin.tickets');
});

// Email Verification Routes
Route::middleware('auth:api')->group(function () {
    Route::get('/email/verify', function () {
        return response()->json(['message' => 'Please verify your email.']);
    })->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return response()->json(['message' => 'Email successfully verified!']);
    })->middleware(['signed'])->name('verification.verify');

    Route::post('/email/verification-notification', function (Illuminate\Http\Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Verification link sent!']);
    })->middleware(['throttle:6,1'])->name('verification.send');
});
