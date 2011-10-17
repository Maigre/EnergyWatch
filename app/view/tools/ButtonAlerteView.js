//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonAlerteView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonalerte',
	icon: 'app/images/icons/warning.png',
	//tooltip : 'Alertes',
	scale: 'large',
	height: 60,
	width: 150,
	text: 'Gestion des Alertes',
	iconAlign: 'top',
	border: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


