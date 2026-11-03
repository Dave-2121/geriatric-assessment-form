# Geriatric Care Assessment Form

Take-home for the Frontend Developer role at Manufac. A one page form a visiting nurse
fills in at an elderly patient's home. React 19, TypeScript, Mantine, Zod.

## Running it

```
npm install
npm run dev
npm test
```

`npm test` runs typecheck, prettier, eslint, vitest and the build. Needs Node 18 or newer.

## How it's wired

- `schema.ts` is the schema from the brief, copied over and only reformatted.
- The form uses `@mantine/form` with `schemaResolver(assessmentSchema)`, so every rule lives in
  the schema and nothing is repeated in the components.
- `FormValues` is built from `Assessment` (the empty-friendly version of it), I didn't write a
  second interface by hand.
- On submit `transformValues` runs `assessmentSchema.parse`, so the save handler and the Code block
  get what Zod returned (trimmed strings etc.), not the raw form state.
- Mobility options are built from the `MOBILITY` array, so adding a value there adds it to the
  dropdown.

## Calls I made where the brief wasn't clear

- No router, the brief says routing is out of scope. The page renders the form directly.
- Number inputs use `clampBehavior="none"`. The default clamps on blur, which would quietly turn
  105 into 100. I want the nurse to see the error instead.
- `maxDate` on the assessment date only limits the picker. The schema doesn't stop a future date
  and I didn't add a rule for it since I was told not to invent rules.
- Dates are shown as "August 7, 2026" but stored as `YYYY-MM-DD` strings.
- "Load sample patient" also clears any errors and the previous success message.
- Used npm instead of Yarn.

## Not done / next

- Only two tests, as asked. I'd add one that checks an empty form gives exactly 9 errors.
- Haven't done an accessibility pass beyond what Mantine gives.
- Didn't add a "reset form" button.

## Time

About 2 hours.
