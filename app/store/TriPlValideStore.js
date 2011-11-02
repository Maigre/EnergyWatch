Ext.define('MainApp.store.TriPlValideStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.TriPlModel',
    model: 'MainApp.model.TriPlModel', //put more field here like 'idfamille'
    autoSync: true,
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/triplcontrol/load/valide',
    		create: BASE_URL+'data/triplcontrol/save/valide',
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
            BT_MT_EAU: BT_MT_EAU 
    }
});
Ext.define('MainApp.store.TriPlValideStore', {
    extend: 'Ext.data.Store',
    requires: 'MainApp.model.TriPlModel',
    model: 'MainApp.model.TriPlModel',
    remoteSort: true,
    buffered: true,
    pageSize: 50,
    //autoLoad: true,
    proxy: {
    	type: 'ajax',
    	url : BASE_URL+'data/triplcontrol/load/valide',   
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
				url: BASE_URL+'data/triplcontrol/countresult/valide/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE,
				method : 'POST'/,
				success: function(result){
					Ext.getStore('TriPlValideStore').totalCount=result.size;
				}
			});*/
    			this.proxy.url = BASE_URL+'data/triplcontrol/load/valide/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE;
    		}
    	},
    	load : {
    		fn : function(){
    			//console.info('validetotalcount');
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


