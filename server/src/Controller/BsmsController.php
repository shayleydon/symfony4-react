<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use App\Service\SmsService;
use App\Service\ShortUrlService;

class BsmsController extends AbstractController
{
    public function index()
    {
        return $this->render('bsms/index.html.twig', [
            'app' => [
                'title' => 'Burst SMS',
                'country_codes' => ['61' => 'AU+61'],
                'message_max_length' => 459
            ]
        ]);
    }
  
    public function sms(Request $request, SmsService $sms, ShortUrlService $shortUrl)
    {
        if ($request->getContentType() === 'json' && $request->getContent()) {
            $data = json_decode($request->getContent(), true);

            if (!empty($data['message']) && !empty($data['number'] && !empty($data['country_code'])))
            {
                $data['message'] = preg_replace_callback('#\bhttps?://[^,\s()<>]+(?:\([\w\d]+\)|([^,[:punct:]\s]|/))#', function($match) use ($shortUrl){
                    return $shortUrl->create($match[0]);
                }, $data['message']);

                $sms_response = $sms->send([
                    'message' => $data['message'],
                    'to' => $data['country_code'] . preg_replace('/^0+/', '', $data['number'])
                ]);

                return new JsonResponse(array(
                    'status' => $sms_response['status'],
                    'message' => $sms_response['message']),
                200);
            }

            return new JsonResponse(array(
                'status' => 'Error',
                'message' => 'Form Error'),
            200);
        }

        return new JsonResponse(array(
            'status' => 'Error',
            'message' => 'Error'),
        400);
    }

}