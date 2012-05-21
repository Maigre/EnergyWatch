Ext.define('MainApp.controller.GridAnomalieAllControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.GridAnomalieAllView'],

    init: function() {
        this.control({
            'gridanomalieall' : {
            	itemclick: this.gotopl
            }
        });
    },
    
    gotopl: function(a,b,c,d) {

		store=Ext.getStore('AnomalieStore');
		idpl=b.data.idPl;
		No_de_facture=b.data.No_de_facture;
		displaypl(idpl,BT_MT_EAU,No_de_facture);
		
		/*Ext.Ajax.request({
		    url: BASE_URL+'data/anomaliecontrol/giveplid',
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
		});*/
	
	} 
});
