export class Categories {
    constructor(pane) {
        this.pane = pane;
        this.categories = [];
        this.examples = new Map();
        this.repoOwner = 'mpsych';
        this.repoName = 'boostlet';
        this.folderPath = 'examples';
        this.apiUrl = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/${this.folderPath}`;
        
        // State for category selection
        this.state = {
            selectedCategory: '',  // Empty default state
            currentExamples: []
        };
    }

    async init() {
        const filesByCategory = await this.fetchBoostletFiles();
        this.categories = Object.keys(filesByCategory);
        this.examples = new Map(Object.entries(filesByCategory));
        
        this.createBoostletsUI();
    }

    createBoostletsUI() {
        // Create main Boostlets folder
        const boostletsFolder = this.pane.addFolder({
            title: 'Boostlets',
            expanded: true
        });

        // Add category dropdown with empty option
        boostletsFolder.addBinding(this.state, 'selectedCategory', {
            label: 'Category',
            options: {
                'Select a category': '',  // Empty default option
                ...this.categories.reduce((acc, cat) => {
                    acc[cat] = cat;
                    return acc;
                }, {})
            }
        }).on('change', (ev) => {
            // Update examples when category changes
            this.state.currentExamples = ev.value ? (this.examples.get(ev.value) || []) : [];
            this.updateExampleButtons(boostletsFolder);
        });

        // Initial empty state - no buttons
        this.updateExampleButtons(boostletsFolder);
    }

    updateExampleButtons(folder) {
        // Remove existing example buttons if any
        const existingButtons = folder.children.filter(child => 
            child.element.classList.contains('example-button')
        );
        existingButtons.forEach(button => folder.remove(button));

        // Add new buttons for current examples
        this.state.currentExamples.forEach(example => {
            const btn = folder.addButton({
                title: example,
            }).on('click', () => {
                this.loadExample(example);
            });
            
            // Add class for identification without using label
            btn.element.classList.add('example-button');
        });
    }

    loadExample(exampleName) {
        const baseUrl = 'https://boostlet.org/examples/';
        const script = document.createElement('script');
        script.src = `${baseUrl}${exampleName.replace(/\s+/g, '').toLowerCase()}.js`;
        document.head.appendChild(script);
    }

    async fetchBoostletFiles() {
        try {
            const response = await fetch(this.apiUrl);
            const files = await response.json();
            const filesByCategory = {};

            await Promise.all(files.map(async (file) => {
                if (file.type === "file" && file.name.endsWith(".js")) {
                    const fileName = file.name;
                    const fileNameEdit = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.lastIndexOf('.'));
                    const category = await this.getCategoryFromFile(file.download_url);
                    if (!filesByCategory[category]) {
                        filesByCategory[category] = [];
                    }
                    filesByCategory[category].push(fileNameEdit);
                }
            }));

            return filesByCategory;
        } catch (error) {
            console.error('Error fetching files:', error);
            return {};
        }
    }

    async getCategoryFromFile(downloadUrl) {
        try {
            const response = await fetch(downloadUrl);
            const scriptText = await response.text();
            const categoryRegex = /CATEGORY\s*=\s*["']([^"']+)["']/;
            const match = categoryRegex.exec(scriptText);
            return match ? match[1] : "Others";
        } catch (error) {
            console.error('Error fetching category:', error);
            return "Others";
        }
    }
}