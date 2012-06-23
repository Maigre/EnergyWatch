Ext.define('MainApp.controller.ButtonBTControl', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
            'buttonbt': {
                click: this.tensionbt
            },
            'buttonbtheader': {
                click: this.tensionbt
            }
        });
    },
    tensionbt: function() {
		
		//buttonmt=Ext.getCmp('buttonmt');
		if (movebutton()==true){
			westregion_appear();
			add_menu_splitbutton();
		}
		one_button_pressed('bt');
		
		BT_MT_EAU='BT';
		Ext.getCmp('westregion').removeAll();
		Ext.getCmp('centerregion').removeAll(false);
		var menumensuelpanel= new Ext.widget('menumensuelpanel');
		var homepanel= Ext.getCmp('homepanel');
		homepanel.removeAll(false);
		Ext.getCmp('westregion').add(menumensuelpanel);
		Ext.getCmp('centerregion').add(homepanel);
	}
});
