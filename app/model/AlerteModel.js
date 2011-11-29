Ext.define('MainApp.model.AlerteModel', {
    extend: 'MainApp.model.Crud',
    fields: ['id','idAl','idAlerteParent','Date','Etat','Type', 'Valeur','Commentaire','Flux', 'idPl', 'Point_de_livraison', 'Nom_prenom', 'No_de_facture','AlGrouped']
});
