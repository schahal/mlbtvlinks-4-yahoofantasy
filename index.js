
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

  contentScriptFile: [data.url("js/jquery-2.1.4.min.js"), data.url("gen_links.js")]
});

