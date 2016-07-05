links = document.links;

var date = new Date();
var year = date.getFullYear().toString();
var month = (date.getMonth()+1).toString()[1]?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString();
var day =  date.getDate().toString()[1]?date.getDate().toString():"0"+date.getDate().toString();

var today = [year, month, day].join('-');

/* jsonurl can be used in future to map games and gen a finer mlbhref
 * e.g., var jsonurl = "https://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/grid_int.json";
 */
var mlbhref = "http://m.mlb.com/tv/" + today;

/*
 * In future, can have a map here that associates team to their
 * corresponding game id; would have to scrape/parse mlb page to
 * create mapping (from mlb.tv team name to yahoo's
 *
 * For now, redirecting to all of today's games suffices
 */
for(var i = 0; i < links.length; i++) {

    if (links[i].href.search(/sports.yahoo.com\/mlb\/[a-z0-9-]+\/$/) > 0) {

        //var gameStatus = links[i].innerHTML;
        var gameStatus = links[i].text;

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


        /* create a 'span' tag which will contain the new link
         * italic styling only; can make bold by span.style.fontWeight = 'bold' 
         * if we want in future
         */
        var span = document.createElement('span');
        span.style.fontStyle = 'italic';

        // now create the link
        var a = document.createElement('a');
        var linkText = document.createTextNode(linkName);
        a.appendChild(linkText); // the name of the link
        a.href = mlbhref; // the generated href
        a.target = '_blank'; // open in new tab

        openBrack = document.createTextNode(' [');
        closedBrack = document.createTextNode(']')

        // add the clickable link to the span...
        // format within span e.g., [<ClickablLink>]
        span.appendChild(openBrack);
        span.appendChild(a);
        span.appendChild(closedBrack);

        // now append the span to the link's parent node so it shows 
        // up after the current link
        links[i].parentNode.appendChild(span)
          
    }
}

