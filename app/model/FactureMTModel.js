Ext.define('MainApp.model.FactureMTModel', {
    extend: 'MainApp.model.Crud',
    fields: ['id', 	'No_de_facture', 'Tarif', 'Puisance_souscrite', 'Coefficient_PA', 'Conso_PA', 'Ancien_Index_Pointe', 'Nouvel_Index_Pointe', 'Conso_Pointe', 'Montant_HT_Pointe', 'Contribution_Speciale_Pointe', 'Montant_Net_Pointe', 'Ancien_Index_Hors_Pointe', 'Nouvel_Index_Hors_Pointe', 'Conso_Hors_Pointe', 'Montant_HT_Hors_Pointe', 'Contribution_Speciale_Hors_Pointe', 'Montant_Net_Hors_Pointe', 'Ancien_Index_Reactif', 'Nouvel_Index_Reactif', 'Conso_Energie_Reactive', 'Montant_prime_HT', 'Montant_Prime_TTC', 'Ancien_Index_Pertes_Cuivre', 'Nouvel_Index_Pertes_Cuivre', 'Conso_Pertes_Cuivre', 'Contribution_Speciale_Pertes_Cuivre', 'Montant_HT_Pertes_Cuivre', 'Montant_Net_Pertes_Cuivre', 'Ancien_Index_Pertes_fer', 'Nouvel_Index_Pertes_Fer', 'Conso_Pertes_Fer', 'Montant_HT_Pertes_Fer', 'Contribution_Speciale_Pertes_Fer', 'Montant_Net_Pertes_Fer', 'Conso_Depassement_PS', 'Montant_HT_Penalite_Depassement_PS', 'Montant_Net_Penalite_Depassement_PS', 'Cosinus_phi', 'Montant_HT_Cosinus_PHI', 'Montant_Net_Cosinus_PHI', 'MT_REDEVANCE_HT', 'Montant_net', 'Date_index', 'Nb_jours']
});
