Ext.define('MainApp.view.panel.BilanPanel', {
	extend		 : 'Ext.form.Panel',
	alias 		 : 'widget.bilanpanel',
	id           : 'bilanpanel',
	frame 		 : true,
	//height		 : 680,
	width 		 : 400,
	x     		 : 0,
	y     		 : 0,
	url   		 : BASE_URL+'data/bilan/save',
	frame 		 : true,
	title 		 : 'Bilan',
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
			fieldLabel: 'Nombre de Factures &agrave; Payer',
			name      : 'NbAPayer',
			value     : ''
		},{
			fieldLabel: 'Pour un Montant total de (CFA)',
			name      : 'ConsoAPayer',
			value     : ''
		},{
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
		}
	],
	initComponent: function() {
		this.callParent(arguments);
	}
});

