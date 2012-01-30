Ext.define('MainApp.view.tools.GridAlerteView', {
	extend	: 'Ext.grid.Panel',
	alias 	: 'widget.gridalerte',
	title	: 'Alertes',
	store	: 'AlerteStore',
	resizable: true,
	frame	: true,
	margin	: 5,
	tools:[{
		type:'refresh',
		tooltip: 'Rafraichir',
		// hidden:true,
		handler: function(event, toolEl, panel){

			Ext.getStore('AlerteStore').load({
				params: {
					BT_MT_EAU 	: BT_MT_EAU,
					idPl		: Ext.getStore('PlStore').data.items[0].data.id,
					only_active	: true
				}
			});		
		}
	}],		
	initComponent: function() {
		flagtpl= new Ext.XTemplate(
			'<tpl if="Etat == 3;">',
			'<img src="app/images/icons/error.png">',
			'</tpl>',
			'<tpl if="Etat == 2;">',
			'<img src="app/images/icons/help.png">',
			'</tpl>',
			'<tpl if="Etat == 1;">',
			'<img src="app/images/icons/accept.png">',
			'</tpl>'
		);
		
		type_tpl= new Ext.XTemplate(
			'<tpl if="Type == 1;">',
				'Hausse de {Valeur}% des Consommations journali&egrave;res (HorsPointe)',
			'</tpl>',
			'<tpl if="Type == 4;">',
				'Changement Puissance Souscrite',
			'</tpl>',
			'<tpl if=" ((-1)*Valeur) < 0 && Type == 6">',
				'D&eacute;passement de puissance {Valeur}%',
			'</tpl>',
			'<tpl if="Type == 6 && Valeur < 0">',
				'D&eacute;ficit de Puissance de ({Valeur}%)',
			'</tpl>',
			'<tpl if="Type == 7;">',
				'{Valeur} factures re&ccedil;ues ce mois',
			'</tpl>',
			'<tpl if="Type == 8;">',
				'Consommation d\'Energie R&eacute;active : {Valeur} CFA',
			'</tpl>',
			'<tpl if="Type == 9;">',
				'Incoh&eacute;rence d\'index',
			'</tpl>',
			'<tpl if="Type == 10;">',
				'Consommation nulle',
			'</tpl>',
			'<tpl if="Type == 11;">',
				'Avoir',
			'</tpl>',
			'<tpl if="Type == 12;">',
				'PL rejet&eacute;',
			'</tpl>'
		);
		
		change_etat= new Ext.XTemplate(
			'<input type="button" name="addButton" value="Modifier" style="width:90px"/></div>'
		);
		
		flagcomboboxstore = new Ext.data.Store({
			fields: [{name: 'Etat'},{name: 'nom_etat'}],
			data : [
				{"Etat":"3", "nom_etat":"Active"},
				{"Etat":"2", "nom_etat":"En attente"},
				{"Etat":"1", "nom_etat":"Desactivee"}
			]
		});
		
		Ext.define('MainApp.view.tools.flagcombobox_alerte', {
			extend: 'Ext.form.ComboBox',
			alias: 'widget.flagcombobox_alerte',
			//fieldLabel: 'nometat',
			store: flagcomboboxstore,          //[['1'],['2'],['3']],
			queryMode: 'local',
			displayField: 'nom_etat',
			valueField: 'Etat'
			//,tpl: flagtpl
		});
		flagcombobox_alerte= new Ext.form.ComboBox({
			alias: 'widget.flagcombobox_alerte',
			fieldLabel: 'Etat',
			store: flagcomboboxstore,          //[['1'],['2'],['3']],
			queryMode: 'local',
			displayField: 'Etat',
			valueField: 'Etat'
		});
		
		this.columns = [
			{header: 'N&deg; Facture', dataIndex: 'No_de_facture', flex:1},
			{header: 'Date', dataIndex: 'Date', xtype:'datecolumn', format:'d-m-Y', width:80},
			{header: 'Alerte', dataIndex: 'Type', xtype: 'templatecolumn', tpl: type_tpl, flex:3}, 
			
			//{header: 'Hausse', dataIndex: 'Valeur', xtype: 'templatecolumn', tpl: valeur_tpl, flex:1},
			{header: 'Etat', dataIndex: 'Etat', xtype: 'templatecolumn', tpl: flagtpl , align:'center', width:40,
				editor: {
					xtype: 'flagcombobox_alerte',
					//triggerAction: 'all',
					selectOnTab: true//,
					//lazyRender: true,
					//listClass: 'x-combo-list-small'
			    	}
			}, 
			{header: 'Commentaire', dataIndex: 'Commentaire', flex:4,
				editor: {
					xtype: 'textfield',
					allowBlank: true,
					//triggerAction: 'all',
					selectOnTab: true//,
					//lazyRender: true,
					//listClass: 'x-combo-list-small'
            			}
			}
		];
		this.plugins = [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		        clicksToEdit: 1
		    })
		],
		this.callParent(arguments);
	},
	
	/*onSync: function(){
        this.store.sync();
    },*/
});
