Ext.define('MainApp.view.panel.BilanAttentePanel', {
	extend		 : 'Ext.form.Panel',
	alias 		 : 'widget.bilanattentepanel',
	id           : 'bilanattentepanel',
	frame 		 : true,
	iconCls		 : 'help',
	height		 : 150,
	width 		 : 150,
	x     		 : 0,
	y     		 : 0,
	url   		 : BASE_URL+'data/bilan/save',
	frame 		 : true,
	title 		 : 'EN ATTENTE',
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
			fieldLabel: 'A payer',
			hideLabel : true,
			name      : 'NbAttente'
			//,value     : ''
		},{
			fieldLabel: '',
			hideLabel : true,
			name      : 'ConsoAttente',
			renderer  : Ext.util.Format.numberRenderer('0,000.00')
			//,value     : ''
		},{
			xtype	  : 'buttonvalidation'
		}
	],
	initComponent: function() {
		this.callParent(arguments);
	}
});

