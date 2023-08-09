<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Styles -->
    {{-- <link href="{{ public_path('/bootstrap/css/bootstrap.css') }}" rel="stylesheet" type="text/css"> --}}

    <style>
        .fondo {
            background-image: url('https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/08/delegado.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    </style>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
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
                            <div class="card ml-0 mr-4 mb-5 fondo" style="width: 21rem; height: 28rem;">
                                {{-- <img src={{ public_path('/images/cneweb.png') }} class="card-img-top" alt="cne_logo" /> --}}
                                <div class="card-body mt-5">
                                    <div class="text-center">
                                        <img src={{ public_path('/images/psclogo.jpg') }}
                                            class="img-fluid mb-2 mr-5" height="90" width="90"
                                            alt="psc_logo" />
                                    </div>
                                    <p class="card-title">PARTIDO SOCIAL CRISTIANO (PSC) LISTA 6</p>
                                    <p class="card-text">{{ $item->nombres_completos }}</p>
                                    <p class="card-text">{{ $item->dni }}</p>
                                    <p class="card-text">{{ $item->parroquias->implode('nombre_parroquia', ', ') }}</p>
                                </div>
                                {{-- <div class="card-footer text-muted">
                                    SUPERVISOR/A ANTE LA JUNTA RECEPTORA DEL VOTO
                                </div> --}}
                            </div>
                        </td>
                    @endforeach
                </tr>
            @endforeach

        </tbody>
    </table>


</body>

</html>
