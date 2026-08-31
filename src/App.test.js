import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders the profile QR code studio", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /کد QR پروفایل شما/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /دانلود با کیفیت SVG/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /تغییر زبان به انگلیسی/i }));
  expect(screen.getByRole("heading", { name: /Your Profile QR Code/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Download high-quality SVG/i })).toBeInTheDocument();
});
