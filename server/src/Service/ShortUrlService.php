<?php
namespace App\Service;

use GuzzleHttp;

class ShortUrlService
{
    private $client;

    public function __construct()
    {
        try{
            $this->client = new GuzzleHttp\Client([
                'base_uri' => 'https://api-ssl.bitly.com/',
                'timeout'  => 10.0,
                'http_errors' => false
                ]);
        }catch(\Exception $e){}
    }

    public function create($longUrl = 'https://yahoo.com/')
    {
        try {
            $response = $this->client->request('GET', 'v3/shorten', [
                'query' => [
                    'longUrl' => $longUrl,
                    'access_token' => $_SERVER['BITLY_ACCESS_TOKEN'],
                ],
                'verify' => false,
            ]);

        } catch (\Exception $e) {
            // trigger_error($e->getMessage(), E_USER_WARNING);
            return $longUrl;
        }

        $response_body = json_decode($response->getBody());

        if($response->getStatusCode() == 200 && $response_body->status_code == 200) {
            return $response_body->data->url;
        }else{
            return $longUrl;
        }
    }

}