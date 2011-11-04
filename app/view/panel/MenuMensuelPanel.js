Ext.define('MainApp.view.panel.MenuMensuelPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.menumensuelpanel',
	id    : 'menumensuelpanel',
  	//requires:['MainApp.view.tools.GridAlerteAllView'],
	//bodyPadding: 5,
	//collapsible: true,
	//collapseDirection: 'left',
	//floatable: true,
	bodyStyle: "background-color:#B6D0DB;",
	layout: {
        type: 'auto'//,
        //align: 'center',
        //padding: 5
    },
	initComponent: function() {
		var me = this;
		Ext.Ajax.request({
			url: BASE_URL+'data/process/menumensuel',
			method : 'POST',
			params: {
				BT_MT_EAU: BT_MT_EAU
			},
			success: function(response){
				var options = Ext.decode(response.responseText).data;

				//console.info(options);
				Ext.each(options, function(op) {
					MensuelButton = new Ext.Button({
						id: 'Menu-button-'+op,
						text: op,
						iconCls: 'money',
						enableToggle: true,
						margin: 5,
						width: 120, 
						handler: function(){
							//deselectionne les autres buttons pour ne selectionner que celui qui est cliqué
							Ext.each(this.up('panel').items.items,function(button){							
								button.toggle(false);
							})
							this.toggle(true);
							
							PERIODE_MENSUELLE = op;
							Ext.getCmp('centerregion').removeAll(false);
							
							var bilanstore = Ext.getStore('BilanStore');
							bilanstore.load({
								params: {
									periode_mensuelle: op,
									BT_MT_EAU: BT_MT_EAU
								}
							});
							bilanstore.on('load', function(database){
								var rec= database.getAt(0);
								var bilanmainpanel = Ext.getCmp('bilanmainpanel');
								if (!bilanmainpanel){
									var bilanmainpanel = Ext.widget('bilanmainpanel');
									bilanmainpanel.bodyStyle="background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;";
								}
								
								var bilanmainpanelup = Ext.getCmp('bilanmainpanelup');
								var bilanmainpaneldown = Ext.getCmp('bilanmainpaneldown');
								
								var bilanvalidepanel = Ext.getCmp('bilanvalidepanel');
								if (!bilanvalidepanel){
									var bilanvalidepanel = Ext.widget('bilanvalidepanel');
									//bilanmainpanelup.add(bilanvalidepanel);
								}
								var bilanrejetepanel = Ext.getCmp('bilanrejetepanel');
								if (!bilanrejetepanel){
									var bilanrejetepanel = Ext.widget('bilanrejetepanel');
									//bilanmainpanelup.add(bilanrejetepanel);
								}
								var bilanattentepanel = Ext.getCmp('bilanattentepanel');
								if (!bilanattentepanel){
									var bilanattentepanel = Ext.widget('bilanattentepanel');
								}
								var bilanalertepanel = Ext.getCmp('bilanalertepanel');
								if (!bilanalertepanel){
									var bilanalertepanel = Ext.widget('bilanalertepanel');
									//bilanmainpaneldown.add(bilanalertepanel);
								}
								
								Ext.getCmp('centerregion').add(bilanmainpanel);
								
								bilanvalidepanel.getForm().loadRecord(rec);
								bilanrejetepanel.getForm().loadRecord(rec);
								bilanattentepanel.getForm().loadRecord(rec);
								bilanalertepanel.getForm().loadRecord(rec);
								
								bilanvalidepanel.doLayout();
								bilanrejetepanel.doLayout();
								bilanattentepanel.doLayout();
								bilanalertepanel.doLayout();
								
							});
						}
					});
					
					contextMenu = new Ext.menu.Menu({
						  periode : '',
						  items: [/*{
								text: 'Edit',
								iconCls: 'edit',
								handler: function(a,b,c,d){
									console.info('ok');
						  		}
						  },*/{
								text: 'Supprimer',
								iconCls: 'no',
								handler: function(a,b,c,d){
									Ext.getCmp('Menu-button-'+a.ownerCt.periode)
									Ext.Ajax.request({
										url: BASE_URL+'data/process/count_todelete/'+a.ownerCt.periode+'/'+BT_MT_EAU,
										method : 'POST',
										params: {
											BT_MT_EAU: BT_MT_EAU
										},
										success: function(response){
											nb_facture=Ext.decode(response.responseText).count;
											Ext.MessageBox.confirm(
												'Supression de donn&eacute;es', 
												'Supression de '+nb_facture+' factures . Souhaitez-vous la poursuivre?',
												function(btn) {
													if(btn == 'yes'){
														var window_progress= Ext.create('Ext.window.Window', {
															title	: 'Supression en cours',
															id	: 'windowprogress',
															closeAction: 'hide',
															modal	: true, 
															//height	: 150,
															width	: 500,
															layout	: 'fit',
															items	: {  // Let's put an empty grid in just to illustrate fit layout
																xtype	: 'progressbar',
																id	: 'deleteprogressbar'				
															}
														});
														window_progress.show();
														delete_until_end= function(){
															Ext.Ajax.request({
																url: BASE_URL+'data/process/deleteperiode/'+a.ownerCt.periode+'/'+BT_MT_EAU,
																method : 'POST',
																params: {
																	BT_MT_EAU: BT_MT_EAU
																},
																success: function(response){
																	
																	var obj = Ext.decode(response.responseText);
								
																	if(obj.info=='continue'){
																		//progressbar.updateProgress(obj.progress);
																		//progress=obj.progress*100;
																		Ext.getCmp('deleteprogressbar').updateText(obj.totalrestant+' factures restantes');
																		progress=1-(obj.totalrestant)/nb_facture;
																		Ext.getCmp('deleteprogressbar').updateProgress(progress);
																		delete_until_end();
																	}
																	else{
																		Ext.getCmp('westregion').removeAll();
																		var menumensuelpanel= new Ext.widget('menumensuelpanel');
																		window_progress.destroy();
																		Ext.getCmp('westregion').add(menumensuelpanel);
																	}
																
											
											
											
																	
																}
															});														
														};
														delete_until_end();
														
													}
												}
											);
										}
									});
								}						  
						  }]
					});
					//console.info(Ext.get('Menu-button-'+op));
					Ext.getCmp('Menu-button-'+op).on('render',function() {
						Ext.getCmp('Menu-button-'+op).getEl().on('contextmenu', function(e) {
							 e.preventDefault();
							 menu=contextMenu;
							 menu.periode=op;
							 menu.showBy(Ext.getCmp('Menu-button-'+op));
						});
					});
					me.add(MensuelButton);
				})
				// process server response here
			}
		});
		
		me.callParent(arguments);
  	}
});
