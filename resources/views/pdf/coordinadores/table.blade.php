<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <title>{{ $title }}</title>
</head>
<body>
    <center>
        <strong style="font-size:20px">{{ $title }}</strong>
    </center>
    <br/>
    <table class="table table-bordered">
        <caption>Supervisor: {{ $coordinadores[0]->supervisor }}</caption>
        <thead>
            <tr>
                <th>Cédula</th>
                <th>Nombres Completos</th>
                <th>Télefono</th>
                <th>Cantón</th>
                <th>Parroquia</th>
            </tr>
        </thead>
    <tbody>
        @foreach ($coordinadores as $coordinador)
        <tr>
            <td>{{ $coordinador->dni }}</td>
            <td>{{ $coordinador->nombres_completos }}</td>
            <td>{{ $coordinador->telefono }}</td>
            <td>{{ $coordinador->canton }}</td>
            <td>{{ $coordinador->parroquia }}</td>
          </tr>
        @endforeach
    </tbody>
      </table>


</body>
</html>
