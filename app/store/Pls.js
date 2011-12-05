Ext.define('MainApp.store.Pls', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.Pl',
    model: 'MainApp.model.Plmodel',
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/pl/load',
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
