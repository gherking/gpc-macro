import { PreCompiler } from "gherking";
import { Scenario, ScenarioOutline, Step, Tag } from "gherkin-ast";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:template");
const MACROSTEP = /^macro (.*) ?is executed$/;

// interface Macros<T> {
//     [key: string]: T;
// }

class Macro implements PreCompiler {
    // macros: Macros;
    constructor() {
        debug("Intialize");
        this.macros = {};
    }

    /**
     * Function to filter out scenarios of a feature (scenario, scenario outline)
     * before they are processed.
     * Return FALSE if the given element should be filtered out. Otherwise it won't be.
     *
     * @param {Scenario|ScenarioOutline} scenario The scenario to be tested.
     * @returns {boolean|*} FALSE if the given element should be filtered out.
     */
    preFilterScenario(scenario: Scenario | ScenarioOutline) {
        if (!scenario.tags) {
            return;
        }
        const macroTag: Tag = scenario.tags.find((tag: Tag) => /^@macro\(.*\)/.test(tag.name));

        if (macroTag) {
            const name: string = macroTag.name.substring(7, macroTag.name.length - 1);

            if (name.length === 0) {
                throw new Error(`Name is not provided for macro for scenario ${scenario.name}.`);
            }

            if (name in this.macros) {
                throw new Error(`Name ${name} already used in scenario ${this.macros[name].name}.`);
            }

            if (scenario.steps.length === 0) {
                throw new Error(`Macro ${name} does not contain any steps.`);
            }

            if (MACROSTEP.test(scenario.steps.map((step: Step) => step.text).join('\n'))) {
                throw new Error(`Macro ${name} contains a macro step.`);
            }
            this.macros[name] = scenario;
            return false;
        }
    }

    onStep(step: Step) {
        if (MACROSTEP.test(step.text)) {
            const name: string = step.text.match(MACROSTEP)[1].trim();
            if (name.length === 0) {
                throw new Error('Macro name is not provided for macro scenario.');
            }

            if (!(name in this.macros)) {
                throw new Error(`Macro ${name} does not exist.`);
            }

            return this.macros[name].steps;
        }
    }

    /**
     * Creates macro step
     * @static
     * @param {String} macro
     * @returns {Step}
     */
    static createStep(macro: string) {
        return new Step('When', `macro ${macro} is executed`);
    }
}

// IMPORTANT: the precompiler class MUST be the export!
export = Macro;
/*
 * @example:
 * class MyPrecompiler implements PreCompiler {
 *   constructor(config) {
 *     super();
 *     this.config = config;
 *   }
 *
 *   onScenario(scenario) {
 *     // doing smth with scenario
 *   }
 * }
 * export = MyPrecompiler
 */
