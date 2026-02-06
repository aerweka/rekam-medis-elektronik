<?php

namespace Database\Factories\Fhir\Datatypes;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PeriodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'start' => fake()->dateTimeBetween('-2 year', 'now'),
            'end' => fake()->dateTimeBetween('now', '+1 year'),
        ];
    }
}
