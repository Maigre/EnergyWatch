Ext.define('MainApp.view.panel.BilanNonValideFacturePanel', {
	extend		 : 'Ext.form.Panel',
	alias 		 : 'widget.bilannonvalidefacturepanel',
	id           	 : 'bilannonvalidefacturepanel',
	frame 		 : true,
	iconCls		 : 'no',
	height		 : 100,
	width 		 : 150,
	x     		 : 0,
	y     		 : 0,
	url   		 : BASE_URL+'data/bilan/save',
	frame 		 : true,
	title 		 : 'NON VALIDE',
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
			name      : 'NbRejete'
			//,value     : ''
		},{
			fieldLabel: '',
			//hideLabel : true,
			name      : 'ConsoRejete'
			//,value     : ''
		}
	],
	initComponent: function() {
		this.callParent(arguments);
	}
});

