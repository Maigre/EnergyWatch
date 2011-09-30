Ext.define('MainApp.store.DonneesConsoStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.DonneesConsoModel',
    model: 'MainApp.model.DonneesConsoModel',
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/facture/loaddonneesconso',
    	},
    	actionMethods : {read: 'POST'},   	
    	reader: {
    		type: 'json',
    		root: 'data',
    		successProperty: 'success'
    	}
    },
    baseParams: {
        BT_MT_EAU: BT_MT_EAU 
    }
});


