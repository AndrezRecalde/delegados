<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <style>
        body {
            font-family: 'poppins', sans-serif;
        }
    </style>

    <title>{{ $title }}</title>
</head>

<body>
    <center>
        <strong style="font-size:20px">{{ $title }}</strong>
    </center>
    <br />
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Cédula</th>
                <th>Nombres Completos</th>
                <th>Télefono</th>
                <th>Cantón</th>
                <th>Parroquia(s)</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($supervisores as $supervisor)
                <tr>
                    <td>{{ $supervisor->dni }}</td>
                    <td>{{ $supervisor->nombres_completos }}</td>
                    <td>{{ $supervisor->telefono }}</td>
                    <td>{{ $supervisor->canton }}</td>
                    <td>
                        @foreach ($supervisor->parroquias as $parroquia)
                            {{ $parroquia->nombre_parroquia . ", " }}
                        @endforeach
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>


</body>

</html>
