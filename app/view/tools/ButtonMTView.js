//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonMTView', {
	extend 	: 'Ext.button.Button',
	id		: 'buttonmt',	
	alias  	: 'widget.buttonmt',
	icon 	: 'app/images/icons/MT.png',
	tip 	: 'MT',
	scale	: 'medium',
	enableToggle : true,
	height	: 40,
	width	: 130,
	style	: "padding-left:6px",
	text	: 'Moyenne Tension',
	border	: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


