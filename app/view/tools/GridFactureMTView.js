Ext.define('MainApp.view.tools.GridFactureMTView', {
	extend	: 'Ext.grid.Panel',
	alias 	: 'widget.gridfacturemt',
	id	: 'gridfacturemt',
	title	: 'Factures SEEG',
	store	: 'FactureMTStore',
	resizable : true,
	minHeight : 50,
	maxHeight : 305,
	//forceFit: true,
	//width: 1000,
	margin	: 5,
	frame	: true,
		
	initComponent: function() { 
		flagtpl= new Ext.XTemplate(
			'<tpl if="etat == 3;">',
			'<img src="app/images/icons/cross.png">',
			'</tpl>',
			'<tpl if="etat == 2;">',
			'<img src="app/images/icons/help.png">',
			'</tpl>',
			'<tpl if="etat == 1;">',
			'<img src="app/images/icons/accept.png">',
			'</tpl>'
		);
		
		
		
		this.columns = [
			{header: 'N&deg facture', dataIndex: 'No_de_facture', flex:9}, 
			{header: 'N&deg compteur', dataIndex: 'No_compteur', flex:9},
			{header: 'Tarif', dataIndex: 'Tarif',  flex:1, hidden: true}, 
			{header: 'P.Sou', dataIndex: 'Puisance_souscrite', flex:2}, 
			{header: 'Coef. PA', dataIndex: 'Coefficient_PA', flex:8, hidden: true}, 
			{header: 'P.App', dataIndex: 'Conso_PA', flex:2}, 
			{header: 'Ancien Index Pointe', dataIndex: 'Ancien_Index_Pointe',  flex:11}, 
			{header: 'Nouvel Index Pointe', dataIndex: 'Nouvel_Index_Pointe',  flex:11}, 
			{header: 'Conso Pointe', dataIndex: 'Conso_Pointe',  flex:8}, 
			{header: 'HT Pointe', dataIndex: 'Montant_HT_Pointe',  flex:10, hidden: true}, 
			{header: 'Contrib. Spe. Pointe', dataIndex: 'Contribution_Speciale_Pointe',  flex:6, hidden: true}, 
			{header: 'Net Pointe', dataIndex: 'Montant_Net_Pointe',  flex:6, hidden: true}, 
			{header: 'Ancien Index HP', dataIndex: 'Ancien_Index_Hors_Pointe', flex:9}, 
			{header: 'Nouvel Index HP',  dataIndex: 'Nouvel_Index_Hors_Pointe',  flex:9},
			{header: 'Conso HP', dataIndex: 'Conso_Hors_Pointe',  flex:7}, 
			{header: 'Conso Active', dataIndex: 'Conso_Active',  flex:8}, 
			{header: 'HT HP', dataIndex: 'Montant_HT_Hors_Pointe',  flex:8, hidden: true}, 
			{header: 'Contribution Speciale HP', dataIndex: 'Contribution_Speciale_Hors_Pointe',  flex:8, hidden: true}, 
			{header: 'Net HP', dataIndex: 'Montant_Net_Hors_Pointe',  flex:5, hidden: true}, 
			{header: 'Ancien Index Reactif', dataIndex: 'Ancien_Index_Reactif',  flex:8, hidden: true}, 
			{header: 'Nouvel Index Reactif', dataIndex: 'Nouvel_Index_Reactif',  flex:8, hidden: true}, 
			{header: 'Conso E. Reac.', dataIndex: 'Conso_Energie_Reactive',  flex:9, hidden: true}, 
			{header: 'Prime HT', dataIndex: 'Montant_prime_HT',  flex:8, hidden: true}, 
			{header: 'Prime TTC', dataIndex: 'Montant_Prime_TTC',  flex:8, hidden: true},
			{header: 'Ancien Index Pertes Cuivre', dataIndex: 'Ancien_Index_Pertes_Cuivre',  flex:8, hidden: true}, 
			{header: 'Nouvel Index Pertes Cuivre', dataIndex: 'Nouvel_Index_Pertes_Cuivre',  flex:8, hidden: true}, 
			{header: 'Conso Pertes Cuivre', dataIndex: 'Conso_Pertes_Cuivre',  flex:8, hidden: true}, 
			{header: 'Contribution Speciale Pertes Cuivre', dataIndex: 'Contribution_Speciale_Pertes_Cuivre',  flex:8, hidden: true}, 
			{header: 'HT Pertes Cuivre', dataIndex: 'Montant_HT_Pertes_Cuivre',  flex:8, hidden: true}, 
			{header: 'Net Pertes Cuivre', dataIndex: 'Montant_Net_Pertes_Cuivre',  flex:8, hidden: true}, 
			{header: 'Ancien Index Pertes fer', dataIndex: 'Ancien_Index_Pertes_fer',  flex:8, hidden: true}, 
			{header: 'Nouvel Index Pertes Fer', dataIndex: 'Nouvel_Index_Pertes_Fer',  flex:8, hidden: true}, 
			{header: 'Conso Pertes Fer', dataIndex: 'Conso_Pertes_Fer',  flex:8, hidden: true}, 
			{header: 'Contrib. Spe Pertes Fer', dataIndex: 'Contribution_Speciale_Pertes_Fer',  flex:8, hidden: true}, 
			{header: 'Net Pertes Fer', dataIndex: 'Montant_Net_Pertes_Fer',  flex:8, hidden: true}, 
			{header: 'Conso Depass', dataIndex: 'Conso_Depassement_PS',  flex:9, hidden: true}, 
			{header: 'HT Depass', dataIndex: 'Montant_HT_Penalite_Depassement_PS',  flex:8, hidden: true}, 
			{header: 'Net Depass', dataIndex: 'Montant_Net_Penalite_Depassement_PS',  flex:7, hidden: true}, 
			{header: 'CosPhi', dataIndex: 'Cosinus_phi',  flex:8, hidden: true}, 
			{header: 'HT CosPhi', dataIndex: 'Montant_HT_Cosinus_PHI',  flex:8, hidden: true}, 
			{header: 'Net CosPhi', dataIndex: 'Montant_Net_Cosinus_PHI',  flex:7, hidden: false}, 
			{header: 'Redev. HT', dataIndex: 'MT_REDEVANCE_HT',  flex:8, hidden: true}, 
			{header: 'Montant net', dataIndex: 'Montant_net',  flex:7}, 
			{header: 'Date index', dataIndex: 'Date_index', xtype: 'datecolumn',   format:'d-m-Y', flex:7}, 
			{header: 'Nb jours', dataIndex: 'Nb_jours',  flex:5},
			{header: 'Etat', dataIndex: 'etat', xtype: 'templatecolumn', tpl: flagtpl, align:'center', width:40,sortable: false}
		];
		
		var nouvelleAnomalie = Ext.create('Ext.Action', {
			iconCls	: 'help',
			text: 'Cr&eacute;er une anomalie',
			disabled: true,
			handler: function(widget, event) {
				selecteditem = Ext.getCmp('gridfacturemt').getSelectionModel().getSelection();
				idfacture=selecteditem[0].get('id');
				No_de_facture = selecteditem[0].get('No_de_facture');
				Ext.Ajax.request({
					url: BASE_URL+'data/anomaliecontrol/nouvelleAnomalie',
					params: {
						idfacture: idfacture,
						BT_MT_EAU: BT_MT_EAU,
						PERIODE_MENSUELLE: PERIODE_MENSUELLE
					},
					success: function(response){
						
						console.info('ok');
						
						idPl=Ext.getStore('PlStore').getAt(0).data.id;
		
						var anomalieStore = Ext.getStore('AnomalieStore');
						anomalieStore.load({
							params: {
								idPl: idPl,
								BT_MT_EAU: BT_MT_EAU,
								No_de_facture: No_de_facture
							}
						});
						
						var facturestore = Ext.getStore('FactureMTStore');
							
		
						facturestore.load({
							params: {idPl: idPl}
						});

						//displaypl(idpl,BT_MT_EAU); //définie dans SearchControl.js
					}
				});
			}
		});
		
		this.getSelectionModel().on({
			selectionchange: function(sm, selections) {
			    if (selections.length) {
				nouvelleAnomalie.enable();
			    } else {
				nouvelleAnomalie.disable();
			    }
			}
		});
		
		//Create the Download button and add it to the top toolbar
		/*var exportButton = new Ext.ux.exporter.Button({
			//component: grid,
			text : "Download as .xls",
			swfPath: 'app/ext4/Exporter/downloadify.swf',
			downloadImage: 'app/ext4/Exporter/download.png',
			width: 62, // mantain the width and height
			height: 22,
			downloadName: "download", // this is the name of the file
			formatter: "csv" // Or "csv"
		});*/
		
		this.dockedItems = [{
				xtype: 'toolbar',
				items: [
					nouvelleAnomalie,
					{
						xtype: 'exporterbutton',
						//store: 'FactureMTStore',
						swfPath: 'app/ext4/Exporter/downloadify.swf',
						downloadImage: 'app/ext4/Exporter/download.png',
						width: 62, // mantain the width and height
						height: 22,
						downloadName: "download", // this is the name of the file
						formatter: "csv" // Or "csv"
					}
				]
		}];
		
		
		this.callParent(arguments);

	}
});


