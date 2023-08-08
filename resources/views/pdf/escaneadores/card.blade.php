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

            @foreach ($escaneadores->chunk(2) as $escaneador)
                <tr>
                    @foreach ($escaneador as $item)
                        <td>
                            <div class="card ml-2 mb-5" style="width: 21rem;">
                                <img src={{ public_path('/images/cnelogo.png') }} class="card-img-top" alt="cne_logo" />
                                <div class="card-body">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p>20 de agosto</p>
                                                </td>
                                                <td>
                                                    <img src={{ public_path('/images/psclogo.jpg') }}
                                                        class="img-fluid mb-2 mr-5" height="90" width="90"
                                                        alt="psc_logo" />
                                                </td>
                                                <td>
                                                    <p><em>www.cne.gob.ec</em></p>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                    <p class="card-title">PARTIDO SOCIAL CRISTIANO (PSC) LISTA 6</p>
                                    <p class="card-text">{{ $item->nombres_completos }}</p>
                                    <p class="card-text">{{ $item->dni }}</p>
                                    <p class="card-text">{{ $item->canton }}</p>
                                </div>
                                <div class="card-footer text-muted">
                                    ESCANER ANTE LA JUNTA RECEPTORA DEL VOTO
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
