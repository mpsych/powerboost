import { Powerboost } from './powerboost.js';



// register global namespace
window.Powerboost = new Powerboost();



// Initialize immediately since Tweakpane is already loaded
window.Powerboost.init().catch(error => {
    console.error('Error initializing Powerboost:', error);
});