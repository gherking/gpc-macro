import { Scenario, Step, Tag } from "gherkin-ast";
import Macro = require("../src");

describe("Macro", () => {
    describe("Constructor", () => {
        test("should be empty", () => {
            const macro = new Macro();
            expect(macro.macros).toEqual({});
        });
    });

    describe(".preScenario", () => {
        let macro: Macro;
        let scenario: Scenario;
        beforeEach(() => {
            macro = new Macro();
            scenario = new Scenario("Scenario", "test", "");
        });
        test("should not remove scenario if scenario does not have any tags", () => {
            const result = macro.preScenario(scenario);
            expect(result).toBe(true);
            expect(macro.macros).toEqual({});

        });
        test("should not remove scenario if scenario does not have macro tag", () => {
            scenario.tags.push(new Tag("tag"));
            const result = macro.preScenario(scenario);
            expect(result).toBe(true);
            expect(macro.macros).toEqual({});
        });
        test("should handle macro tag without name", () => {
            scenario.tags.push(new Tag("macro", ""));
            expect(() => macro.preScenario(scenario)).toThrow("Name is not provided for macro for scenario test.");
        });
        test.todo("should handle existing macro");
        test.todo("should handle macro without any steps");
        test.todo("should handle macro with macro step");
        test.todo("should remove macro scenario");
        test.todo("should save macro");
    });

    describe(".onStep", () => {
        test.todo("should not do anything with non macro steps");
        test.todo("should handle if macro name is not provided");
        test.todo("should handle non-existing macro");
        test.todo("should replace macro to the steps of the macro");
    });

    describe(".createStep", () => {
        test("should create a macro step", () => {
            const step = Macro.createStep("test-macro");
            expect(step).toBeInstanceOf(Step);
            expect(step.text).toBe('macro test-macro is executed');
        });
    });
});