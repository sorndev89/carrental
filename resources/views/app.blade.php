<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Rental</title>

    <!-- Favicon -->
	<link rel="shortcut icon" type="image/x-icon" href="{{ url('assets/img/favicon.png')}}">

	<!-- Apple Touch Icon -->
	<link rel="apple-touch-icon" sizes="180x180" href="{{ url('assets/img/apple-touch-icon.png')}}">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="{{ url('assets/css/bootstrap.min.css')}}">

	<!-- Datetimepicker CSS -->
	<link rel="stylesheet" href="{{ url('assets/css/bootstrap-datetimepicker.min.css')}}">

	<!-- animation CSS -->
	<link rel="stylesheet" href="{{ url('assets/css/animate.css')}}">

	<!-- Select2 CSS -->
	<link rel="stylesheet" href="{{ url('assets/plugins/select2/css/select2.min.css')}}">

	<!-- Daterangepikcer CSS -->
	<link rel="stylesheet" href="{{ url('assets/plugins/daterangepicker/daterangepicker.css')}}">

	<!-- Tabler Icon CSS -->
	<link rel="stylesheet" href="{{ url('assets/plugins/tabler-icons/tabler-icons.min.css')}}">

	<!-- Fontawesome CSS -->
	<link rel="stylesheet" href="{{ url('assets/plugins/fontawesome/css/fontawesome.min.css')}}">
	<link rel="stylesheet" href="{{ url('assets/plugins/fontawesome/css/all.min.css')}}">

	<!-- Color Picker Css -->
	<link rel="stylesheet" href="{{ url('assets/plugins/@simonwep/pickr/themes/nano.min.css')}}">

	<!-- Main CSS -->
	<link rel="stylesheet" href="{{ url('assets/css/style.css')}}">
	<link rel="stylesheet" href="{{ url('assets/css/font_lao.css')}}">

	<script src="https://unpkg.com/feather-icons"></script>

    @vite('resources/css/app.css')

</head>
<body class="">
    <div id="app"></div>

	
	<!-- jQuery -->
	<script src="{{ url('assets/js/jquery-3.7.1.min.js')}}" ></script>

	<!-- Bootstrap Core JS -->
	<script src="{{ url('assets/js/bootstrap.bundle.min.js')}}" ></script>

    @vite('resources/js/app.js')

	<!-- <script>
      feather.replace();
    </script> -->
</body>
</html>