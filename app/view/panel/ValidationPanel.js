Ext.define('MainApp.view.panel.ValidationPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.validationpanel',
	id    : 'validationpanel',
  	requires:['MainApp.view.tools.GridPlView'],
	bodyPadding: 5,
	//margins: 5,
	//padding: 5,
	layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyStyle: "background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
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
		
		
		var validerAction = Ext.create('Ext.Action', {
			iconCls	: 'yes',
			text: 'Valider',
			disabled: true,
			handler: function(widget, event) {
				selecteditems = Ext.getCmp('nouveauPlGrid').getSelectionModel().getSelection();
				Ext.each(selecteditems, function(op) {
					Ext.Ajax.request({
						url: BASE_URL+'data/triplcontrol/save/valide',
						method : 'POST',
						params : {
							idfacture: op.get('id'),
							BT_MT_EAU: BT_MT_EAU//,
							//date_validation: op.get('date_validation')
						},
						success: function(response){
							var nouveaustore = Ext.getStore('TriPlNouveauStore');
							var validestore = Ext.getStore('TriPlValideStore');
							validestore.load({
								params: {
									BT_MT_EAU: BT_MT_EAU,
									PERIODE_MENSUELLE: PERIODE_MENSUELLE
								},
								success: function(){
									nouveaustore.load({
										params: {
											BT_MT_EAU: BT_MT_EAU,
											PERIODE_MENSUELLE: PERIODE_MENSUELLE
										}
									});
								}
							});
						}
					});
				})
			}
		});
		var rejeterAction = Ext.create('Ext.Action', {
			iconCls	: 'no',
			text: 'Rejeter',
			disabled: true,
			handler: function(widget, event) {
				selecteditems = Ext.getCmp('nouveauPlGrid').getSelectionModel().getSelection();
				Ext.each(selecteditems, function(op) {
					Ext.Ajax.request({
						url: BASE_URL+'data/triplcontrol/save/nonvalide',
						method : 'POST',
						params : {
							idfacture: op.get('id'),
							BT_MT_EAU: BT_MT_EAU//,
							//date_validation: op.get('date_validation')
						},
						success: function(response){
							var nouveaustore = Ext.getStore('TriPlNouveauStore');
							var nonvalidestore = Ext.getStore('TriPlNonValideStore');
							nonvalidestore.load({
								params: {
									BT_MT_EAU: BT_MT_EAU,
									PERIODE_MENSUELLE: PERIODE_MENSUELLE
								}
							});
							nonvalidestore.on('load',function(){
								console.info('ok');
								console.info(nouveaustore);
								nouveaustore.load({
									params: {
										BT_MT_EAU: BT_MT_EAU,
										PERIODE_MENSUELLE: PERIODE_MENSUELLE
									}
								});
							});							
						}
					});
				})
			}
		});
		
		var contextMenu = Ext.create('Ext.menu.Menu', {
			items: [
			    validerAction,
			    rejeterAction
			]
		});	
		
		
		
		//Pl info window show on dblclick sur le nouveauplgrid
		var windows_info_panel= Ext.create('Ext.window.Window', {
			title: 'Info Panel',
			closeAction: 'hide',
			height: 600,
			width: 330,
			layout: 'fit',
			items: {  // Let's put an empty grid in just to illustrate fit layout
				xtype	: 'plpanel',
				id		: 'plpanelinfo'				
			}
		});
		
		// declare the source Grid
		var NouveauPlGrid = Ext.create('Ext.grid.Panel', {
			flex	:1,
			margin	: 5,
			padding	: 5,
			iconCls	: 'arrow_divide',
			id		: 'nouveauPlGrid',
			alias	: 'widget.nouveauPlGrid',
			multiSelect: true,
			frame	: true,
			store            : 'TriPlNouveauStore',
			columns          : columns,
			stripeRows       : true,
			title            : 'Nouveaux P.L d&eacute;tect&eacute;s - A Valider ou Rejeter',
			dockedItems: [{
			    xtype: 'toolbar',
			    items: [
				validerAction, rejeterAction
			    ]
			}],
			viewConfig: {
			    stripeRows: true,
			    listeners: {
					itemcontextmenu: function(view, rec, node, index, e) {
					    e.stopEvent();
					    contextMenu.showAt(e.getXY());
					    return false;
					},
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
					},
					itemdblclick:function(a,b,c,d){
						var plstore = Ext.getStore('PlStore');
						plstore.load({
							params: {
								BT_MT_EAU: BT_MT_EAU,
								idFacture: b.data['id']
							}
						});
						plstore.on('load', function(database){
							if(Ext.getCmp('centerregion').items.items[0].id=='validationpanel'){
								var plpanelinfo = Ext.getCmp('plpanelinfo');
								/*if (!plpanelinfo){
									var plpanelinfo = Ext.widget('plpanel');
								}*/	
								var rec= database.getAt(0);
								plpanelinfo.getForm().loadRecord(rec);
								windows_info_panel.show();
							}
						});
					}
			    	}
			},			
			plugins: {
			    ptype: 'gridviewdragdrop',
			    dragGroup: 'firstGridDDGroup',
			    dropGroup: 'secondGridDDGroup'
			}
		});

		NouveauPlGrid.getSelectionModel().on({
			selectionchange: function(sm, selections) {
			    console.info(selections);
			    console.info(sm);
			    if (selections.length) {
				validerAction.enable();
				rejeterAction.enable();
			    } else {
				buyAction.disable();
				sellAction.disable();
			    }
			}
		});

		// create the destination Grid
		var PlNonValideAgainGrid = Ext.create('Ext.grid.Panel', {
			flex:1,
			margin: 5,
			padding: 5,
			alias: 'widget.plNonValideAgainGrid',
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
			flex:1,
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
			flex:1,
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
										
										//data.records[0].data['date_validation']=date_validation;
										this.up('window').close();
										Ext.each(data.records, function(op) {
											op.data['date_validation']=date_validation;
											Ext.Ajax.request({
												url: BASE_URL+'data/triplcontrol/save/nonvalide',
												method : 'POST',
												params : {
													idfacture: op.get('id'),
													BT_MT_EAU: BT_MT_EAU,
													date_validation: op.get('date_validation')
												},
												success: function(response){
													var nonvalidestore = Ext.getStore('TriPlNonValideStore');
													nonvalidestore.load({
														params: {
															BT_MT_EAU: BT_MT_EAU,
															PERIODE_MENSUELLE: PERIODE_MENSUELLE
														}}
													);
												}
											});
											//console.info(op.get('id'));
										})
										
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
				{text: "Date r&eacute;sil.", width: 80, sortable: true, dataIndex: 'date_validation', xtype: 'datecolumn',   format:'d-m-Y'}
			],
		    stripeRows       : true,
		    title            : 'P.L rejet&eacute;s'
		    //,		    margins          : '5 5 5 5'
		});
		
		
		me.items = [{
			xtype: 'panel',
			bodyStyle: "background-color: transparent;",
			border: 0,
			flex: 1,
			layout:{
				type:'hbox',
				align: 'stretch'
			},
			items:[NouveauPlGrid,
				PlValideGrid
			]
		},{
			xtype: 'panel',
			bodyStyle: "background-color: transparent;",
			border: 0,
			flex: 1,
			layout:{
				type:'hbox',
				align: 'stretch'
			},
			items:[PlNonValideAgainGrid,
				PlNonValideGrid
			]
		}];
		
		me.callParent(arguments);
  	}
});
