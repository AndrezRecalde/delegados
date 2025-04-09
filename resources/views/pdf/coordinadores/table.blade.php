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
            font-size: 14px;
            margin: 20px;
            color: #333;
        }
        .title {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .table caption {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
            text-align: left;
        }
        .table th, .table td {
            border: 1px solid #000;
            padding: 8px;
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
        <caption>Supervisor: {{ $coordinadores[0]->nombres_supervisor . " " . $coordinadores[0]->apellidos_supervisor || "Sin Supervisor" }}</caption>
        <thead>
            <tr>
                <th>Cédula</th>
                <th>Nombres Completos</th>
                <th>Teléfono</th>
                <th>Cantón</th>
                <th>Parroquia</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($coordinadores as $coordinador)
                <tr>
                    <td>{{ $coordinador->dni }}</td>
                    <td>{{ $coordinador->nombres_coordinador }} {{ $coordinador->apellidos_coordinador }}</td>
                    <td>{{ $coordinador->telefono }}</td>
                    <td>{{ $coordinador->canton }}</td>
                    <td>{{ $coordinador->parroquia }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
