var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
	groupHeaderTpl: '{name} ({rows.length} Alerte{[values.rows.length > 1 ? "s" : ""]})',
	enableGroupingMenu : true,
	groupByText : 'Grouper par ce champ',
	showGroupsText : 'Afficher en groupes',
	startCollapsed : true
});

/*var actionTrier = Ext.create('Ext.Action', {
	iconCls	: 'yes',
	text: 'Trier par alerte',
	disabled: false,
	handler: function(widget, event) {
		
		store  = Ext.getStore('AlerteAllStore');
		store.group
		
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
});*/




Ext.define('MainApp.view.tools.GridAlerteAllView', {
	extend	: 'Ext.grid.Panel',
	alias 	: 'widget.gridalerteall',
	id 	: 'gridalerteall',
	title	: 'Alertes',
	store	: 'AlerteAllStore',
	//features: [groupingFeature],
	features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name} ({rows.length} Alerte{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            enableGroupingMenu: false,
            startCollapsed : true
        }],
	sortableColumns: false,
	/*dockedItems: [{
	    xtype: 'toolbar',
	    items: [
		actionTrier
	    ]
	}],*/
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
			'</tpl>',
			'<tpl if="Type ==\'Consommation nulle\';">',
				'',
			'</tpl>',
			'<tpl if="Type ==\'Avoir\';">',
				'{Valeur} CFA',
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
		
		this.columns = [
			{header: 'Nom PL', dataIndex: 'Nom_prenom', flex:3, sortable: false},
			{header: 'N&deg; PL', dataIndex: 'Point_de_livraison', flex:1, sortable: false},
			{header: 'N&deg; Facture', dataIndex: 'No_de_facture', flex:1, sortable: false},
			{header: 'Date', dataIndex: 'Date', xtype:'datecolumn', format:'d-m-Y', width:80, sortable: false}, 
			{header: 'Alerte', dataIndex: 'Type'/*, xtype: 'templatecolumn', tpl: type_tpl*/, flex:2, sortable: false},
			{header: 'Valeur', dataIndex: 'Valeur', align: 'center', xtype: 'templatecolumn', tpl: valeur_tpl, width:140, sortable: false,
				summaryType: 'sum',
				summaryRenderer: function(value, summaryData, dataIndex) {
					/*this.summaryData['Changement de Puissance souscrite'].Valeur=0;
					
					this.summaryData['D&eacute\;ficit de puissance'].Valeur=0;
					this.summaryData['D&eacute\;passement de puissance'].Valeur=0;
					
					this.summaryData['Hausse des Consommations'].Valeur=0;*/
					//this.summaryData['Plusieurs factures en un mois pour ce P.L'].Valeur=0;
					if (this.summaryData['Changement de Puissance souscrite']){
						this.summaryData['Changement de Puissance souscrite'].Valeur=0;
					}
					if (this.summaryData['D&eacute\;ficit de puissance']){
						this.summaryData['D&eacute\;ficit de puissance'].Valeur=0;
					}
					if (this.summaryData['D&eacute\;passement de puissance']){
						this.summaryData['D&eacute\;passement de puissance'].Valeur=0;
					}
					if (this.summaryData['Hausse des Consommations']){
						this.summaryData['Hausse des Consommations'].Valeur=0;
					}
					if (this.summaryData['Incoh&eacute\;rence index']){
						this.summaryData['Incoh&eacute\;rence index'].Valeur=0;
					}
					if (this.summaryData['Plusieurs factures en un mois pour ce P.L']){
						this.summaryData['Plusieurs factures en un mois pour ce P.L'].Valeur=0;
					}

					if (summaryData.Valeur==0){
						return '';
					}
					else{
						return value + ' CFA';
					}
					
				}	
			},
			{header: 'Etat', dataIndex: 'Etat', /*xtype: 'templatecolumn', tpl: flagtpl ,*/ align:'center', width:40,sortable: false}
		];
		
		
		alertgridcontextmenu = new Ext.menu.Menu({
			  width: 160,
			  items: [{
					text: 'Changer le fond d\'&eacutecran',
					iconCls: 'edit',
					width : 160,
					
					handler: function(){
						console.info('ok');
						
					}
			  }]
		});
		
		this.on('render',function() {
			this.getEl().on('contextmenu', function(e) {
				 e.preventDefault();
				 alertgridcontextmenu.showAt(e.getXY());
			});
		});
		
		this.callParent(arguments);
	},
	
	/*onSync: function(){
        this.store.sync();
    },*/
});
