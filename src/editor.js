export class Editor {
    constructor(pane) {
        this.pane = pane;
        this.codeFolder = null;
        this.codeState = {
            value: 'Boostlet.init();\nconsole.log(Boostlet.framework.name);',
            output: ''
        };
    }

    init() {
        // Create Code Editor folder
        this.codeFolder = this.pane.addFolder({
            title: 'Code Editor',
            expanded: true
        });

        // Add code input with v4 syntax
        this.codeFolder.addBinding(this.codeState, 'value', {
            label: 'Code',
            view: 'textarea',
            rows: 6,
            placeholder: 'Enter your code here',
        });

        // Add run button
        this.codeFolder.addButton({
            title: 'Run Code'
        }).on('click', () => this.runCode());

        // Add output binding
        this.codeFolder.addBinding(this.codeState, 'output', {
            label: 'Output',
            multiline: true,
            rows: 6,
            readonly: true
        });
    }

    runCode() {
        try {
            // Capture console.log output
            const originalLog = console.log;
            let output = '';
            console.log = (message) => {
                output += message + '\n';
                originalLog(message);
            };

            // Run the code
            eval(this.codeState.value);

            // Update output and restore console.log
            this.codeState.output = output;
            console.log = originalLog;
        } catch (e) {
            this.codeState.output = e.toString();
        }
    }
}