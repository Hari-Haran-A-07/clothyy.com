<?php

namespace Clothyyy\Cms\Tests;

use PHPUnit\Framework\TestCase;
use Clothyyy\Cms\DesignerSpotlightParser;

class DesignerSpotlightParserTest extends TestCase
{
    private DesignerSpotlightParser $parser;

    protected function setUp(): void
    {
        $this->parser = new DesignerSpotlightParser();
    }

    public function testParsesFullDesignerMetadata(): void
    {
        $doc = <<<MD
Designer: Alexandre de Paris
Atelier: Florence
Founded: 1984
Specialties: Silk Organza, Corsetry, Gold Filigree

Alexandre brings four decades of Tuscan couture craftsmanship to the modern runway.
MD;

        $result = $this->parser->parseSpotlight($doc);

        $this->assertSame('Alexandre de Paris', $result['designer_name']);
        $this->assertSame('Florence', $result['atelier_city']);
        $this->assertSame(1984, $result['founded_year']);
        $this->assertSame(['Silk Organza', 'Corsetry', 'Gold Filigree'], $result['specialties']);
        $this->assertStringContainsString('four decades of Tuscan couture', $result['curator_note']);
    }

    public function testHandlesMinimalDocumentDefaults(): void
    {
        $doc = "A rising visionary atelier in contemporary minimalism.";
        $result = $this->parser->parseSpotlight($doc);

        $this->assertSame('Unknown Designer', $result['designer_name']);
        $this->assertSame('Paris', $result['atelier_city']);
        $this->assertNull($result['founded_year']);
        $this->assertEmpty($result['specialties']);
    }
}
