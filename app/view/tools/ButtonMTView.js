//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonMTView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonmt',
	icon: 'app/images/icons/MT.png',
	//tooltip : 'Moyenne Tension',
	scale: 'medium',
	height: 40,
	//width: 130,
	width: 40,
	style: "padding-left:6px",
	//text: 'Moyenne Tension',
	border: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


