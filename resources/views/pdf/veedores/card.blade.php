<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Styles -->
    {{-- <link href="{{ public_path('/bootstrap/css/bootstrap.css') }}" rel="stylesheet" type="text/css"> --}}

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <title>{{ $title }}</title>
</head>

<body>

    {{-- <center>
        <strong style="font-size:20px">{{ $title }}</strong>
    </center>
    <br /> --}}

    <table>
        <tbody>

            @foreach ($veedores->chunk(3) as $veedor)
                <tr>
                    @foreach ($veedor as $item)
                        <td>
                            <div class="card ml-0 mr-1 ml-1 mb-1" style="width: 20rem;">
                                <div class="text-center mt-5">
                                    <img src={{ public_path('/images/cneweb.png') }} class="img-fluid" alt="cne_logo"
                                        height="250" width="250" />
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
                                                    <p style="font-size: 12px">www.cne.gob.ec</p>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                    <input type="text" class="form-control" style="width: 90%"
                                        aria-describedby="organizacion" value="PARTIDO SOCIAL CRISTIANO (PSC) LISTA 6">
                                    <small id="organizacion" class="form-text text-muted" style="font-size: 10px">NOMBRE
                                        DE LA ORGANIZACION POLITICA O ALIANZA</small>
                                    <p class="form-control" style="width: 90%; font-size: 16px;">
                                        {{ $item->nombres_completos }}</p>
                                    <small id="nombres_completos" class="form-text text-muted"
                                        style="font-size: 10px">NOMBRES APELLIDOS</small>
                                    <input type="text" class="form-control" style="width: 90%" aria-describedby="dni"
                                        value={{ $item->dni }}>
                                    <small id="dni" class="form-text text-muted" style="font-size: 10px">CEDULA
                                        CIUDADANIA N°</small>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p class="form-control" style="width: 80%; font-size: 10px;">
                                                        {{ $item->parroquia }}</p>
                                                    <small id="parroquia" class="form-text text-muted"
                                                        style="font-size: 10px">PARROQUIA</small>
                                                    <p class="form-control" style="width: 80%; font-size: 10px;">
                                                        {{ $item->recinto }}</p>
                                                    <small id="parroquia" class="form-text text-muted"
                                                        style="font-size: 10px">RECINTO</small>
                                                </td>
                                                <td>

                                                    <input type="text" class="form-control ml-3 mr-5"
                                                        style="width: 50%; height: 60px;" aria-describedby="dni"
                                                        value="2 F">
                                                    <small id="parroquia" class="form-text text-muted  text-center"
                                                        style="font-size: 10px">JRV N°</small>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="card-footer text-white font-weight-bold" style="background-color: black;">
                                    DELEGADO/A ANTE LA JUNTA RECEPTORA DEL VOTO
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
