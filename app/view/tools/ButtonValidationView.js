//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonValidationView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonvalidation',
	icon: 'app/images/icons/tri.png',
	tooltip : 'Validation P.L',
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


