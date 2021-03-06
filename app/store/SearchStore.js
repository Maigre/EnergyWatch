Ext.define('MainApp.store.SearchStore', {
    extend: 'Ext.data.Store',
    fields: ['id', 'todisplay', 'tension'], //put more field here like 'idfamille'
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/search/sc',
    	},
    	actionMethods : {read: 'POST'},   	
    	reader: {
    		type: 'json',
    		root: 'data',
    		successProperty: 'success'
    	}
    },
    baseParams: {
            text_search:'' 
    }
});


