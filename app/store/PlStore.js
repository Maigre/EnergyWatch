Ext.define('MainApp.store.PlStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.PlModel',
    model: 'MainApp.model.PlModel',
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/plcontrol/load',
    	},
    	actionMethods : {read: 'POST'},   	
    	reader: {
    		type: 'json',
    		root: 'data',
    		totalProperty: 'size',
    		successProperty: 'success'
    	}
    },
    baseParams: {
        idPl:'' 
    }
});
