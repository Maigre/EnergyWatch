Ext.define('MainApp.view.panel.AlerteAllPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.alerteallpanel',
	id    : 'alerteallpanel',
  	requires:['MainApp.view.tools.GridAlerteAllView'],
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
				xtype: 'gridalerteall'
			}	
		];
		
		me.callParent(arguments);
  	}
});
