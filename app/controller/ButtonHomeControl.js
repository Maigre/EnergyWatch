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
		var plallstore = this.getStore('PlAllStore');
		plallstore.load();
		var view1 = Ext.widget('plallpanel');
		console.info(Ext.getCmp('centerregion').items.items[0]);
		//Ext.getCmp('centerregion').items.items[0].close();
		
		//view1.close();
		//Ext.getCmp('centerregion').clearListeners();
		Ext.getCmp('centerregion').removeAll(false); //clean the center region
		console.info(Ext.getCmp('westregion'));
		Ext.getCmp('westregion').removeAll();
		console.info(Ext.getCmp('westregion'));
		Ext.getCmp('centerregion').add(view1);
	}   
});
