
var app = angular.module('ABMangularPHP', ['ngAnimate','ui.router','angularFileUpload'])



.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

 


.state('menu', {
    views: {
      'principal': { templateUrl: 'menu.html',controller: 'controlMenu' },
      'menuSuperior': {templateUrl: 'menuSuperior.html'}
    }
    ,url:'/menu'
  })


    .state('grilla', {
    url: '/grilla',
    views: {
      'principal': { templateUrl: 'templateGrilla.html',controller: 'controlGrilla' },
      'menuSuperior': {templateUrl: 'menuSuperior.html'}
    }
  })

    .state('alta', {
    url: '/alta',
    views: {
      'principal': { templateUrl: 'templateUsuario.html',controller: 'controlAlta' },
      'menuSuperior': {templateUrl: 'menuSuperior.html'}
    }

  
  })

      .state('modificar', {
    url: '/modificar/{id}?:nombre:apellido:dni:foto',
     views: {
      'principal': { templateUrl: 'templateUsuario.html',controller: 'controlModificacion' },
      'menuSuperior': {templateUrl: 'menuSuperior.html'}
    }

  })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu');
});





app.controller('controlMenu', function($scope, $http) {
  $scope.DatoTest="**Menu**";
});



app.controller('controlAlta', function($scope, $http ,$state,FileUploader,cargadoDeFoto) {
  $scope.DatoTest="**alta**";

  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  $scope.uploader.queueLimit = 1;

//inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;
  $scope.persona.dni= "12312312" ;
  $scope.persona.apellido= "natalia" ;
  $scope.persona.foto="pordefecto.png";
  
  cargadoDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);
 


  $scope.Guardar=function(){
  console.log($scope.uploader.queue);
  if($scope.uploader.queue[0].file.name!='pordefecto.png')
  {
    var nombreFoto = $scope.uploader.queue[0]._file.name;
    $scope.persona.foto=nombreFoto;
  }
  $scope.uploader.uploadAll();
    console.log("persona a guardar:");
    console.log($scope.persona);
  }
   $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    //alert($scope.persona.foto);
      $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
        .then(function(respuesta) {       
           //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);
         $state.go("grilla");

      },function errorCallback(response) {        
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };








});


app.controller('controlGrilla', function($scope, $http,$location,$state) {
  	$scope.DatoTest="**grilla**";


$scope.guardar = function(persona){

console.log( JSON.stringify(persona));
  $state.go("modificar, {persona:" + JSON.stringify(persona)  + "}");
}

 
 	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
 	.then(function(respuesta) {     	

      	 $scope.ListadoPersonas = respuesta.data.listado;
      	 console.log(respuesta.data);

    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);     
 	 });

 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);
    $http.post("PHP/nexo.php",{datos:{accion :"borrar",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
         .then(function(respuesta) {       
                 //aca se ejetuca si retorno sin errores        
                 console.log(respuesta.data);
                    $http.get('PHP/nexo.php', { params: {accion :"traer"}})
                    .then(function(respuesta) {       

                           $scope.ListadoPersonas = respuesta.data.listado;
                           console.log(respuesta.data);

                      },function errorCallback(response) {
                           $scope.ListadoPersonas= [];
                          console.log( response);
                          
                     });

          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
              console.log( response);           
      });
 	}// $scope.Borrar






});//app.controller('controlGrilla',

app.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader)//, $routeParams, $location)
{
  $scope.persona={};
  $scope.DatoTest="**Modificar**";
  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  $scope.uploader.queueLimit = 1;
  $scope.persona.id=$stateParams.id;
  $scope.persona.nombre=$stateParams.nombre;
  $scope.persona.apellido=$stateParams.apellido;
  $scope.persona.dni=$stateParams.dni;
  $scope.persona.foto=$stateParams.foto;

  $scope.cargarfoto=function(nombrefoto){

      var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem($scope.uploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              $scope.uploader.queue.push(dummy);
         });
  }
  $scope.cargarfoto($scope.persona.foto);


  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grilla");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };


  $scope.Guardar=function(persona)
  {
    if($scope.uploader.queue[0].file.name!='pordefecto.png')
    {
      var nombreFoto = $scope.uploader.queue[0]._file.name;
      $scope.persona.foto=nombreFoto;
    }
    $scope.uploader.uploadAll();
  }
});//app.controller('controlModificacion')

app.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
        var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });
    }

});//app.service('cargadoDeFoto',function($http,FileUploader){
