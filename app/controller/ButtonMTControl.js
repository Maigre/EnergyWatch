Ext.define('MainApp.controller.ButtonMTControl', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
            'buttonmt': {
                click: this.tensionmt
            }
        });
    },
    tensionmt: function() {
		BT_MT_EAU='MT';
		Ext.getCmp('westregion').removeAll();
		Ext.getCmp('centerregion').removeAll(false);
		var menumensuelpanel= new Ext.widget('menumensuelpanel');
		var homepanel= Ext.getCmp('homepanel');
		Ext.getCmp('westregion').setWidth(140);
		Ext.getCmp('westregion').add(menumensuelpanel);
		Ext.getCmp('centerregion').add(homepanel);
	}   
});
