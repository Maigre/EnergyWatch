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
			
			
		
			var plstore = this.getStore('PlStore');
			plstore.load({
				params: {idPl: d.data.idPl}
			});
			plstore.on('load', function(database){
				var plpanel = Ext.getCmp('plpanel');
				if (!plpanel){
					var plpanel = Ext.widget('plpanel');
				}				
				Ext.getCmp('westregion').removeAll(false);
				Ext.getCmp('westregion').setWidth(240);
				Ext.getCmp('westregion').add(plpanel);
				var rec= database.getAt(0);
				plpanel.getForm().loadRecord(rec);
			});
			
			if (d.data.Tension=='BT'){
				var facturestore = this.getStore('FactureStore');
				//var donneesConsoStore = this.getStore('DonneesConsoStore');
				var plfacturepanel = Ext.getCmp('plfacturepanel');
				if (!plfacturepanel){
					var plfacturepanel = Ext.widget('plfacturepanel');
				}
			}
			else{
				var facturestore = this.getStore('FactureMTStore');
				//var donneesConsoStore = this.getStore('DonneesConsoMTStore');
				var plfacturepanel = Ext.getCmp('plfacturemtpanel');
				if (!plfacturepanel){
					var plfacturepanel = Ext.widget('plfacturemtpanel');
				}
			}
			Ext.getCmp('centerregion').removeAll(false);
			Ext.getCmp('centerregion').add(plfacturepanel);
			
			facturestore.load({
				params: {idPl: d.data.idPl}
			});
			
			/*donneesConsoStore.load({
				params: {idPl: d.data.idPl}
			});*/
		
			var alerteStore = this.getStore('AlerteStore');
			alerteStore.load({
				params: {idPl: d.data.idPl,
				BT_MT_EAU: BT_MT_EAU}
			});
		
			//Si le panel plfacturepanel n'est pas déjà affiché
			//if(Ext.getCmp('centerregion').items.items[0].alias!='widget.plfacturepanel'){
				//var view2 = Ext.widget('plpanel');
				//clean regions
				//Ext.getCmp('westregion').removeAll();
				 
				//display panels
				
				//Ext.getCmp('westregion').add(view2); 
			//}
			

	} 
});
