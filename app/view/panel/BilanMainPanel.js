Ext.define('MainApp.view.panel.BilanMainPanel', {
	extend: 'Ext.panel.Panel',
	requires: [
        'MainApp.view.panel.BilanPanel',
        'MainApp.view.panel.BilanActionPanel'
    ],
    layout:{
		type:'hbox',
		align:'middle',
		pack: 'center'
	},
    //width: 300,
    //padding: 5,
    opacity:0,
        bodyStyle: "background-image:url(app/images/2.jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
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