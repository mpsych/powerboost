export class Search {
    constructor() {
        this.repoOwner = 'RohiniDeshmukh';
        this.repoName = 'boostlet';
        this.folderPath = 'examples';
        this.apiUrl = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/${this.folderPath}`;
        this.fileList = [];
    }


    init() {
        this.fetchFileNames();

        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', () => {
            const query = searchInput.value;
            const suggestions = this.filterFileNames(query);
            this.displaySuggestions(suggestions);
        });
    }

    async fetchFileNames() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            this.fileList = data.map(file => file.name);
            // console.log('File List:', this.fileList);
        } catch (error) {
            console.error('Error fetching file names:', error);
            this.fileList = [];
        }
    }

    filterFileNames(query) {
        if (!query) return [];
        return this.fileList.filter(name => name.toLowerCase().startsWith(query.toLowerCase()));
    }

    displaySuggestions(suggestions) {
        const searchBox = document.querySelector('.search-box');
        searchBox.innerHTML = '';

        suggestions.forEach(fileName => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.textContent = fileName;
            suggestionDiv.classList.add('suggestion-item');
            searchBox.appendChild(suggestionDiv);
            suggestionDiv.addEventListener('click', () => this.appendScriptToHead(fileName));
            
        });

        searchBox.style.display = suggestions.length ? 'block' : 'none';
    }


    appendScriptToHead(fileName) {
        const baseUrl = 'https://boostlet.org/examples/';
        const script = document.createElement('script');
        script.src = `${baseUrl}${fileName}`;
        document.head.appendChild(script);
        const searchBox = document.querySelector('.search-box');
        searchBox.style.display = 'none';
    }


}  