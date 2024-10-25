export class Util {

  static load_Links(rel, href) {
    var link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    document.head.appendChild(link);
  }

  static load_Scripts(src) {
    var script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);

  }

  static load_Html(url) {
    console.log("Loading HTML...");


    fetch(url)
      .then((response) => response.text())
      .then((htmlContent) => {
        const template = document.createElement("template");
        template.innerHTML = htmlContent.trim();
        document.body.appendChild(template.content.firstChild);


      })
      .catch((error) => console.error("Error loading HTML content:", error));

  }

  static load_Ace() {
    var script = document.createElement("script");
    // Set the content of the script
    script.textContent = `
      window.Powerboost.editor = ace.edit("editor", {
        theme: "ace/theme/monokai",
        mode: "ace/mode/javascript",
      });
   
    `;

    // Append the script to the body
    document.body.appendChild(script);

  }
}



