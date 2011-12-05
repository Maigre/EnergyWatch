Ext.define('MainApp.controller.GridFactureControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.GridFactureView'],

    init: function() {
        this.control({
            'gridfacture' : {
            	cellclick: this.loadchartserie
            }
        });
    },
    
    
    loadchartserie: function(a,b,c,d) {
		console.info(a.ownerCt.columns[c].dataIndex);
		var chartfacture = Ext.getCmp('facturechart');
		//chartfacture.series.removeAll();
		//console.info(a.ownerCt.getGridColumns());
	}   
	
});
