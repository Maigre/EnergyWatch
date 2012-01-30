Ext.define('MainApp.store.AnomalieStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.AnomalieModel',
    model: 'MainApp.model.AnomalieModel', //put more field here like 'idfamille'
    autoSync: true,
    groupField: 'Type',
    groupDir  : 'ASC',
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/anomaliecontrol/load',
    		update: BASE_URL+'data/anomaliecontrol/update',
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


