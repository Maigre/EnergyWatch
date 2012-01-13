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
		

		store=Ext.getStore('AlerteStore');
		console.info(b.data.id);
		Ext.Ajax.request({
		    url: BASE_URL+'data/alertecontrol/giveplid',
		    params: {
			id: b.data.id,
			BT_MT_EAU: BT_MT_EAU,
			PERIODE_MENSUELLE: PERIODE_MENSUELLE
		    },
		    success: function(response){
			var idpl = Ext.decode(response.responseText).idPl;
			//console.info(Ext.decode(response.responseText).nom);
			
			displaypl(idpl,BT_MT_EAU); //définie dans SearchControl.js
		    }
		});
	
	} 
});
