Ext.define('MainApp.view.panel.ValidationPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.validationpanel',
	id    : 'validationpanel',
  	requires:[
  		'MainApp.view.tools.GridPlView',
  		'Ext.toolbar.Paging'
		    //'Ext.ux.PreviewPlugin'  	
  	],
	bodyPadding: 5,
	//margins: 5,
	//padding: 5,
	layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bodyStyle: "background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
    //defaults : { margins: 5 },
	
	initComponent: function() {
		var me = this;
		
		// Column Model shortcut array
		var columns = [
		    {text: "Point de Livraison", flex: 1, sortable: false, dataIndex: 'Nom_prenom',
		    	renderer: function(value, metaData, record, rowIndex) {
					if (value == ''){
						metaData.tdCls = 'emptyText';
					} 
					return value;
					
				}
			},
		    {text: "Num&eacute;ro P.L", width: 110, sortable: false, dataIndex: 'Point_de_livraison'},
		    //{text: "Num&eacute;ro Facture", width: 100, sortable: false, dataIndex: 'No_de_facture'},
		    //{text: "", width: 70, sortable: true, dataIndex: 'date_validation', hidden: true, Value: 10},
		    //{text: "Montant net", width: 70, sortable: false, dataIndex: 'Montant_net'}
		];
	//****  ACTIONS 	
		//Actions du panel NouveauPl
		
		var displayPlFactureAction = Ext.create('Ext.Action', {
			iconCls	: 'help',
			text: 'D&eacute;tail des factures',
			//disabled: true,
			handler: function(widget, event) {
				selecteditem = Ext.getCmp('nouveauPlGrid').getSelectionModel().getSelection();
				displaypl(selecteditem[0].get('id'),BT_MT_EAU);
			}
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
		
		var displayPlAction = Ext.create('Ext.Action', {
			iconCls	: 'help',
			text: 'Afficher P.L',
			//disabled: true,
			handler: function(widget, event) {
				
				selecteditem = Ext.getCmp('nouveauPlGrid').getSelectionModel().getSelection();
				
				var plstore = Ext.getStore('PlStore');
				plstore.load({
					params: {
						BT_MT_EAU: BT_MT_EAU,
						idFacture: selecteditem[0].get('id')
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
		});
		
		var validerAction = Ext.create('Ext.Action', {
			iconCls	: 'yes',
			text: 'Valider',
			disabled: true,
			handler: function(widget, event) {
				selecteditems = Ext.getCmp('nouveauPlGrid').getSelectionModel().getSelection();
				nouveaustore  = Ext.getStore('TriPlNouveauStore');
				validestore   = Ext.getStore('TriPlValideStore');
				Ext.each(selecteditems, function(op) {
					nouveaustore.remove(op);
					Ext.getStore('TriPlValideStore').add(op);
					Ext.Ajax.request({
						url: BASE_URL+'data/triplcontrol/save/valide',
						method : 'POST',
						params : {
							idfacture: op.get('id'),
							BT_MT_EAU: BT_MT_EAU//,
							//date_validation: op.get('date_validation')
						},
						success: function(){
							//Test si dernier item sauvegardé et reload le grid via son store
							if (op==selecteditems[selecteditems.length-1]){
								nouveaustore.loadPage(1);
								validestore.loadPage(1);
							}
						}
					});
				})

				Ext.getCmp('nouveauPlGrid').getView().focusRow(0);
				
				var gridEl = Ext.getCmp('nouveauPlGrid').getEl();
				//console.info(rowEl);
				//rowEl.scrollIntoView(gridEl,false);
				
			}
		});
		var rejeterAction = Ext.create('Ext.Action', {
			iconCls	: 'no',
			text: 'Rejeter',
			disabled: true,
			handler: function(widget, event) {
				nouveaustore=Ext.getStore('TriPlNouveauStore');
				nonvalidestore=Ext.getStore('TriPlNonValideStore');
				selecteditems = Ext.getCmp('nouveauPlGrid').getSelectionModel().getSelection();
				
				Ext.each(selecteditems, function(op) {
					Ext.getStore('TriPlNouveauStore').remove(op);
					Ext.getStore('TriPlNonValideStore').add(op);
					Ext.Ajax.request({
						url: BASE_URL+'data/triplcontrol/save/nonvalide',
						method : 'POST',
						params : {
							idfacture: op.get('id'),
							BT_MT_EAU: BT_MT_EAU//,
							//date_validation: op.get('date_validation')
						},
						success: function(){
							//Test si dernier item sauvegardé et reload le grid via son store
							console.info(op);
							console.info(selecteditems.length);
							console.info(selecteditems[selecteditems.length-1]);
							if (op==selecteditems[selecteditems.length-1]){
								nouveaustore.loadPage(1);
								nonvalidestore.loadPage(1);
							}
						}
					});
					
				})
			}
		});
		
		var contextMenu = Ext.create('Ext.menu.Menu', {
			items: [
			    validerAction,
			    rejeterAction,
			    displayPlAction//,
			    //displayPlFactureAction
			]
		});
		
		//Actions du panel PlNonValideAgain
		
		var displayPlNonValideAgainFactureAction = Ext.create('Ext.Action', {
			iconCls	: 'help',
			text: 'D&eacute;tail des factures',
			//disabled: true,
			handler: function(widget, event) {
				selecteditem = Ext.getCmp('plNonValideAgainGrid').getSelectionModel().getSelection();
				displaypl(selecteditem[0].get('id'),BT_MT_EAU);
			}
		});
		
		var displayPlNonValideAgainAction = Ext.create('Ext.Action', {
			iconCls	: 'help',
			text: 'Afficher P.L',
			//disabled: true,
			handler: function(widget, event) {
				
				selecteditem = Ext.getCmp('plNonValideAgainGrid').getSelectionModel().getSelection();
				
				var plstore = Ext.getStore('PlStore');
				plstore.load({
					params: {
						BT_MT_EAU: BT_MT_EAU,
						idFacture: selecteditem[0].get('id')
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
		});
		
		
		var revaliderAction = Ext.create('Ext.Action', {
			iconCls	: 'yes',
			text: 'Valider',
			disabled: true,
			handler: function(widget, event) {
				nonvalideagainstore=Ext.getStore('TriPlNonValideAgainStore');
				validestore=Ext.getStore('TriPlValideStore');
				selecteditems = Ext.getCmp('plNonValideAgainGrid').getSelectionModel().getSelection();
				Ext.each(selecteditems, function(op) {
					Ext.getStore('TriPlNonValideAgainStore').remove(op);
					Ext.getStore('TriPlValideStore').add(op);
					Ext.Ajax.request({
						url: BASE_URL+'data/triplcontrol/save/valide',
						method : 'POST',
						params : {
							idfacture: op.get('id'),
							BT_MT_EAU: BT_MT_EAU//,
							//date_validation: op.get('date_validation')
						},
						success: function(){
							//Test si dernier item
							console.info(op);
							console.info(selecteditems.length);
							console.info(selecteditems[selecteditems.length-1]);
							if (op==selecteditems[selecteditems.length-1]){
								nonvalideagainstore.loadPage(1);
								validestore.loadPage(1);
							}
						}
					});
				})
			}
		});
		
		var rerejeterAction = Ext.create('Ext.Action', {
			iconCls	: 'no',
			text: 'Rejeter',
			disabled: true,
			handler: function(widget, event) {
				nonvalideagainstore=Ext.getStore('TriPlNonValideAgainStore');
				nonvalidestore=Ext.getStore('TriPlNonValideStore');
				selecteditems = Ext.getCmp('plNonValideAgainGrid').getSelectionModel().getSelection();
				Ext.each(selecteditems, function(op) {

					Ext.getStore('TriPlNonValideAgainStore').remove(op);
					Ext.getStore('TriPlNonValideStore').add(op);
					Ext.Ajax.request({
						url: BASE_URL+'data/triplcontrol/save/nonvalide',
						method : 'POST',
						params : {
							idfacture: op.get('id'),
							BT_MT_EAU: BT_MT_EAU//,
							//date_validation: op.get('date_validation')
						},
						success: function(){
							//Test si dernier item
							console.info(op);
							console.info(selecteditems.length);
							console.info(selecteditems[selecteditems.length-1]);
							if (op==selecteditems[selecteditems.length-1]){
								nonvalideagainstore.loadPage(1);
								nonvalidestore.loadPage(1);
							}
						}
					});
				})
			}
		});
		
		
		
		var recontextMenu = Ext.create('Ext.menu.Menu', {
			items: [
			    revaliderAction,
			    rerejeterAction,
			    displayPlNonValideAgainAction,
			    //displayPlNonValideAgainFactureAction
			]
		});
		
		//Actions du panel ValidePl
		
		var displayPlValideFactureAction = Ext.create('Ext.Action', {
			iconCls	: 'help',
			text: 'D&eacute;tail des factures',
			//disabled: true,
			handler: function(widget, event) {
				selecteditem = Ext.getCmp('plValideGrid').getSelectionModel().getSelection();
				displaypl(selecteditem[0].get('id'),BT_MT_EAU);
			}
		});
		
		var displayPlValideAction = Ext.create('Ext.Action', {
			iconCls	: 'help',
			text: 'Afficher P.L',
			//disabled: true,
			handler: function(widget, event) {
				
				selecteditem = Ext.getCmp('plValideGrid').getSelectionModel().getSelection();
				
				var plstore = Ext.getStore('PlStore');
				plstore.load({
					params: {
						BT_MT_EAU: BT_MT_EAU,
						idFacture: selecteditem[0].get('id')
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
		});
		
		var validecontextMenu = Ext.create('Ext.menu.Menu', {
			items: [
			    displayPlValideAction//,
			    //displayPlValideFactureAction
			]
		});
		
		//Actions du panel NonValidePl
		var displayPlNonValideFactureAction = Ext.create('Ext.Action', {
			iconCls	: 'help',
			text: 'D&eacute;tail des factures',
			//disabled: true,
			handler: function(widget, event) {
				selecteditem = Ext.getCmp('plNonValideGrid').getSelectionModel().getSelection();
				displaypl(selecteditem[0].get('id'),BT_MT_EAU);
			}
		});
		
		var displayPlNonValideAction = Ext.create('Ext.Action', {
			iconCls	: 'help',
			text: 'Afficher P.L',
			//disabled: true,
			handler: function(widget, event) {
				
				selecteditem = Ext.getCmp('plNonValideGrid').getSelectionModel().getSelection();
				
				var plstore = Ext.getStore('PlStore');
				plstore.load({
					params: {
						BT_MT_EAU: BT_MT_EAU,
						idFacture: selecteditem[0].get('id')
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
		});
		
		var nonvalidecontextMenu = Ext.create('Ext.menu.Menu', {
			items: [
			    displayPlNonValideAction//,
			    //displayPlNonValideFactureAction
			]
		});		
	//****  GRIDS	
		// declare the source Grid
		var NouveauPlGrid = Ext.create('Ext.grid.Panel', {
			flex	: 1,
			margin	: 5,
			padding	: 5,
			iconCls	: 'arrow_divide',
			id	: 'nouveauPlGrid',
			alias	: 'widget.nouveauPlGrid',
			sortableColumns : false,
			multiSelect: true,
			frame	: true,
			store   : 'TriPlNouveauStore',
			columns : columns,
			stripeRows : true,
			title      : 'Nouveaux P.L d&eacute;tect&eacute;s - A Valider ou Rejeter',
			//verticalScrollerType: 'paginggridscroller',
			loadMask: true,
			//disableSelection: true,
			invalidateScrollerOnRefresh: false,
			dockedItems: [{
			    xtype: 'toolbar',
			    items: [
				validerAction, rejeterAction
			    ]
			}],
			viewConfig: {
			    	trackOver: false,
		        	plugins: {
		        		ptype	 : 'gridviewdragdrop',
				    	dragGroup: 'firstGridDDGroup',
				    	dropGroup: 'secondGridDDGroup',
				    	/*ptype: 'preview',
					bodyField: 'excerpt',
					expanded: true,
					pluginId: 'preview'*/
		        	},
			    	stripeRows: true,
			    	onLoad: Ext.emptyFn,
			    	listeners: {
					beforerefresh: function(v) {
						v.scrollTop = v.el.dom.scrollTop;
						v.scrollHeight = v.el.dom.scrollHeight;
					},
					refresh: function(v) {
						//v.scroller.dom.scrollTop = v.scrollTop;
						v.el.dom.scrollTop = v.scrollTop +
						(v.scrollTop == 0 ? 0 : v.el.dom.scrollHeight - v.scrollHeight);
					},
					itemcontextmenu: function(view, rec, node, index, e) {
					    e.stopEvent();
					    contextMenu.showAt(e.getXY());
					    return false;
					},
					drop: function(node, data, dropRec, dropPosition) {
						//var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
						Ext.each(data.records, function(op) {
							Ext.Ajax.request({
								url	: BASE_URL+'data/triplcontrol/save/nouveau',
								method 	: 'POST',
								params 	: {
									idfacture: op.get('id'),
									BT_MT_EAU: BT_MT_EAU
								}
							});
							//console.info(op.get('id'));
						})
						
					}/*,
					itemdblclick:function(a,b,c,d){
						displayplpanel(a,b,c,d);
					}*/
			    	}
			},
			/*tools:[{
			    type:'refresh',
			    tooltip: 'Refresh form Data',
			    // hidden:true,
			    handler: function(event, toolEl, grid){
				grid.ownerCt.store.resetData();
				grid.ownerCt.store.guaranteeRange(0,50);
			    }
			}],*/
			bbar: Ext.create('Ext.PagingToolbar', {
			    store: 'TriPlNouveauStore',
			    displayInfo: true,
			    displayMsg: 'Affichage des PL {0} - {1} sur {2}',
			    emptyMsg: "Aucun PL &agrave; afficher"
			})
		});

		NouveauPlGrid.getSelectionModel().on({
			selectionchange: function(sm, selections) {
			    if (selections.length) {
				validerAction.enable();
				rejeterAction.enable();
			    } else {
				validerAction.disable();
				rejeterAction.disable();
			    }
			}
		});
		NouveauPlGrid.store.on('load', function(){
			//grid = Ext.getCmp('nouveauPlGrid');
                        
                        //grid.getSelectionModel().selectRow(0);
			//grid.getSelectionModel().selectFirstRow();
			//console.info(grid.getView());
			//grid.getView().focusRow(0);
		});
		

		// create the destination Grid
		var PlNonValideAgainGrid = Ext.create('Ext.grid.Panel', {
			flex	:1,
			margin	: 5,
			padding	: 5,
			id	: 'plNonValideAgainGrid',
			alias	: 'widget.plNonValideAgainGrid',
			iconCls	: 'arrow_divide',
			multiSelect: true,
			sortableColumns : false,
		    	frame: true,
			//verticalScrollerType: 'paginggridscroller',
			loadMask: true,
			//disableSelection: true,
			invalidateScrollerOnRefresh: false,
		    	viewConfig: {
		        	trackOver: false,
		        	plugins: {
		        		ptype	 : 'gridviewdragdrop',
				    	dragGroup: 'firstGridDDGroup',
				    	dropGroup: 'secondGridDDGroup'
		        	},
		        	listeners: {
				   	drop: function(node, data, dropRec, dropPosition) {
				        	Ext.each(data.records, function(op) {
							Ext.Ajax.request({
								url: BASE_URL+'data/triplcontrol/save/nonvalideagain',
								method : 'POST',
								params : {
									idfacture: op.get('id'),
									BT_MT_EAU: BT_MT_EAU
								}
							});
				        	})
				    	},
				    	itemcontextmenu: function(view, rec, node, index, e) {
					   	e.stopEvent();
					    	recontextMenu.showAt(e.getXY());
					    	return false;
				    	}/*,
					itemdblclick:function(a,b,c,d){
						displayplpanel(a,b,c,d);
					}*/		            
		        	}
		    	},
			store            : 'TriPlNonValideAgainStore',
			columns          : columns,
			stripeRows       : true,
			title            : 'P.L rejet&eacute;s &agrave; nouveau factur&eacute;s - A Valider ou Rejeter',
			dockedItems: [{
				xtype: 'toolbar',
				items: [
					revaliderAction, rerejeterAction
				]
			}],
			/*tools:[{
			    type:'refresh',
			    tooltip: 'Refresh form Data',
			    // hidden:true,
			    handler: function(event, toolEl, grid){
				console.info(event);
				console.info(toolEl);
				console.info(grid);
				grid.ownerCt.store.resetData();
				grid.ownerCt.store.guaranteeRange(0,50);
			    }
			}],*/
			bbar: Ext.create('Ext.PagingToolbar', {
			    store: 'TriPlNonValideAgainStore',
			    displayInfo: true,
			    displayMsg: 'Affichage des PL {0} - {1} sur {2}',
			    emptyMsg: "Aucun PL &agrave; afficher"
			})
		});
		
		PlNonValideAgainGrid.getSelectionModel().on({
			selectionchange: function(sm, selections) {
			    if (selections.length) {
				revaliderAction.enable();
				rerejeterAction.enable();
			    } else {
				revaliderAction.disable();
				rerejeterAction.disable();
			    }
			}
		});
		
		

		// create the destination Grid
		var PlValideGrid = Ext.create('Ext.grid.Panel', {
			flex	:1,
			margin	: 5,
			padding	: 5,
			alias	: 'widget.plValideGrid',
			id	: 'plValideGrid',
			store   : 'TriPlValideStore',
			columns : columns,
			stripeRows: true,
			title   : 'P.L valid&eacute;s',
			iconCls	: 'yes',
			multiSelect: true,
			sortableColumns : false,
		        frame	: true,
			//verticalScrollerType: 'paginggridscroller',
			loadMask: true,
			//disableSelection: true,
			invalidateScrollerOnRefresh: false,
			viewConfig: {
				trackOver: false,
				plugins: {
				    ptype	: 'gridviewdragdrop',
				    dragGroup	: 'secondGridDDGroup',
				    dropGroup	: 'firstGridDDGroup'
				},
				listeners: {
				    	itemcontextmenu: function(view, rec, node, index, e) {
					    e.stopEvent();
					    validecontextMenu.showAt(e.getXY());
					    return false;
					},
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
				    }/*,
				    itemdblclick:function(a,b,c,d){
					displayplpanel(a,b,c,d);
				    }*/		            
				}//,
				//deferEmptyText : false,
				//	emptyText: '<br><br><br><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Glisser-D&eacute;poser les factures valides ici.<br>&nbsp&nbspLaisser la touche Ctrl enfonc&eacute;e pour d&eacute;placer plusieurs lignes.'				
			},
			/*tools:[{
			    type:'refresh',
			    tooltip: 'Refresh form Data',
			    // hidden:true,
			    handler: function(event, toolEl, grid){
				console.info(event);
				console.info(toolEl);
				console.info(grid);
				grid.ownerCt.store.resetData();
				grid.ownerCt.store.guaranteeRange(0,50);
			    }
			}],*/
			bbar: Ext.create('Ext.PagingToolbar', {
			    store: 'TriPlValideStore',
			    displayInfo: true,
			    displayMsg: 'Affichage des PL {0} - {1} sur {2}',
			    emptyMsg: "Aucun PL &agrave; afficher"
			})
			//,		    margins          : '5 5 5 5'
		});

		// create the destination Grid
		var PlNonValideGrid = Ext.create('Ext.grid.Panel', {
			flex	:1,
			margin	: 5,
			padding	: 5,
			alias	: 'widget.plNonValideGrid',
			id	: 'plNonValideGrid',
		    	stripeRows: true,
		    	title   : 'P.L rejet&eacute;s',
			iconCls	: 'no',
			multiSelect: true,
			sortableColumns : false,
			frame	: true,
			//cls: 'my-grid',
			//verticalScrollerType: 'paginggridscroller',
			loadMask: true,
			//disableSelection: true,
			invalidateScrollerOnRefresh: false,
			viewConfig: {
				trackOver: false,
				plugins	: {
				    ptype: 'gridviewdragdrop',
				    dragGroup: 'secondGridDDGroup',
				    dropGroup: 'firstGridDDGroup'
				},
				listeners: {
					    	itemcontextmenu: function(view, rec, node, index, e) {
						    e.stopEvent();
						    nonvalidecontextMenu.showAt(e.getXY());
						    return false;
						},
						drop: function(node, data, dropRec, dropPosition) {
							Ext.each(data.records, function(op) {
								Ext.Ajax.request({
									url: BASE_URL+'data/triplcontrol/save/nonvalide',
									method : 'POST',
									params : {
										idfacture: op.get('id'),
										BT_MT_EAU: BT_MT_EAU
									}
								});
							})
					    	},
						//drop: function(node, data, dropRec, dropPosition) {
						//var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
						//var idfacture=data.records[0].get('id');
						//data.records[0]
		
						/*window_validation = Ext.create('Ext.window.Window', {
									title	: 'Confirmation rejet PL',
									height	: 130,
									width	: 400,
									layout	: 'fit',
									items	: {  // Let's put an empty grid in just to illustrate fit layout
										xtype	: 'form',
										border	: false,
										frame	: true,
										items	:[{
											xtype		: 'datefield',
											id		: 'date_validation',
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
														url	: BASE_URL+'data/triplcontrol/save/nonvalide',
														method 	: 'POST',
														params 	: {
															idfacture	: op.get('id'),
															BT_MT_EAU	: BT_MT_EAU,
															date_validation	: op.get('date_validation')
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
								}).show();*/
					    //}
					    /*,
					    itemdblclick:function(a,b,c,d){
						displayplpanel(a,b,c,d);
					    }*/	            
				}
		    },
		    store            : 'TriPlNonValideStore',
		    columns          : [
				{text: "Point de Livraison", flex: 1, sortable: false, dataIndex: 'Nom_prenom',
					renderer: function(value, metaData, record, rowIndex) {
						if (value == ''){
							metaData.tdCls = 'emptyText';
						} 
						return value;					
					}
				},
				{text: "Num&eacute;ro P.L", width: 110, sortable: false, dataIndex: 'Point_de_livraison'},
				//{text: "Num&eacute;ro Facture", width: 70, sortable: false, dataIndex: 'No_de_facture'},
				//{text: "Montant net", width: 70, sortable: false, dataIndex: 'Montant_net'}//,
				//{text: "Date r&eacute;sil.", width: 80, sortable: false, dataIndex: 'date_validation', xtype: 'datecolumn',   format:'d-m-Y'}
			],
			/*tools:[{
			    type:'refresh',
			    tooltip: 'Refresh form Data',
			    // hidden:true,
			    handler: function(event, toolEl, grid){
				console.info(event);
				console.info(toolEl);
				console.info(grid);
				grid.ownerCt.store.resetData();
				grid.ownerCt.store.guaranteeRange(0,50);
			    }
			}],*/
			bbar: Ext.create('Ext.PagingToolbar', {
			    store: 'TriPlNonValideStore',
			    displayInfo: true,
			    displayMsg: 'Affichage des PL {0} - {1} sur {2}',
			    emptyMsg: "Aucun PL &agrave; afficher"
			})
		});
		
		
		me.items = [{
			xtype: 'panel',
			bodyStyle: "background-color: transparent;",
			border: 0,
			flex: 1,
			layout:{
				type:'vbox',
				align: 'stretch'
			},
			items:[NouveauPlGrid
			]
		},{
			xtype: 'panel',
			bodyStyle: "background-color: transparent;",
			border: 0,
			flex: 1,
			layout:{
				type:'vbox',
				align: 'stretch'
			},
			items:[
				PlValideGrid,
				PlNonValideGrid
			]
		}];
		
		me.callParent(arguments);
  	}
});
