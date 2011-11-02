/*Ext.define('MainApp.store.TriPlNonValideAgainStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.TriPlModel',
    model: 'MainApp.model.TriPlModel', //put more field here like 'idfamille'
    autoSync: true,
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/triplcontrol/load/nonvalideagain',
    		create: BASE_URL+'data/triplcontrol/save/nonvalideagain',
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

Ext.define('MainApp.store.TriPlNonValideAgainStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.TriPlModel',
    model: 'MainApp.model.TriPlModel',
    remoteSort: true,
    buffered: true,
    pageSize: 50,
    base_url: BASE_URL+'data/triplcontrol/load/nonvalideagain',
    //autoLoad: true,
    proxy: {
    	type: 'ajax',
    	url : BASE_URL+'data/triplcontrol/load/nonvalideagain',   
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
				url: BASE_URL+'data/triplcontrol/countresult/nonvalideagain/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE,
				method : 'POST',
				success: function(result){
					result=Ext.decode(result.responseText);
					//console.info(result);
					//console.info('result.size');
					//console.info(result.size);
					Ext.getStore('TriPlNonValideAgainStore').totalCount=result.size;
					//console.info('totalcountnonvalide');
					//console.info(Ext.getStore('TriPlNonValideAgainStore').totalCount);
					
				}
			});*/
    			this.proxy.url = BASE_URL+'data/triplcontrol/load/nonvalideagain/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE;
    		}
    	},
    	load : {
    		fn : function(){
    			//console.info('novalideagaintotalcount');
    			//console.info(this.totalCount);
    		}
    	},
    	beforeprefetch : {
    		fn : function(){
    			//console.info(this.totalCount);
    		}
    	}
    }
});


