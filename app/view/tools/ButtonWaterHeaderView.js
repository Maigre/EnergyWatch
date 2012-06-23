//Controlled by ButtonMTControl.js

Ext.define('MainApp.view.tools.ButtonWaterHeaderView', {
	extend 	: 'Ext.button.Split',
	id	: 'buttonbtheader',	
	alias  	: 'widget.buttonwaterheader',
	icon 	: 'app/images/icons/water.png',
	tip 	: 'Eau',
	scale	: 'medium',
	enableToggle : true,
	height	: 40,
	width	: 53,
	style	: "padding-left:6px",
	text	: 'Moyenne Tension',
	border	: 0,
	menu: new Ext.menu.Menu({
		
    	}),
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


