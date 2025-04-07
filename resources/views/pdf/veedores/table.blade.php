<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>{{ $title }}</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 5px;
            color: #333;
        }
        .title {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 5px;
        }
        .table th, .table td {
            border: 1px solid #000;
            padding: 4px;
            text-align: left;
        }
        .table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
</head>

<body>

    <div class="title">{{ $title }}</div>

    <table class="table">
        <thead>
            <tr>
                <th>Cédula</th>
                <th>Nombres Completos</th>
                <th>Teléfono</th>
                <th>Cantón</th>
                <th>Recinto Electoral</th>
                <th>Coordinador</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($veedores as $veedor)
                <tr>
                    <td>{{ $veedor->dni }}</td>
                    <td>{{ $veedor->nombres_veedor }} {{ $veedor->apellidos_veedor }}</td>
                    <td>{{ $veedor->telefono }}</td>
                    <td>{{ $veedor->canton }}</td>
                    <td>{{ $veedor->recinto }}</td>
                    <td>{{ $veedor->nombres_coordinador }} {{ $veedor->apellidos_coordinador }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>
