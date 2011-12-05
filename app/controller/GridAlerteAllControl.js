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
		console.info(b.data.AlGrouped);
		store=Ext.getStore('AlerteStore');
		Ext.Ajax.request({
		    url: BASE_URL+'data/alertecontrol/giveplid',
		    params: {
			id: b.data.id,
			BT_MT_EAU: BT_MT_EAU,
			PERIODE_MENSUELLE: PERIODE_MENSUELLE
		    },
		    success: function(response){
			var idpl = Ext.decode(response.responseText).idPl;
			
			console.info(idpl);
			console.info(idpl.idPl);
			
			displaypl(idpl,BT_MT_EAU);
		    }
		});
		//console.info(c);
		//var plstore = Ext.getStore('PlStore');
		
		//plstore.proxy.api.read= BASE_URL+'data/plcontrol/loadfromalertegroupping/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE; 
		
		//selecteditems = Ext.getCmp('gridalerteall').getSelectionModel().getSelection();	
		//console.info(selecteditems);
		//console.info(a);
		//console.info(b);
		//console.info(b.data.idPl);	
	} 
});
