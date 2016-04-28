<html>
<head>
	<title>ABM angular PHP</title>
	  
		<!--?php require_once"partes/referencias.php" ;/**/?-->
		<!--final de Estilos-->    

      <!--script type="text/javascript" src="./bower_components/jquery/dist/jquery.js"></script-->
       	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="http://www.octavio.com.ar/favicon.ico">
	<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/estilo.css">
	<link rel="stylesheet" type="text/css" href="css/animacion.css">



	 <script SRC="js/controlGrilla.js" TYPE="text/javascript"></script>
</head>
<body>
	<!--?php		
		require_once"partes/barraDeMenu.php";
	 ?-->

 
              <ul class="nav nav-tabs">
		         <li  class="btn btn-info animated bounceInLeft" >
		         	<a href="index.html">
		         		 <span class="glyphicon glyphicon-list-alt">&nbsp;</span>
		         		 Inicio
		         	</a>
		         </li>
		         <li class="btn btn-info animated bounceInLeft" >
		         	<a href="formAlta.html">
		         		<span class="glyphicon glyphicon-plus-sign">&nbsp;</span>
		         		Alta
		         	</a>
		         </li>
		         <li  class="btn btn-info animated bounceInLeft" >
		         	<a href="formGrilla.html"> 
		         		<span class="glyphicon glyphicon-th" >&nbsp;</span>
		         			Grilla</a>
		         		</li>
		        	<span id="tituloBarra"  class="animated bounceInRight">ABM - PHP - Angular Versión 1.0.1 &nbsp;&nbsp;&nbsp;</span>
      </ul>
		

	<div class="container">
		<div class="page-header">
			<center> <h1>Datos</h1>   </center>     
		</div>
		<div class="CajaInicio animated bounceInRight">
			<h1> <?php echo $titulo; ?> </h1>

			<form id="FormIngreso" method="post" action="formAlta.php" enctype="multipart/form-data" >
				<input type="text" name="apellido" id="apellido" placeholder="ingrese apellido" value="<?php echo isset($unaPersona) ?  $unaPersona->GetApellido() : "" ; ?>" /><span id="lblApellido" style="display:none;color:#FF0000;width:1%;float:right;font-size:80">*</span>
				<input type="text" name="nombre" id="nombre" placeholder="ingrese nombre" value="<?php echo isset($unaPersona) ?  $unaPersona->GetNombre() : "" ; ?>" /> <span id="lblNombre" style="display:none;color:#FF0000;width:1%;float:right;font-size:80">*</span>
				<input type="text" name="dni" id="dni" placeholder="ingrese dni" value="<?php echo isset($unaPersona) ?  $unaPersona->GetDni() : "" ; ?>" <?php echo isset($unaPersona) ?  "readonly": "" ; ?>        /> <span id="lblDni" style="display:none;color:#FF0000;width:1%;float:right;font-size:80">*</span>
				<?php echo isset($unaPersona) ? 	"<p style='color: black;'>*El DNI no se puede modificar.</p> ": "" ; ?>
				<input type="hidden" name="idOculto" id="id" value="<?php echo isset($unaPersona) ? $unaPersona->GetId() : "" ; ?>" />
				<input type="file" name="foto" />


				<img  src="fotos/<?php echo isset($unaPersona) ? $unaPersona->GetFoto() : "pordefecto.png" ; ?>" class="fotoform" id="foto"/>
				<p style="  color: black;">*La foto se actualiza al guardar.</p>


				<a class="btn btn-info " name="guardar" onclick="Validar()" ><span class="glyphicon glyphicon-save">&nbsp;</span>Guardar</a>
					
				<input type="hidden" value="<?php echo $_POST['idParaModificar']; ?>" id="idParaModificar" name="agregar" />
				<input type="hidden" value="" id="hdnAgregar" name="agregar" />
				</div>

			</form>
		
<?php 

if(isset($_POST['agregar']) && $_POST['agregar'] === "Guardar")// si esto no se cumple ingreso por primera vez.
{


	if($_POST['idOculto'] != "")//Solo para la foto
	{
		$unaPersona = Persona::TraerUnaPersona($_POST['idOculto']);
		$foto=$unaPersona->GetFoto();
		
	}else
	{
		$foto="pordefecto.png";
	}

	

	if(!isset($_FILES["foto"]))
	{
		// no se cargo una imagen
	}
	else
	{
		if($_FILES["foto"]['error'])
		{
			//error de imagen
		}
		else
		{
			$tamanio =$_FILES['foto']['size'];
    		if($tamanio>1024000)
    		{
    				// "Error: archivo muy grande!"."<br>";
    		}
    		else
    		{
    			//OBTIENE EL TAMAÑO DE UNA IMAGEN, SI EL ARCHIVO NO ES UNA
				//IMAGEN, RETORNA FALSE
				$esImagen = getimagesize($_FILES["foto"]["tmp_name"]);
				if($esImagen === FALSE) 
				{
							//NO ES UNA IMAGEN
				}
				else
				{
					$NombreCompleto=explode(".", $_FILES['foto']['name']);
					$Extension=  end($NombreCompleto);
					$arrayDeExtValida = array("jpg", "jpeg", "gif", "bmp","png");  //defino antes las extensiones que seran validas
					if(!in_array($Extension, $arrayDeExtValida))
					{
					   //"Error archivo de extension invalida";
					}
					else
					{
						//$destino =  "fotos/".$_FILES["foto"]["name"];
						$destino = "fotos/". $_POST['dni'].".".$Extension;
						$foto=$_POST['dni'].".".$Extension;
						//MUEVO EL ARCHIVO DEL TEMPORAL AL DESTINO FINAL
    					if (move_uploaded_file($_FILES["foto"]["tmp_name"],$destino))
    					{		
      						 echo "ok";
      					}
      					else
      					{   
      						// algun error;
      					}



					}

				}
    		}			
		}
	}






	// if($_POST['idOculto'] != "")//paso por grilla y luego guardo
	// {
	// 	$PersonaBuscada = Persona::TraerUnaPersona($_POST['idOculto']);
	// 	$PersonaBuscada->SetFoto($foto);
	// 	$PersonaBuscada->SetApellido($_POST['apellido']);
	// 	$PersonaBuscada->SetNombre($_POST['nombre']);
	// 	//$PersonaBuscada->SetDni($_POST['dni']);		
	// 	$retorno = Persona::ModificarPersona($PersonaBuscada);
	// }
	// else// si es un alta
	// {
	// 	$PersonaNueva = new Persona();	
	// 	$PersonaNueva->SetFoto($foto);
	// 	$PersonaNueva->SetApellido($_POST['apellido']);
	// 	$PersonaNueva->SetNombre($_POST['nombre']);
	// 	$PersonaNueva->SetDni($_POST['dni']);
	// 	persona::InsertarPersona($PersonaNueva);

	// }	
}
?>
		</div>
	</div>
</body>
</html>