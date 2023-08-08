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

    <center>
        <strong style="font-size:20px">{{ $title }}</strong>
    </center>
    <br />

    <table>
        <tbody>

            @foreach ($coordinadores->chunk(3) as $coordinador)
                <tr>
                    @foreach ($coordinador as $item)
                        <td>
                            <div class="card ml-3" style="width: 20rem;">
                                <img src={{ public_path('/images/cnelogo.png') }} class="card-img-top" alt="cne_logo" />
                                <div class="card-body">
                                    <img src={{ public_path('/images/psclogo.jpg') }} class="img-fluid" alt="psc_logo" />
                                    <h5 class="card-title">PARTIDO SOCIAL CRISTIANO (PSC) LISTA 6</h5>
                                    <h6 class="card-text">{{ $item->nombres_completos }}</h6>
                                    <p class="card-text">{{ $item->dni }}</p>
                                    <p class="card-text">{{ $item->parroquia }}</p>
                                </div>
                                <div class="card-footer text-muted">
                                    COORDINADOR/A ANTE LA JUNTA RECEPTORA DEL VOTO
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
