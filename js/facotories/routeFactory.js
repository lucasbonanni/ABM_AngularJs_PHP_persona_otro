angular
	.constant("myConfig", {
        "base": "http://localhost",
        "port": "80",
        "api": "personas"
    })
	.module('app')
	.factory('routeFactory', function (myConfig) {
		var objeto = {};
		objeto.nombre = "Factory de Rutas";
		return objeto;
})