import { Step } from "gherkin-ast";
import Macro = require("../src");

describe("Macro", () => {
    describe("Constructor", () => {
        test.todo("should be empty");
    });

    describe(".preScenario", () => {
        test.todo("should not remove scenario if scenario does not have any tags");
        test.todo("should not remove scenario if scenario does not have macro tag");
        test.todo("should handle macro tag without name");
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