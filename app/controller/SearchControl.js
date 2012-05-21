displaypl = function(idPl,tension,facture){

	//charge le store avec l'id du pl
		var plstore = Ext.getStore('PlStore');
		plstore.load({
			params: {
				BT_MT_EAU: BT_MT_EAU,
				idPl: idPl
			}
		});
		
		plstore.on('load', function(database){
			//if(Ext.getCmp('centerregion').items.items[0].id=='plfacturepanel' || Ext.getCmp('centerregion').items.items[0].id=='plfacturemtpanel' ){
				var plpanel = Ext.getCmp('plpanel');
				if (!plpanel){
					var plpanel = Ext.widget('plpanel');
				}	
				Ext.getCmp('westregion').removeAll(false);
				Ext.getCmp('westregion').setWidth(220);
				Ext.getCmp('westregion').add(plpanel);
				var rec= database.getAt(0);
				plpanel.getForm().loadRecord(rec);
			//}
		});
		
		if (tension!=='MT'){
			var facturestore = Ext.getStore('FactureStore');
			//var donneesConsoStore = this.getStore('DonneesConsoStore');
			var plfacturepanel = Ext.getCmp('plfacturepanel');
			if (!plfacturepanel){
				var plfacturepanel = Ext.widget('plfacturepanel');
			}
		}
		else{
			var facturestore = Ext.getStore('FactureMTStore');
			//var donneesConsoStore = this.getStore('DonneesConsoMTStore');
			var plfacturepanel = Ext.getCmp('plfacturemtpanel');
			if (!plfacturepanel){
				var plfacturepanel = Ext.widget('plfacturemtpanel');
			}
		}
		
		facturestore.load({
			params: {idPl: idPl}
		});
		
		/*donneesConsoStore.load({
			params: {idPl: record.getValue()}
		});*/
		
		var alerteStore = Ext.getStore('AlerteStore');
		alerteStore.load({
			params: {
				idPl: idPl,
				BT_MT_EAU: BT_MT_EAU
			}
		});
		
		var anomalieStore = Ext.getStore('AnomalieStore');
		anomalieStore.load({
			params: {
				idPl: idPl,
				BT_MT_EAU: BT_MT_EAU
			}
		});
		//Si le panel plfacturepanel n'est pas déjà affiché
		//if(Ext.getCmp('centerregion').items.items[0].alias!='widget.plfacturepanel'){
			Ext.getCmp('centerregion').removeAll(false); //clean the center region
			Ext.getCmp('centerregion').add(plfacturepanel); //display the panel
		//}	

}

Ext.define('MainApp.controller.SearchControl', {
	extend: 'Ext.app.Controller',
	stores: ['SearchStore'],
		models: ['SearchModel'],
	    views: ['MainApp.view.tools.SearchView'],

	    init: function() {
		this.control({
		    'searchbar': {
			change: this.dosearch
		    },
		    'searchbar': {
			select: this.doselect
		    }
		});
	    },

	    dosearch: function(el) {
		this.getSearchStoreStore().baseParams['text_search']=el.getValue();
	},

	doselect: function(record) {
	
	
		displaypl(record.getValue(),record.displayTplData[0].tension);
		Ext.getCmp('searchbar').setRawValue('');
		console.info(Ext.getCmp('searchbar'));
	
	}
	
    
});
