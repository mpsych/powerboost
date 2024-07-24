export class Search {
    constructor(inputId, suggestionsContainerId, scriptsToLoad) {
        this.searchInput = document.getElementById(inputId);
        this.suggestionsContainer = document.getElementById(suggestionsContainerId);
        this.scriptsToLoad = scriptsToLoad;
        this.suggestions = this.createSuggestions(scriptsToLoad);
    }

    init() {
        this.searchInput.addEventListener("input", (e) => this.showSuggestions(e.target.value));
        this.scriptsToLoad.forEach((scriptInfo) => this.addScriptLoadEventListener(scriptInfo));
    }

    createSuggestions(scriptsToLoad) {
        const suggestions = {};
        scriptsToLoad.forEach(({ name, script }) => {
            const key = name.charAt(0).toLowerCase();
            if (!suggestions[key]) {
                suggestions[key] = [];
            }
            suggestions[key].push({ name, script });
        });
        return suggestions;
    }

    addScriptLoadEventListener(scriptInfo) {
        document.getElementById(scriptInfo.id).addEventListener("click", () => this.loadScript(scriptInfo.script));
    }

    showSuggestions(inputValue) {
        this.suggestionsContainer.innerHTML = "";

        let matchedSuggestions = this.getMatchedSuggestions(inputValue);

        matchedSuggestions.forEach((suggestion) => {
            const suggestionElement = this.createSuggestionElement(suggestion);
            this.suggestionsContainer.appendChild(suggestionElement);
        });

        this.suggestionsContainer.style.display = matchedSuggestions.length > 0 ? "block" : "none";
    }

    getMatchedSuggestions(inputValue) {
        let matchedSuggestions = [];
        for (let key in this.suggestions) {
            if (key.startsWith(inputValue.toLowerCase())) {
                matchedSuggestions = matchedSuggestions.concat(this.suggestions[key]);
            }
        }
        return matchedSuggestions;
    }

    createSuggestionElement(suggestion) {
        const suggestionElement = document.createElement("div");
        suggestionElement.classList.add("suggestion-item");
        suggestionElement.textContent = suggestion.name;
        suggestionElement.onclick = () => {
            this.searchInput.value = suggestion.name;
            this.suggestionsContainer.innerHTML = "";
            this.loadScript(suggestion.script);
        };
        return suggestionElement;
    }

    loadScript(scriptSrc) {
        this.loadExternalScript(scriptSrc);
    }

    loadExternalScript(scriptSrc, callback) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = scriptSrc;

        script.onload = () => {
            console.log(`${scriptSrc} has been loaded successfully.`);
            if (callback) callback();
        };

        script.onerror = () => {
            console.error(`Failed to load script: ${scriptSrc}`);
        };

        document.head.appendChild(script);
    }

    applySelectedFunctionality(functionalitySelectorId, functionalityScripts) {
        const selector = document.getElementById(functionalitySelectorId);
        const selectedFunctionality = selector.value;
        const scriptUrl = functionalityScripts[selectedFunctionality];
        if (scriptUrl) {
            this.loadExternalScript(scriptUrl, () => {
                console.log(`${selectedFunctionality} functionality has been applied.`);
            });
        } else {
            console.error("No script URL found for selected functionality.");
        }
    }
}
