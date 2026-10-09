<?php
declare(strict_types=1);

namespace Clothyyy\Cms\Tests;

use PHPUnit\Framework\TestCase;
use Clothyyy\Cms\ContentRepository;

require_once __DIR__ . '/../src/ContentRepository.php';

final class ContentRepositoryTest extends TestCase
{
    private ContentRepository $repository;

    protected function setUp(): void
    {
        $this->repository = new ContentRepository();
    }

    public function testGetAllArticlesReturnsNonEmptyArray(): void
    {
        $articles = $this->repository->getAllArticles();
        $this->assertIsArray($articles);
        $this->assertGreaterThan(0, count($articles));
    }

    public function testGetArticleByValidSlug(): void
    {
        $slug = 'the-art-of-silk-weaving-como';
        $article = $this->repository->getArticleBySlug($slug);

        $this->assertNotNull($article);
        $this->assertSame($slug, $article['slug']);
        $this->assertArrayHasKey('title_en', $article);
        $this->assertArrayHasKey('title_ar', $article);
    }

    public function testGetArticleByInvalidSlugReturnsNull(): void
    {
        $article = $this->repository->getArticleBySlug('non-existent-article-slug');
        $this->assertNull($article);
    }
}
