<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    {{-- <link href="{{ public_path('/bootstrap/css/bootstrap.css') }}" rel="stylesheet" type="text/css"> --}}
    <style>
        @page {
            size: A4;
            margin: 20;
            /* Elimina márgenes para impresión */
        }

        body {
            font-family: Arial, sans-serif;
        }

        .fondo {
            background-image: url('https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2025/04/fondo_cne2.png');
            background-repeat: no-repeat;
            background-size: 320px 440px;

        }

        .input-soft {
            width: 95%;
            height: 35px;
            font-size: 10px;
            padding: 0;
            /* Quitamos padding innecesario */
            margin: 4px 0;
            border: 1px solid #ccc;
            border-radius: 20px;
            background-color: #f9f9f9;
            text-align: center;
            /* Centra horizontalmente */
            line-height: 25px;
            /* Centra verticalmente */
        }

        .recinto-input {
            height: 40px;
            /* Aquí defines el alto fijo */
        }

        .input-soft.text-uppercase {
            text-transform: uppercase;
        }

        .jrv-soft {
            width: 80%;
            font-size: 8px;
            padding: 5px 8px 8px 5px;
            margin: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            text-align: center;
        }

        .jrv-input {
            width: 50px;
            /* Ancho pequeño para el número */
            height: 50px;
            /* Alto grande como querías */
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            /* Centrado horizontal */
            vertical-align: middle;
            /* Centrado vertical */
            padding: 10px;
        }

        .small-label {
            display: block;
            font-size: 7px;
            color: #555;
            margin-bottom: 2px;
            margin-top: 0.5px;
            text-align: center;
        }
    </style>

    <title>{{ $title }}</title>
</head>

<body>

    {{-- <center>
        <strong style="font-size:20px">{{ $title }}</strong>
    </center>
    <br />
 --}}
    <table>
        <tbody>

            @foreach ($supervisores->chunk(2) as $supervisor)
                <tr>
                    @foreach ($supervisor as $item)
                        <td>
                            <div class="card mr-4 ml-4 mb-3 fondo" style="width: 20rem;">
                                <div class="text-center mt-2">
                                    <img src={{ public_path('/images/cnelogo2025.png') }} class="img-fluid"
                                        alt="cne_logo" height="130" width="130" />
                                </div>
                                <div class="card-body">
                                    <div class="text-center">
                                        <img src={{ public_path('/images/logoadn.jpg') }}
                                            class="img-fluid mb-2 ml-2 mr-2" height="125" width="125"
                                            alt="adn_logo" />
                                    </div>
                                    <div>
                                        <input type="text" class="input-soft" readonly
                                            value="ACCIÓN DEMOCRÁTICA NACIONAL ADN">
                                        <small class="small-label">DELEGADOS DE LOS SUJETOS
                                            POLÍTICOS</small>
                                        <input type="text" class="input-soft text-uppercase" readonly
                                            value="{{ Str::upper($item->apellidos_supervisor . ' ' . $item->nombres_supervisor) }}">
                                        <small class="small-label">NOMBRES
                                            APELLIDOS</small>
                                        <input type="text" class="input-soft" aria-describedby="dni"
                                            value={{ $item->dni }} />
                                        <small class="small-label">CEDULA
                                            CIUDADANIA N°</small>
                                    </div>
                                </div>
                                <div class="card-footer text-center font-weight-bold p-1"
                                    style="background-color: orange; color: black; font-size: 14px;">
                                    SUPERVISOR DE DELEGADOS/AS <br /> ANTE LA JUNTA RECEPTORA DEL VOTO
                                </div>
                                <div class="card-footer text-center text-white font-weight-bold p-1"
                                    style="background-color: blue; font-size: 15px;">
                                    SEGUNDA VUELTA - 13·04·25
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
