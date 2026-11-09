<?php

declare(strict_types=1);

namespace Clothyy\Cms;

class LookbookSchemaGenerator
{
    /**
     * Generates Schema.org JSON-LD structured data for a runway collection lookbook
     *
     * @param string $title
     * @param string $season
     * @param string $designer
     * @param string $canonicalUrl
     * @param array<string> $imageUrls
     * @return array<string, mixed>
     */
    public function generate(
        string $title,
        string $season,
        string $designer,
        string $canonicalUrl,
        array $imageUrls
    ): array {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'VisualArtwork',
            'name' => $title,
            'alternateName' => sprintf('%s - %s Collection', $designer, $season),
            'creator' => [
                '@type' => 'Person',
                'name' => $designer,
            ],
            'artMedium' => 'Haute Couture Textile',
            'artform' => 'Fashion Lookbook',
            'url' => $canonicalUrl,
            'image' => array_values($imageUrls),
            'inLanguage' => 'en-US',
            'copyrightYear' => 2026,
            'publisher' => [
                '@type' => 'Organization',
                'name' => 'Clothyy Luxury Group',
                'url' => 'https://clothyy.com'
            ]
        ];
    }
}
