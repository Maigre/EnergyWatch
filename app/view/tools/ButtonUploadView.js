//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonUploadView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonupload',
	icon: 'app/images/icons/go-up.png',
	tooltip : 'Importer nouvelles factures',
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


