Ext.define('Ext.panel.ebatPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ebatPanel',

	/**
	 * iframe source url
	 */
	src: 'https://soluble.airlab.fr/EnergyBat/index.php/welcome',

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

Ext.define('MainApp.view.tools.ButtonEBatView', {
	extend	: 'Ext.button.Button',
	alias 	: 'widget.buttonebat',
	id	: 'buttonsynchro',
	url	: '', //the url opened in the iframe
	icon	: 'app/images/icons/ebat_icon.png',
	scale	: 'medium',
	height	: 40,
	width	: 40,
	style	: "padding-left:10px",
	text	: 'EnergyBat',
	border	: 0,
	//enableToggle : true,
	handler	: function(){
		
		noPL = Ext.getCmp('NoPLfield').value;
		ebatUrl = '../EnergyBat/index.php/consult/getSitefromNoPL/' + noPL +'/' + BT_MT_EAU;
		//ebatUrl = 'http://localhost/EnergyBat/index.php/consult/site/20';//consult/site/20
		console.info(ebatUrl);
		
		var p = Ext.widget('ebatPanel', {
			width: 1138,
			height: '567',
			layout: 'fit',
			//title: 'Panneau de synchronisation',
			renderTo: Ext.getBody(),
			src: ebatUrl,
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					ui: 'header',
					items: [ '->', {
						iconCls: 'refresh',
						text: 'Recharger',
						handler: function() {
							p.setSource(ebatUrl, 'Chargement en cours')
						}
					}]
				}
			],
			doSomething: function() {
				console.log(arguments);
			}
		});
		

		var w = new Ext.Window({
			id:id,
			width:1150,
			height:600,
			title:"EnergyBat",
			items: p
		});


		w.show();

	},	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});


