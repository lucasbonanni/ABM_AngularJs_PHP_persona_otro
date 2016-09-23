var miApp = angular.module('angularABM', ['ui.router','angularFileUpload', 'satellizer']);


miApp.config(function($stateProvider, $urlRouterProvider,$authProvider)
{


$authProvider.loginUrl = 'mio/ABM_AngularJs_PHP_persona/jwt/php/auth.php';
$authProvider.tokenName = 'MiTokenGeneradoEnPHP';
$authProvider.tokenPrefix = 'Aplicacion';
$authProvider.tokenHeader = 'data';




$stateProvider
   		.state('home', 
	   		{
	   			url:'/home',
	   			templateUrl:"home.html",
	   			controller:'controlinicio'
	   		}
   		)
   		.state('persona',
	   		{
	   			url:'/persona', 
	   			abstract:true,
	   			templateUrl:"abstractPersona.html"
	   		}
   		)


   		.state('persona.menu',
	   		{
	   			url:'/menu',
	   			views:{
	   				'contenido':{
	   					templateUrl:"personaMenu.html",
	   					controller:'controlPersonaMenu'
	   				}
	   				
	   			}
	   		}
   		)

   		.state('persona.alta',
	   		{
	   			url:'/alta',
	   			views:{
	   				'contenido':{
	   					templateUrl:"personaAlta.html",
	   					controller:'controlPersonaAlta'
	   				}
	   				
	   			}
	   		}
   		)


   		.state('persona.grilla',
	   		{
	   			url:'/grilla',
	   			views:{
	   				'contenido':{
	   					templateUrl:"personaGrilla.html",
	   					controller:'controlPersonaGrilla'
	   				}
	   				
	   			}
	   		}
   		)

   		.state('persona.login',
	   		{
	   			url:'/login',
	   			views:{
	   				'contenido':{
	   					templateUrl:"template/login.html",
	   					controller:'LoginCtrl'
	   				}
	   				
	   			}
	   		}
   		)

   		$urlRouterProvider.otherwise("/home");

})

miApp.controller('controlinicio', ['$scope', 'FileUploader',function($scope,fileuploader){



	console.log('controller inicio');
}])



miApp.controller('controlPersonaMenu', ['$scope', 'FileUploader',function($scope,fileuploader){

	console.log('controller persona menu');

	
}])

miApp.controller('LoginCtrl',  function($scope,$auth){
	console.info('loginController',$auth);

	$scope.usuario = {};
	$scope.usuario.correo = "usuario";
	$scope.usuario.clave = "clave";

	console.info("autenticated", $auth.getPayload());

	if($auth.isAuthenticated()){
		console.info("autenticated", $auth.getPayload());
	} else
	{
		console.info("is not autenticated", $auth.getPayload());
	}


	$scope.iniciarSesion = function(){

	$auth.login($scope.usuario)
	  .then(function(response) {
	    // Redirect user here after a successful log in.
	    console.info("correcto",response);

    	if($auth.isAuthenticated())
    	{
			console.info("autenticated", $auth.getPayload());
		}else
		{
			console.info("is not autenticated", $auth.getPayload());
		}

	  })
	  .catch(function(response) {
	    // Handle errors here, such as displaying a notification
	    // for invalid email and/or password.
	    console.info("error",response);


	  });
	};

})
