Ext.define('MainApp.controller.GridAlerteAllControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.GridAlerteAllView'],

    init: function() {
        this.control({
            'gridalerteall' : {
            	itemclick: this.gotopl
            }
        });
    },
    
    gotopl: function(a,b,c,d) {
		
		console.info(a);
		console.info(b);
		//console.info(c);	
		console.info(b.data);
		console.info(b.data.idPl);
		displaypl(b.data.idPl,BT_MT_EAU);	
	} 
});
