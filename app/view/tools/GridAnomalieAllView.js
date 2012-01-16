
Ext.define('MainApp.view.tools.GridAnomalieAllView', {
	extend	: 'Ext.grid.Panel',
	alias 	: 'widget.gridanomalieall',
	id 	: 'gridanomalieall',
	title	: 'Anomalies Facture',
	store	: 'AnomalieAllStore',
	//features: [groupingFeature],
	/*features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name} ({rows.length} Alerte{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            enableGroupingMenu: false,
            startCollapsed : true
        }],*/
	//sortableColumns: false,
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
	tools:[{
		type:'close',
		tooltip: 'Anomalies Actives',
		handler: function(event, toolEl, panel){
			anomalieallstore=Ext.getStore('AnomalieAllStore');
			anomalieallstore.proxy.url= BASE_URL+'data/anomaliecontrol/loadall/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE;
			anomalieallstore.load({
				params: {
					only_active	: true
				}
			});		
		}
	},{
		type:'help',
		tooltip: 'Anomalies en attente',
		handler: function(event, toolEl, panel){
			anomalieallstore=Ext.getStore('AnomalieAllStore');
			anomalieallstore.proxy.url= BASE_URL+'data/anomaliecontrol/loadall/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE;
			anomalieallstore.load({
				params: {
					only_attente	: true
				}
			});		
		}
	},{
		type:'refresh',
		tooltip: 'Toutes',
		handler: function(event, toolEl, panel){
			anomalieallstore=Ext.getStore('AnomalieAllStore');
			anomalieallstore.proxy.url= BASE_URL+'data/anomaliecontrol/loadall/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE;
			anomalieallstore.load({
			});		
		}
	}],
			
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
				/*summaryType: 'sum',
				summaryRenderer: function(value, summaryData, dataIndex) {*/
					/*this.summaryData['Changement de Puissance souscrite'].Valeur=0;
					
					this.summaryData['D&eacute\;ficit de puissance'].Valeur=0;
					this.summaryData['D&eacute\;passement de puissance'].Valeur=0;
					
					this.summaryData['Hausse des Consommations'].Valeur=0;*/
					//this.summaryData['Plusieurs factures en un mois pour ce P.L'].Valeur=0;
					/*
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
					
				}*/	
			},
			{header: 'Etat', dataIndex: 'Etat', xtype: 'templatecolumn', tpl: flagtpl, align:'center', width:40,sortable: true}
		];
		
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
