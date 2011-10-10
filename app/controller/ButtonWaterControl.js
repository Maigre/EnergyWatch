Ext.define('MainApp.controller.ButtonWaterControl', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
            'buttonwater': {
                click: this.tensionwater
            }
        });
    },
    tensionwater: function() {
		BT_MT_EAU='EAU';
		Ext.getCmp('westregion').removeAll();
		Ext.getCmp('centerregion').removeAll(false);
		var menumensuelpanel= new Ext.widget('menumensuelpanel');
		var homepanel= Ext.getCmp('homepanel');
		Ext.getCmp('westregion').setWidth(140);
		Ext.getCmp('westregion').add(menumensuelpanel);
		Ext.getCmp('centerregion').add(homepanel);
	}   
});
