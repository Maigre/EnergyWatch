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
		<div id="toolbox">
			<hr />
				<form action="<?php echo site_url("tools/dump/"); ?>" method="POST">
				Obtenir une sauvegarde de la base de donnée : &nbsp;&nbsp;<input type="submit" value="Download Backup" onClick="loader()" />
				</form>
			<hr />
				<form enctype="multipart/form-data" action="<?php echo site_url("tools/upgrade/"); ?>" method="POST">
				Soumettre une mise à jour : &nbsp;&nbsp;<input type="file" name="upgrade_file" size="15" /><input type="submit" value="Update" onClick="loader()" />
				</form>
			<hr />
		</div>
		<div id="loader" style="display:none">
			<br />
			<center><img src="../app/images/loader.gif" /> &nbsp;&nbsp;chargement en cours, merci de patienter !</center>
		</div>
	</body>
</html>
