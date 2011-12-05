Ext.define('MainApp.view.panel.PlAllPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.plallpanel',
	id    : 'plallpanel',
  	requires:['MainApp.view.tools.GridPlView'],
	bodyPadding: 5,
	layout: {
        type: 'fit',
        //align: 'center',
        //padding: 5
    	    bodyStyle: "background-image:url(app/images/2.jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;"
    },
	
	initComponent: function() {
		var me = this;
		me.items = [
			{
				xtype: 'gridpl'
			}	
		];
		
		me.callParent(arguments);
  	}
});
