Ext.define('MainApp.model.AlerteModel', {
    extend: 'MainApp.model.Crud',
    fields: ['id','idAl','idAlerteParent','Date','Etat','Type', 'Valeur', 'Valeur2', 'Commentaire','Flux', 'idPl', 'Point_de_livraison', 'Nom_prenom', 'No_de_facture','AlGrouped']
});
