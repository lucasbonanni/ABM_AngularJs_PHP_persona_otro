var miApp = angular.module('angularABM', ['ui.router']);




miApp.config(function($stateProvider, $urlRouterProvider)
{

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
   		$urlRouterProvider.otherwise("/home");

})