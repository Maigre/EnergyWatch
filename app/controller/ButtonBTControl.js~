Ext.define('MainApp.controller.ButtonBTControl', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
            'buttonbt': {
                click: this.tensionbt
            }
        });
    },
    tensionbt: function() {
		
		//buttonmt=Ext.getCmp('buttonmt');
		movebutton();//define in ButtonMTControl.js
		westregion_appear();
		one_button_pressed('bt');
		
		BT_MT_EAU='BT';
		Ext.getCmp('westregion').removeAll();
		Ext.getCmp('centerregion').removeAll(false);
		var menumensuelpanel= new Ext.widget('menumensuelpanel');
		var homepanel= Ext.getCmp('homepanel');
		
		Ext.getCmp('westregion').add(menumensuelpanel);
		Ext.getCmp('centerregion').add(homepanel);
	}   
});
