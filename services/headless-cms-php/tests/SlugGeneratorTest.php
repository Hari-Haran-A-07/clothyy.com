<?php

namespace Clothyyy\Cms\Tests;

use Clothyyy\Cms\SlugGenerator;
use PHPUnit\Framework\TestCase;

class SlugGeneratorTest extends TestCase
{
    public function testGeneratesCleanSlugFromFrenchTitle()
    {
        $title = "Robe Haute Couture Élégance d'Or";
        $slug = SlugGenerator::generate($title);
        
        $this->assertStringNotContainsString(' ', $slug);
        $this->assertStringNotContainsString("'", $slug);
        $this->assertStringNotContainsString('É', $slug);
        $this->assertEquals('robe-haute-couture-elegance-d-or', $slug);
    }

    public function testHandlesPunctuationAndMultipleSpaces()
    {
        $title = "Silk Scarves & Cashmere -- Fall/Winter 2026 Collection!!";
        $slug = SlugGenerator::generate($title);

        $this->assertEquals('silk-scarves-cashmere-fall-winter-2026-collection', $slug);
    }

    public function testGeneratesUniqueSlugWithEntityId()
    {
        $title = "Velvet Smoking Jacket";
        $unique = SlugGenerator::generateUnique($title, 4082);

        $this->assertEquals('velvet-smoking-jacket-4082', $unique);
    }
}
