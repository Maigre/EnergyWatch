var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
	groupHeaderTpl: '{name} ({rows.length} Alerte{[values.rows.length > 1 ? "s" : ""]})',
	enableGroupingMenu : true,
	groupByText : 'Grouper par ce champ',
	showGroupsText : 'Afficher en groupes',
	startCollapsed : true
});

Ext.define('MainApp.view.tools.GridAlerteAllView', {
	extend	: 'Ext.grid.Panel',
	alias 	: 'widget.gridalerteall',
	title	: 'Alertes',
	store	: 'AlerteAllStore',
	features: [groupingFeature],
	//sortableColumns: false,
	//height: 200,
	//forceFit: true,
	//width: 1100,
	//maxHeight: 200,
	frame	: true,
	margin	: '5',
	flex	:1,
			
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
			'Changement de Puissance Souscrite',
			'</tpl>',
			'<tpl if=" ((-1)*Valeur) < 0 && Type == 6">',
			'D&eacute;passement de puissance',
			'</tpl>',
			'<tpl if="Type == 6 && Valeur < 0">',
			'D&eacute;ficit de Puissance',
			'</tpl>',
			'<tpl if="Type == 7;">',
			'Plusieurs factures en un mois pour ce P.L',
			'</tpl>',
			'<tpl if="Type == 8;">',
			'Consommation d\'Energie R&eacute;active',
			'</tpl>',
			'<tpl if="Type == 9;">',
			'Incoh&eacute;rence d\'index',
			'</tpl>'
		);
		
		valeur_tpl= new Ext.XTemplate(
			'<tpl if="Type ==\'Hausse des Consommations\';">',
			'{Valeur}%',
			'</tpl>',
			'<tpl if="Type ==\'Changement de Puissance Souscrite\';">',
			'',
			'</tpl>',
			'<tpl if="Type ==\'D&eacute\;ficit de puissance\';">',
			'{Valeur} %',
			'</tpl>',
			'<tpl if="Type ==\'D&eacute\;passement de puissance\';">',
			'{Valeur} %',
			'</tpl>',
			'<tpl if="Type ==\'Plusieurs factures en un mois pour ce P.L\';">',
			'{Valeur}',
			'</tpl>',
			'<tpl if="Type ==\'Consommation Energie R&eacute;active\';">',
			'{Valeur} CFA',
			'</tpl>',
			'<tpl if="Type ==\'Incoh&eacute\;rence index\';">',
			'',
			'</tpl>'
		);
		
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
			extend	: 'Ext.form.ComboBox',
			alias	: 'widget.flagcombobox',
			//fieldLabel: 'nometat',
			store	: flagcomboboxstore,          //[['1'],['2'],['3']],
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
			{header: 'Nom PL', dataIndex: 'Nom_prenom', flex:3, sortable: false},
			{header: 'N&deg; PL', dataIndex: 'Point_de_livraison', flex:1, sortable: false},
			{header: 'N&deg; Facture', dataIndex: 'No_de_facture', flex:1, sortable: false},
			{header: 'Date', dataIndex: 'Date', xtype:'datecolumn', format:'d-m-Y', width:80, sortable: false}, 
			{header: 'Alerte', dataIndex: 'Type'/*, xtype: 'templatecolumn', tpl: type_tpl*/, flex:2, sortable: false},
			{header: 'Valeur', dataIndex: 'Valeur', xtype: 'templatecolumn', tpl: valeur_tpl, width:60},
			{header: 'Etat', dataIndex: 'Etat', xtype: 'templatecolumn', tpl: flagtpl , align:'center', width:40/*,
				editor: {
		            xtype: 'flagcombobox',
		            //triggerAction: 'all',
		            selectOnTab: true//,
		            //lazyRender: true,
		            //listClass: 'x-combo-list-small'
            	}*/
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
		/*this.plugins = [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		        clicksToEdit: 1
		    })
		];*/
		

		
		this.callParent(arguments);
	},
	
	/*onSync: function(){
        this.store.sync();
    },*/
});
