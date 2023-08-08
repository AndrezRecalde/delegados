<?php

namespace App\Enums;


enum MsgStatusEnum: string
{
    case Creacion = 'Creado con éxito';
    case Actualizado = 'Actualizado con éxito';
    case Eliminado = 'Eliminado con éxito';
    case Success = 'success';
    case Error = 'error';
    case NotFound = 'No Encontrado';
}
