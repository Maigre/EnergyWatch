///SEARCHBAR PANEL///
///fichiers à joindre: 
//->app/view/Searchbar.js & Searchbaricon.js
//->app/model/


Ext.define('MainApp.view.panel.SearchbarPanel', {
	extend: 'Ext.panel.Panel',
	requires: [
        'MainApp.view.tools.SearchView',
        'MainApp.view.image.Searchbaricon'
    ],
    layout: {
        type: 'hbox'
    },
    width: 300,
    height: 22,
    border:0,
    margins: '20 0 0 15',
	alias : 'widget.searchbarpanel',
	items: [{
        xtype: 'searchbar',
        bodyStyle: "background-image:url(app/images/banner_color.png)"					
    }, {
        xtype: 'searchbaricon',
        bodyStyle: "background-image:url(app/images/banner_color.png)"					
    }],
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});
