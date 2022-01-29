import { load, process } from "gherking";
import { Document, pruneID } from "gherkin-ast";
import Macro = require("../src");

const loadTestFeatureFile = async (folder: "input" | "expected", file: string): Promise<Document> => {
    const ast: Document[] = pruneID(await load(`./tests/data/${folder}/${file}`)) as Document[];
    delete ast[0].uri;
    return ast[0];
}

describe("Macro", () => {
    let base: Document;

    beforeAll(async () => {
        base = await loadTestFeatureFile("input", "test.feature");
    });

    test("should not do anything", async () => {
        const expected = await loadTestFeatureFile("expected", "test.feature");
        const actual = pruneID(process(base, new Macro())) as Document[];

        expect(actual).toHaveLength(1);
        expect(actual[0]).toEqual(expected);
    });
});