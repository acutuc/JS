<?php
if (isset($_GET["usuario"]) && isset($_GET["clave"])) {
    $usuario = $_GET["usuario"];
    $clave = $_GET["clave"];

    if ($_GET["usuario"] == "admin" && $_GET["clave"] == "1234") {
        echo "USUARIO VÁLIDO";
    } else {
        echo "USUARIO NO VÁLIDO";
    }
}
