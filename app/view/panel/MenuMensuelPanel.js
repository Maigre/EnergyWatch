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
						margin: 10,
						handler: function(){
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
								var bilanmainpanel = Ext.getCmp('bilanmainpanel');
								if (!bilanmainpanel){
									var bilanmainpanel = Ext.widget('bilanmainpanel');
								}
								var bilanpanel = Ext.getCmp('bilanpanel');
								if (!bilanpanel){
									var bilanpanel = Ext.widget('bilanpanel');
								}
								
								Ext.getCmp('centerregion').add(bilanmainpanel);
								//bilanpanel.center();
								bilanpanel.setTitle('Bilan '+op+' '+BT_MT_EAU);
								var rec= database.getAt(0);
								bilanpanel.getForm().loadRecord(rec);
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
