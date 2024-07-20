export class Util {
 
   static load_Links(rel, href) {
    var link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    document.head.appendChild(link);
  }

  static load_Scripts(src, location = "head") {
    var script = document.createElement("script");
    script.src = src;
    if (location === "body") {
      document.body.appendChild(script);
    } else {
      document.head.appendChild(script);
    }
  }

  static load_ace() {
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
