Ext.define('MainApp.view.panel.BilanMainPanel', {
	extend: 'Ext.panel.Panel',
	requires: [
		'MainApp.view.panel.BilanValidePanel',
		'MainApp.view.panel.BilanRejetePanel',
		'MainApp.view.panel.BilanAttentePanel',
		'MainApp.view.panel.BilanValidePanel',
		'MainApp.view.panel.BilanNonValideFacturePanel',
		'MainApp.view.panel.BilanValideFacturePanel',
		'MainApp.view.panel.BilanAlertePanel',
		'MainApp.view.panel.BilanAnomaliePanel'
	],
	layout:{
		type:'hbox',
		//flex: 0.5,
		align:'stretch'
		//pack: 'center'
	},
	//width: 300,
	//padding: 5,
	opacity:0,
	bodyStyle: "background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
	//height: 300,
	border:0,
	alias : 'widget.bilanmainpanel',
	id    : 'bilanmainpanel',
	items :  [{
		xtype	: 'panel',
		id	: 'BilanPlPanel',
		title	: 'PL',
		cls	: 'center-header',
		//frame	: true,
		//border	: 0,
		opacity	: 0,
		flex	: 1,
		layout	:{
			type :'vbox',
			align : 'stretch',
		    	pack  : 'start'
		},
		padding	: 30,
		items:[{
			xtype: 'bilanattentepanel',
			flex : 2,
			margin: 10
		},{
			xtype: 'bilanvalidepanel',
			flex : 1,
			margin: 10
		},{
			xtype: 'bilanrejetepanel',
			flex : 1,
			margin: 10
		}]
	},{
		xtype	: 'panel',
		id	: 'BilanFacturesPanel',
		title	: 'Factures',
		flex	: 1,
		padding	: 20,
		layout	:{
			type :'vbox',
			align : 'stretch',
		    	pack  : 'start'
		},
		items   : [{
			xtype: 'bilananomaliepanel',
			flex: 5,
			margin: 10
		},{
			xtype: 'bilanvalidefacturepanel',
			flex: 3,
			margin: 10
		},{
			xtype: 'bilannonvalidefacturepanel',
			flex: 3,
			margin: 10
		}]
	},{
		xtype	: 'panel',
		id	: 'BilanConsoPanel',
		title	: 'Consommation',
		flex	: 1,
		padding	: 30,
		height  : 180,
		layout	:{
			type :'vbox',
			align : 'stretch',
		    	pack  : 'center'
		},
		items   : [{
			xtype: 'bilanalertepanel',
			height: 180,
			margin: 10
		}]
	}],
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});
