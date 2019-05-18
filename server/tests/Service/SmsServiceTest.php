<?php
namespace App\Tests\Service;

use App\Service\SmsService;
use PHPUnit\Framework\TestCase;

class SmsServiceTest extends TestCase
{
    private $service;

    protected function setUp()
    {
        $this->service = new SmsService;
    }


    public function testSend()
    {
        $result = $this->service->send();

        $this->assertArrayHasKey('message', $result);
        $this->assertArrayHasKey('status', $result);
        $this->assertArrayHasKey('code', $result);
    }
}