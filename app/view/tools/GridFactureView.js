Ext.define('MainApp.view.tools.GridFactureView', {
	extend: 'Ext.grid.Panel',
	alias : 'widget.gridfacture',
	title: 'Factures SEEG',
	store: 'FactureStore',
	//height: 200,
	//forceFit: true,
	//width: 1000,
	margin: 5,
	frame: true,
		
	initComponent: function() {
		
		this.columns = [
			{header: 'N&deg; facture', dataIndex: 'No_de_facture', flex:14}, 
			{header: 'N&deg; compteur', dataIndex: 'No_compteur', flex:14},
			{header: 'Code tarif', dataIndex: 'Code_tarif',  flex:8}, 
			{header: 'P.S', dataIndex: 'Puisance_souscrite', flex:3}, 
			{header: 'Ancien index', dataIndex: 'Ancien_index', flex:10}, 
			{header: 'Nouvel Index', dataIndex: 'Nouvel_index', flex:10}, 
			{header: 'Conso', dataIndex: 'Consommation_mensuelle', flex:10}, 
			{header: 'Contrib. Sp&eacute;', dataIndex: 'Contribution_Speciale',  flex:10}, 
			{header: 'Redev', dataIndex: 'Redevance',  flex:5}, 
			{header: 'Montant PF', dataIndex: 'Montant_PF',  flex:10}, 
			{header: 'Montant HT', dataIndex: 'Montant_HT',  flex:10}, 
			{header: 'TVA', dataIndex: 'Montant_tva',  flex:6}, 
			{header: 'Montant net', dataIndex: 'Montant_net',  flex:11}, 
			{header: 'Date index', dataIndex: 'Date_index', xtype:'datecolumn', format:'d-m-Y',  flex:10}, 
			{header: 'Nb jours',  dataIndex: 'Nb_jours',  flex:8}
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


