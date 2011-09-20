Ext.define('MainApp.model.User',{
	extend: 'MainApp.model.Crud',
	fields: ['id','nom', 'email'],
	name: 'users'
});
