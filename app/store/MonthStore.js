Ext.define('MainApp.store.MonthStore', {
    extend: 'Ext.data.Store',
    fields: ['mois'],
	data : [
		{"mois":"Janvier"},
		{"mois":"F&eacute;vrier"},
		{"mois":"Mars"},
		{"mois":"Avril"},
		{"mois":"Mai"},
		{"mois":"Juin"},
		{"mois":"Juillet"},
		{"mois":"Août"},
		{"mois":"Septembre"},
		{"mois":"Octobre"},
		{"mois":"Novembre"},
		{"mois":"Décembre"}
	]
});
