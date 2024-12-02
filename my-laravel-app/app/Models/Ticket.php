<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $table = 'tickets'; 

    protected $fillable = [
        'source_airport_id',
        'destination_airport_id',
        'economy_price',
        'business_price',
        'first_class_price',
        'available_economy',
        'available_business',
        'available_first_class',
        'flight_date'
    ];

    protected $casts = [
        'date' => 'datetime',
    ];


    public function sourceAirport()
    {
        return $this->belongsTo(Airport::class, 'source_airport_id');
    }

    public function destinationAirport()
    {
        return $this->belongsTo(Airport::class, 'destination_airport_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_ticket')->withPivot('quantity', 'updated_at')->withTimestamps();
    }
}