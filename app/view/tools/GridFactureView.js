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
		this.callParent(arguments);

	}
});


