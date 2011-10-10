//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonWaterView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonwater',
	icon: 'app/images/icons/water.png',
	tooltip : 'Eau',
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


