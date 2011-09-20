Ext.define('MainApp.model.AlerteModel', {
    extend: 'MainApp.model.Crud',
    fields: ['id','idAlerteParent','Date','Etat','Type', 'Valeur','Commentaire','Flux', 'idPl', 'Point_de_livraison', 'Nom_prenom']
});
