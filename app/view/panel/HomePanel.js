///SEARCHBAR PANEL///
///fichiers à joindre: 
//->app/view/UploadPanel.js & HistoriqueUploadPanel.js
//->app/model/


Ext.define('MainApp.view.panel.HomePanel', {
	extend: 'Ext.panel.Panel',
	requires: [
        'MainApp.view.panel.UploadPanel'
    ],
    layout:{
		type:'hbox',
		align: 'middle',
		pack: 'center'
	},
	bodyStyle: "background-image:url(app/images/home_page.png); background-repeat:no-repeat; background-position:center center;",
    //width: 300,
    //split: true,
    padding: 5,
    opacity:0,
    //height: 300,
    border:0,
	alias : 'widget.homepanel',
	id    : 'homepanel',/*
	items: [{
		xtype: 'buttonmt'
	},{
		xtype: 'buttonbt'
	},{
		xtype: 'buttonwater'
	}],*/
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});
