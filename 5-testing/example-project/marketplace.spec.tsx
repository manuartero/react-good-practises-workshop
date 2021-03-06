import { render, screen, waitFor } from "@testing-library/react";
import * as api from "./simple-ts-app/src/services/api.js";
import Marketplace from "./simple-ts-app/src/components/marketplace";

jest.mock("../services/api.js");

describe("<Marketplace />", () => {
  const items = [
    { name: "item 1", price: 0.01 },
    { name: "item 2", price: 0.03 },
    { name: "item 3", price: 0.04 },
  ];

  test("render happy case", async () => {
    // @ts-ignore
    api.getItems.mockResolvedValue(items);

    render(<Marketplace />);
    const el = screen.getByRole("main");

    await waitFor(() => {
      expect(el).toBeInTheDocument();
    });
  });

  test("fetches the API once: getItems()", async () => {
    // @ts-ignore
    api.getItems.mockResolvedValue(items);

    render(<Marketplace />);
    await waitFor(() => {
      expect(api.getItems).toHaveBeenCalledTimes(1);
    });
  });
});
