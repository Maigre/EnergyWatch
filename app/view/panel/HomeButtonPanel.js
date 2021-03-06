Ext.define('MainApp.view.panel.HomeButtonPanel', {
	extend: 'Ext.panel.Panel',
	id   : 'homebuttons',
	alias: 'widget.homebuttons',
	flex :1,
	bodyStyle: "background-color: transparent;",
	border: 0,
	layout:{
		type:'hbox',
		//align: 'middle',
		pack: 'center'
	},
	defaults : {
		margins : 70
	},
	items: [{
		flex:1,
		xtype: 'buttonupload',
		//margins : 20
	},{
		flex:1,
		xtype: 'buttonwater',
		margins: '70 30 70 100'
	},{
		flex:1,
		xtype: 'buttonbt'
	},{
		flex:1,
		xtype: 'buttonmt'
	}]			
});
