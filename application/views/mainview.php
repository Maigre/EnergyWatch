<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <title>EnergyWatch</title>

		<!-- Tools -->		
		<script type="text/javascript" src="app/tools/print.js"></script>
		<script type="text/javascript" src="app/tools/format.js"></script>
		
		<!-- ExtJS 4 -->
        <link rel="stylesheet" type="text/css" href="app/ext4/resources/css/ext-all.css" />
        <script type="text/javascript" src="app/ext4/ext-all.js"></script>
        <script type="text/javascript" src="app/ext4/locale/ext-lang-fr.js"></script>
        <script type="text/javascript">Ext.BLANK_IMAGE_URL = 'app/ext4/resources/s.gif';</script>
        
     	<!-- APPLICATION -->
     	<script type="text/javascript">BASE_URL = '<?=base_url()?>index.php/';</script>
     	<script 
     			//Application Start in MT(Moyenne Tension) Mode
     			type="text/javascript">BT_MT_EAU = 'MT';
     	</script>  
     	
     	<script 
     			type="text/javascript">PERIODE_MENSUELLE = '';
     	</script>
     	
     	<script 
     			type="text/javascript">BCKGRND_IMAGE = 9;
     	</script>

     	<link rel="stylesheet" type="text/css" href="app/css/icons.css" />
     	<link rel="stylesheet" type="text/css" href="app/css/viewport.css" />
     	<script type="text/javascript" src="app/Application.js"></script>
     	<script type="text/javascript" src="app/login.js"></script>
     	
     	<script type="text/javascript">
     	Ext.ns('Main');
     	     	
     	Ext.onReady(function(){
			
			//load viewport
			Ext.Loader.setConfig({enabled:true});
			Main.Launch.init();
			
			//check if already logged in and display welcome message or login window
			//Main.Login.ask();
				
		});
		</script>

    </head>
    <body>
    	<div id="working-area"></div>
    </body>
</html>
