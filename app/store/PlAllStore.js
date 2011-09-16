Ext.define('MainApp.store.PlAllStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.PlModel',
    model: 'MainApp.model.PlModel',
    remoteSort: true,
    buffered: true,
    pageSize: 200,
    //autoLoad: true,
    proxy: {
    	type: 'ajax',
    	url: BASE_URL+'data/plcontrol/loadall',   
    	extraParams:{
    		total: 50000
    	},
    	actionMethods : {read: 'POST'},   	
    	reader: {
    		type: 'json',
    		root: 'data',
    		totalProperty: 'size',
    		successProperty: 'success'
    	},
    	simpleSortMode: true
    },
	sorters: [{
        property: 'lastpost',
        direction: 'DESC'
    }],
    baseParams: {
        idPl:'' 
    }
});
