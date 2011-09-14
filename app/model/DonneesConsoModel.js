Ext.define('MainApp.model.DonneesConsoModel', {
    extend: 'MainApp.model.Crud',
    fields: ['id', 'No_de_facture', 'Code_tarif', 'Puisance_souscrite', 'Ancien_index', 'Nouvel_index', 'Consommation_mensuelle', 'Redevance', 'Contribution_Speciale', 'Montant_PF', 'Montant_HT', 'Montant_tva', 'Montant_net', {name:'Date_index', type:'date', dateFormat:'d-m-Y'}, 'Nb_jours'],
    name: 'facturebt'
});
