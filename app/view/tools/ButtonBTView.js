Ext.define('MainApp.view.tools.ButtonBTView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonbt',
	id: 'buttonbt',
	icon: 'app/images/icons/BT.png',
	//tooltip : 'Basse Tension',
	scale: 'medium',
	height: 40,
	//width: 115,
	style: "padding-left:9px",
	width: 40,
	//text: 'Basse Tension',
	border: 0,
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


