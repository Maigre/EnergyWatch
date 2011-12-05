///SEARCHBAR PANEL///
///fichiers à joindre: 
//->app/view/Searchbar.js & Searchbaricon.js
//->app/model/


Ext.define('MainApp.view.panel.MainPanel', {
	extend: 'Ext.panel.Panel',
	requires: [
        'MainApp.view.tools.GridFactureView'
    ],
    layout:{
		type:'fit'
	},
    //width: 300,
    //height: 240,
    border:0,
	alias : 'widget.mainpanel',
	items: [{
        xtype: 'gridfacture',
    }],
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});
