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
				this.plpanel = new Ext.widget('plpanel');
				Ext.getCmp('westregion').removeAll();
				Ext.getCmp('westregion').add(this.plpanel);
				var rec= database.getAt(0);
				this.plpanel.getForm().loadRecord(rec);
				console.info(this.plpanel.getForm());
			});
			
			if (d.data.Tension=='BT'){
				var facturestore = this.getStore('FactureStore');
				var donneesConsoStore = this.getStore('DonneesConsoStore');
				this.view1 = new Ext.widget('plfacturepanel');
			}
			else{
				var facturestore = this.getStore('FactureMTStore');
				var donneesConsoStore = this.getStore('DonneesConsoMTStore');
				this.view1 = new Ext.widget('plfacturemtpanel');
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
		
			//Si le panel plfacturepanel n'est pas déjà affiché
			//if(Ext.getCmp('centerregion').items.items[0].alias!='widget.plfacturepanel'){
				//var view2 = Ext.widget('plpanel');
				//clean regions
				//Ext.getCmp('westregion').removeAll();
				Ext.getCmp('centerregion').removeAll(); 
				//display panels
				Ext.getCmp('centerregion').add(this.view1);
				//Ext.getCmp('westregion').add(view2); 
			//}
		}

		
		//console.info(a.ownerCt);
		//console.info(a.ownerCt.columns[c].dataIndex);
		//console.info(a.ownerCt.getGridColumns());
	} 
});