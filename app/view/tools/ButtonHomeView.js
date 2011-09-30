//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonHomeView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonhome',
	icon: 'app/images/icons/home_coloured.png',
	tooltip : 'Accueil',
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


