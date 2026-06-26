import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "@/components/ui/button"

// Proves the React Testing Library + jsdom pipeline end-to-end on a real UI
// primitive (Slot, cva variants, event handling).
describe("Button", () => {
  it("renders its label and is clickable", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)
    const btn = screen.getByRole("button", { name: "Save" })
    expect(btn).toBeInTheDocument()
    await user.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("is disabled when the disabled prop is set", () => {
    render(<Button disabled>Nope</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })
})
