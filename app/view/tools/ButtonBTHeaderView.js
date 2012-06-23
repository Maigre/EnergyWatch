//Controlled by ButtonMTControl.js

Ext.define('MainApp.view.tools.ButtonBTHeaderView', {
	extend 	: 'Ext.button.Split',
	id	: 'buttonbtheader',	
	alias  	: 'widget.buttonbtheader',
	icon 	: 'app/images/icons/BT.png',
	tip 	: 'BT',
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


