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
	bodyStyle: "background-image:url(app/images/2.jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
    //width: 300,
    //split: true,
    padding: 0,
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
