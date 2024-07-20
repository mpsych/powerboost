import { Util } from "./util.js";

export class Powerboost {
  constructor() {
    this.editor = null;
  }

  load_links() {
    //load css links
    console.log("inside load_links")
    Util.load_Links("stylesheet", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");
    Util.load_Links("stylesheet", "http://localhost:8000/src/UI_components/style.css");
  }

  load_html(callback) {
    console.log("Loading HTML...");


    fetch("http://localhost:8000/src/UI_components/index.html")
      .then((response) => response.text())
      .then((htmlContent) => {
        const template = document.createElement("template");
        template.innerHTML = htmlContent.trim();
        document.body.appendChild(template.content.firstChild);
      })
      .catch((error) => console.error("Error loading HTML content:", error));

    // Simulate an asynchronous operation using setTimeout
    setTimeout(function () {
      console.log("HTML loaded.");

      // Call the callback function after HTML is loaded
      callback();
    }, 1000);
  }

  load_scripts(callback) {
    console.log("Loading scripts...");
    Util.load_Scripts("https://rohinideshmukh.github.io/boostlet/dist/boostlet.min.js", "head");
    Util.load_Scripts("https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.0/ace.js", "head");
    Util.load_Scripts("http://localhost:8000/src/UI_components/script.js", "body");



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