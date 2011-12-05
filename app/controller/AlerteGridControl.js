Ext.define('MainApp.controller.AlerteGridControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.GridAlerteView'],

    init: function() {
        /*this.control({
            'gridalerte' : {
            	cellclick: this.modifier_etat
            }
        });*/
    },
    
    
    modifier_etat: function(a, b, c, d, e, f, g){
		/*console.info(a);
		console.info(b);
		console.info(c);
		console.info(d);
		console.info(e);
		console.info(f);
		console.info(g);*/
		//var target = e.getTarget();
		//if(target.name == "addButton"){
		//	console.info("doStuff");
		//}
	}  
	
});


