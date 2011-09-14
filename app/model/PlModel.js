Ext.define('MainApp.model.PlModel', {
    extend: 'MainApp.model.Crud',
    fields: ['id','Tension', 'No_client', 'No_personne', 'Nature', 'Categorie_client', 'No_compteur', 'No_police', 'Point_de_livraison', 'Nom_prenom', 'Adresse', 'Localisation', 'Code_Activite', 'Date_abonnement', 'Commentaire', 'conso_moy', 'alerte_max', 'alerte_commentaire'],
    idProperty: 'id'
});
