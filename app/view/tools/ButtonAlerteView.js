//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonAlerteView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonalerte',
	icon: 'app/images/icons/alertes_mini.png',
	//tooltip : 'Alertes',
	scale: 'large',
	height: 40,
	width: 120,
	text: 'Gestion des Alertes',
	border: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


