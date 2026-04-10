import type { ReferenceCategory } from '@/types'

export const TESTING_REFERENCE: ReferenceCategory[] = [
  {
    id: 'vitest',
    title: 'Vitest',
    color: '#a3e635',
    entries: [
      {
        name: 'describe / it / test',
        description: 'describe groups related tests into a suite. it and test are aliases for defining individual test cases.',
        example: 'import { describe, it, expect } from "vitest"\n\ndescribe("Calculator", () => {\n  it("adds two numbers", () => {\n    expect(1 + 2).toBe(3)\n  })\n\n  it("throws on division by zero", () => {\n    expect(() => divide(5, 0)).toThrow("Cannot divide by zero")\n  })\n})\n\n// Standalone test:\ntest("array contains item", () => {\n  expect([1, 2, 3]).toContain(2)\n})',
        link: 'https://vitest.dev/api/#describe',
      },
      {
        name: 'expect matchers',
        description: 'Assertions that check values in tests. Vitest matchers are compatible with Jest.',
        example: 'expect(42).toBe(42)                  // strict equality (===)\nexpect({a: 1}).toEqual({a: 1})       // deep equality\nexpect(null).toBeNull()\nexpect(undefined).toBeUndefined()\nexpect(true).toBeTruthy()\nexpect("").toBeFalsy()\nexpect([1,2,3]).toContain(2)\nexpect([1,2,3]).toHaveLength(3)\nexpect("hello world").toMatch(/world/)\nexpect({a:1,b:2}).toMatchObject({a:1}) // partial match\nexpect(fn).toThrow("error message")\nexpect(fn).toThrowError(TypeError)',
        link: 'https://vitest.dev/api/expect',
      },
      {
        name: 'beforeEach / afterEach / beforeAll / afterAll',
        description: 'Setup and teardown hooks. beforeEach runs before every test in the suite; beforeAll runs once before all tests.',
        example: 'import { beforeEach, afterEach, afterAll } from "vitest"\n\ndescribe("Database tests", () => {\n  let db: Database\n\n  beforeAll(async () => {\n    db = await createTestDatabase()  // once for all tests\n  })\n\n  afterAll(async () => {\n    await db.destroy()              // cleanup after all\n  })\n\n  beforeEach(async () => {\n    await db.seed()                 // fresh data each test\n  })\n\n  afterEach(async () => {\n    await db.truncate()             // clean up after each\n  })\n})',
        link: 'https://vitest.dev/api/#beforeeach',
      },
      {
        name: 'vi.fn() / vi.spyOn()',
        description: 'vi.fn() creates a mock function; vi.spyOn() wraps an existing method to track calls while keeping original behavior.',
        example: '// Mock function:\nconst mockFn = vi.fn()\nmockFn("hello")\nexpect(mockFn).toHaveBeenCalledWith("hello")\nexpect(mockFn).toHaveBeenCalledTimes(1)\n\n// Mock return value:\nconst fetchUser = vi.fn().mockResolvedValue({ name: "Alice" })\n\n// Spy on existing method:\nconst spy = vi.spyOn(console, "error").mockImplementation(() => {})\n// ... code that logs errors\nexpect(spy).toHaveBeenCalled()\nsspy.mockRestore()  // restore original',
        link: 'https://vitest.dev/api/vi#vi-fn',
      },
      {
        name: 'vi.mock()',
        description: 'Mocks an entire module. The factory function defines what the mock exports. Hoisted automatically to the top of the file.',
        example: 'import { vi, describe, it, expect } from "vitest"\nimport { getUser } from "./api"\n\nvi.mock("./api", () => ({\n  getUser: vi.fn().mockResolvedValue({\n    id: 1,\n    name: "Alice",\n  })\n}))\n\ndescribe("UserProfile", () => {\n  it("renders the user name", async () => {\n    const user = await getUser(1)\n    expect(user.name).toBe("Alice")\n    expect(getUser).toHaveBeenCalledWith(1)\n  })\n})',
        link: 'https://vitest.dev/api/vi#vi-mock',
      },
    ],
  },
  {
    id: 'testing-library',
    title: 'Testing Library',
    color: '#ef4444',
    entries: [
      {
        name: 'render / screen',
        description: 'render mounts a React component into a test DOM. screen provides queries to find rendered elements.',
        example: 'import { render, screen } from "@testing-library/react"\nimport { Button } from "./Button"\n\ntest("renders button text", () => {\n  render(<Button>Click me</Button>)\n\n  // Query by text:\n  const btn = screen.getByText("Click me")\n  expect(btn).toBeInTheDocument()\n\n  // Query by role (accessible name):\n  const btn2 = screen.getByRole("button", { name: "Click me" })\n\n  // Query by test ID:\n  const el = screen.getByTestId("submit-btn")\n})',
        link: 'https://testing-library.com/docs/react-testing-library/intro',
      },
      {
        name: 'Queries: getBy / queryBy / findBy',
        description: 'getBy throws if not found (synchronous); queryBy returns null (for asserting absence); findBy is async and waits for the element.',
        example: '// getBy — throws if not found:\nscreen.getByRole("button", { name: "Submit" })\nscreen.getByText("Hello")\nscreen.getByLabelText("Email")\nscreen.getByPlaceholderText("Enter email")\n\n// queryBy — returns null (assert absence):\nexpect(screen.queryByText("Error")).not.toBeInTheDocument()\n\n// findBy — async (waits for element):\nconst el = await screen.findByText("Loaded!")\nconst btn = await screen.findByRole("button", { name: "Save" })\n\n// AllBy — returns array:\nconst items = screen.getAllByRole("listitem")\nexpect(items).toHaveLength(3)',
        link: 'https://testing-library.com/docs/queries/about',
      },
      {
        name: 'userEvent',
        description: 'Simulates real user interactions more accurately than fireEvent. Setup before each test for best practices.',
        example: 'import userEvent from "@testing-library/user-event"\n\ntest("submits form", async () => {\n  const user = userEvent.setup()\n  const onSubmit = vi.fn()\n\n  render(<LoginForm onSubmit={onSubmit} />)\n\n  await user.type(screen.getByLabelText("Email"), "alice@example.com")\n  await user.type(screen.getByLabelText("Password"), "secret123")\n  await user.click(screen.getByRole("button", { name: "Log In" }))\n\n  expect(onSubmit).toHaveBeenCalledWith({\n    email: "alice@example.com",\n    password: "secret123",\n  })\n})',
        link: 'https://testing-library.com/docs/user-event/intro',
      },
      {
        name: 'waitFor / act',
        description: 'waitFor polls until assertion passes (for async state updates). act wraps code that causes React state changes.',
        example: 'import { waitFor } from "@testing-library/react"\n\ntest("loads user data", async () => {\n  render(<UserProfile userId={1} />)\n\n  // Initially shows loading:\n  expect(screen.getByText("Loading...")).toBeInTheDocument()\n\n  // Wait for data to load:\n  await waitFor(() => {\n    expect(screen.getByText("Alice")).toBeInTheDocument()\n  })\n\n  // Or use findBy (shorthand for waitFor + getBy):\n  const name = await screen.findByText("Alice")\n  expect(name).toBeInTheDocument()\n})',
        link: 'https://testing-library.com/docs/dom-testing-library/api-async',
      },
    ],
  },
  {
    id: 'patterns',
    title: 'Testing Patterns',
    color: '#818cf8',
    entries: [
      {
        name: 'Arrange / Act / Assert (AAA)',
        description: 'The standard structure for test cases: set up data, perform the action, and verify the result.',
        example: 'test("deducts from account balance", async () => {\n  // ARRANGE: set up test data\n  const account = new BankAccount({ balance: 100 })\n  const amount = 30\n\n  // ACT: perform the action\n  await account.withdraw(amount)\n\n  // ASSERT: verify the outcome\n  expect(account.balance).toBe(70)\n  expect(account.transactions).toHaveLength(1)\n  expect(account.transactions[0]).toMatchObject({\n    type: "withdrawal",\n    amount: 30,\n  })\n})',
        link: 'https://vitest.dev/guide/features',
      },
      {
        name: 'Test doubles: mocks vs stubs vs spies',
        description: 'Mocks replace dependencies entirely. Stubs return fixed data. Spies wrap the real function to track calls. Use the simplest option that works.',
        example: '// STUB: return fixed value\nconst fetchUser = vi.fn().mockResolvedValue({ name: "Alice" })\n\n// MOCK: replace implementation entirely\nvi.mock("./emailService", () => ({\n  sendEmail: vi.fn(),\n}))\n\n// SPY: wrap real function, track calls\nconst spy = vi.spyOn(userService, "createUser")\nawait createUser({ name: "Alice" })\nexpect(spy).toHaveBeenCalledOnce()\nspy.mockRestore()  // restore original\n\n// FAKE: working implementation with test data\nconst fakeRepo = { findAll: () => Promise.resolve([mockUser]) }',
        link: 'https://vitest.dev/guide/mocking',
      },
      {
        name: 'it.each / test.each',
        description: 'Runs the same test with different inputs. Reduces test duplication for input/output pairs.',
        example: 'it.each([\n  [1, 1, 2],\n  [2, 3, 5],\n  [10, -5, 5],\n  [0, 0, 0],\n])("add(%i, %i) → %i", (a, b, expected) => {\n  expect(add(a, b)).toBe(expected)\n})\n\n// With objects (template literal titles):\nit.each([\n  { input: "HELLO", expected: "hello" },\n  { input: "  trim  ", expected: "trim" },\n])("normalizes $input → $expected", ({ input, expected }) => {\n  expect(normalize(input)).toBe(expected)\n})',
        link: 'https://vitest.dev/api/#test-each',
      },
      {
        name: 'Code coverage',
        description: 'Measures which lines, branches, and functions are exercised by tests. Aim for high coverage on business logic, less on boilerplate.',
        example: '// vitest.config.ts:\nimport { defineConfig } from "vitest/config"\nexport default defineConfig({\n  test: {\n    coverage: {\n      provider: "v8",\n      reporter: ["text", "lcov"],\n      include: ["src/**/*.ts"],\n      exclude: ["src/**/*.d.ts", "src/types/**"],\n      thresholds: {\n        lines: 80,\n        functions: 80,\n        branches: 70,\n      },\n    },\n  },\n})\n\n// Run:\n// vitest run --coverage',
        link: 'https://vitest.dev/guide/coverage',
      },
    ],
  },
  {
    id: 'e2e',
    title: 'E2E Testing',
    color: '#38bdf8',
    entries: [
      {
        name: 'Playwright basics',
        description: 'Playwright automates browsers for end-to-end tests. Tests navigate real pages, click elements, and assert on outcomes.',
        example: 'import { test, expect } from "@playwright/test"\n\ntest("user can log in", async ({ page }) => {\n  await page.goto("http://localhost:3000/login")\n\n  await page.fill("[name=email]", "alice@example.com")\n  await page.fill("[name=password]", "password123")\n  await page.click("button[type=submit]")\n\n  await expect(page).toHaveURL("/dashboard")\n  await expect(page.getByText("Welcome, Alice")).toBeVisible()\n})',
        link: 'https://playwright.dev/docs/intro',
      },
      {
        name: 'Playwright locators',
        description: 'Locators describe how to find elements. Prefer accessible locators (getByRole, getByLabel) over CSS selectors.',
        example: 'const page = ...\n\n// Accessible locators (preferred):\npage.getByRole("button", { name: "Submit" })\npage.getByLabel("Email address")\npage.getByPlaceholder("Search...")\npage.getByText("Welcome back")\npage.getByAltText("Profile photo")\n\n// Test ID (explicit):\npage.getByTestId("submit-btn")\n\n// Chaining:\npage.getByRole("list").getByRole("listitem").first()\n\n// Assertions:\nawait expect(page.getByText("Success")).toBeVisible()\nawait expect(page.getByRole("checkbox")).toBeChecked()',
        link: 'https://playwright.dev/docs/locators',
      },
    ],
  },
]
