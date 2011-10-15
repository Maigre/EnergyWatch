//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonValidationView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonvalidation',
	icon: 'app/images/icons/tri_coloured.png',
	iconAlign: 'top',
	text: 'Validation',
	tooltip : 'Validation P.L',
	scale: 'large',
	height: 60,
	width: 60,
	border: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


