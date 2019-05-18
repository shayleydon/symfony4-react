<?php
namespace App\Tests\Service;

use App\Service\ShortUrlService;
use PHPUnit\Framework\TestCase;

class ShortUrlServiceTest extends TestCase
{
    private $service;

    protected function setUp()
    {
        $this->service = new ShortUrlService;
    }


    public function testCreate()
    {
        $result = $this->service->create();

        $this->assertInternalType('string', $result, "Got a " . gettype($result) . " instead of a string");
    }
}