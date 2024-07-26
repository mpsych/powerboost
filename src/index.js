import { Powerboost } from "./powerboost.js";
import { Editor } from "./editor.js";
import { Nav } from "./nav.js";
import { Categories } from "./categories.js";
import { Search } from "./search.js";

// register global namespace with a new powerboost instance
window.Powerboost = new Powerboost();

window.console.log('Powerboost VERSION 0.1-alpha');


window.Powerboost.load_html(() => {
    window.Powerboost.load_urls();
});


setTimeout(function () {
    
    window.Powerboost.load_aceEditor();
    
    // Initialize the Nav class
    const nav = new Nav("nav", ".toggle-btn");
    nav.init();


    // Initialize the Editor class
    const editorInstance = new Editor(window.Powerboost.editor, "output", "run-btn");
    editorInstance.init();


    // Initialize the Categories class
    const categoriesInstance = new Categories(Boostlet.categories, Boostlet.examples);
    categoriesInstance.init();



    // Base URL for scripts
    const baseURL = "https://boostlet.org/examples/";
    // Scripts to load
    const scriptsToLoad = [
        { id: "Sobel", name: "Sobel", script: `${baseURL}sobel.js` },
        { id: "SAM", name: "Sam", script: `${baseURL}segmentanything.js` },
        { id: "Plotly", name: "Plotly", script: `${baseURL}plotly.js` },
        { id: "ImageCaptioning", name: "Image Captioning", script: `${baseURL}imageCaptioning.js` },
        { id: "Trako", name: "Tracko", script: `${baseURL}trako.js` },
    ];
  // Initialize the search class
    const searchInstance = new Search("searchInput", "suggestionsContainer", scriptsToLoad);
    searchInstance.init();    

}, 1000);
