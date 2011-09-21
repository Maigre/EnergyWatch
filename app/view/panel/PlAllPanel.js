Ext.define('MainApp.view.panel.PlAllPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.plallpanel',
	id    : 'plallpanel',
  	requires:['MainApp.view.tools.GridPlView'],
	bodyPadding: 5,
	layout: {
        type: 'fit',
        //align: 'center',
        padding: 5
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
