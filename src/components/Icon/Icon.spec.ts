import { expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Icon from "./Icon.svelte";

describe("Icon component", () => {
  it("should be visible", async () => {
    render(Icon, { name: "wi-day-fog", size: 100, color: "red" });

    const icon = screen.getByTestId("icon-wi-day-fog-100");
    expect(icon).toBeVisible();
    expect(icon.style.fill).toBe("red");
  });
});
