<?php
namespace App\Service;

use GuzzleHttp;

class SmsService
{
    private $client;

    public function __construct(/*GuzzleClient $guzzleClient*/)
    {
        try{
            $this->client = new GuzzleHttp\Client([
                'base_uri' => 'https://api.transmitsms.com/',
                'timeout'  => 10.0,
                'http_errors' => false
                ]);
        }catch(\Exception $e){}
    }

    public function send($query = [])
    {
        try {
            $response = $this->client->request('GET', '/send-sms.json', [
                'auth' => [
                    $_SERVER['SMS_KEY'], 
                    $_SERVER['SMS_SECRET']
                ],
                'query' => $query
            ]);

            $response = [
                'message' => $response->getReasonPhrase(),
                'status' => $response->getStatusCode(),
                'code' => $response->getStatusCode(),
            ];

        } catch (\Exception $e) {
            // trigger_error($e->getMessage(), E_USER_WARNING);
            $response = [
                'message' => $e->getMessage(),
                'status' => 500,
                'code' => 500,
            ];
        }

        return $response;
    }
}