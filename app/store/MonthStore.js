Ext.define('MainApp.store.MonthStore', {
    extend: 'Ext.data.Store',
    fields: ['value',
    {name : 'mois',convert:function(v){return Ext.util.Format.htmlDecode(v);}}
    ],
	data : [
		{"value": "01", "mois":"Janvier"},
		{"value": "02", "mois":"F&eacute;vrier"},
		{"value": "03", "mois":"Mars"},
		{"value": "04", "mois":"Avril"},
		{"value": "05", "mois":"Mai"},
		{"value": "06", "mois":"Juin"},
		{"value": "07", "mois":"Juillet"},
		{"value": "08", "mois":"Août"},
		{"value": "09", "mois":"Septembre"},
		{"value": "10", "mois":"Octobre"},
		{"value": "11", "mois":"Novembre"},
		{"value": "12", "mois":"Décembre"}
	]
});
