Ext.define('MainApp.store.FactureMTStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.FactureMTModel',
    model: 'MainApp.model.FactureMTModel',
    
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/facture/load',
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
