angular
  .module('app')
  .service('data', function ($http) {

  	var host = "localhost/";
  	var personaPath = 'personas/';

  	var GetPersonaUrl = function(id){
  		if(id === null){
  			return host + personaPath;
  		}
  		return host + personaPath + '/' + id;
  	}

  	this.GetPersonaById = function(id){
  		return $http.get( GetPersonaUrl(id) ).then(
  			function(success){
  				return success;
	  		},
	  		function(error){
	  			return error;
	  		});
  	};

  	this.GetPersonas = function(){
  		return $http.get(GetPersonaUrl()).then(
  			function(success){
  				return success;
  			},
  			function(error){
  				return error;
  			});
  	};

  	this.PostPersona = function(persona){
  		return $http.post(GetPersonaUrl(),persona).then(
  			function(success){
  				return success;
	  		},
	  		function(error){
	  			return error;
	  		});
  	};

  	this.PutPersonaById = function(id, persona){
  		return $http.put(GetPersonaUrl(id), persona).then(
  			function(success){
  				return success;
  			},
  			function(error){
  				return error;
  			});
  	};

  	this.DeletePersonaById = function(id){
  		return $http.delete(GetPersonaUrl(id)).then(
  			function(success){
  				return success;
  			},
  			function(error){
  				return error;
  			}):
  	};


  });