

Ext.define('MainApp.view.tools.ButtonAnomalieView', {
	extend	: 'Ext.button.Button',
	alias 	: 'widget.buttonanomalie',
	icon	: 'app/images/icons/warning.png',
	//tooltip : 'Alertes',
	scale	: 'large',
	height	: 60,
	width	: 150,
	text	: 'Gestion des Anomalies',
	iconAlign: 'top',
	border	: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


