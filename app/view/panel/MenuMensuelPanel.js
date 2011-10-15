Ext.define('MainApp.view.panel.MenuMensuelPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.menumensuelpanel',
	id    : 'menumensuelpanel',
  	//requires:['MainApp.view.tools.GridAlerteAllView'],
	//bodyPadding: 5,
	//collapsible: true,
	//collapseDirection: 'left',
	//floatable: true,
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
							console.info(this.up('panel').items.items);
							Ext.each(this.up('panel').items.items,function(button){
								console.info('ok');
								console.info(button);
								
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
								
								/*bilanvalidepanel.title='Valid&eacute; - '+op;
								bilanrejetepanel.title='Rejet&eacute; - '+op;
								bilanattentepanel.title='Attente - '+op;
								bilanalertepanel.title='Alertes - '+op;
								*/
								
								Ext.getCmp('centerregion').add(bilanmainpanel);
								
								bilanvalidepanel.animate({
									duration: 1000,
									from: {
										opacity: 0
									},
									to: {
										opacity: 1
									}
								});
								bilanrejetepanel.animate({
									duration: 1000,
									from: {
										opacity: 0
									},
									to: {
										opacity: 1
									}
								}); 
								bilanattentepanel.animate({
									duration: 1000,
									from: {
										opacity: 0
									},
									to: {
										opacity: 1
									}
								}); 
								bilanalertepanel.animate({
									duration: 1000,
									from: {
										opacity: 0
									},
									to: {
										opacity: 1
									}
								});  
								//bilanpanel.center();
								//bilanpanel.setTitle('Bilan '+op+' '+BT_MT_EAU);
								
								bilanvalidepanel.getForm().loadRecord(rec);
								//console.info(bilanvalidepanel);
								//console.info(op);
								
								
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
					me.add(MensuelButton);
				})
				// process server response here
			}
		});
		
		me.callParent(arguments);
  	}
});
