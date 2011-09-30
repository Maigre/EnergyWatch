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
		Ext.getCmp('centerregion').removeAll(false); //clean the center region
		Ext.getCmp('westregion').removeAll();
		
		Ext.getCmp('westregion').setWidth(0);

		var mainuploadpanel = Ext.getCmp('mainuploadpanel');
		if (!mainuploadpanel){
			var mainuploadpanel = Ext.widget('mainuploadpanel');
		}
		Ext.getCmp('centerregion').add(mainuploadpanel);
		//var panel1 = Ext.widget('historiqueupload');
		//console.info(panel1);
		//console.info(view1);
		//view1.el.highlight();
		/*Ext.getCmp('centerregion').animate({
			easing: 'easeIn',
		    duration: 2000,
		    from: {
		    	opacity:0,
		    },
		    to: {
		        opacity:1,
		    }
		});*/
	}   
});
