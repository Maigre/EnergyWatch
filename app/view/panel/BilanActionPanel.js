Ext.define('MainApp.view.panel.BilanActionPanel', {
	extend: 'Ext.panel.Panel',
	requires: [
        'MainApp.view.tools.ButtonValidationView'
    ],
    layout:{
		type:'vbox'
	},
	frame: true,
    width: 84,
    padding: 10,
    bodyPadding: 0,
    opacity:0,
    height: 140,
    border:0,
	alias : 'widget.bilanactionpanel',
	id    : 'bilanactionpanel',
	items: [{
        xtype: 'buttonvalidation',
        margins : 10
    },{
        xtype: 'buttonalerte',
        margins : 10
    }],
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});
