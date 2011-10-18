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
		    {text: "", width: 70, sortable: true, dataIndex: 'date_validation', hidden: true, Value: 10},
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
		    beforeDragDrop: function(){
		    	console.info('ok');
		    },
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
		                //data.records[0]
		                window_validation = Ext.create('Ext.window.Window', {
							title: 'Confirmation rejet PL',
							height: 130,
							width: 400,
							layout: 'fit',
							items: {  // Let's put an empty grid in just to illustrate fit layout
								xtype: 'form',
								border: false,
								frame: true,
								items:[{
									xtype		: 'datefield',
									id			: 'date_validation',
									anchor		: '96%',
									fieldLabel	: 'Date de prise d\'effet',
									name		: 'date_validation',
									minValue	: new Date(),
									value		: new Date()
								},{
									xtype		: 'textfield',
									inputType	: 'password',
									anchor		: '96%',
									fieldLabel	: 'Mot de passe',
									name		: 'password'
								}],
								
							},
							buttonAlign : 'right',
							buttons: [{ 
								text: 'O.K',
								listeners: {
									click: function() {
										// this == the button, as we are in the local scope
										
										date_validation=Ext.getCmp('date_validation').value;
										console.info(date_validation);
										if ((date_validation.getMonth()+1)<10){
											date_validation=date_validation.getFullYear()+'-0'+(date_validation.getMonth()+1)+'-'+date_validation.getDate();
										}
										else{
											date_validation=date_validation.getFullYear()+'-'+(date_validation.getMonth()+1)+'-'+date_validation.getDate();
										}
										
										data.records[0].data['date_validation']=date_validation;
										
										console.info(data.records[0].get('date_validation'));
										
										//data.records[0].get('date_validation')=0;
										this.up('window').close();
										Ext.each(data.records, function(op) {
											Ext.Ajax.request({
												url: BASE_URL+'data/triplcontrol/save/nonvalide',
												method : 'POST',
												params : {
													idfacture: op.get('id'),
													BT_MT_EAU: BT_MT_EAU,
													date_validation: op.get('date_validation')
												}/*,
												success: function(response){
														Ext.get('working-area').insertHtml('beforeBegin',response.responseText,true);
												}*/
											});
											//console.info(op.get('id'));
										})
										var nonvalidestore = Ext.getStore('TriPlNonValideStore');
										nonvalidestore.load({
											params: {
												BT_MT_EAU: BT_MT_EAU,
												PERIODE_MENSUELLE: PERIODE_MENSUELLE
											}}
										);
									}
								}
							}]
						}).show();
		            }		            
		        },
		        deferEmptyText : false,
		        emptyText: '<br><br><br><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Glisser-D&eacute;poser les factures non-valides ici.<br>&nbsp;&nbsp;Laisser la touche Ctrl enfonc&eacute;e pour d&eacute;placer plusieurs lignes.'				
		    },
		    store            : 'TriPlNonValideStore',
		    columns          : [
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
				{text: "Montant net", width: 70, sortable: true, dataIndex: 'Montant_net'},
				{text: "Date r&eacute;sil.", width: 80, sortable: true, dataIndex: 'date_validation', xtype: 'datecolumn',   format:'d-m-Y' }
			],
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
