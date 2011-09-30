Ext.define('MainApp.controller.ButtonHomeControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.ButtonHomeView'],

    init: function() {
        this.control({
            'buttonhome': {
                click: this.openhome
            }
        });
    },
    openhome: function() {
		/*var plallstore = this.getStore('PlAllStore');
		plallstore.load();
		var view1 = Ext.getCmp('plallpanel');
		if (!view1){
			var view1 = Ext.widget('plallpanel');
		}*/
		
		var homepanel= Ext.getCmp('homepanel');
		if (!homepanel){
			var homepanel = Ext.widget('homepanel');
		}
		
		Ext.getCmp('centerregion').removeAll(false); //clean the center region
		Ext.getCmp('westregion').removeAll();
		Ext.getCmp('westregion').setWidth(0);
		Ext.getCmp('centerregion').add(homepanel);
	}   
});
