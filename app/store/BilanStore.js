Ext.define('MainApp.store.BilanStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.BilanModel',
    model: 'MainApp.model.BilanModel',
    
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/bilan/load',
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
