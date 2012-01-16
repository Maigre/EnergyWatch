Ext.define('MainApp.model.BilanModel', {
    extend: 'MainApp.model.Crud',
    fields: ['id', 'ConsoAPayer', 'NbPlNouveau', 'NbPlValide', 'NbPlRejete', 'NbAPayer','ConsoAttente','NbAttente','ConsoRejete','NbRejete','NbAnomalieActive','NbAlerteActive','NbAlerteAttente']
});
