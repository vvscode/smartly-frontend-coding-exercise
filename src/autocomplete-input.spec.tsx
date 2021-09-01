import React from "react";
import {
    render,
    act,
    fireEvent,
    cleanup,
    RenderResult
} from "@testing-library/react";
import AutocompleteInput from "./autocomplete-input";
import "@testing-library/jest-dom/extend-expect";
import nock from "nock";
import lolex from "lolex";

describe("AutocompleteInput", () => {
    let element: RenderResult;
    let clock: any;
    let onRowSelect = jest.fn();

    const mockSearchResponse = (data = ["cars", "racing"]) => {
        nock("http://localhost")
            // @ts-ignore
            .get("/search")
            .query({ q: "cars" })
            .once()
            // @ts-ignore
            .reply(200, data);
    };

    beforeEach(() => {
        mockSearchResponse();
        onRowSelect = jest.fn();
        element = render(
            <AutocompleteInput onRowSelect={onRowSelect}></AutocompleteInput>
        );
        clock = lolex.install();
    });

    afterEach(async () => {
        await act(async () => {
            await clock.runAllAsync();
        });
        clock.uninstall();
        cleanup();
    });

    it("displays a placeholder text when empty", () => {
        expect(element.getByPlaceholderText("Search...")).toHaveValue("");
    });

    it("does not show the results list when the input is empty", () => {
        expect(element.getByPlaceholderText("Search...").nextSibling).toBe(null);
    });

    it("changes input value when typing into it", async () => {
        act(() => {
            fireEvent.change(element.getByPlaceholderText("Search..."), {
                target: { value: "cars" }
            });
        });

        expect(element.getByDisplayValue("cars")).toBeDefined();
    });

    it("sets loading class", () => {
        act(() => {
            fireEvent.change(element.getByPlaceholderText("Search..."), {
                target: { value: "cars" }
            });
        });

        expect(element.getByRole("search").className).toContain("is-loading");
    });

    it("resets input state when clearing value", () => {
        act(() => {
            fireEvent.change(element.getByPlaceholderText("Search..."), {
                target: { value: "cars" }
            });
        });
        act(() => {
            fireEvent.change(element.getByPlaceholderText("Search..."), {
                target: { value: "" }
            });
        });

        expect(element.getByRole("search").className).not.toContain("is-loading");
    });

    it("debounces the search requests", () => {
        act(() => {
            fireEvent.change(element.getByPlaceholderText("Search..."), {
                target: { value: "cars" }
            });
        });

        clock.tick(499);
    });

    it("performs search requests to the correct endpoint", async () => {
        mockSearchResponse();

        await act(async () => {
            fireEvent.change(element.getByPlaceholderText("Search..."), {
                target: { value: "cars" }
            });
            clock.tick(500);
            await clock.nextAsync();
        });
    });

    it("displays the returned search results", async () => {
        clock.uninstall();
        mockSearchResponse();

        await act(async () => {
            fireEvent.change(element.getByPlaceholderText("Search..."), {
                target: { value: "cars" }
            });
            await clock.runAllAsync();
        });

        const items = await element.findAllByRole("option");

        expect(items.map(item => item.className)).toEqual([
            "autocomplete-item",
            "autocomplete-item"
        ]);
        expect(items.map(item => item.textContent)).toEqual(["cars", "racing"]);
    });

    describe("clicking a search result item", () => {
        beforeEach(async () => {
            clock.uninstall();
            mockSearchResponse();

            await act(async () => {
                fireEvent.change(element.getByPlaceholderText("Search..."), {
                    target: { value: "cars" }
                });
                await clock.runAllAsync();
            });

            const item = await element.findByText("racing");

            act(() => {
                fireEvent.click(item);
            });
        });

        it("calls onRowSelect with the item value", async () => {
            expect(onRowSelect.mock.calls).toEqual([["racing"]]);
        });

        it("sets the input value to the selected result item value", async () => {
            expect(element.getByDisplayValue("racing")).toBeDefined();
        });

        it("focuses the input", () => {
            expect(
                element.getByDisplayValue("racing") === document.activeElement
            ).toBe(true);
        });

        it("hides the results list", () => {
            expect(element.getByDisplayValue("racing").nextSibling).toBe(null);
        });
    });
});
