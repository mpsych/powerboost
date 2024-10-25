import { Powerboost } from "./powerboost.js";
import { Editor } from "./editor.js";
import { Nav } from "./nav.js";
import { Categories } from "./categories.js";
import { Search } from "./search.js";

// register global namespace with a new powerboost instance
window.Powerboost = new Powerboost();

window.console.log('POWERBOOST VERSION 0.1-alpha');


window.Powerboost.load_html(() => {
    window.Powerboost.load_urls();
});


setTimeout(async function () {

    window.Powerboost.load_aceEditor();

    // Initialize the Nav class
    const nav = new Nav("nav", ".toggle-btn");
    nav.init();


    // Initialize the Editor class
    const editor = new Editor(window.Powerboost.editor, "output", "run-btn");
    editor.init();


    // Initialize the Categories class
    
    const categories = new Categories();
    await categories.init();



    // Initialize the search class
    const search = new Search();
    search.init();

}, 1000);
