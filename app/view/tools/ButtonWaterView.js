//Controlled by UploadControl.js

Ext.define('MainApp.view.tools.ButtonWaterView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonwater',
	icon: 'app/images/icons/water.png',
	cls: 'x-btn-text-icon',
	//tooltip : 'Eau',
	scale: 'medium',
	height: 40,
	//width: 72,
	width: 40,
	style: "padding-left:6px",
	//text: 'Eau',
	border: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


