Ext.define('MainApp.controller.UploadControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.panel.UploadPanel'],

    init: function() {
        this.control({
            'bt': {
                activate: this.selectmt
            },
            'bt': {
                change: this.selectmt
            }
            
        });
    },
    selectmt: function() {
		console.info('okclick');
	}   
});
