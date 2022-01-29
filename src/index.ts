import { PreCompiler } from "gherking";
import { Scenario, Step, Tag } from "gherkin-ast";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:macro");
const MACROSTEP = /^macro (.*) ?is executed$/;

interface Macros<T> {
    [key: string]: T;
}

class MacroPreCompiler implements PreCompiler {
    public readonly macros: Macros<Scenario>;

    constructor() {
        debug("Initialize");
        this.macros = {};
    }

    public preScenario(scenario: Scenario): boolean {
        debug("preScenario(hasScenario: %s)", !!scenario);
        /* istanbul ignore next */
        debug("...scenario tags: %s", scenario?.tags.join());
        if (!Array.isArray(scenario.tags) || scenario.tags.length === 0) {
            return true;
        }
        const macroTag: Tag = scenario.tags.find((tag: Tag) => tag.name.toLowerCase() === "macro");
        debug("...macroTag: %o", macroTag);
        if (macroTag) {
            const name: string = macroTag.value.toUpperCase();
            debug("...name: %s", name);

            if (name.length === 0) {
                throw new Error(`Name is not provided for macro for scenario ${scenario.name}.`);
            }

            if (name in this.macros) {
                throw new Error(`Name ${name} already used in scenario ${this.macros[name].name}.`);
            }
            debug("... type of scenario.steps: %s", typeof scenario.steps);
            if (scenario.steps.length === 0) {
                throw new Error(`Macro ${name} does not contain any steps.`);
            }

            if (MACROSTEP.test(scenario.steps.map((step: Step) => step.text).join('\n'))) {
                throw new Error(`Macro ${name} contains a macro step.`);
            }
            this.macros[name] = scenario;
            debug("...macros: %s", Object.keys(this.macros).join());
            return false;
        }
        debug("...no macro");
        return true;
    }

    public onStep(step: Step): Step[] {
        /* istanbul ignore next */
        debug("onStep(step: %s)", step?.text);
        if (MACROSTEP.test(step.text)) {
            const name: string = step.text.match(MACROSTEP)[1].trim().toUpperCase();
            debug("...name: %s", name);
            if (name.length === 0) {
                throw new Error('Macro name is not provided for macro scenario.');
            }

            if (!(name in this.macros)) {
                debug("...macros: %s", Object.keys(this.macros).join());
                throw new Error(`Macro ${name} does not exist.`);
            }

            return this.macros[name].steps;
        }
        debug("...Not a macro step.");
    }

    public static createStep(macroName: string): Step {
        debug("createStep(macroName: %s)", macroName);
        return new Step('When', `macro ${macroName} is executed`);
    }
}

// IMPORTANT: the precompiler class MUST be the export!
export = MacroPreCompiler;
