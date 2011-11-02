Ext.define('MainApp.controller.ButtonValidationControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.ButtonValidationView'],

    init: function() {
        this.control({
            'buttonvalidation': {
                click: this.openvalidation
            }
        });
    },
    openvalidation: function() {
		var nonvalideagainstore = this.getStore('TriPlNonValideAgainStore');
		var nonvalidestore = this.getStore('TriPlNonValideStore');
		var nouveaustore = this.getStore('TriPlNouveauStore');
		var validestore = this.getStore('TriPlValideStore');
		
		//console.info(nonvalideagainstore);
		Ext.Error.handle = function (err) {
			if (err.sourceMethod == "onGuaranteedRange") {
				return true;
			}
		};
		//nouveaustore.removeAll();
		//var me = this;
		/*Ext.override(Ext.data.Store, {
			reloadBuffered: function(){
				var me = this;
				me.prefetchData.clear();
				delete me.guaranteedStart;
				delete me.guaranteedEnd;
				me.totalCount=0;
				me.mask();
				me.prefetchPage(1);
			}
		});*/
		//this override helps scroller adjustments when a store has a filter on it
		Ext.override( Ext.grid.PagingScroller,
		{
			getSizeCalculation: function() 
			{
			    // Use the direct ownerCt here rather than the scrollerOwner
			    // because we are calculating widths/heights.
			    var owner = this.ownerCt,
			    	view = owner.getView(),
				store  = this.store,
				dock   = this.dock,
				elDom  = this.el.dom,
				width  = 1,
				height = 1;
			    
			    if (!this.rowHeight) 
			    {
				this.rowHeight = view.el.down( view.getItemSelector() ).getHeight( false, true );
			    }
	
			    //need to know if filtered -also our own
			    if( store.isFiltered() )
			    {
			    	//find filtered amount
			    	height = store.data.length * this.rowHeight;
			    }
			    else
			    {
			    	height = store.getTotalCount() * this.rowHeight;
			    }
	
			    if (isNaN(width)) {
				width = 1;
			    }
			    if (isNaN(height)) {
				height = 1;
			    }
			    return {
				width: width,
				height: height
			    };
			}
		} );


		//this override helps with showing and hiding the scroller
		Ext.override( Ext.panel.Table,
		{
			/**
		     * Request a recalculation of scrollbars and put them in if they are needed.
		     */
		    determineScrollbars: function() {
			var me = this,
			    viewElDom,
			    centerScrollWidth,
			    centerClientWidth,
			    scrollHeight,
			    clientHeight;

			if (!me.collapsed && me.view && me.view.el && me.view.el.dom) {
			    viewElDom = me.view.el.dom;
			    //centerScrollWidth = viewElDom.scrollWidth;
			    centerScrollWidth = me.headerCt.getFullWidth();
			    /**
			     * clientWidth often returns 0 in IE resulting in an
			     * infinity result, here we use offsetWidth bc there are
			     * no possible scrollbars and we don't care about margins
			     */
			    centerClientWidth = viewElDom.offsetWidth;
			    if (me.verticalScroller && me.verticalScroller.el) {
			    	if( !me.verticalScroller.ownerCt )
			    	{
			    		me.verticalScroller.ownerCt = this;
			    	}
				scrollHeight = me.verticalScroller.getSizeCalculation().height;
			    } else {
				scrollHeight = viewElDom.scrollHeight;
			    }

			    clientHeight = viewElDom.clientHeight;
			    
			    if (!me.collapsed && scrollHeight > clientHeight) {
				me.showVerticalScroller();
			    } else {
				me.hideVerticalScroller();
			    }

			    if (!me.collapsed && centerScrollWidth > (centerClientWidth + Ext.getScrollBarWidth() - 2)) {
				me.showHorizontalScroller();
			    } else {
				me.hideHorizontalScroller();
			    }
			}
		    },
		    
		    
		    /**
		     * Show the horizontalScroller and add the horizontalScrollerPresentCls.
		     */
		    showHorizontalScroller: function() {
			var me = this;

			if (me.verticalScroller) {
			    me.verticalScroller.offsets.bottom = Ext.getScrollBarWidth() - 2;
			}
		
			if (me.horizontalScroller && !me.getDockedComponent( me.horizontalScroller ) ) //me.horizontalScroller.ownerCt !== me) {
			{
				me.addDocked(me.horizontalScroller);
			    me.addCls(me.horizontalScrollerPresentCls);
			    me.fireEvent('scrollershow', me.horizontalScroller, 'horizontal');
			}
		    },


		    /**
		     * Show the verticalScroller and add the verticalScrollerPresentCls.
		     */
		    showVerticalScroller: function() {
			var me = this,
			    headerCt = me.headerCt;

			// only trigger a layout when reserveOffset is changing
			if (headerCt && !headerCt.layout.reserveOffset) {
			    headerCt.layout.reserveOffset = true;
			    headerCt.doLayout();
			}
		
			//check if it is docked or not
			if ( me.verticalScroller && !me.getDockedComponent( me.verticalScroller ) ) //me.verticalScroller.ownerCt !== me) {
			{
			    me.addDocked( me.verticalScroller );
			    me.addCls(me.verticalScrollerPresentCls);
			    me.fireEvent('scrollershow', me.verticalScroller, 'vertical');
			}
		    }
		    
		    
		} );
		
		
		
		Ext.override(Ext.data.Store, {
			resetData: function() {
				var me = this;

				me.clearData();
				if (me.snapshot) {
					//console.info('clearsnapshot');
					me.snapshot.clear();
				}
				if (me.prefetchData) {
					//console.info('clearprefetchdata');
					me.prefetchData.clear();
				}
				//console.info('mebeforedelete');
				//console.info(me.totalCount);
				delete me.guaranteedStart;
				delete me.guaranteedEnd;
				delete me.totalCount;
				//console.info('meafterdelete');
				//console.info(me.totalCount);
				//console.info(me);				
			}
		});
		Ext.require('Ext.data.Store', function(){
			Ext.override(Ext.data.Store, {
				//line 1534
				onGuaranteedRange: function() {
					var me = this,
					totalCount = me.getTotalCount(),
					
					
					dataCount = me.prefetchData.getCount(),
					start = me.requestStart,
					end = ((totalCount - 1) < me.requestEnd) ? totalCount - 1 : me.requestEnd,
					range = [],
					record,
					i = start;
					
					
					if(end < 0) end = 0;

					if (start !== me.guaranteedStart && end !== me.guaranteedEnd) {
						//console.info('insideif_1');
						me.guaranteedStart = start;
						me.guaranteedEnd = end;
						if(dataCount > 0) {
							for (; i <= end; i++) {
								record = me.prefetchData.getByKey(i);
								range.push(record);
							}
						}
						/*console.info('insideif_2');
						console.info(range);
						console.info(start);
						console.info(end);
						console.info(me);*/
						me.unmask();
						me.fireEvent('guaranteedrange', range, 0, 50);
						console.info('insideif_3');
						if (me.cb) {
							me.cb.call(me.scope || me, range);
						}
					}

					
				}
			});
		});
		//nouveaustore.prefetchData.clear();
		//delete nouveaustore.guaranteedStart;
		//delete nouveaustore.guaranteedEnd;
		//nouveaustore.guaranteeRange(0, me.pageSize - 1);
		
		//validestore.prefetchData.clear();
		
		nouveaustore.resetData();
		validestore.resetData();
		nonvalidestore.resetData();
		nonvalideagainstore.resetData();
		
		
		nonvalideagainstore.guaranteeRange(0,50);
		nonvalidestore.guaranteeRange(0,50);
		nouveaustore.guaranteeRange(0, 50);
		validestore.guaranteeRange(0,50);
		
		var view1 = Ext.getCmp('validationpanel');
		if (!view1){
			var view1 = Ext.widget('validationpanel');
		}
		Ext.getCmp('centerregion').removeAll(false); //clean the center region
		Ext.getCmp('centerregion').add(view1);
	}   
});
