//~ alert("hi");
var mountains;
jQuery.getJSON('out.json', 
	function(json) {
		var mountains = json.mountains;
		alert(mountains["Switzerland"][2].name);
	
		//~ alert("JSON Data: " + json["n208"].name);
		//~ alert(mountains[1].name)
		//~ for (var key in json)
			//~ alert(key);
	}
);
alert(mountains["Switzerland"][0].name);
