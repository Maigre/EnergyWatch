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
			/*plstore.load({
				params: {idPl: d.data.id}
			});*/
			
		//plstore.on('load', function (datastore) {
			//var rec= datastore.getAt(0);
			//console.info(rec);
			
			//Ext.widget('plpanel').loadRecord(rec);
			//console.info(Ext.widget('plpanel'));
			//console.info(Ext.widget('plpanel').loadRecord(rec));
			
			Ext.widget('plpanel').getForm().load({
				url: BASE_URL+'data/plcontrol/load',
				params: {
					idPl: d.data.id
				},
				method: 'POST',
				failure: function(form, action) {
					Ext.Msg.alert("Load failed", action.result.errorMessage);
				}
			});
			
			console.info(Ext.widget('plpanel'));
			Ext.getCmp('westregion').add(Ext.widget('plpanel'));
		//});
			
		
			var facturestore = this.getStore('FactureStore');
			facturestore.load({
				params: {idPl: d.data.id}
			});
		
			var donneesConsoStore = this.getStore('DonneesConsoStore');
			donneesConsoStore.load({
				params: {idPl: d.data.id}
			});
		
			var alerteStore = this.getStore('AlerteStore');
			alerteStore.load({
				params: {idPl: d.data.id}
			});
		
			//Si le panel plfacturepanel n'est pas déjà affiché
			if(Ext.getCmp('centerregion').items.items[0].alias!='widget.plfacturepanel'){
				var view1 = Ext.widget('plfacturepanel');
				var view2 = Ext.widget('plpanel');
				//clean regions
				//Ext.getCmp('westregion').removeAll();
				Ext.getCmp('centerregion').removeAll(); 
				//display panels
				Ext.getCmp('centerregion').add(view1);
				//Ext.getCmp('westregion').add(view2); 
			}
		}

		
		//console.info(a.ownerCt);
		//console.info(a.ownerCt.columns[c].dataIndex);
		//console.info(a.ownerCt.getGridColumns());
	} 
});
