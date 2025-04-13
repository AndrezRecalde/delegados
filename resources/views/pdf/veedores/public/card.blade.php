<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Styles -->
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

        .fondo_reverso {
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

        .bold-input {
            font-weight: bold;
        }

        .parroquia-input {
            width: 170px;
            /* Más anchos */
            box-sizing: border-box;
        }

        .recinto-input {
            width: 170px;
            height: 40px;
            /* Más anchos */
            box-sizing: border-box;
        }

        .input-soft.text-uppercase {
            text-transform: uppercase;
        }

        .jrv-soft {
            width: 50px;
            /* Igual que .jrv-input para que no se peleen */
            height: 50px;
            /* Alto consistente */
            font-size: 20px;
            /* Tamaño de letra grande */
            font-weight: bold;
            /* Negrita */
            text-align: center;
            /* Centrado horizontal */
            vertical-align: middle;
            /* Centrado vertical */
            margin-right: 15px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            //box-sizing: border-box;
        }

        .small-label {
            display: block;
            font-size: 7px;
            color: #555;
            margin-bottom: 2px;
            margin-top: 0.5px;
            text-align: center;
        }

        .contenedor-imagen {
            width: 320px;
            height: 440px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #ccc;
        }

        .contenedor-imagen img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            /* ajusta la imagen dentro del contenedor */
        }

        .page-break {
            page-break-after: always;
        }
    </style>
    <title>Delegados</title>
</head>

<div class="page-break">
    <table>
        <tbody>
            @foreach ($delegados->chunk(2) as $veedor)
                <tr>
                    @foreach ($veedor as $item)
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
                                    <input type="text" class="input-soft bold-input" readonly
                                        value="ACCIÓN DEMOCRÁTICA NACIONAL ADN">
                                    <small class="small-label">DELEGADOS DE LOS SUJETOS
                                        POLÍTICOS</small>
                                    <input type="text" class="input-soft text-uppercase bold-input" readonly
                                        value="{{ Str::upper($item['apellidos_veedor'] . ' ' . $item['nombres_veedor']) }}">
                                    <small class="small-label">NOMBRES
                                        APELLIDOS</small>
                                    <input type="text" class="input-soft bold-input" aria-describedby="dni"
                                        value={{ $item['dni'] }} />
                                    <small class="small-label">CEDULA
                                        CIUDADANIA N°</small>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="text" class="input-soft parroquia-input" readonly
                                                        value="{{ $item['parroquia'] }}">
                                                    <small class="small-label">PARROQUIA</small>

                                                    <input type="text" class="input-soft recinto-input" readonly
                                                        value="{{ Str::upper($item['recinto']) }}">
                                                    <small class="small-label">RECINTO</small>
                                                </td>
                                                <td
                                                    style="text-align: center; vertical-align: top; padding-left: 30px;">
                                                    <input type="text" class="jrv-soft" readonly
                                                        value="{{ Str::upper($item['junta']) ?? "" }}">
                                                    <small class="small-label">JRV N°</small>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="card-footer text-center text-white font-weight-bold p-1"
                                    style="background-color: black; font-size: 15px;">
                                    DELEGADO/A ANTE LA<br /> JUNTA RECEPTORA DEL VOTO
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
</div>
<div>
    <table>
        <tbody>
            @for ($i = 0; $i < 2; $i++)
                <tr>
                    @for ($j = 0; $j < 2; $j++)
                        <td>
                            <div class="card mt-4 mr-4 ml-4 mb-5 fondo_reverso" style="width: 20rem;">
                                <div class="card-body">
                                    <img src="{{ public_path('/images/posterior_delegado.png') }}"
                                        class="img-fluid mb-2" alt="Atribuciones y Deberes de Delegados">
                                </div>
                            </div>
                        </td>
                    @endfor
                </tr>
            @endfor
        </tbody>
    </table>
</div>

</html>
