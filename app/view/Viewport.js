Ext.define('MainApp.view.Viewport', {
    extend: 'Ext.container.Viewport',
	id: 'viewport',
    requires: [
        'MainApp.view.panel.SearchbarPanel',
        'MainApp.view.tools.SearchView',
        'MainApp.view.image.Searchbaricon',
        'MainApp.view.panel.MainPanel',
        'MainApp.view.tools.ButtonHomeView',
        'MainApp.view.tools.ButtonUploadView',
        'MainApp.view.tools.ButtonAlerteView',
        'MainApp.view.panel.UploadMainPanel',
        //'MainApp.view.panel.UploadPanel',
        //'MainApp.view.panel.HistoriqueUploadPanel',
        'MainApp.view.panel.PlFacturePanel',
        'MainApp.view.panel.PlPanel',
        'MainApp.view.panel.PlAllPanel',
        'MainApp.view.panel.PlFactureMTPanel',
        'MainApp.view.panel.AlerteAllPanel'
    ],

    layout: 'border',
 
    initComponent: function() {
        Ext.QuickTips.init();
        this.items = [
        	{
				xtype: 'container',
				id: 'centerregion',
				region: 'center',
				layout: 'fit',
				//bodyPadding: 10,
				items:[{
					xtype: 'plallpanel'
				}]
			},
			{
				xtype: 'container',
				width: 240,
				id: 'westregion',
				layout: 'fit',
				padding: 2,
				region: 'west'/*,
				items:[{
					xtype: 'plpanel'
				}]*/
			},
			{
				xtype: 'panel',
				height: 30,
				//width: 823,
				region: 'south',
				bodyStyle: "background-image:url(app/images/banner_color.png); border:0px;"
			},
			{
				xtype: 'panel',
				height: 62,
				region: 'north',
				bodyStyle: "background-image:url(app/images/ewatch_banner.png); border:0px;",
				layout:{
					type:'hbox',
					align:'stretch'
					//padding: 10
				},
				items:[{
					xtype: 'buttonhome',
					//x: 20,
					//y: 10,
					margins: 10,
					border: 0,
					//height: 62,
					//width: 80
				},{
					xtype: 'buttonupload',
					//x: 80,
					//y: 10,
					margins: 10,
					border: 0,
					//height: 62,
					//width: 80
				},{
					xtype: 'buttonalerte',
					//x: 80,
					//y: 10,
					margins: 10,
					border: 0,
					//height: 62,
					//width: 80
				},{
					xtype: 'panel',
					bodyStyle: "background-image:url(app/images/ewatch_banner.png)",
					//x: 80,
					//y: 10,
					//margins: 10,
					border: 0,
					//height: 62,
					flex:4
				},{
					xtype: 'searchbar',
					//bodyStyle: "background-image:url(app/images/banner_color.png)",
					//x: 1100,
					//align: 'left',
					margins:'20 0 15 0',
					//y:20,
					border: 0,
					flex:1
				},{
					xtype: 'searchbaricon',
					margins: '20 15 17 0',
					flex:0.08
				}]
			}];

        this.callParent();
    }
});
