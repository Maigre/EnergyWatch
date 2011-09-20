Ext.define('MainApp.controller.ButtonAlerteControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.ButtonAlerteView'],

    init: function() {
        this.control({
            'buttonalerte': {
                click: this.openalerte
            }
        });
    },
    openalerte: function() {
		var plallstore = this.getStore('AlerteAllStore');
		plallstore.load();
		var view1 = Ext.widget('alerteallpanel');
		console.info(Ext.getCmp('centerregion'));
		Ext.getCmp('centerregion').removeAll(false); //clean the center region
		Ext.getCmp('westregion').removeAll();
		
		Ext.getCmp('centerregion').add(view1);
	}   
});
