Ext.define('MainApp.view.tools.GridAlerteView', {
	extend: 'Ext.grid.Panel',
	alias : 'widget.gridalerte',
	title: 'Alertes',
	store: 'AlerteStore',
	//height: 200,
	//forceFit: true,
	//width: 1100,
	frame: true,
	margin: 5,
	/*dockedItems:[{
        xtype: 'toolbar',
        dock: 'bottom',
        items: ['->', {
                    icon: 'app/images/icons/disk.png',
                    //text: '',
                    scope: this,
                    handler: this.onSync
        }]
    }],*/
		
	initComponent: function() {
		flagtpl= new Ext.XTemplate(
			'<tpl if="Etat == 3;">',
			'<img src="app/images/icons/cross.png">',
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
			'{Valeur} factures re&ccedil;ues pour ce P.L',
			'</tpl>',
			'<tpl if="Type == 8;">',
			'Consommation d\'Energie R&eacute;active : {Valeur} CFA',
			'</tpl>',
			'<tpl if="Type == 9;">',
			'Incoh&eacute;rence d\'index',
			'</tpl>'
		);
		
		/*valeur_tpl= new Ext.XTemplate(
			'{Valeur} %'
		);*/
		
		change_etat= new Ext.XTemplate(
			'<input type="button" name="addButton" value="Modifier" style="width:90px"/></div>'
		);
		
		flagcomboboxstore = new Ext.data.Store({
			fields: [{name: 'Etat'},{name: 'nom_etat'}],
			data : [
				{"Etat":"3", "nom_etat":"Alerte"},
				{"Etat":"2", "nom_etat":"En cours"},
				{"Etat":"1", "nom_etat":"Resolu"}
			]
		});
		
		Ext.define('MainApp.view.tools.flagcombobox', {
			extend: 'Ext.form.ComboBox',
			alias: 'widget.flagcombobox',
			//fieldLabel: 'nometat',
			store: flagcomboboxstore,          //[['1'],['2'],['3']],
			queryMode: 'local',
			displayField: 'nom_etat',
			valueField: 'Etat'
			//,tpl: flagtpl
		});
		/*flagcombobox= new Ext.form.ComboBox({
			alias: 'widget.flagcombobox',
			fieldLabel: 'Etat',
			store: flagcomboboxstore,          //[['1'],['2'],['3']],
			queryMode: 'local',
			displayField: 'Etat',
			valueField: 'Etat'
		});*/
		
		this.columns = [
			{header: 'N&deg; Facture', dataIndex: 'No_de_facture', flex:1},
			{header: 'Date', dataIndex: 'Date', xtype:'datecolumn', format:'d-m-Y', width:80},
			{header: 'Alerte', dataIndex: 'Type', xtype: 'templatecolumn', tpl: type_tpl, flex:3}, 
			
			//{header: 'Hausse', dataIndex: 'Valeur', xtype: 'templatecolumn', tpl: valeur_tpl, flex:1},
			{header: 'Etat', dataIndex: 'Etat', xtype: 'templatecolumn', tpl: flagtpl , align:'center', width:40,
				editor: {
		            xtype: 'flagcombobox',
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
