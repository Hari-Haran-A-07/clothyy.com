<?php
declare(strict_types=1);

namespace Clothyyy\Cms;

class ContentRepository
{
    private array $articles = [
        [
            'id' => 'art-1',
            'slug' => 'the-art-of-silk-weaving-como',
            'title_en' => 'The Master Weavers of Lake Como: A 200-Year Heritage',
            'title_ar' => 'أساتذة نسج الحرير في بحيرة كومو: إرث يمتد لمئتي عام',
            'category' => 'Atelier Craftsmanship',
            'read_time_min' => 6,
            'hero_image' => 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop',
            'published_at' => '2026-09-15T10:00:00Z',
            'is_featured' => true
        ],
        [
            'id' => 'art-2',
            'slug' => 'architectural-tailoring-autumn-winter',
            'title_en' => 'Deconstructing the Modern Silhouette: Autumn/Winter Masterpieces',
            'title_ar' => 'تفكيك وإعادة صياغة القصات العصرية: روائع الخريف والشتاء',
            'category' => 'Runway Analysis',
            'read_time_min' => 4,
            'hero_image' => 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
            'published_at' => '2026-09-28T14:30:00Z',
            'is_featured' => false
        ]
    ];

    public function getAllArticles(): array
    {
        return $this->articles;
    }

    public function getArticleBySlug(string $slug): ?array
    {
        foreach ($this->articles as $art) {
            if ($art['slug'] === $slug) {
                return $art;
            }
        }
        return null;
    }
}
