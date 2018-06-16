$(document).ready(function(){ // The Document ready function authored by jQuery is used typically for those who want to add javascript before an HTML page is loaded.
    //You would also have to include all script tags with their src in the head tag as compared to putting them in the body.
    $('form').submit(function(evt){
        evt.preventDefault();//Prevents the Web Page from going to its default page.
        let search = $('#search').val();
        
        let url =   "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"; //jsoncallback=? query string for allowing the web server to retrieve data from
        //flickr without crossing the same origin host and server policy of AJAX. In other words, I can only communicate with an external server via JSON or XML.
        //Since in my case, I wanted JavaScript compatible data, therefore, I added the query string which allow Flickr to parse the xml into JSON.

        let data = {
            tags: search,//Flickr uses tags such as a (#) to allow users to match photos that correspond to the users search value.
            format: "json"//Flickr gives you the option to choose how you want your AJAX response formatted. Generically, it formats its data into XML.
        };

        function callback(data){ // callback function
            let ul = '<ul>';
            $.each(data.items, function(i, photo){
                ul += '<li class="grid-25 tablet-grid-50">';
                ul += '<a href="' + photo.link + '" class="image">';
                ul+= '<img src="' + photo.media.m + '"></a></li>';
            });
            ul += '</ul>';
            $('#photos').html(ul);
        };

        $.getJSON(url, data, callback);//This is the AJAX method that allows me to access Flickr API using JSONP protocol.Unlike JavaScript this method is 
        //fully functional with cross web servers including W3C and HTTPS
    });
    
});