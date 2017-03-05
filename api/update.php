<?php
require 'db_config.php';


  $id  = $_POST["id"];
  $post = $_POST;

  $sql = "UPDATE trabajadores SET cedula = '".$post['cedula']."'

    ,nombre = '".$post['nombre']."' 

    ,apellido = '".$post['apellido']."'

    ,email = '".$post['email']."'

    ,cargo = '".$post['cargo']."'

    ,estatus = '".$post['estatus']."'

    WHERE id = '".$id."'";

  $result = $mysqli->query($sql);


  $sql = "SELECT * FROM trabajadores WHERE id = '".$id."'"; 

  $result = $mysqli->query($sql);

  $data = $result->fetch_assoc();

echo json_encode($data);

?>