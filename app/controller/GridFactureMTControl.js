Ext.define('MainApp.controller.GridFactureMTControl', {
	extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.GridFactureMTView'],

	init: function() {
		this.control({
		    'gridfacturemt' : {
		    	itemclick: this.loadalertes
		    }
		});
	},


	loadalertes: function(a,b,c,d) {
		No_de_facture = b.data.No_de_facture;
		idPl=Ext.getStore('PlStore').getAt(0).data.id;
		
		var alerteStore = Ext.getStore('AlerteStore');
		alerteStore.load({
			params: {
				idPl: idPl,
				BT_MT_EAU: BT_MT_EAU,
				No_de_facture: No_de_facture
			}
		});
		
		var anomalieStore = Ext.getStore('AnomalieStore');
		anomalieStore.load({
			params: {
				idPl: idPl,
				BT_MT_EAU: BT_MT_EAU,
				No_de_facture: No_de_facture
			}
		});
		
		//var chartfacture = Ext.getCmp('facturechart');
		//chartfacture.series.removeAll();
		//console.info(a.ownerCt.getGridColumns());
	}   
	
});
