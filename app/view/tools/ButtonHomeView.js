//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonHomeView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonhome',
	icon: 'app/images/icons/home.png',
	//tooltip : '',
	scale: 'large',
	height: 40,
	width: 40,
	//text: 'Accueil',
	border: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


