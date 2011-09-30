Ext.define('MainApp.controller.GridPlControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.GridPlView'],

    init: function() {
        this.control({
            'gridpl' : {
            	cellclick: this.showalertetip
            }
        });
    },
    
    showalertetip: function(a,b,c,d) {
		
		/*console.info(a.ownerCt.columns[c].dataIndex);
		console.info(b);
		console.info(c);
		console.info(d);*/
		if (a.ownerCt.columns[c].dataIndex=='alerte_max'){
			//console.info(b);
			var tip = Ext.create('Ext.tip.ToolTip', {
				html: d.data.alerte_commentaire,
				trackMouse: true,
				target: b
			});
			//alert(b.x+" - "+b.y);
			//tip.setPosition(b.x,b.y);
			tip.show();
		}
		else{
			//charge le store avec l'id du pl
			var plstore = this.getStore('PlStore');
			plstore.load({
				params: {idPl: d.data.id}
			});
			plstore.on('load', function(database){
				var plpanel = Ext.getCmp('plpanel');
				if (!plpanel){
					var plpanel = Ext.widget('plpanel');
				}
				Ext.getCmp('westregion').removeAll(false);
				Ext.getCmp('westregion').add(plpanel);
				var rec= database.getAt(0);
				plpanel.getForm().loadRecord(rec);
			});
			
			if (d.data.Tension=='BT'){
				var facturestore = this.getStore('FactureStore');
				var donneesConsoStore = this.getStore('DonneesConsoStore');
				var view1 = Ext.getCmp('plfacturepanel');
				if (!view1){
					var view1 = Ext.widget('plfacturepanel');
				}
			}
			else{
				var facturestore = this.getStore('FactureMTStore');
				var donneesConsoStore = this.getStore('DonneesConsoMTStore');
				var view1 = Ext.getCmp('plfacturemtpanel');
				if (!view1){
					//console.info('newplfacturepanel')
					var view1 = Ext.widget('plfacturemtpanel');
				}
			}
			
			facturestore.load({
				params: {idPl: d.data.id}
			});
			
			donneesConsoStore.load({
				params: {idPl: d.data.id}
			});
		
			var alerteStore = this.getStore('AlerteStore');
			alerteStore.load({
				params: {idPl: d.data.id}
			});

			Ext.getCmp('centerregion').removeAll(); 
			Ext.getCmp('centerregion').add(view1);

		}

	} 
});
