import { Util } from "./util.js";

export class Powerboost {
  constructor() {
    this.editor = null;
  }

  load_html(callback) {
    Util.load_Html("https://rohinideshmukh.github.io/powerboost/src/UI_components/index.html");
    // Simulate an asynchronous operation using setTimeout
    setTimeout(function () {
      console.log("HTML loaded.");

      // Call the callback function after HTML is loaded
      callback();
    }, 1000);
  }


  load_urls(callback) {
    console.log("inside load_links")
    Util.load_Links("stylesheet", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");
    Util.load_Links("stylesheet", "https://rohinideshmukh.github.io/powerboost/src/UI_components/style.css");

    console.log("Loading scripts...");
    Util.load_Scripts("https://rohinideshmukh.github.io/boostlet/dist/boostlet.min.js");
    Util.load_Scripts("https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.0/ace.js");
    // Util.load_Scripts("https://rohinideshmukh.github.io/powerboost/src/UI_components/script.js", "body");



    // Simulate an asynchronous operation using setTimeout
    setTimeout(function () {
      console.log("Scripts loaded.");
      callback();
    }, 1000);
  }

  load_aceEditor() {
    Util.load_ace();
  }

}











