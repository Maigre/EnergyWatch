Ext.define('MainApp.store.FactureStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.FactureBTModel',
    model: 'MainApp.model.FactureBTModel',
    
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
        idPl:'' 
    }
});
