Ext.define('MainApp.model.AlerteModel', {
    extend: 'MainApp.model.Crud',
    fields: ['id','idAlerteParent','Date','Etat','Alerte','Commentaire','Flux']
});
