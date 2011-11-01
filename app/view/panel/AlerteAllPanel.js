Ext.define('MainApp.view.panel.AlerteAllPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.alerteallpanel',
	id    : 'alerteallpanel',
  	requires:['MainApp.view.tools.GridAlerteAllView'],
  	//padding : 15,
	//bodyPadding: 5,
	bodyStyle: "background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
	layout: {
        type: 'fit'
        //align: 'center',
        //padding: 5
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
