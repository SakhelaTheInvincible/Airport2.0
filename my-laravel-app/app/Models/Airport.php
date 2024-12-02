<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    use HasFactory;

    protected $table = 'airports'; 

    protected $fillable = ['name'];

    public function sourceTickets()
    {
        return $this->hasMany(Ticket::class, 'source_airport_id');
    }

    public function destinationTickets()
    {
        return $this->hasMany(Ticket::class, 'destination_airport_id');
    }
}