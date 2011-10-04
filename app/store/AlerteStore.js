Ext.define('MainApp.store.AlerteStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.AlerteModel',
    model: 'MainApp.model.AlerteModel', //put more field here like 'idfamille'
    autoSync: true,
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/alertecontrol/load',
    		update: BASE_URL+'data/alertecontrol/update',
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
            BT_MT_EAU: BT_MT_EAU
    }
});


