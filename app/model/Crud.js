Ext.define('MainApp.model.Crud',{
	extend: 'Ext.data.Model',
	fields:[{name: 'id', type: 'int'}],
	askAndDo: function (controller, model_data)
	{	
		Ext.Ajax.request({
		    url: BASE_URL+controller,
		    method : 'POST',
		    params:{
		    	data: model_data
		    },
		    success: function(response){
		    		Ext.get('working-area').insertHtml('beforeBegin',response.responseText,true);
		    }
		});
	},	
	
	save: function() {
        var datas= '';
        for (var field in this.data){
        	datas=datas+'##'+field+'##'+record.data[field];
        }
        this.askAndDo('data/'+this.name+'/save/'+this.get('id'), datas);
    },
    
    load: function() {
        this.askAndDo(this.name+'/load/'+this.get('id'));
    },
    
    loadAll: function() {
    	this.askAndDo(this.name+'/load');
    }

});
