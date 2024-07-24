import { Util } from "./util.js";
import { Editor } from "./editor.js";
import { Nav } from "./nav.js";
import { Categories } from "./categories.js";
import { Search } from "./search.js";

export class Powerboost {
  constructor() {
    this.editor = null;
  }

  load_html(callback) {
    Util.load_Html("https://rohinideshmukh.github.io/powerboost/src/UI_components/index.html");
    // Util.load_Html("http://localhost:8000/src/UI_components/index.html");
    console.log("HTML loaded.");
    callback();

  }


  load_urls(callback) {
    console.log("inside load_links")
    Util.load_Links("stylesheet", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");
    Util.load_Links("stylesheet", "https://rohinideshmukh.github.io/powerboost/src/UI_components/style.css");
    // Util.load_Links("stylesheet", "http://localhost:8000/src/UI_components/style.css");

    console.log("Loading scripts...");
    Util.load_Scripts("https://rohinideshmukh.github.io/boostlet/dist/boostlet.min.js");
    Util.load_Scripts("https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.0/ace.js");
  


    // Simulate an asynchronous operation using setTimeout
    setTimeout(function () {
      // Initialize the Nav class
      const nav = new Nav("nav", ".toggle-btn");
      nav.init();

      // Initialize the Editor class
      const editorInstance = new Editor(Powerboost.editor, "output", "run-btn");
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

      const searchInstance = new Search("searchInput", "suggestionsContainer", scriptsToLoad);
      searchInstance.init();
      console.log("Scripts loaded.");
      callback();
    }, 100);
  }


  load_aceEditor() {
    Util.load_Ace();
  }

}













