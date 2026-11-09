<?php

declare(strict_types=1);

namespace Clothyy\Cms\Tests;

use Clothyy\Cms\LookbookSchemaGenerator;
use PHPUnit\Framework\TestCase;

class LookbookSchemaGeneratorTest extends TestCase
{
    private LookbookSchemaGenerator $generator;

    protected function setUp(): void
    {
        $this->generator = new LookbookSchemaGenerator();
    }

    public function testGeneratesCorrectSchemaStructure(): void
    {
        $schema = $this->generator->generate(
            'Autumn Horizon Haute Couture',
            'Fall/Winter 2026',
            'Élodie Laurent',
            'https://clothyy.com/lookbook/autumn-horizon-2026',
            [
                'https://cdn.clothyy.com/lookbook/look-01.jpg',
                'https://cdn.clothyy.com/lookbook/look-02.jpg'
            ]
        );

        $this->assertSame('https://schema.org', $schema['@context']);
        $this->assertSame('VisualArtwork', $schema['@type']);
        $this->assertSame('Autumn Horizon Haute Couture', $schema['name']);
        $this->assertSame('Élodie Laurent - Fall/Winter 2026 Collection', $schema['alternateName']);
        $this->assertSame('Élodie Laurent', $schema['creator']['name']);
        $this->assertCount(2, $schema['image']);
        $this->assertSame(2026, $schema['copyrightYear']);
    }
}
