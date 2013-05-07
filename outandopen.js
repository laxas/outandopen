

function lget(key){
    return JSON.parse(localStorage.getItem(key));
}

function lset(key, object){
    localStorage.setItem(key, JSON.stringify(object));
}

function load (key) { 
    if (lget(key + "_date") == null) {
        jQuery.getJSON(key + '.json', 
            function(json) {
                lset(key, json);
                lset(key + "_date", new Date().getTime());
            }
        )
    }
};

function force_load (key) { 
    jQuery.getJSON(key + '.json', 
        function(json) {
            lset(key, json);
            lset(key + "_date", new Date().getTime());
        }
    )
};


function update_data () {
    force_load("tags");
    force_load("mountains");
    force_load("texts");
    force_load("lang");
    force_load("countries");
}

function lang () {return lget("lang")}; 


load("tags");
load("mountains");
load("texts");
load("countries");
load("lang");
//~ lset("lang","de"); 



function activate_mailtext(){
    texts = lget("texts")
    empty_mailtext = $("#empty_mailtext")
    if (empty_mailtext.length == 1) {
        empty_mailtext.attr("id", "mailtext")
        $("#mailtexts").empty()
        $.each(texts, function (index, text) {
            var new_mailtext = empty_mailtext.clone();
            new_mailtext.text(text);
            $('#mailtexts').append(new_mailtext);
        });
    };
}

function activate_countries(){
    countries = lget("countries");
    //~ empty_mailtext = $("#empty_mailtext")
    //~ if (empty_mailtext.length == 1) {
        //~ empty_mailtext.attr("id", "mailtext")
        //~ $("#mailtexts").empty()
        //~ for each (var text in texts) {
            //~ var new_mailtext = empty_mailtext.clone();
            //~ new_mailtext.text(text);
            //~ $('#mailtexts').append(new_mailtext);
        //~ };
    //~ };
}



$(document).ready(function(){

    activate_mailtext();
   
    var empty_country = $('#countries li');
    $('#countries').empty();
   
    $.each(lget("countries"), function(index, country) {
        var country_name = country["name"][lang()];
        new_country = empty_country.clone();
        new_country.find("#country_name").text(country_name);
        new_country.find("#country_icon").attr("src", "icons/gif/"+country["code"]+".gif");
        var count = 0
        
        $.each(lget("mountains"), function (index, mountain) {
            if (mountain[1]["country"] == country["code"]) {
                count = count + 1;
            };
        });



        new_country.find("#n_countries").text(count);
        $('#countries').append(new_country);
   });
   
   
   $("#mailtexts a").click(function(event){
     $(this).attr("data-theme", "c");
   });
   
   $("#build_mail").click(function(event){
     //~ alert($(this).text());
     //~ $(this).attr("data-theme", "c");
     var selected_texts = $("#mailtexts a").filter(":disabled");
     alert(selected_texts.length);
     //~ $("#mailbody").text($("#mailbody").text() + " " + $(this).text());
   });
 });




//~ function load_data () { 
    //~ jQuery.getJSON('out.json', 
        //~ function(json) {

            //~ var empty_country = $('#countries li');
            //~ $('#countries').empty();
            
            //~ alert(json.mountains.length);
            
            //~ for each (var mountain in json.mountains) {
                //~ 
                //~ lset(mountain[0], mountain[1]);
        
                // get country name, put as header
                //~ var country_name = mountains[0].country;
                //~ var new_country = empty_country.clone();
                //~ new_country.find('div').text(country_name);
//~ 
                //~ $('#countries').append(new_country[0]);

            //~ 
            //~ };
            
            //~ alert(JSON.parse(localStorage.getItem("http://de.wikipedia.org/wiki/Allalinhorn"))["name"]);
            //~ alert(lget("http://de.wikipedia.org/wiki/Allalinhorn")["name"]);
            //~ document.write(localStorage.getItem("http://de.wikipedia.org/wiki/Allalinhorn")["name"]);
        //~ }
    //~ );
//~ }



//~ jQuery.getJSON('out3.json', 
	//~ function(json) {
        //~ var empty_country = $('#countries li');
        //~ $('#countries').empty();
        //~ empty_country.find("ul").empty();
        
        //~ for each (var mountains in json.countries) {

            // get country name, put as header
            //~ var country_name = mountains[0].country;
            //~ var new_country = empty_country.clone();
            //~ new_country.find('div').text(country_name);

            //~ new_country.attr("id", country_name)

            
            //~ var empty = new_country.find('li');
            
            //~ for each (var mountain in mountains) {
                //~ var line = $('.mountains li a:last')
                //~ var name = mountain.name;
                //~ var hight = mountain.hight;
                //~ line.text(name + " ("+hight+"m) " + country_name);
                //~ line.attr("name", name);
                //~ line.attr("hight", hight);
                //~ new_country.append(empty.clone());
               //~ 
            //~ };
            //~ 
            //~ new_country.find('li:last').remove();
            //~ alert(new_country.length);
            //~ $('#countries').append(new_country[0]);

            //~ $('#countries').append("<li><div>empty country</div></li>" );
        
        //~ };
        
        //~ alert(json.mountains.Germany[0].name);



	//~ }
//~ );
//~ 
