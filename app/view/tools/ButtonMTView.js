//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonMTView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonmt',
	icon: 'app/images/icons/tension_mt.png',
	tooltip : 'Moyenne Tension',
	scale: 'large',
	height: 40,
	width: 40,
	text: '',
	border: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


