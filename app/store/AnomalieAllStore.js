Ext.define('MainApp.store.AnomalieAllStore', {
	extend: 'Ext.data.Store',
	requires: 'MainApp.model.AnomalieModel',
	model: 'MainApp.model.AnomalieModel',
	remoteSort: true,
	remoteGroup : true,
	buffered: true,
	pageSize: 100,
	groupField: 'Type',
	groupDir  : 'ASC',
	//autoLoad: true,
	proxy:{
		type: 'ajax',
		url: BASE_URL+'data/anomaliecontrol/loadall',   
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
