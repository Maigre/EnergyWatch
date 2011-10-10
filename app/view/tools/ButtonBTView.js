Ext.define('MainApp.view.tools.ButtonBTView', {
	extend: 'Ext.button.Button',
	alias : 'widget.buttonbt',
	icon: 'app/images/icons/tension_bt.png',
	tooltip : 'Basse Tension',
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


