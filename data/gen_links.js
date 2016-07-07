links = document.links;

var date = new Date();
var year = date.getFullYear().toString();
var month = (date.getMonth()+1).toString()[1]?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString();
var day =  date.getDate().toString()[1]?date.getDate().toString():"0"+date.getDate().toString();

var today = [year, month, day].join('-');

// in future we can default this to day that user is viewing roster for
// since "live" streaming is usually for "today", this is fine tho
var default_mlbhref = "http://m.mlb.com/tv/" + today;

var yahoo_team_to_mlb_code_map = { 'angels': 'ana', 'astros': 'hou', 'athletics': 'oak', 'braves': 'atl', 'brewers': 'mil', 'cardinals': 'sln', 'cubs': 'chn', 'diamondbacks': 'ari', 'dodgers': 'lan', 'giants': 'sfn', 'indians': 'cle', 'jays': 'tor', 'mariners': 'sea', 'marlins': 'mia', 'mets': 'nyn', 'nationals': 'was', 'orioles': 'bal', 'padres': 'sdn', 'phillies': 'phi', 'pirates': 'pit', 'reds': 'cin', 'redsox': 'bos', 'rockies': 'col', 'royals': 'kca', 'tigers': 'det', 'twins': 'min', 'rangers': 'tex', 'rays': 'tba', 'whitesox': 'cha', 'yankees': 'nya' };
 
var mlb_jsonurl = "http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/miniscoreboard.json";

$.getJSON(mlb_jsonurl, function(data) {
    add_mlb_links(data);
});

/*
 * Adds the game-specifc links to the page
 *
 * Parameters: games_json (json - miniboxscore.json pull from MLB)
 * Return:     void (adds the links to the page)
 */
function add_mlb_links(games_json) {
    for(var i = 0; i < links.length; i++) {

        if (links[i].href.search(/sports.yahoo.com\/mlb\/[a-z0-9-]+\/$/) > 0) {

            var game_status = links[i].text;

            var link_name = "MLB.TV";
            var mlbhref = default_mlbhref;
            if (game_status.indexOf('Top') == 0 || game_status.indexOf('Bot') == 0) {
                var home_team = get_home_team(links[i].href);
                mlbhref = fetch_game_link(yahoo_team_to_mlb_code_map[home_team], games_json, default_mlbhref);
                link_name = "Watch Live";
            } else if (game_status.indexOf('W,') == 0 || game_status.indexOf('L,') == 0) {
                home_team = get_home_team(links[i].href);
                mlbhref = fetch_game_link(yahoo_team_to_mlb_code_map[home_team], games_json, default_mlbhref);
                link_name = "Highlights";
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
            var linkText = document.createTextNode(link_name);
            a.appendChild(linkText); // the name of the link
            a.href = mlbhref; // the generated href
            a.target = '_blank'; // open in new tab

            open_brack = document.createTextNode(' [');
            closed_brack = document.createTextNode(']')

            // add the clickable link to the span...
            // format within span e.g., [<ClickablLink>]
            span.appendChild(open_brack);
            span.appendChild(a);
            span.appendChild(closed_brack);

            // now append the span to the link's parent node so it shows 
            // up after the current link
            links[i].parentNode.appendChild(span)
          
        }
    }
}

/*
 * Parse the day's MLB miniboxscore json to find the game with the given
 * home team code. This should give the calendar_event_id, which is used to construct
 * the mlbtv link
 *
 * Parameters: home_code (string - MLB home team id),
 *             games_json (json - miniboxscore.json pulled from MLB)
 *             default_link (string - if game cant be found, default return this)
 * Returns:    An mlbtv game link
 */
function fetch_game_link(home_code, games_json, default_link) {

    // go thru each of the games
    for (var i = 0; games_json['data']['games']['game'].length; i++) {
        if (games_json['data']['games']['game'][i]['home_code'] == home_code) {
            game_data = games_json['data']['games']['game'][i];

            // checking home_code game to see if has mlbtv enabled
            if (game_data['game_media']['media']['has_mlbtv'] === 'true') {
                // it does, so return the link with event id
                return 'http://m.mlb.com/tv/e' + game_data['game_media']['media']['calendar_event_id'];
            } else {
                // it may have multiple media (e.g., highlights), in which case it might be a list,
                // so check first element before falling back to default
                if (game_data['game_media']['media'][0]['has_mlbtv'] === 'true') {

                    // yup, return the link with event id
                    return 'http://m.mlb.com/tv/e' + game_data['game_media']['media'][0]['calendar_event_id'];
                } else {

                    // no mlbtv, return default
                    return default_link;
                }
            }
        }
    }

    // in unexpected case where there are no games for a link showing there is, 
    // just return the default
    return default_link;
}

/*
 * Given a game link from Yahoo, parse it to return the home team (just the team name,
 * not the city). This can then be used to map to MLB's 'home_code' to lookup game data.
 *
 * Parameters: some_link (string)
 * Returns: the home team (defined as last team to show up). E.g., yankees
 * Assumptions: in a format like <domain>/<away_city>-<away_name>-<home_city>-<home_name>-<\d+>/
 */
function get_home_team(some_link) {

    /*
     * an example yahoo game link: 
     * http://sports.yahoo.com/mlb/baltimore-orioles-los-angeles-dodgers-360706119/
     * so the home team is always (until y! changes formatting) the second to last
     * element when split on a dash
     */
    var OFFSET_FROM_END_FOR_HOME_TEAM = 2;
    var parts_of_link = some_link.split('-');
    var home_team = parts_of_link[parts_of_link.length - OFFSET_FROM_END_FOR_HOME_TEAM];

    if (home_team === 'sox') {
        // only teams with two word name (red sox or white sox)
        // dont care about the blue jays, they're unique
        // so prepend 3rd to last element too
        home_team = parts_of_link[parts_of_link.length - (OFFSET_FROM_END_FOR_HOME_TEAM+1)].concat(home_team);
    }

    return home_team;
}
