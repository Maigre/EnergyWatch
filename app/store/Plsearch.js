Ext.define('MainApp.store.Plsearch', {
    extend: 'Ext.data.Store',
    fields: ['id', 'todisplay'], //put more field here like 'idfamille'
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


