Ext.define('MainApp.model.BilanModel', {
    extend: 'MainApp.model.Crud',
    fields: ['id', 'ConsoAPayer','NbAPayer','ConsoAttente','NbAttente','ConsoRejete','NbRejete','NbAlerteActive']
});
