Ext.ns('Main');

Main.Launch = {
	
	init : function() {
		
		Ext.Loader.setConfig({enabled:true});

		Ext.create ('Ext.app.Application',{
			name: 'MainApp',    
			//autoCreateViewport: true,
			controllers: ['ViewportControl','SearchControl','GridFactureControl','GridFactureMTControl','ButtonUploadControl','ButtonHomeControl','ButtonAlerteControl','ButtonAnomalieControl','ButtonValidationControl','ButtonWaterControl','ButtonMTControl','ButtonBTControl','UploadControl','GridFactureControl', 'GridAlerteAllControl', 'GridAnomalieAllControl', 'AlerteGridControl', 'GridPlControl','PlPanelControl'],
			models: ['Crud','SearchModel', 'PlModel', 'FactureBTModel', 'FactureMTModel', 'DonneesConsoModel', 'DonneesConsoMTModel','AlerteModel','TriPlModel'],    
		    	stores: ['SearchStore','FactureStore', 'FactureMTStore', 'PlStore', 'PlAllStore', 'HistoriqueUploadStore', 'DonneesConsoStore', 'DonneesConsoMTStore', 'AlerteStore', 'AlerteAllStore', 'AnomalieStore', 'AnomalieAllStore', 'TriPlNonValideAgainStore','TriPlNonValideStore','TriPlNouveauStore','TriPlValideStore','YearStore','MonthStore','BilanStore'],
			launch: function() {
				//load viewport
				//MainApp.ViewPort.init();
				
				Ext.QuickTips.init();


				//lancer login.js ici
			}
		});
	}
};

	


