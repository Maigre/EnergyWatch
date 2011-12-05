Ext.define('MainApp.view.panel.BilanAlertePanel', {
	extend		 : 'Ext.form.Panel',
	alias 		 : 'widget.bilanalertepanel',
	id           : 'bilanalertepanel',
	frame 		 : true,
	iconCls		 : 'alert',
	height		 : 150,
	width 		 : 140,
	x     		 : 0,
	y     		 : 0,
	url   		 : BASE_URL+'data/bilan/save',
	frame 		 : true,
	title 		 : 'ALERTES',
	bodyPadding  : 10,
	margin       : 50,
	method       : 'post',
	trackResetOnLoad : 'true',
	fieldDefaults: {
		msgTarget: 'side',
		labelWidth: 200,
		allowBlank:false
	},
	defaultType  : 'displayfield',
	defaults     : {
		anchor: '100%'
	},
	items 		 : [{
			fieldLabel: '',
			hideLabel : true,
			name      : 'NbAlerteActive'
			//,value     : ''
		},{
			xtype	  : 'buttonalerte'
		}
	],
	initComponent: function() {
		this.callParent(arguments);
	}
});

