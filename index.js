
// Import the page-mod API (only want to mod yahoo)
var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;

// TODO: Don't need the tabs library yet
//var tabs = require("sdk/tabs");


/* Create a page-mod
 * It will run the gen_links script whenever  ".yahoo.com" URL is loaded
 * The script appends MLB.TV links next to scores on Yahoo fantasy baseball
 * roster pages. May need tweaking if Y! changes layout
 */
pageMod.PageMod({
  include: "*.yahoo.com",

  // TODO: The following commented is for experimentation (for rev 1)... clear out later
  //include: "*.org",
  //include: "*-giants-*",
  //contentScript: 'document.body.innerHTML = ' +
  //               ' "<h1>Page matches ruleset</h1>";'
  //contentScript: 'var links = document.links;' +
  //               'alert(links[0]);'
  //contentScriptFile: data.url("gen_links.js")
  //contentScriptFile: [data.url("jquery/2.1.4/jquery.min.js"), data.url("myscript.js")]

  contentScriptFile: [data.url("js/jquery-2.1.4.min.js"), data.url("gen_links.js")]
});

// TODO: Not dealing with tests yet
// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
//function dummy(text, callback) {
//  callback(text);
//}

//exports.dummy = dummy;
