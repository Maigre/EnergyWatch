Ext.define('MainApp.store.BilanPeriodeStore', {
	extend: 'Ext.data.Store',
	requires: 'MainApp.model.BilanPeriodeModel',
	model: 'MainApp.model.BilanPeriodeModel', //put more field here like 'idfamille'
	autoSync: true,
	groupField: 'Type',
	groupDir  : 'ASC',
	proxy: {
		type: 'ajax',
		api:{
			read: BASE_URL+'data/bilan/bilan_periode',
		},
		actionMethods : {read: 'POST', update: 'POST'},
		reader: {
	    		type: 'json',
	    		root: 'data',
	    		successProperty: 'success'
	    	},   	
	},
	baseParams:{
		BT_MT_EAU: BT_MT_EAU
	}
});


