var http = require('http');
var url = require('url');
var fs = require('fs');
var mime_types = {
   'js' : 'text/javascript',
   'html' : 'text/html',
   'css' : 'text/css',
   'jpg' : 'image/jpg',
   'gif' : 'image/gif',
   'png' : 'image/png'
};
http.createServer(function(peticion, respuesta){
   var path_nombre = (url.parse(peticion.url).pathname == '/') ? '/index.html' : url.parse(peticion.url).pathname;
   var ruta_a_archivo = '/' + path_nombre;
   fs.exists(ruta_a_archivo, function(existe){
      if(existe){
         fs.readFile(ruta_a_archivo, function(error, contenido_archivo){
            if(error){
               respuesta.writeHead(500, 'text/plain');
               respuesta.end('Error interno.');
            }else{
               var extension = ruta_a_archivo.split('.').pop();
               var mime_type = mime_types[extension];
               respuesta.writeHead(200, {'Content-Type': mime_type});
               respuesta.end(contenido_archivo);
            }
         });
      }else{
         respuesta.writeHead(404, 'text/plain');
         respuesta.end('Error 404. El enlace no existe o ha dejado de existir.');
      }
   });
}).listen(3000, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en http://localhost:3000/');
Como se ve, aquí creamos un json con la lista de mimetype que será capaz de devolver nuestro servidor:

var mime_types = {
   'js' : 'text/javascript',
   'html' : 'text/html',
   'css' : 'text/css',
   'jpg' : 'image/jpg',
   'gif' : 'image/gif',
   'png' : 'image/png'
};