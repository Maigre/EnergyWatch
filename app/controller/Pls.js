Ext.define('MainApp.controller.Pls', {
    extend: 'Ext.app.Controller',
	stores: ['SearchStore'],
	models: ['SearchModel'],
    views: ['MainApp.view.tools.Searchbar'],

    init: function() {
        this.control({
            'searchbar': {
                change: this.searchpl
            }
        });
    },
	
    searchpl: function(el) {
		//Ext.widget('searchbar').expand();
		this.getSearchStoreStore().baseParams['text_search']=el.getValue();
		//console.info(this.getPlsearchStore().baseParams['ext_search']);
		//this.getPlsearchStore().load({params: {text_search: el.getValue()}});
	}
    
});
