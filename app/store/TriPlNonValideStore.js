/*Ext.define('MainApp.store.TriPlNonValideStore', {
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
});*/

Ext.define('MainApp.store.TriPlNonValideStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.TriPlModel',
    model: 'MainApp.model.TriPlModel',
    remoteSort: true,
    buffered: true,
    pageSize: 50,
    //autoLoad: true,
    proxy: {
    	type: 'ajax',
    	url : BASE_URL+'data/triplcontrol/load/nonvalide',   
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
    listeners: {
    	beforeload : {
    		fn : function(){
    			/*Ext.Ajax.request({
				url: BASE_URL+'data/triplcontrol/countresult/nonvalide/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE,
				method : 'POST',
				success: function(result){
					result=Ext.decode(result.responseText);
					console.info('result.size');
					console.info(result.size);
					
					console.info('avant');
					console.info(Ext.getStore('TriPlNonValideStore').totalCount);
					
					Ext.getStore('TriPlNonValideStore').guaranteedEnd=result.size;
					Ext.getStore('TriPlNonValideStore').guaranteedStart=0;
					Ext.getStore('TriPlNonValideStore').totalCount=result.size;
					console.info('apres');
					console.info(Ext.getStore('TriPlNonValideStore').totalCount);
					
				}
			});*/
    			this.proxy.url = BASE_URL+'data/triplcontrol/load/nonvalide/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE;
    		}
    	},
    	beforeprefetch : {
    		fn : function(){
    			//console.info(this.totalCount);
    		}
    	}
    }
});


