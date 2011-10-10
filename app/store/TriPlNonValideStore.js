Ext.define('MainApp.store.TriPlNonValideStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.TriPlModel',
    model: 'MainApp.model.TriPlModel', //put more field here like 'idfamille'
    autoSync: true,
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/triplcontrol/load/nonvalide',
    		create: BASE_URL+'data/triplcontrol/save/nonvalide',
    		destroy: BASE_URL+'data/triplcontrol/destroy'
    	},
    	actionMethods : {read: 'POST', update: 'POST'},   	
    	reader: {
    		type: 'json',
    		root: 'data',
    		successProperty: 'success'
    	},
		writer: {
			type: 'json',
			encode: 'false',
			writeAllFields: false,
			root: 'data'
		}
    },
    baseParams: {
            text_search:'' 
    }
});


