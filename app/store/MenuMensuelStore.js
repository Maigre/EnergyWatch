Ext.define('MainApp.store.MenuMensuelStore', {
	extend: 'Ext.data.Store',
	requires: 'MainApp.model.MenuMensuelModel',
	model: 'MainApp.model.MenuMensuelModel', //put more field here like 'idfamille'
	autoSync: true,
	groupField: 'Type',
	groupDir  : 'ASC',
	proxy: {
		type: 'ajax',
		api:{
			read: BASE_URL+'data/menumensuelcontrol/load_all',
		},
		actionMethods : {read: 'POST', update: 'POST'},   	
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success'
		},
		writer:{
			type: 'json',
			encode: 'false',
			writeAllFields: false,
			root: 'data'
		}
	},
	baseParams:{
		BT_MT_EAU: BT_MT_EAU
	}
});


