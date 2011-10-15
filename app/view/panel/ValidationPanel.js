Ext.define('MainApp.view.panel.ValidationPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.validationpanel',
	id    : 'validationpanel',
  	requires:['MainApp.view.tools.GridPlView'],
	bodyPadding: 5,
	//margins: 5,
	//padding: 5,
	layout: {
        type: 'table',
        columns: 2/*,
        tableAttrs: {
            style: {
                width: '50%',
                height: '50%'
            }
        }*/
        //align: 'stretch',
    },
    bodyStyle: "background-image:url(app/images/2.jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
    //defaults : { margins: 5 },
	
	initComponent: function() {
		var me = this;
		
		// Column Model shortcut array
		var columns = [
		    {text: "Point de Livraison", flex: 1, sortable: true, dataIndex: 'Nom_prenom',
		    	renderer: function(value, metaData, record, rowIndex) {
					if (value == ''){
						metaData.tdCls = 'emptyText';
					} 
					return value;
					
				}
			},
		    {text: "Num&eacute;ro P.L", width: 70, sortable: true, dataIndex: 'Point_de_livraison'},
		    {text: "Num&eacute;ro Facture", width: 70, sortable: true, dataIndex: 'No_de_facture'},
		    {text: "Montant net", width: 70, sortable: true, dataIndex: 'Montant_net'}
		];

		// declare the source Grid
		var NouveauPlGrid = Ext.create('Ext.grid.Panel', {
			height: 280,
			width:550,
			margin: 5,
			padding: 5,
			iconCls: 'arrow_divide',
		    alias: 'widget.nouveauPlGrid',
		    multiSelect: true,
		    frame: true,
		    viewConfig: {
		        plugins: {
		            ptype: 'gridviewdragdrop',
		            dragGroup: 'firstGridDDGroup',
		            dropGroup: 'secondGridDDGroup'
		        },
		        listeners: {
		            drop: function(node, data, dropRec, dropPosition) {
		                //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
		                Ext.each(data.records, function(op) {
							Ext.Ajax.request({
								url: BASE_URL+'data/triplcontrol/save/nouveau',
								method : 'POST',
								params : {
									idfacture: op.get('id'),
									BT_MT_EAU: BT_MT_EAU
								}/*,
								success: function(response){
										Ext.get('working-area').insertHtml('beforeBegin',response.responseText,true);
								}*/
							});
		                	//console.info(op.get('id'));
		                })
		            }		            
		        }
		    },
		    store            : 'TriPlNouveauStore',
		    columns          : columns,
		    stripeRows       : true,
		    title            : 'Nouveaux P.L d&eacute;tect&eacute;s - A Valider ou Rejeter'
		    //,		    margins          : '5 5 5 5'
		});

		

		// create the destination Grid
		var PlNonValideAgainGrid = Ext.create('Ext.grid.Panel', {
			height: 280,
			width:550,
			margin: 5,
			padding: 5,
			alias: 'widget.plNonValideAgainGrid',
			//cls: 'my-grid',
			iconCls: 'arrow_divide',
			multiSelect: true,
		    frame: true,
		    viewConfig: {
		        plugins: {
		            ptype: 'gridviewdragdrop',
		            dragGroup: 'firstGridDDGroup',
		            dropGroup: 'secondGridDDGroup'
		        },
		        listeners: {
		            drop: function(node, data, dropRec, dropPosition) {
		                //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
		                Ext.each(data.records, function(op) {
							Ext.Ajax.request({
								url: BASE_URL+'data/triplcontrol/save/nonvalideagain',
								method : 'POST',
								params : {
									idfacture: op.get('id'),
									BT_MT_EAU: BT_MT_EAU
								}/*,
								success: function(response){
										Ext.get('working-area').insertHtml('beforeBegin',response.responseText,true);
								}*/
							});
		                	//console.info(op.get('id'));
		                })
		            }		            
		        }
		    },
		    store            : 'TriPlNonValideAgainStore',
		    columns          : columns,
		    stripeRows       : true,
		    title            : 'P.L rejet&eacute;s &agrave; nouveau factur&eacute;s - A Valider ou Rejeter'
		    //,		    margins          : '5 5 5 5'
		});
		

		// create the destination Grid
		var PlValideGrid = Ext.create('Ext.grid.Panel', {
			height: 280,
			width:550,
			margin: 5,
			padding: 5,
			alias: 'widget.plValideGrid',
			iconCls: 'yes',
			multiSelect: true,
		    frame: true,
		    viewConfig: {
		        plugins: {
		            ptype: 'gridviewdragdrop',
		            dragGroup: 'secondGridDDGroup',
		            dropGroup: 'firstGridDDGroup'
		        },
		        listeners: {
		            drop: function(node, data, dropRec, dropPosition,a,b,c) {
		                //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
		                console.info(node);
		                console.info(data);
		                console.info(dropRec);
		                console.info(dropPosition);
		                console.info(a);
		                console.info(b);
		                console.info(c);
		                console.info(data.records[0].store.storeId);
		                
		                Ext.each(data.records, function(op) {
							Ext.Ajax.request({
								url: BASE_URL+'data/triplcontrol/save/valide',
								method : 'POST',
								params : {
									idfacture: op.get('id'),
									BT_MT_EAU: BT_MT_EAU
								}/*,
								success: function(response){
										Ext.get('working-area').insertHtml('beforeBegin',response.responseText,true);
								}*/
							});
		                	//console.info(op.get('id'));
		                })
		            }		            
		        },
		        deferEmptyText : false,
				emptyText: '<br><br><br><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Glisser-D&eacute;poser les factures valides ici.<br>&nbsp&nbspLaisser la touche Ctrl enfonc&eacute;e pour d&eacute;placer plusieurs lignes.'				
		    },
		    store            : 'TriPlValideStore',
		    columns          : columns,
		    stripeRows       : true,
		    title            : 'P.L valid&eacute;s'
		    //,		    margins          : '5 5 5 5'
		});

		// create the destination Grid
		var PlNonValideGrid = Ext.create('Ext.grid.Panel', {
			height: 280,
			width:550,
			margin: 5,
			padding: 5,
			alias: 'widget.plNonValideGrid',
			iconCls: 'no',
			multiSelect: true,
		    frame: true,
			//cls: 'my-grid',
			viewConfig: {
		        plugins: {
		            ptype: 'gridviewdragdrop',
		            dragGroup: 'secondGridDDGroup',
		            dropGroup: 'firstGridDDGroup'
		        },
		        listeners: {
		            drop: function(node, data, dropRec, dropPosition) {
		                //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
		                //var idfacture=data.records[0].get('id');
		                Ext.each(data.records, function(op) {
							Ext.Ajax.request({
								url: BASE_URL+'data/triplcontrol/save/nonvalide',
								method : 'POST',
								params : {
									idfacture: op.get('id'),
									BT_MT_EAU: BT_MT_EAU
								}/*,
								success: function(response){
										Ext.get('working-area').insertHtml('beforeBegin',response.responseText,true);
								}*/
							});
		                	//console.info(op.get('id'));
		                })
		                
		            }		            
		        },
		        deferEmptyText : false,
		        emptyText: '<br><br><br><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Glisser-D&eacute;poser les factures non-valides ici.<br>&nbsp;&nbsp;Laisser la touche Ctrl enfonc&eacute;e pour d&eacute;placer plusieurs lignes.'				
		    },
		    store            : 'TriPlNonValideStore',
		    columns          : columns,
		    stripeRows       : true,
		    title            : 'P.L rejet&eacute;s'
		    //,		    margins          : '5 5 5 5'
		});

		
		me.items = [
				NouveauPlGrid,
				PlValideGrid,
				PlNonValideAgainGrid,
				PlNonValideGrid
		];
		
		me.callParent(arguments);
  	}
});
