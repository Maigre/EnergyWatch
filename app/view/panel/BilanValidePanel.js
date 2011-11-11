Ext.define('MainApp.view.panel.BilanValidePanel', {
	extend		 : 'Ext.form.Panel',
	alias 		 : 'widget.bilanvalidepanel',
	id           : 'bilanvalidepanel',
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
			name      : 'NbAPayer'
			//,value     : ''
		},{
			fieldLabel: '',
			//hideLabel : true,
			name      : 'ConsoAPayer'
			//,value     : ''
		}/*,{
			fieldLabel: 'Nombre de Factures Rejet&eacute;es',
			name      : 'NbRejete',
			value     : ''
		},{
			fieldLabel: 'Pour un Montant total de (CFA)',
			name      : 'ConsoRejete',
			value     : ''
		},{
			fieldLabel: 'Nombre de Factures en Attente de Validation',
			name      : 'NbAttente',
			value     : '',
			cls 	  : 'red'
		},{
			fieldLabel: 'Pour un Montant total de (CFA)',
			name      : 'ConsoAttente',
			value     : ''
		},{
			fieldLabel: 'Nombre d\'Alertes Actives', 
			name      : 'NbAlerteActive',
			cls 	  : 'red',
			value     : ''
		}*/
	],
	initComponent: function() {
		this.callParent(arguments);
	}
});

