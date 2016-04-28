<?php 

include "clases/Personas.php";
// $_GET['accion'];


if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $uploadPath = "../". DIRECTORY_SEPARATOR . 'fotos' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'respuesta' => 'Archivo Cargado!' );
    $json = json_encode( $answer );
    echo $json;
}elseif(isset($_GET['accion']))
{
	$accion=$_GET['accion'];
	if($accion=="traer")
	{
		$respuesta= array();
		//$respuesta['listado']=Persona::TraerPersonasTest();
		$respuesta['listado']=Persona::TraerTodasLasPersonas();
		//var_dump(Persona::TraerTodasLasPersonas());
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}


	

}
else{

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);

	if(isset($respuesta->datos->accion)){

		switch($respuesta->datos->accion)
		{
			case "borrar":	
				if($respuesta->datos->persona->foto!="pordefecto.png")
				{
					unlink("../fotos/".$respuesta->datos->persona->foto);
				}
				Persona::BorrarPersona($respuesta->datos->persona->id);
			break;

			case "insertar":	
				if($respuesta->datos->persona->foto!="pordefecto.png")
				{
					$rutaVieja="../fotos/".$respuesta->datos->persona->foto;
					$rutaNueva=$respuesta->datos->persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
					copy($rutaVieja, "../fotos/".$rutaNueva);
					unlink($rutaVieja);
					$respuesta->datos->persona->foto=$rutaNueva;
				}
				Persona::InsertarPersona($respuesta->datos->persona);
			break;

			case "buscar":
			
				echo json_encode(Persona::TraerUnaPersona($respuesta->datos->id));
				break;
	
			case "modificar":
			
				if($respuesta->datos->persona->foto!="pordefecto.png")
				{
					$rutaVieja="../fotos/".$respuesta->datos->persona->foto;
					$rutaNueva=$respuesta->datos->persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
					copy($rutaVieja, "../fotos/".$rutaNueva);
					unlink($rutaVieja);
					$respuesta->datos->persona->foto=$rutaNueva;
				}
				Persona::ModificarPersona($respuesta->datos->persona);
				break;
		}//switch($respuesta->datos->accion)
	}//if(isset($respuesta->datos->accion)){


}



 ?>