Ext.define('MainApp.controller.GridAlerteAllControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.GridAlerteAllView'],

    init: function() {
        this.control({
            'gridalerteall' : {
            	cellclick: this.gotopl
            }
        });
    },
    
    gotopl: function(a,b,c,d) {
			
		displaypl(d.data.idPl,BT_MT_EAU);	
	} 
});
