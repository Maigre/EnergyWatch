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
		

		//charge le store avec l'id du pl
		var plstore = this.getStore('PlStore');
		plstore.load({
			params: {idPl: record.getValue()}
		});
		
		plstore.on('load', function(){
			Ext.getCmp('westregion').removeAll();
			Ext.getCmp('westregion').add(Ext.widget('plpanel'));
		});
		
		
		var facturestore = this.getStore('FactureStore');
		facturestore.load({
			params: {idPl: record.getValue()}
		});
		
		var donneesConsoStore = this.getStore('DonneesConsoStore');
		donneesConsoStore.load({
			params: {idPl: record.getValue()}
		});
		
		var alerteStore = this.getStore('AlerteStore');
		alerteStore.load({
			params: {idPl: record.getValue()}
		});
		
		//Si le panel plfacturepanel n'est pas déjà affiché
		if(Ext.getCmp('centerregion').items.items[0].alias!='widget.plfacturepanel'){
			var view1 = Ext.widget('plfacturepanel');
			Ext.getCmp('centerregion').removeAll(); //clean the center region
			Ext.getCmp('centerregion').add(view1); //display the panel
		}
		
		
		
	}
	
    
});
