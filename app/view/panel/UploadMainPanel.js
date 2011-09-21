///SEARCHBAR PANEL///
///fichiers à joindre: 
//->app/view/UploadPanel.js & HistoriqueUploadPanel.js
//->app/model/


Ext.define('MainApp.view.panel.UploadMainPanel', {
	extend: 'Ext.panel.Panel',
	requires: [
        'MainApp.view.panel.UploadPanel',        
        'MainApp.view.panel.HistoriqueUploadPanel'
    ],
    layout:{
		type:'hbox',
		align:'middle'
	},
    //width: 300,
    padding: 5,
    opacity:0,
    height: 240,
    border:0,
	alias : 'widget.mainuploadpanel',
	id    : 'mainuploadpanel',
	items: [{
        xtype: 'uploadpanel',
    	},{
        xtype: 'historiqueupload',
    }],
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});
