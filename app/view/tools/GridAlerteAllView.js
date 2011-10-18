Ext.define('MainApp.view.tools.GridAlerteAllView', {
	extend: 'Ext.grid.Panel',
	alias : 'widget.gridalerteall',
	title: 'Alertes',
	store: 'AlerteAllStore',
	//height: 200,
	//forceFit: true,
	//width: 1100,
	frame: true,
	margin: '10 50 50 10',
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
			'Hausse des Consommations',
			'</tpl>',
			'<tpl if="Type == 4;">',
			'Changement Puissance Souscrite',
			'</tpl>',
			'<tpl if="Type == 6;">',
			'D&eacute;passement Puissance',
			'</tpl>',
			'<tpl if="Type == 7;">',
			'Plusieurs factures en un mois pour ce P.L',
			'</tpl>'
		);
		
		valeur_tpl= new Ext.XTemplate(
			'<tpl if="Type == 1;">',
			'{Valeur}%',
			'</tpl>',
			'<tpl if="Type == 4;">',
			'',
			'</tpl>',
			'<tpl if="Type == 6;">',
			'{Valeur} %',
			'</tpl>',
			'<tpl if="Type == 7;">',
			'{Valeur}',
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
			{header: 'Nom PL', dataIndex: 'Nom_prenom', flex:3},
			{header: 'N&deg; PL', dataIndex: 'Point_de_livraison', flex:1},
			{header: 'N&deg; Facture', dataIndex: 'No_de_facture', flex:1},
			{header: 'Date', dataIndex: 'Date', xtype:'datecolumn', format:'d-m-Y', width:80}, 
			{header: 'Alerte', dataIndex: 'Type', xtype: 'templatecolumn', tpl: type_tpl, flex:2},
			{header: 'Valeur', dataIndex: 'Valeur', xtype: 'templatecolumn', tpl: valeur_tpl, width:60},
			{header: 'Etat', dataIndex: 'Etat', xtype: 'templatecolumn', tpl: flagtpl , align:'center', width:40,
				editor: {
		            xtype: 'flagcombobox',
		            //triggerAction: 'all',
		            selectOnTab: true//,
		            //lazyRender: true,
		            //listClass: 'x-combo-list-small'
            	}
            } 
            /*,
			{header: 'Commentaire', dataIndex: 'Commentaire', flex:2,
				editor: {
		            xtype: 'textfield',
		            allowBlank: false,
		            //triggerAction: 'all',
		            selectOnTab: true//,
		            //lazyRender: true,
		            //listClass: 'x-combo-list-small'
            	}
			}*/
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
