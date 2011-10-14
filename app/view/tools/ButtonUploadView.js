//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonUploadView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonupload',
	icon: 'app/images/icons/upload.png',
	//tooltip : 'Importer nouvelles factures',
	scale: 'medium',
	height: 40,
	//width: 125,
	width: 40,
	style: "padding-left:9px",
	//text: 'Importer Factures',
	border: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


