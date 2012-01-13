Ext.override( Ext.grid.PagingScroller,{
	htmlDecode : function(value){
		    return !value ? value :
		                        String(value)
		                            .replace(/&gt;/g, ">")
		                            .replace(/&lt;/g, "<")
		                            .replace(/&quot;/g, '"')
		                            .replace(/"/g, '"')
		                            .replace(/'/g, "'")
		                            .replace(/&amp;/g, "&")
		                            .replace(/&eacute;/g, "é")
		                            .replace(/&agrave;/g, "à")
		                            .replace(/&egrave;/g, "è")
		                            .replace(/&igrave;/g, "ì")
		                            .replace(/&ograve;/g, "ò")
		                            .replace(/&ugrave;/g, "ù")
		                            ;
	},

	htmlEncode : function(value){
		    return !value ? value : String(value)
		                                .replace(/&/g, "&amp;")
		                                .replace(/>/g, "&gt;")
		                                .replace(/</g, "&lt;")
		                                .replace(/"/g, "&quot;")
		                                .replace(/'/g, "'")
		                                .replace(/é/g, "&eacute;")
		                                .replace(/à/g, "&agrave;")
		                                .replace(/è/g, "&egrave;")
		                                .replace(/ì/g, "&igrave;")
		                                .replace(/ò/g, "&ograve;")
		                                .replace(/ù/g, "&ugrave;")
		                                ;
	}
});

