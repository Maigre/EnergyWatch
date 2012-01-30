Ext.define('MainApp.view.panel.AnomalieAllPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.anomalieallpanel',
	id    : 'anomalieallpanel',
  	requires:['MainApp.view.tools.GridAnomalieAllView'],
  	//flex  : 1,
  	//padding : 15,
	//bodyPadding: 5,
	border	:0,
	bodyStyle: "background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
	layout: {
        	type: 'vbox',
        	align: 'stretch'
    	},
	initComponent: function() {
		var me = this;
		me.items = [
			{
				xtype: 'gridanomalieall',
				flex : 1				
			}	
		];
		me.callParent(arguments);
  	}
});
