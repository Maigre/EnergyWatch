Ext.ns('Main');

Main.Launch = {
	
	init : function() {
		
		Ext.Loader.setConfig({enabled:true});

		Ext.create ('Ext.app.Application',{
			name: 'MainApp',    
			//autoCreateViewport: true,
			controllers: ['SearchControl','GridFactureControl','ButtonUploadControl','ButtonHomeControl','UploadControl','GridFactureControl','AlerteGridControl', 'GridPlControl'],
			models: ['Crud','SearchModel', 'PlModel', 'FactureBTModel', 'DonneesConsoModel','AlerteModel'],    
		    stores: ['SearchStore','FactureStore', 'PlStore', 'PlAllStore', 'HistoriqueUploadStore', 'DonneesConsoStore', 'AlerteStore'],
			launch: function() {
				Ext.create('Ext.container.Viewport', {});
				Ext.QuickTips.init();
				var plallstore= this.getStore('PlAllStore');
				// trigger the data store load
				plallstore.guaranteeRange(0, 199);

				//lancer login.js ici
			}
		});
	}
};

	


