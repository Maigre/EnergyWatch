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
		Ext.getCmp('buttonuploadheader').hide();
		Ext.getCmp('buttonwaterheader').hide();
		Ext.getCmp('buttonbtheader').hide();
		Ext.getCmp('buttonmtheader').hide();
		
		Ext.getCmp('westregion').removeAll();
		if(westregion_desappear()){
			var homepanel= Ext.getCmp('homepanel');
			if (!homepanel){
				var homepanel = Ext.widget('homepanel');
			}
			homepanel.removeAll(false);
		
			homebuttons=Ext.getCmp('homebuttons');
			if (!homebuttons){
				homebuttons=Ext.widget('homebuttons');
			}
			homepanel.add(homebuttons);
			

			Ext.getCmp('westregion').doLayout();
		
			Ext.getCmp('centerregion').removeAll(false); //clean the center region

			Ext.getCmp('centerregion').add(homepanel);
			
		
			homepanel.animate({
			   	duration: 1000,
			   	easing: 'backIn',
				from: {
					opacity: 0
				},
				to: {
					opacity: 1
				}
			}); 
		}
	}
});
