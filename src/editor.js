
export class Editor {
    constructor(editor, outputDiv, runBtn) {
        this.userCode = editor;
        this.outputDiv = document.getElementById(outputDiv);
        this.runBtn = document.getElementById(runBtn);
    }

    init() {
        this.runBtn.addEventListener("click", () => {
            this.runCode();
        });
    }

    runCode() {
        const outputDiv = this.outputDiv;
        const userCode = this.userCode.getValue();

        outputDiv.innerHTML = "";

        console.log = function (message) {
            outputDiv.innerHTML += message + "<br>";
        };

        try {
            eval(userCode);
        } catch (e) {
            console.log(e);
        }


    }
}


