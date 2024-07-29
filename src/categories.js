
export class Categories {
    constructor() {
        this.categories = [];
        this.examples = new Map();
        this.containerCategories = document.querySelector(".categories");
        this.spanCategories = document.querySelector(".spanCategories");
      }

    async init() {
        const filesByCategory = await this.fetchBoostletFiles();
        this.categories = Object.keys(filesByCategory);
        this.examples = new Map(Object.entries(filesByCategory));
        this.createCategoryButtons();
        this.createExampleButtons();
        this.attachEventListeners();
    }

    createButton(text, className) {
        const button = document.createElement('button');
        if (className == '') {
            button.className = 'example-btn';
        } else {
            button.className = 'rect-btn ' + className;
        }

        button.id = text;
        button.textContent = text;
        return button;
    }

    createBackArrow(className) {
        const backArrow = document.createElement('div');
        backArrow.className = 'back-arrow ' + className;
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-arrow-left';
        backArrow.appendChild(icon);
        return backArrow;
    }

    createCategoryButtons() {
        for (let i = 0; i < this.categories.length; i += 2) {
            const buttonRow = document.createElement('div');
            buttonRow.className = 'button-row';

            const button1 = this.createButton(this.categories[i], this.categories[i].replace(/\s+/g, ''));
            buttonRow.appendChild(button1);

            if (i + 1 < this.categories.length) {
                const button2 = this.createButton(this.categories[i + 1], this.categories[i + 1].replace(/\s+/g, ''));
                buttonRow.appendChild(button2);
            }

            this.containerCategories.appendChild(buttonRow);
        }
    }

    createExampleButtons() {
        this.categories.forEach(category => {
            const containerExamples = document.createElement('div');
            containerExamples.className = 'rect-box ' + category.replace(/\s+/g, '');
            containerExamples.style.display = 'none';

            const exampleButtons = this.examples.get(category);
            if (exampleButtons) {
                for (let i = 0; i < exampleButtons.length; i += 2) {
                    const exampleRow = document.createElement('div');
                    exampleRow.className = 'button-row';

                    const exampleButton1 = this.createButton(exampleButtons[i], '');
                    exampleRow.appendChild(exampleButton1);


                    if (i + 1 < exampleButtons.length) {
                        const exampleButton2 = this.createButton(exampleButtons[i + 1], '');
                        exampleRow.appendChild(exampleButton2);
                    }

                    containerExamples.appendChild(exampleRow);
                }
            }


            const backArrowRow = document.createElement('div');
            backArrowRow.className = 'button-row';
            const backArrow = this.createBackArrow(category.replace(/\s+/g, ''));
            backArrowRow.appendChild(backArrow);
            containerExamples.appendChild(backArrowRow);

            this.spanCategories.appendChild(containerExamples);
        });
    }

    handleButtonClick(buttonClass, divToShowClass) {
        const categoriesDiv = document.querySelector('.rect-box.categories');
        const divToShow = document.querySelector(`.rect-box.${divToShowClass}`);
        const backArrow = divToShow.querySelector('.back-arrow');

        buttonClass.addEventListener('click', () => {
            this.toggleVisibility(categoriesDiv, false);
            this.toggleVisibility(divToShow, true);
        });

        backArrow.addEventListener('click', () => {
            this.toggleVisibility(categoriesDiv, true);
            this.toggleVisibility(divToShow, false);
        });
    }



    toggleVisibility(element, show) {
        element.style.display = show ? 'flex' : 'none';
    }


    appendScriptToHead(buttonId) {
        const baseUrl = 'https://boostlet.org/examples/';
        const script = document.createElement('script');
        script.src = `${baseUrl}${buttonId}`;
        // console.log(script.src);
        document.head.appendChild(script);
    }

    closeAllSpans() {
        document
            .querySelectorAll(
                ".nav-content .search-box, .nav-content .edit-box, .nav-content .rect-box"
            )
            .forEach((box) => {
                box.style.display = "none";
            });
    }

    attachEventListeners() {
        for (let i = 0; i < this.categories.length; i++) {
            const categoryClass = this.categories[i].replace(/\s+/g, '');
            const buttonElement = document.querySelector(`.rect-btn.${categoryClass}`);
            this.handleButtonClick(buttonElement, categoryClass);
        }

        document.addEventListener('click', (event) => {

            const buttonElement = event.target;  // This will log the HTML element that was clicked
            // console.log(buttonElement);
            if (buttonElement.className == 'example-btn') {
                this.appendScriptToHead(buttonElement.id.replace(/\s+/g, '').toLowerCase() + '.js');
                this.closeAllSpans();

            }

        });

    }

    async fetchBoostletFiles() {
      const baseurl = 'https://api.github.com/repos/gaiborjosue/boostlet/contents/examples/';
      const response = await fetch(baseurl);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const boostletFiles = doc.querySelectorAll('a[href$=".js"]');
  
      const filesByCategory = {};
  
      await Promise.all(Array.from(boostletFiles).map(async (file) => {
        const fileName = file.getAttribute('href');
        const fileName_edit = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.lastIndexOf('.'));
        const category = await this.getCategoryFromFile(fileName_edit);
        if (!filesByCategory[category]) {
          filesByCategory[category] = [];
        }
        filesByCategory[category].push(fileName_edit);
      }));

      console.log(filesByCategory);
  
      return filesByCategory;
    }
  
    async getCategoryFromFile(fileName) {
      const response = await fetch(`https://raw.githubusercontent.com/gaiborjosue/boostlet/webllm/examples/${fileName}.js`);
      const scriptText = await response.text();
      const categoryRegex = /CATEGORY\s*=\s*["']([^"']+)["']/;
      const match = categoryRegex.exec(scriptText);
      return match ? match[1] : "Others";
    }


}




