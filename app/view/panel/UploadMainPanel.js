///SEARCHBAR PANEL///
///fichiers à joindre: 
//->app/view/UploadPanel.js & HistoriqueUploadPanel.js
//->app/model/


Ext.define('MainApp.view.panel.UploadMainPanel', {
	extend	: 'Ext.panel.Panel',
	requires: [
		'MainApp.view.panel.UploadPanel',        
		'MainApp.view.panel.HistoriqueUploadPanel'
	],
	layout	: {
		type	: 'hbox',
		align	: 'middle',
		pack	: 'center'
	},
	opacity	:0,
	bodyStyle: "background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
	border	:0,
	alias 	: 'widget.mainuploadpanel',
	id    	: 'mainuploadpanel',
	items	: [{
        	xtype	: 'uploadpanel',
    	},{
        	xtype	: 'historiqueupload',
    	}],	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});
