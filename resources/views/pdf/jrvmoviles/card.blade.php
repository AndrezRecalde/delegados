<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
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
            font-size: 8px;
            padding: 5px 5px;
            margin: 4px 0;
            border: 1px solid #ccc;
            border-radius: 20px;
            background-color: #f9f9f9;
            text-align: center;
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
    <table>
        <tbody>

            @foreach ($jrvmoviles->chunk(2) as $jrvmovil)
                <tr>
                    @foreach ($jrvmovil as $item)
                        <td>
                            <div class="card mr-4 ml-4 mb-3 fondo" style="width: 20rem;">
                                <div class="text-center mt-2">
                                    <img src={{ public_path('/images/cnelogo2025.png') }} class="img-fluid"
                                        alt="cne_logo" height="130" width="130" />
                                </div>
                                <div class="card-body">
                                    <div class="text-center">
                                        <img src={{ public_path('/images/logoadn.jpg') }}
                                            class="img-fluid mb-2 ml-2 mr-2" height="100" width="100"
                                            alt="adn_logo" />
                                    </div>
                                    <div>
                                        <input type="text" class="input-soft" readonly
                                            value="ACCIÓN DEMOCRÁTICA NACIONAL ADN">
                                        <small class="small-label">DELEGADOS DE LOS SUJETOS
                                            POLÍTICOS</small>
                                        <input type="text" class="input-soft text-uppercase" readonly
                                            value="{{ Str::upper($item->apellidos . ' ' . $item->nombres) }}">
                                        <small class="small-label">NOMBRES
                                            APELLIDOS</small>
                                        <input type="text" class="input-soft" aria-describedby="dni"
                                            value={{ $item->dni }} />
                                        <small class="small-label">CEDULA
                                            CIUDADANIA N°</small>
                                    </div>
                                </div>
                                <div class="card-footer text-center text-white font-weight-bold"
                                    style="background-color: black; font-size: 14px;">
                                    DELEGADO/A <br /> JUNTA RECEPTORA DEL VOTO MÓVIL
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
