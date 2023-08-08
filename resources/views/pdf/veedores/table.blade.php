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
        <thead>
            <tr>
            <th>Cédula</th>
            <th>Nombres Completos</th>
            <th>télefono</th>
            <th>Cantón</th>
            <th>Recinto Electoral</th>
            <th>Coordinador</th>
            </tr>
        </thead>
    <tbody>
        @foreach ($veedores as $veedor)
        <tr>
            <td>{{ $veedor->dni }}</td>
            <td>{{ $veedor->nombres_completos }}</td>
            <td>{{ $veedor->telefono }}</td>
            <td>{{ $veedor->canton }}</td>
            <td>{{ $veedor->recinto }}</td>
            <td>{{ $veedor->coordinador }}</td>
          </tr>
        @endforeach
    </tbody>
      </table>


</body>
</html>
