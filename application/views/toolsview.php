<html>
    <head>
	<script>
		function loader()
		{
			//document.getElementById("toolbox").style.display = 'none';
			document.getElementById("loader").style.display = '';
		}
	</script>
    </head>
    <body>
    	<h1>Outils EnergyWatch</h1>
		<hr />
		<div id="toolbox">
			<form action="<?php echo site_url("tools/dump/"); ?>" method="POST">
			<input type="submit" value="Dump" onClick="loader()" />&nbsp;&nbsp;Sauvegarder la base de donnée
			</form>
		<hr />
		<!--
			<form action="<?php echo site_url("tools/update/"); ?>" method="POST">
			<input type="submit" value="Update" />&nbsp;&nbsp;Telecharger les mises à jours du logiciel
			</form>
		-->
		</div>
		<div id="loader" style="display:none">
			<br />... chargement en cours, merci de patienter !
		</div>
	</body>
</html>
