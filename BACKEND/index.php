<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/Client.php';

$app = AppFactory::create();
$app->addBodyParsingMiddleware();

// JWT
const JWT_SECRET = "jwtsecret";
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login","/api/createUser", "/api/client/login", "/api/client/new"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

function addHeaders($response) {
    $response = $response->withHeader("Content-Type", "application/json")
        ->withHeader("Access-Control-Allow-Origin", "*")
        ->withHeader("Access-Control-Allow-Headers", "*")
        ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        //->withHeader("Access-Control-Expose-Headers", "Authorization");

    return $response;
}

$app->get('/api/hello/{name}',
        function (Request $request, Response $response,$args) {
            $response->getBody()->write(json_encode($args['name']));
            addHeaders($response);
            return $response;
        }
    );

$app->get('/api/createUser',
    function(Request $request, Response $response, $args) {
        $response->getBody()->write(json_encode("success"));
        return addHeaders($response);;
    }
);

$app->post('/api/client/login', function (Request $request, Response $response, $args) {
    $body = $request->getParsedBody();
    global $entityManager;
    $clientRepository = $entityManager->getRepository('Client');

    $client = $clientRepository->findOneBy(array(
        'login' => $body['login'],
        'password' => $body['password']
    ));

    $response = addHeaders($response);
    if($client) {
        /*$data = array(
            'id' => $client->getIdClient(),
            'lastname' => $client->getName(),
            'firstname' => $client->getSurname(),
            'login' => $client->getLogin(),
            'password' => $client->getPassword(),
        );
        $response->getBody()->write(json_encode($data));*/
        $issuedAt = time();
        $expirationTime = $issuedAt + 60000;
        $payload = array(
            'userid' => $body['login'],
            'iat' => $issuedAt,
            'exp' => $expirationTime
        );

        $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");

        $response->getBody()->write(json_encode("Bearer {$token_jwt} "));
        return $response->withHeader("Authorization", "Bearer {$token_jwt}");
    }

    return $response->withStatus(401);
});

$app->post('/api/client/new', function (Request $request, Response $response, $args) {
    $body = $request->getParsedBody();
    global $entityManager;

    $clientRepository = $entityManager->getRepository('Client');

    $client = new Client();
    $client->setName($body['lastname']);
    $client->setSurname($body['firstname']);
    $client->setLogin($body['login']);
    $client->setPassword($body['password']);

    $entityManager->persist($client);
    $entityManager->flush();

    $response = addHeaders($response);
    $response->withStatus(200);
    return $response;
});

$app->get('/api/login/{login}/{password}',
        function(Request $request, Response $response, $args) {
            $issuedAt = time();
            $expirationTime = $issuedAt + 60000;
            $payload = array(
                'userid' => $args['login'],
                'iat' => $issuedAt,
                'exp' => $expirationTime
            );

            $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");

            $response->getBody()->write(json_encode("Bearer {$token_jwt} "));
            return addHeaders($response->withHeader("Authorization", "Bearer {$token_jwt}"));
        }
    );

$app->get('/api/authenticated',
    function(Request $request, Response $response, $args) {
        return addHeaders($response);
    }
);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return addHeaders($response);
});

$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run();
