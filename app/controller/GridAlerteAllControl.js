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
		
		//console.info(a);
		//console.info(b);
		//console.info(c);
		//var plstore = Ext.getStore('PlStore');
		
		//plstore.proxy.api.read= BASE_URL+'data/plcontrol/loadfromalertegroupping/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE; 
		
		//selecteditems = Ext.getCmp('gridalerteall').getSelectionModel().getSelection();	
		//console.info(selecteditems);
		//console.info(a);
		//console.info(b);
		//console.info(b.data.idPl);
		displaypl(b.data.idPl,BT_MT_EAU);	
	} 
});
