import { Util } from "./util.js";

export class Powerboost {
  constructor() {
    this.editor = null;
  }

  load_html(callback) {
    Util.load_Html("https://mpsych.github.io/powerboost/src/UI_components/index.html");
    // Util.load_Html("http://localhost:5500/powerboost/src/UI_components/index.html");
    // Util.load_Html("https://gaiborjosue.github.io/powerboost/src/UI_components/index.html");

    console.log("HTML loaded.");
    callback();

  }


  load_urls() {
    console.log("inside load_links")
    Util.load_Links("stylesheet", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");
    Util.load_Links("stylesheet", "https://mpsych.github.io/powerboost/src/UI_components/style.css");
    // Util.load_Links("stylesheet", "http://localhost:5500/powerboost/src/UI_components/style.css");
    // Util.load_Links("stylesheet", "https://gaiborjosue.github.io/powerboost/src/UI_components/style.css");

    console.log("Loading scripts...");
    // Util.load_Scripts("https://rohinideshmukh.github.io/boostlet/dist/boostlet.min.js");
    // Util.load_Scripts("http://localhost:5501/dist/boostlet.min.js");
    Util.load_Scripts("https://mpsych.github.io/boostlet/dist/boostlet.min.js");
    Util.load_Scripts("https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.0/ace.js");

    console.log("Scripts loaded.");


  }


  load_aceEditor() {
    Util.load_Ace();
  }

}
