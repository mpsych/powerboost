import { Powerboost } from "./powerboost.js";

// register global namespace with a new powerboost instance
window.Powerboost = new Powerboost();
window.console.log('Powerboost VERSION 0.1-alpha');

window.Powerboost.load_links();
window.Powerboost.load_html(() => { window.Powerboost.load_scripts(() => { window.Powerboost.load_aceEditor(); }); });


