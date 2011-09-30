Ext.define('MainApp.store.DonneesConsoMTStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.DonneesConsoMTModel',
    model: 'MainApp.model.DonneesConsoMTModel',
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


