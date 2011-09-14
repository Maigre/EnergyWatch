Ext.define('MainApp.store.HistoriqueUploadStore', {
    extend: 'Ext.data.Store',
    fields: ['nom_fichier','date_creation'],
    autoLoad: true,
    proxy: {
    	type: 'ajax',
    	api: {
    		read: BASE_URL+'data/historiqueuploads/load',
    	},
    	actionMethods : {read: 'POST'},   	
    	reader: {
    		type: 'json',
    		root: 'data',
    		successProperty: 'success'
    	}
    },
    baseParams: {
        idPl:'' 
    }
});


