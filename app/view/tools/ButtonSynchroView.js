Ext.define('Ext.panel.iframePanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.iframePanel',

	/**
	 * iframe source url
	 */
	src: 'http://soundcloud.com/dashboard',

	/**
	 * Loading text for the loading mask
	 */
	loadingText: 'Loading ...',

	/**
	 * Loading configuration (not implemented)
	 */
	loadingConfig: null,

	/**
	 * Overwrites renderTpl for iframe inclusion
	 */
	renderTpl: [
		'<div class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl><tpl if="frame"> {baseCls}-body-framed</tpl><tpl if="ui"> {baseCls}-body-{ui}</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
		'<iframe src="{src}" width="100%" height="100%" frameborder="0"></iframe>',
		'</div>'
	],

	/**
	 * overwritten, data method for the renderTemplate
	 */
	initRenderData: function() {
		return Ext.applyIf(this.callParent(), {
			bodyStyle: this.initBodyStyles(),
			bodyCls: this.initBodyCls(),
			src: this.getSource()
		});
	},

	/**
	 *  Delegates afterRender event
	 */
	initComponent: function() {
		this.callParent(arguments);
		this.on('afterrender', this.onAfterRender, this, {});
	},

	/**
	 * Gets the iframe element
	 */
	getIframe: function() {
		return this.getTargetEl().child('iframe');
	},

	/**
	 * Gets the iframe source url
	 *
	 * @return {String} iframe source url
	 */
	getSource: function() {
		return this.src;
	},

	/**
	 * Sets the iframe source url
	 *
	 * @param {String} source url
	 * @param {String} loading text or empty
	 * @return void
	 */
	setSource: function(src, loadingText) {
		this.src = src;
		var f = this.getIframe();
		if (loadingText || this.loadingText) {
			this.body.mask(loadingText || this.loadingText);
		}
		f.dom.src = src;
	},

	/**
	 * Reloads the iFrame
	 */
	resetUrl: function() {
		var f = this.getIframe();
		f.dom.src = this.src;
	},

	/**
	 * Fired on panel's afterrender event
	 * Delegates iframe load event
	 */
	onAfterRender: function() {
		var f = this.getIframe();
		f.on('load', this.onIframeLoaded, this, {});
	},

	/**
	 * Fired if iframe url is loaded
	 */
	onIframeLoaded: function() {
		if (this.loadingText) {
			this.body.unmask();
		}
	}
});

Ext.define('MainApp.view.tools.ButtonSynchroView', {
	extend	: 'Ext.button.Button',
	alias 	: 'widget.buttonsynchro',
	id	: 'buttonsynchro',
	icon	: 'app/images/icons/connect.png',
	//tooltip : 'Basse Tension',
	scale	: 'medium',
	height	: 40,
	width	: 40,
	style	: "padding-left:10px",
	text	: '',
	border	: 0,
	//enableToggle : true,
	handler	: function(){
		
		//targetUrl = BASE_URL+'synchro/synch';
		//Ext.panel.iframePanel

		var p = Ext.widget('iframePanel', {
			//width: 800,
			height: 400,
			layout: 'fit',
			//title: 'Panneau de synchronisation',
			renderTo: Ext.getBody(),
			src: BASE_URL+'tools' /*,
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					ui: 'header',
					items: [ '->', {
						iconCls: 'icon-goto',
						text: 'Synchroniser',
						handler: function() {
							p.setSource('http://owni.fr/2011/11/28/data-opendata-sondage-tahrir-harcelement-art-guardian-money/', 'Chargement en cours')
						}
					}]
				}
			],
			doSomething: function() {
				console.log(arguments);
			}*/
		});
		

		var w = new Ext.Window({
			id:id,
			width:810,
			height:435,
			title:"Panneau de synchronisation",
			items: p
		});


		w.show();

	},	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


