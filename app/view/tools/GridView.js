Ext.define('MainApp.view.tools.GridView', {
	extend: 'Ext.grid.Panel',
	alias : 'widget.gridfacture',
	title: 'facture',
	store: 'FactureStore',
	height: 200,	
	initComponent: function() {
		this.columns = [
			{header: 'N&deg; facture', dataIndex: 'No_de_facture',  flex: 1}, 
			{header: 'Code tarif', dataIndex: 'Code_tarif'}, 
			{header: 'Puisance souscrite', dataIndex: 'Puisance_souscrite'}, 
			{header: 'Ancien index', dataIndex: 'Ancien_index'}, 
			{header: 'Nouvel Index', dataIndex: 'Nouvel_index'}, 
			{header: 'Consommation mensuelle', dataIndex: 'Consommation_mensuelle'}, 
			{header: 'Redevance', dataIndex: 'Redevance'}, 
			{header: 'Contribution Speciale', dataIndex: 'Contribution_Speciale'}, 
			{header: 'Montant PF', dataIndex: 'Montant_PF'}, 
			{header: 'Montant HT', dataIndex: 'Montant_HT'}, 
			{header: 'Montant tva', dataIndex: 'Montant_tva'}, 
			{header: 'Montant net', dataIndex: 'Montant_net'}, 
			{header: 'Date index', dataIndex: 'Date_index', xtype:'datecolumn', format:'d-m-Y'}, 
			{header: 'Nb jours',  dataIndex: 'Nb_jours'}
		];
		this.callParent(arguments);
	}
});


