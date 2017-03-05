<?php
require 'db_config.php';

  $post = $_POST;
  
  $sql = "INSERT INTO trabajadores (cedula,nombre,apellido,email,cargo,estatus) 

	VALUES ('".$post['cedula']."','".$post['nombre']."','".$post['apellido']."','".$post['email']."','".$post['cargo']."','".$post['estatus']."')";


  $result = $mysqli->query($sql);


  $sql = "SELECT * FROM trabajadores Order by id desc LIMIT 1"; 

  $result = $mysqli->query($sql);

  $data = $result->fetch_assoc();


echo json_encode($data);
?>