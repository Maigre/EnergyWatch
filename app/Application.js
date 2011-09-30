Ext.ns('Main');

Main.Launch = {
	
	init : function() {
		
		Ext.Loader.setConfig({enabled:true});

		Ext.create ('Ext.app.Application',{
			name: 'MainApp',    
			//autoCreateViewport: true,
			controllers: ['SearchControl','GridFactureControl','ButtonUploadControl','ButtonHomeControl','ButtonAlerteControl','ButtonValidationControl','ButtonWaterControl','ButtonMTControl','ButtonBTControl','UploadControl','GridFactureControl', 'GridAlerteAllControl', 'AlerteGridControl', 'GridPlControl','PlPanelControl'],
			models: ['Crud','SearchModel', 'PlModel', 'FactureBTModel', 'FactureMTModel', 'DonneesConsoModel', 'DonneesConsoMTModel','AlerteModel'],    
		    stores: ['SearchStore','FactureStore', 'FactureMTStore', 'PlStore', 'PlAllStore', 'HistoriqueUploadStore', 'DonneesConsoStore', 'DonneesConsoMTStore', 'AlerteStore', 'AlerteAllStore','TriPlNonValideAgainStore','TriPlNonValideStore','TriPlNouveauStore','TriPlValideStore','YearStore','MonthStore','BilanStore'],
			launch: function() {
				Ext.create('Ext.container.Viewport', {});
				Ext.QuickTips.init();
				//var plallstore= this.getStore('PlAllStore');
				// trigger the data store load
				//plallstore.guaranteeRange(0, 199);

				//lancer login.js ici
			}
		});
	}
};

	


