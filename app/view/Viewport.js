Ext.define('MainApp.view.Viewport', {
    	extend: 'Ext.container.Viewport',
	id: 'viewport',
	//alias : 'widget.viewport',
    	requires: [
	    	'MainApp.view.panel.HomePanel',
	    	'MainApp.view.panel.HomeButtonPanel',
		'MainApp.view.panel.SearchbarPanel',
		'MainApp.view.tools.SearchView',
		'MainApp.view.image.Searchbaricon',
		'MainApp.view.panel.MenuMensuelPanel',
		'MainApp.view.panel.BilanMainPanel',
		
		'MainApp.view.panel.BilanWindow',
		
		'MainApp.view.panel.MainPanel',
		'MainApp.view.tools.ButtonHomeView',
		'MainApp.view.tools.ButtonUploadView',
		'MainApp.view.tools.ButtonAlerteView',
		'MainApp.view.tools.ButtonAnomalieView',
		//'MainApp.view.tools.ButtonFactureNonValideView',
		'MainApp.view.tools.ButtonWaterView',
		'MainApp.view.tools.ButtonMTView',
		'MainApp.view.tools.ButtonMTHeaderView',
		'MainApp.view.tools.ButtonBTHeaderView',
		'MainApp.view.tools.ButtonWaterHeaderView',
		'MainApp.view.tools.ButtonBTView',
		'MainApp.view.tools.ButtonSynchroView',
		'MainApp.view.panel.UploadMainPanel',
		//'MainApp.view.panel.UploadPanel',
		//'MainApp.view.panel.HistoriqueUploadPanel',
		'MainApp.view.panel.PlFacturePanel',
		//'MainApp.view.panel.FactureNonValidePanel',
		'MainApp.view.panel.PlPanel',
		'MainApp.view.tools.ButtonEBatView',
		'MainApp.view.panel.PlAllPanel',
		'MainApp.view.panel.PlFactureMTPanel',        
		'MainApp.view.panel.AnomalieAllPanel',
		'MainApp.view.panel.AlerteAllPanel',
		'MainApp.view.panel.ValidationPanel'
        ],

    	layout: 'border',
 
    	initComponent: function() {
        //Ext.QuickTips.init();
        this.items = [
        	{
				xtype: 'container',
				id: 'centerregion',
				region: 'center',
				layout: 'fit',
				bodyStyle: "padding-left: 2px; padding-right: 2px;",
				items:[{
					xtype: 'homepanel'
				}]
			},
			{
				xtype: 'container',
				width: 0,
				//collapsed: true,
				id: 'westregion',
				layout: 'fit',
				padding: 0,
				region: 'west',
				items:[{
					xtype: 'menumensuelpanel'
				}]
			},
			{
				xtype: 'panel',
				height: 30,
				//width: 823,
				region: 'south',
				id: 'southregion',
				layout:{
					type:'hbox',
					align: 'middle',
					pack: 'center'
				},
				bodyStyle: "background-image:url(app/images/back_top.png); border:0px;  background-repeat:repeat; line-height:30px; text-align:center; font-style: italic;",
				padding: 2,
				html: "EnergyWatch - AirLab 2012"
			},
			{
				xtype: 'panel',
				height: 58,
				region: 'north',
				padding: 2,
				bodyStyle: "background-image:url(app/images/back_top.png); border:0px;  background-repeat:repeat;",
				layout:{
					type:'hbox',
					align:'stretch'
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
					xtype	: 'buttonupload',
					//x: 80,
					//y: 10,
					id	: 'buttonuploadheader',
					hidden	: true,
					margins	: 10,
					border	: 0,
					width   : 38,
					text	: ''
					//height: 62,
					//width: 80
				},{
					xtype	: 'buttonwaterheader',
					//x: 80,
					//y: 10,
					margins	: 10,
					border	: 0,
					hidden	: true,
					id	: 'buttonwaterheader',
					width   : 53,
					text	: '',
					//height: 62,
					//width: 80
				},{
					xtype	: 'buttonbtheader',
					//x: 80,
					//y: 10,
					margins	: 10,
					border	: 0,
					hidden	: true,
					text	: '',
					id	: 'buttonbtheader',
					width   : 53,
					//height: 62,
					//width: 80
				},{
					xtype	: 'buttonmtheader',
					//x: 80,
					//y: 10,
					margins	: 10,
					border	: 0,
					hidden	: true,
					text	: '',
					id	: 'buttonmtheader',
					width   : 53
					//height: 62,
					//width: 80
				},{
					xtype: 'panel',
					bodyStyle: "background-image:url(app/images/back_mid.png); background-color: transparent; background-repeat:no-repeat; background-position:center;",
					//x: 80,
					//y: 10,
					//margins: 10,
					border: 0,
					//height: 62,
					flex:4
				},{
					xtype	: 'searchbar',
					id	: 'searchbar',
					//x: 1100,
					//align: 'left',
					margins	:'20 0 15 0',
					//y:20,
					border	: 0,
					flex	:1
				},{
					xtype	: 'searchbaricon',
					margins	: '23 15 17 -25'
				},{
					xtype	: 'buttonsynchro',
					margins	: 10,
					scale	: 'medium'
				}]
			}];

        this.callParent();
    }
});
