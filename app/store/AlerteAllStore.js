Ext.define('MainApp.store.AlerteAllStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.AlerteModel',
    model: 'MainApp.model.AlerteModel',
    remoteSort: true,
    remoteGroup : true,
    buffered: true,
    pageSize: 100,
    groupField: 'Type',
    groupDir  : 'ASC',
    //autoLoad: true,
    proxy: {
    	type: 'ajax',
    	url: BASE_URL+'data/alertecontrol/loadall',   
    	extraParams:{
    		total: 50000
    	},
    	actionMethods : {read: 'POST'},   	
    	reader: {
    		type: 'json',
    		root: 'data',
    		totalProperty: 'size',
    		successProperty: 'success'
    	}/*,
    	simpleSortMode: true*/
    },
    baseParams: {
        BT_MT_EAU: BT_MT_EAU 
    }
});
