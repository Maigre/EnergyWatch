Ext.define('MainApp.view.panel.BilanMainPanel', {
	extend: 'Ext.panel.Panel',
	requires: [
        'MainApp.view.panel.BilanPanel',
        'MainApp.view.panel.BilanActionPanel'
    ],
    layout:{
		type:'hbox',
		align:'middle'
	},
    //width: 300,
    padding: 5,
    opacity:0,
    //height: 300,
    border:0,
	alias : 'widget.bilanmainpanel',
	id    : 'bilanmainpanel',
	items: [{
        xtype: 'bilanpanel',
    },{
        xtype: 'bilanactionpanel',
    }],
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});
