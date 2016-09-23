<?php
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;
/*
$key = "example_key";
$token = array(
    "iss" => "http://example.org",
    "aud" => "http://example.com",
    "iat" => 1356999524,
    "nbf" => 1357000000
);

/**
 * IMPORTANT:
 * You must specify supported algorithms for your application. See
 * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
 * for a list of spec-compliant algorithms.
 */
$token = array();

$DatosDelModeloPorPost = file_get_contents('php://input');
$user = json_decode($DatosDelModeloPorPost);

if($user->correo == 'usuario' && $user->clave == 'clave')
{
	$ClaveDeEncriptacion = "miClaveDeEncriptacion";
	$token["usuario"] = "usuario";
	$token["perfil"] = "admin";
	$token["iat"] = time();
	$token["exp"] = time() +20;


	$jwt = JWT::encode($token, $ClaveDeEncriptacion);

	
	$ArrayConToken["MiTokenGeneradoEnPHP"] = $jwt;
}
else{

	$ArrayConToken["MiTokenGeneradoEnPHP"] = false;
}


echo json_encode($ArrayConToken);

?>