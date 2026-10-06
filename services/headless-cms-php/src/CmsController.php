<?php
declare(strict_types=1);

namespace Clothyyy\Cms;

class CmsController
{
    private ContentRepository $repository;

    public function __construct()
    {
        $this->repository = new ContentRepository();
    }

    public function handleRequest(string $uri, string $method): void
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: *');

        if ($method === 'OPTIONS') {
            http_response_code(200);
            exit;
        }

        $path = parse_url($uri, PHP_URL_PATH);

        if ($path === '/health') {
            echo json_encode([
                'service' => 'CLOTHYYY Headless CMS & Editorial Delivery',
                'status' => 'HEALTHY_ONLINE',
                'language' => 'PHP ' . PHP_VERSION,
                'opcache_active' => function_exists('opcache_get_status'),
                'timestamp' => gmdate('Y-m-d\TH:i:s\Z')
            ]);
            return;
        }

        if ($path === '/api/v1/cms/articles') {
            echo json_encode([
                'count' => count($this->repository->getAllArticles()),
                'data' => $this->repository->getAllArticles(),
                'engine' => 'PHP 8.3 JIT High-Throughput Engine',
                'timestamp' => gmdate('Y-m-d\TH:i:s\Z')
            ]);
            return;
        }

        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found in PHP CMS']);
    }
}
