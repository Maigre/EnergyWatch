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
		
		var homepanel= Ext.getCmp('homepanel');
		if (!homepanel){
			var homepanel = Ext.widget('homepanel');
		}
		homepanel.removeAll(false);
		
		buttonupload=Ext.getCmp('buttonupload');
		homepanel.add(buttonupload);
		buttonwater=Ext.getCmp('buttonwater');
		homepanel.add(buttonwater);
		buttonbt=Ext.getCmp('buttonbt');
		homepanel.add(buttonbt);
		buttonmt=Ext.getCmp('buttonmt');
		homepanel.add(buttonmt);
		

		//homepanel.doLayout();
		
		Ext.getCmp('centerregion').removeAll(false); //clean the center region
		Ext.getCmp('westregion').removeAll();
		westregion_desappear();
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
});
