Ext.define('MainApp.view.panel.PlFacturePanel', {
	extend: 'Ext.panel.Panel',
	requires:['MainApp.view.tools.ChartLinesView','MainApp.view.tools.GridFactureView','MainApp.view.tools.GridAlerteView'],
	alias : 'widget.plfacturepanel',
	bodyPadding: 5,
	layout: {
        type: 'vbox',
        align: 'stretch',
        //padding: 5,
    },
	//baseCls: 'x-box',
	
	initComponent: function() {
		var me = this;
		me.items = [
			{
				xtype: 'facturechart'
			},{
				xtype: 'gridfacture',
				padding:5,
				flex:2
			},{
				xtype: 'gridalerte',
				padding:5,
				flex:1
			}
				
		];
		me.callParent(arguments);
  	}
});
