Ext.define('MainApp.controller.PlPanelControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.panel.PlPanel'],

    init: function() {
        this.control({
            'plpanel' : {
            	click: this.edit
            }
        });
    },
    
    
    edit: function(a,b,c,d) {
		console.info(a);
		console.info(b);
		console.info(c);
		console.info(d);
		
		
	}   
	
});
