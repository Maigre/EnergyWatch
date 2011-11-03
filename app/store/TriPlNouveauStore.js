
Ext.define('MainApp.store.TriPlNouveauStore', {
    extend: 'Ext.data.Store',
    storeId : 'triplnouveau',
    requires: 'MainApp.model.TriPlModel',
    model: 'MainApp.model.TriPlModel',
    remoteSort: true,
    buffered: true,
    pageSize: 50,
    //autoLoad: true,
    proxy: {
    	type: 'ajax',
    	url : BASE_URL+'data/triplcontrol/load/nouveau',   
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
				url: BASE_URL+'data/triplcontrol/countresult/nouveau/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE,
				method : 'POST',
				success: function(result){
					Ext.getStore('TriPlNouveauStore').totalCount=result.size;
				}
			});*/
    			this.proxy.url = BASE_URL+'data/triplcontrol/load/nouveau/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE;
    		}
    	},
    	load : {
    		fn : function(){
    			//console.info(Ext.getCmp('nouveauPlGrid').getSelectionModel().selectFirstRow()); //getView().focusRow(0);
    		}
    	},
    	beforeprefetch : {
    		fn : function(){
		//console.info(this.totalCount);
    		}
    	}
    }
});


