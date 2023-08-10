<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Styles -->
    {{-- <link href="{{ public_path('/bootstrap/css/bootstrap.css') }}" rel="stylesheet" type="text/css"> --}}

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <style>
        .fondo {
            background-image: url('https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/08/FFF-02.jpg');
            background-repeat: no-repeat;
            background-size: 320px 430px;
        }
    </style>

    <title>{{ $title }}</title>
</head>

<body>

    {{-- <center>
        <strong style="font-size:20px">{{ $title }}</strong>
    </center>
    <br /> --}}

    <table>
        <tbody>

            @foreach ($veedores->chunk(2) as $veedor)
                <tr>
                    @foreach ($veedor as $item)
                        <td>
                            <div class="card ml-0 mr-1 ml-2 mb-1 fondo" style="width: 20rem;">
                                <div class="text-center mt-4">
                                    <img src={{ public_path('/images/cneweb.png') }} class="img-fluid" alt="cne_logo"
                                        height="180" width="180" />
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
                                                        class="img-fluid mb-2 ml-2 mr-2" height="90" width="90"
                                                        alt="psc_logo" />
                                                </td>
                                                <td>
                                                    <p style="font-size: 10px">www.cne.gob.ec</p>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                    <p class="form-control mb-0 rounded-pill" style="width: 80%; font-size: 7px;">PARTIDO SOCIAL
                                        CRISTIANO (PSC) LISTA 6</p>
                                    <small class="form-text text-muted text-center mt-1" style="font-size: 7px">NOMBRE
                                        DE LA ORGANIZACION POLITICA O ALIANZA</small>
                                    <p class="form-control text-uppercase mb-0 rounded-pill" style="width: 80%; font-size: 7px;">
                                        {{ $item->nombres_completos }}</p>
                                    <small class="form-text text-muted text-center mt-1"
                                    style="width: 80%; font-size: 7px;">NOMBRES APELLIDOS</small>
                                    <input type="text" class="form-control mb-0 rounded-pill" style="width: 80%; font-size: 7px;" aria-describedby="dni"
                                        value={{ $item->dni }} />
                                    <small class="form-text text-muted text-center mt-1" style="font-size: 7px">CEDULA
                                        CIUDADANIA N°</small>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p class="form-control mb-0 rounded-pill" style="width: 80%; font-size: 7px;">
                                                        {{ $item->parroquia }}</p>
                                                    <small class="form-text text-muted text-center mt-1"
                                                        style="font-size: 7px">PARROQUIA</small>
                                                    <p class="form-control mb-0 rounded-pill" style="width: 80%; font-size: 7px;">
                                                        {{ $item->recinto }}</p>
                                                    <small class="form-text text-muted text-center mt-1"
                                                        style="font-size: 7px">RECINTO</small>
                                                </td>
                                                <td>

                                                    <p class="form-control ml-5 mr-1 mb-0 rounded" style="width: 40px; height: 50px;">
                                                        {{ $item->junta }}</p>
                                                    <small class="form-text text-muted text-center mt-1"
                                                        style="font-size: 7px">JRV N°</small>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="card-footer text-center text-white font-weight-bold p-1" style="background-color: black;">
                                    DELEGADO/A ANTE LA<br/> JUNTA RECEPTORA DEL VOTO
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
