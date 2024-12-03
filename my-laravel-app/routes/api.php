<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;


// authentification
Route::post('/auth/register', [RegisterController::class, 'register']);
Route::post('/auth/login', [LoginController::class, 'login'])->middleware('auth:sanctum');
Route::post('/auth/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

// public Routes
Route::get('/homepage', [HomeController::class, 'index'])->name('homepage');
Route::get('/tickets/search', [TicketController::class, 'search'])->name('tickets.search');

Route::middleware('auth:api')->group(function () {

    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/tickets/buy', [TicketController::class, 'buy'])->name('tickets.buy');
    
    // admin
    Route::middleware('admin')->get('/admin/tickets', [UserController::class, 'index'])->name('admin.tickets');
});

// email Verification Routes
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
