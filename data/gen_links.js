links = document.links;

var date = new Date();
var year = date.getFullYear().toString();
var month = (date.getMonth()+1).toString()[1]?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString();
var day =  date.getDate().toString()[1]?date.getDate().toString():"0"+date.getDate().toString();

var today = [year, month, day].join('-');

var jsonurl = "https://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/grid_int.json";
var mlbhref = "http://m.mlb.com/tv/" + today;

//var jq = document.createElement('script');
//jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
//document.getElementsByTagName('head')[0].appendChild(jq);
// ... give time for script to load, then type.
//jQuery.noConflict();
//alert("jquery injected");

$.ajax({
    url: jsonurl,
    dataType: 'jsonp',
    success: function(data){// your code here
        alert(data);
    }
});
//get_json(jsonurl, function(json) {
//    console.log(json);
//});

/*
 * In future, can have a map here that associates team to their
 * corresponding game id; would have to scrape/parse mlb page to
 * create mapping (from mlb.tv team name to yahoo's
 *
 * For now, redirecting to all of today's games suffices
 */


for(var i = 0; i < links.length; i++) {

    if (links[i].href.search(/sports.yahoo.com\/mlb\/[a-z0-9-]+\/$/) > 0) {
        /*
        var openbrack = document.createTextNode(' [');
        var closebrack = document.createTextNode(']');
        var mlbtvlink = document.createElement("a");
        var linkText = document.createTextNode("Watch Live")
        */
        var gameStatus = links[i].innerHTML;

        var linkName = "MLB.TV";
        if (gameStatus.indexOf('Top') == 0 || gameStatus.indexOf('Bot') == 0) {
            linkName = "Watch Live";
        } else if (gameStatus.indexOf('W,') == 0 || gameStatus.indexOf('L,') == 0) {
            linkName = "Highlights";
        } else {
            // starts with a number for start time
            // can link to some game preview, but let's skip for now
            continue;
        }


        /*
        mlbtvlink.appendChild(linkText);
        mlbtvlink.href = "http://m.mlb.com/tv/2016-06-22";
        mlbtvlink.title = "Watch Live";
        //alert("lhref is " + linkHref);
        //var linkHref = document.createTextNode(links[i].href);
        //var lineBreak = document.createElement("br");
        //document.body.appendChild(linkHref);
        //document.body.appendChild(lineBreak);
        */
        links[i].outerHTML += " <i>[<a target='_blank' href='" + mlbhref + "'>" + linkName + "</a>]</i>";

        /*
        //links[i].append(openbrack);
        //links[i].append(mlbtvlink);
        //links[i].append(closebrack);
        */
    }
}

function get_json(url, fn) {
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            var response = JSON.parse(body);
            fn(response);
        });
    });
};
