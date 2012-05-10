function lget(key){
    return JSON.parse(localStorage.getItem(key));
};

function lset(key, object){
    localStorage.setItem(key, JSON.stringify(object));
};



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


//~ var collections = ["tags","peaks","texts","countries","lang","items"];

function update_data () {
    var collections = ["trans","items"];
    $.each(collections, function (i, collection) {
        force_load(collection);
        });

};

function lang () {return lget("lang")}; 

var collections = ["trans","items"];
$.each(collections, function (i, collection) {
    load(collection);    
    });

lset("lang","en"); 



function activate_mailtext(){
    texts = lget("texts")
    empty_mailtext = $("#empty_mailtext")
    if (empty_mailtext.length == 1) {
        empty_mailtext.attr("id", "mailtext")
        $("#mailtexts").empty()
        
        for (var i=0; i < texts.length; i++){
            text = texts[i];
            var new_mailtext = empty_mailtext.clone();
            new_mailtext.text(text);
            $('#mailtexts').append(new_mailtext);
        };
    };
};

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
};


function items2html(){
    var items = lget("items");
    $('#items_ul').empty()
    var grey=""
    $.each(items, function(i, item) {
        var lang = lget("lang");
        //~ alert(lang);
        if (item["name"][lang]=="") {
            lang="de"; 
            grey='class="grey"'}
        else {grey=""}
        obj = "<li class='ui-li ui-li-static ui-body-c ui-li-has-count'>"
              +item["count"]+" x <span "+ grey +">"+item["name"][lang]+"</span> "+item["brand"]+" "
              +item["typ"];
        if (item["size"]=="") {}
        else                  {obj = obj + " (" + item["size"] + ")"};
        obj = obj + "<span class='ui-li-count ui-btn-up-c ui-btn-corner-all'>"
                    +item["weight"]+"g</span>";
        $('#items_ul').append(obj);
        });
};

function load_sliders(){
    $("#slider_fitness").val(lget("fitness")).slider("refresh"); 
    $("#slider_climbing").val(lget("climbing")).slider("refresh"); 
    $("#slider_hights").val(lget("hights")).slider("refresh"); 
    };

function get_lang(key){
    return lget("trans")[key][lang()];
    };


function translate(){
    $('h1[lang]').each(function(i){
        var element = $(this);
        var to_trans = element.attr("lang")
        if (to_trans in lget("trans")) {
            element.text(get_lang(to_trans));
        };
    });

    $('a[lang]').each(function(i){
        var element = $(this);
        var to_trans = element.attr("lang")
        if (to_trans in lget("trans")) {
            element.find(".ui-btn-text").text(get_lang(to_trans));
        };
    });

    
};


$(document).ready(function(){

    items2html();
    translate();

    //~ $('h1[lang]').text(get_lang($('h1[lang]').attr("lang")));
    
    //~ var snippets = $('[lang]');
    

    //~ $('a[lang]').each(function(i, snippet){
        //~ alert(snippet.text());
        //~ snippet.text(get_lang(snippet.attr("lang")));
        //~ });
    
    
    //~ $('[lang]').text(get_lang($('[lang]').attr("lang")));

    // Click Events    
    $("#update_button").click(function() {update_data();
                                          items2html();
                                          translate();});
    $(".update").click(function() {items2html();});
    $("#load_items").click(function() {items2html();});
    $("#profile").click(function() {load_sliders();});
    $("#trans_german").click(function() {lset("lang","de");translate();});
    $("#trans_english").click(function() {lset("lang","en");translate();});
    $("#language").click(function() {
        //~ alert(lget("lang"));
        if (lget("lang")=="en") 
            {
                lset("lang","de");
            }
        else
            {
                lset("lang","en");
            }
        translate();
        });
    
    
    // Change Events
    $("#slider_fitness").change(function() {
        lset("fitness", $("#slider_fitness").val());
        });
    $("#slider_climbing").change(function() {
        lset("climbing", $("#slider_climbing").val());
        });
    $("#slider_hights").change(function() {
        lset("hights", $("#slider_hights").val());
        });
    
   
    //~ activate_mailtext();

   
   var empty_country = $('#countries li');
    $('#countries').empty();
   
   //~ for each (var country in lget("countries")) {
   for (var i = 0; i < lget("countries").length; i++) {
        var country = lget("countries")[i];
        var country_name = country["name"][lang()];
        new_country = empty_country.clone();
        new_country.find("#country_name").text(country_name);
        new_country.find("#country_icon").attr("src", "icons/gif/"+country["code"]+".gif");
        var count = 0;
        
        //~ for each (var mountain in lget("mountains")) {


        //~ for (var j=0; j < lget("mountains").length; j++) {
            //~ var mountain = lget("mountains")[j];
            //~ if (mountain[1]["country"] == country["code"]) {
                //~ count = count + 1;
            //~ };
        //~ };
        
        $.each(lget("mountains"), function (index, mountain) {
            if (mountain[1]["country"] == country["code"]) {
                count = count + 1;
            };
        });


        new_country.find("#n_countries").text(count);
        $('#countries').append(new_country);
   }
   
   
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
