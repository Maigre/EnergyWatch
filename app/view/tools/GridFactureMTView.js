Ext.define('MainApp.view.tools.GridFactureMTView', {
	extend	: 'Ext.grid.Panel',
	alias 	: 'widget.gridfacturemt',
	title	: 'Factures SEEG',
	store	: 'FactureMTStore',
	resizable : true,
	minHeight : 50,
	//forceFit: true,
	//width: 1000,
	margin	: 5,
	frame	: true,
		
	initComponent: function() { 
		this.columns = [
			{header: 'N&deg; facture', dataIndex: 'No_de_facture', flex:9}, 
			{header: 'Tarif', dataIndex: 'Tarif',  flex:1, hidden: true}, 
			{header: 'P.S', dataIndex: 'Puisance_souscrite', flex:1}, 
			{header: 'Coef. PA', dataIndex: 'Coefficient_PA', flex:8, hidden: true}, 
			{header: 'Conso PA', dataIndex: 'Conso_PA', flex:6}, 
			{header: 'Ancien Index Pointe', dataIndex: 'Ancien_Index_Pointe',  flex:10}, 
			{header: 'Nouvel Index Pointe', dataIndex: 'Nouvel_Index_Pointe',  flex:5}, 
			{header: 'Conso Pointe', dataIndex: 'Conso_Pointe',  flex:8}, 
			{header: 'HT Pointe', dataIndex: 'Montant_HT_Pointe',  flex:10, hidden: true}, 
			{header: 'Contrib. Spe. Pointe', dataIndex: 'Contribution_Speciale_Pointe',  flex:6, hidden: true}, 
			{header: 'Net Pointe', dataIndex: 'Montant_Net_Pointe',  flex:6}, 
			{header: 'Ancien Index HP', dataIndex: 'Ancien_Index_Hors_Pointe', flex:10}, 
			{header: 'Nouvel Index HP',  dataIndex: 'Nouvel_Index_Hors_Pointe',  flex:8},
			{header: 'Conso HP', dataIndex: 'Conso_Hors_Pointe',  flex:7}, 
			{header: 'HT HP', dataIndex: 'Montant_HT_Hors_Pointe',  flex:8, hidden: true}, 
			{header: 'Contribution Speciale HP', dataIndex: 'Contribution_Speciale_Hors_Pointe',  flex:8, hidden: true}, 
			{header: 'Net HP', dataIndex: 'Montant_Net_Hors_Pointe',  flex:5}, 
			{header: 'Ancien Index Reactif', dataIndex: 'Ancien_Index_Reactif',  flex:8, hidden: true}, 
			{header: 'Nouvel Index Reactif', dataIndex: 'Nouvel_Index_Reactif',  flex:8, hidden: true}, 
			{header: 'Conso E. Reac.', dataIndex: 'Conso_Energie_Reactive',  flex:9}, 
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
			{header: 'Conso Depass', dataIndex: 'Conso_Depassement_PS',  flex:9}, 
			{header: 'HT Depass', dataIndex: 'Montant_HT_Penalite_Depassement_PS',  flex:8, hidden: true}, 
			{header: 'Net Depass', dataIndex: 'Montant_Net_Penalite_Depassement_PS',  flex:7, hidden: true}, 
			{header: 'CosPhi', dataIndex: 'Cosinus_phi',  flex:8, hidden: true}, 
			{header: 'HT CosPhi', dataIndex: 'Montant_HT_Cosinus_PHI',  flex:8, hidden: true}, 
			{header: 'Net CosPhi', dataIndex: 'Montant_Net_Cosinus_PHI',  flex:7, hidden: true}, 
			{header: 'Redev. HT', dataIndex: 'MT_REDEVANCE_HT',  flex:8, hidden: true}, 
			{header: 'Montant net', dataIndex: 'Montant_net',  flex:8}, 
			{header: 'Date index', dataIndex: 'Date_index', xtype: 'datecolumn',   format:'d-m-Y', flex:7}, 
			{header: 'Nb jours', dataIndex: 'Nb_jours',  flex:6}
		];
		this.callParent(arguments);

	}
});


