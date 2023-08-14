<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <style>
        .fondo {
            background-image: url('https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/08/FFF-02.jpg');
            background-repeat: no-repeat;
            background-size: 320px 400px;
        }
    </style>
    <title>{{ $title }}</title>
</head>

<body>
    <table>
        <tbody>

            @foreach ($reconteos->chunk(2) as $reconteo)
                <tr>
                    @foreach ($reconteo as $item)
                        <td>
                            <div class="card mr-1 ml-4 mb-1 fondo" style="width: 20rem;">
                                <div class="text-center mt-4">
                                    <img src={{ public_path('/images/cneweb.png') }} class="img-fluid" height="180"
                                        width="180" alt="cne_logo" />
                                </div>
                                <div class="card-body">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p style="font-size: 12px">20 de agosto</p>
                                                </td>
                                                <td>
                                                    <img src={{ public_path('/images/psclogo.jpg') }}
                                                        class="img-fluid mb-3 ml-2 mr-2" height="100" width="100"
                                                        alt="psc_logo" />
                                                </td>
                                                <td>
                                                    <p style="font-size: 10px">www.cne.gob.ec</p>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        <p class="form-control mb-0" style="width: 80%; font-size: 8px;">PARTIDO SOCIAL
                                            CRISTIANO (PSC) LISTA 6</p>
                                        <small class="form-text text-muted text-center mt-1"
                                            style="font-size: 7px">NOMBRE DE LA ORGANIZACION POLITICA O ALIANZA</small>
                                        <p class="form-control" style="width: 80%; font-size: 8px;">
                                            {{ Str::upper($item->nombres_completos) }}</p>
                                        <small class="form-text text-muted text-center mt-1"
                                            style="font-size: 7px">NOMBRES APELLIDOS</small>
                                        <input type="text" class="form-control" style="width: 80%; font-size: 8px;"
                                            aria-describedby="dni" value={{ $item->dni }}>
                                        <small id="dni" class="form-text text-muted text-center mt-1"
                                            style="font-size: 7px">CEDULA CIUDADANIA N°</small>
                                    </div>
                                </div>
                                <div class="card-footer text-center text-white font-weight-bold"
                                    style="background-color: black; font-size: 14px;">
                                    DELEGADO/A <br /> PROCESO DE RECONTEO DE VOTOS
                                </div>
                            </div>
                        </td>
                    @endforeach
                </tr>
            @endforeach

        </tbody>
    </table>
</body>

</html>
