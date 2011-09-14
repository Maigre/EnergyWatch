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
		console.info(Ext.getCmp('centerregion'));
		Ext.getCmp('centerregion').clearListeners();
		Ext.getCmp('centerregion').removeAll(); //clean the center region
		Ext.getCmp('westregion').removeAll();
		
		Ext.getCmp('centerregion').add(view1);
	}   
});
