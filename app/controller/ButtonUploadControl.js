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
		//buttonmt=Ext.getCmp('buttonmt');
		movebutton();
		if(westregion_desappear()){
			Ext.getCmp('centerregion').removeAll(false); //clean the center region
			Ext.getCmp('westregion').removeAll();
	
			var mainuploadpanel = Ext.getCmp('mainuploadpanel');
			if (!mainuploadpanel){
				var mainuploadpanel = Ext.widget('mainuploadpanel');
			}
			Ext.getCmp('centerregion').add(mainuploadpanel);		
		};
		


	}   
});
