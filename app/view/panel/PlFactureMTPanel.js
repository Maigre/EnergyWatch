Ext.define('MainApp.view.panel.PlFactureMTPanel', {
	extend: 'Ext.panel.Panel',
	requires:['MainApp.view.tools.ChartLinesMTView','MainApp.view.tools.GridFactureMTView','MainApp.view.tools.GridAlerteView'],
	alias : 'widget.plfacturemtpanel',
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
				xtype: 'facturemtchart'
			},{
				xtype: 'gridfacturemt',
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
