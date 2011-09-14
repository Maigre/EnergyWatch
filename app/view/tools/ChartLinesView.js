Ext.define('MainApp.view.tools.ChartLinesView', {
	extend: 'Ext.chart.Chart',
	alias : 'widget.facturechart',
	id: 'facturechart',
	height: 229,
	//width: 1000,
	animate: true,
	insetPadding: 20,
	legend: {
        position: 'bottom'
    },
    theme: 'Sky',
	store: 'DonneesConsoStore',

  	initComponent: function() {
  	
  		
    	var me = this;
    	me.axes = [
    		/*{
				type: 'Time',
				fields: 'Date_index',
				title: 'Mois',
				position: 'bottom',
				//dateFormat: 'M',
				groupBy: 'month',
				aggregateOp: 'sum',
				constrain: true,
				fromDate: new Date('01-01-2011'),
				toDate: new Date('01-07-2011')
			},*/
			{
		        //title: 'Time',
		        type: 'Time',
		        position: 'bottom',
		        fields: ['Date_index'],
		        //aggregateOp: 'sum',
		        groupBy: 'year,month',
		        dateFormat: 'M Y'/*,
		        step: [Ext.Date.MONTH, 1],
		        majorTickSteps: 1*/				
        	},
		  	{
				type: 'Numeric',
				fields: [
				  	'Montant_net'
				],
				position: 'left',
				title: '(CFA)',
				minimum: 0
		  	}
    	];
   	 	me.series = [
		  	{
				type: 'column',
				highlight: true,
				/*label: {
					display: 'under',
					//'text-anchor': 'middle',
					field: 'Nb_jours',
					renderer: Ext.util.Format.numberRenderer('0'),
					//orientation: 'vertical',
					color: '#333'
				},*/
				tips: {
					trackMouse: true,
					width: 200,
					//height: 28,
					renderer: function(storeItem, item) {
						this.setTitle(Ext.Date.format(storeItem.get('Date_index'), 'M Y') + ': ' + storeItem.get('Montant_net') + ' CFA; ' + storeItem.get('Consommation_mensuelle') + ' kWh' );
					}
                },
				xField: 'Date_index',
				yField: [
				  	'Montant_net'
				],
				smooth: 3
		  	}
    	];
    	me.callParent(arguments);
  	}
});
