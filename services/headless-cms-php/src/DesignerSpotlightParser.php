<?php

namespace Clothyyy\Cms;

/**
 * Parses luxury atelier designer spotlight documents and extracts structured editorial metadata.
 */
class DesignerSpotlightParser
{
    /**
     * @param string $rawMarkdown
     * @return array
     */
    public function parseSpotlight(string $rawMarkdown): array
    {
        $metadata = [
            'designer_name' => 'Unknown Designer',
            'atelier_city' => 'Paris',
            'founded_year' => null,
            'specialties' => [],
            'curator_note' => ''
        ];

        $lines = explode("\n", trim($rawMarkdown));
        $contentLines = [];

        foreach ($lines as $line) {
            $line = trim($line);
            if (str_starts_with($line, 'Designer:')) {
                $metadata['designer_name'] = trim(substr($line, 9));
            } elseif (str_starts_with($line, 'Atelier:')) {
                $metadata['atelier_city'] = trim(substr($line, 8));
            } elseif (str_starts_with($line, 'Founded:')) {
                $metadata['founded_year'] = (int) trim(substr($line, 8));
            } elseif (str_starts_with($line, 'Specialties:')) {
                $rawSpecs = trim(substr($line, 12));
                $metadata['specialties'] = array_map('trim', explode(',', $rawSpecs));
            } else {
                $contentLines[] = $line;
            }
        }

        $metadata['curator_note'] = trim(implode("\n", $contentLines));
        return $metadata;
    }
}
