Ext.define('MainApp.controller.ButtonIconControl', {
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
		var view1 = Ext.widget('mainuploadpanel');
		Ext.getCmp('centerregion').removeAll(); //clean the center region
		Ext.getCmp('centerregion').add(view1);
	}   
});
