Ext.define('MainApp.controller.ButtonUploadControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.panel.HistoriqueUploadPanel'], //'MainApp.view.tools.ButtonIconView',

    init: function() {
        this.control({
            'buttonupload': {
                click: this.openupload
            }
        });
    },
    openupload: function() {
		movebutton();
		
		if(westregion_desappear()){
			one_button_pressed('upload');
			
			var homepanel= Ext.getCmp('homepanel');
			if (!homepanel){
				var homepanel = Ext.widget('homepanel');
			}
			homepanel.removeAll();
			
			Ext.getCmp('centerregion').removeAll(false); //clean the center region
			Ext.getCmp('westregion').removeAll();
	
			var mainuploadpanel = Ext.getCmp('mainuploadpanel');
			if (!mainuploadpanel){
				var mainuploadpanel = Ext.widget('mainuploadpanel');
			}
			Ext.getCmp('centerregion').add(mainuploadpanel);		
		}

	}   
});
