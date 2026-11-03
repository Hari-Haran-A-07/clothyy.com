<?php

namespace Clothyyy\Cms;

class SlugGenerator
{
    /**
     * Generate an SEO-friendly URL slug from an editorial or product title.
     * Handles French diacritics and luxury punctuation gracefully.
     */
    public static function generate(string $title, string $separator = '-'): string
    {
        $transliterated = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $title);
        if ($transliterated === false) {
            $transliterated = $title;
        }

        $slug = strtolower($transliterated);
        $slug = preg_replace('/[^a-z0-9]+/', $separator, $slug);
        $slug = trim($slug, $separator);

        return $slug ?: 'couture-piece';
    }

    /**
     * Generate unique slug by appending entity identifier
     */
    public static function generateUnique(string $title, int $entityId): string
    {
        $base = self::generate($title);
        return sprintf('%s-%d', $base, $entityId);
    }
}
