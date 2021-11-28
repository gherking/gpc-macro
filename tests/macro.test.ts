import { Scenario, Step, Tag } from "gherkin-ast";
import MacroPreCompiler = require("../src");

describe("Macro", () => {
    describe("Constructor", () => {
        test("should be empty", () => {
            const macro = new MacroPreCompiler();
            expect(macro.macros).toEqual({});
        });
    });

    describe(".preScenario", () => {
        let macroPreCompiler: MacroPreCompiler;
        let scenario: Scenario;
        beforeEach(() => {
            macroPreCompiler = new MacroPreCompiler();
            scenario = new Scenario("Scenario", "test", "");
        });
        test("should not remove scenario if scenario does not have any tags", () => {
            const result = macroPreCompiler.preScenario(scenario);
            expect(result).toBe(true);
            expect(macroPreCompiler.macros).toEqual({});

        });
        test("should not remove scenario if scenario does not have macro tag", () => {
            scenario.tags.push(new Tag("tag"));
            const result = macroPreCompiler.preScenario(scenario);
            expect(result).toBe(true);
            expect(macroPreCompiler.macros).toEqual({});
        });
        test("should handle macro tag without name", () => {
            scenario.tags.push(new Tag("macro", ""));
            expect(() => macroPreCompiler.preScenario(scenario)).toThrow("Name is not provided for macro for scenario test.");
        });
        test("should handle existing macro", () => {
            scenario.tags.push(new Tag("macro", "test"));
            macroPreCompiler.macros.TEST = scenario;
            expect(() => macroPreCompiler.preScenario(scenario)).toThrow("Name TEST already used in scenario test.");
        });
        test("should handle macro without any steps", () => {
            scenario.tags.push(new Tag("macro", "test"));
            expect(() => macroPreCompiler.preScenario(scenario)).toThrow("Macro TEST does not contain any steps.");
        });
        test("should handle macro with macro step", () => {
            scenario.tags.push(new Tag("macro", "test"));
            scenario.steps.push(MacroPreCompiler.createStep("step"));
            expect(() => macroPreCompiler.preScenario(scenario)).toThrow("Macro TEST contains a macro step.");
        });
        test("should remove macro scenario", () => {
            scenario.tags.push(new Tag("macro", "test"));
            scenario.steps.push(new Step("step", "test"));
            expect(macroPreCompiler.preScenario(scenario)).toBe(false);
        });
        test("should save macro", () => {
            scenario.tags.push(new Tag("macro", "test"));
            scenario.steps.push(new Step("step", "test"));
            macroPreCompiler.preScenario(scenario);
            expect(macroPreCompiler.macros).toEqual({TEST: scenario});
        });
    });

    describe(".onStep", () => {
        test.todo("should not do anything with non macro steps");
        test.todo("should handle if macro name is not provided");
        test.todo("should handle non-existing macro");
        test.todo("should replace macro to the steps of the macro");
    });

    describe(".createStep", () => {
        test("should create a macro step", () => {
            const step = MacroPreCompiler.createStep("test-macro");
            expect(step).toBeInstanceOf(Step);
            expect(step.text).toBe('macro test-macro is executed');
        });
    });
});