Ext.define('MainApp.model.TriPlModel', {
    extend: 'MainApp.model.Crud',
    fields: ['id','Nom_prenom','Point_de_livraison','No_de_facture','Montant_net','date_validation']
});
