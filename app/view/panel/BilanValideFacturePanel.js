Ext.define('MainApp.view.panel.BilanValideFacturePanel', {
	extend		 : 'Ext.form.Panel',
	alias 		 : 'widget.bilanvalidefacturepanel',
	id           	 : 'bilanvalidefacturepanel',
	frame 		 : true,
	iconCls		 : 'yes',
	height		 : 100,
	width 		 : 150,
	x     		 : 0,
	y     		 : 0,
	url   		 : BASE_URL+'data/bilan/save',
	frame 		 : true,
	title 		 : 'VALIDE',
	bodyPadding  : 10,
	//margin       : 50,
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
			fieldLabel: 'A payer',
			hideLabel : true,
			name      : 'NbAPayer'
			//,value     : ''
		},{
			fieldLabel: '',
			//hideLabel : true,
			name      : 'ConsoAPayer'
			//,value     : ''
		}
	],
	initComponent: function() {
		this.callParent(arguments);
	}
});

