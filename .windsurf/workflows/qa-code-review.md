---
description: Deep code review to find bugs, errors, and quality issues before they hit production
---

# Code Quality Review Workflow

Run this workflow before any release or when you want me to thoroughly check for bugs.

## Step 1: Static Analysis
// turbo
Run TypeScript check:
```
npx tsc --noEmit
```

## Step 2: Supabase Query Audit
Search for `.single()` calls and verify each one:
- If "no rows found" is valid → should be `.maybeSingle()`
- If exactly one row must exist → `.single()` is correct

Check pattern:
```
grep -rn "\.single()" --include="*.ts" --include="*.tsx" src/
```

For each result, ask: "What happens if no rows are found?"

## Step 3: Error Handling Audit
Search for catch blocks that silently fail:
```
grep -rn "catch.*{" --include="*.ts" src/app/api/ -A3
```

Every catch should:
- Log the error with context
- Return a specific error message to the client
- NOT return `false` or `null` without explanation

## Step 4: Missing Await Check
Search for async functions that might be missing await:
```
grep -rn "supabase\." --include="*.ts" --include="*.tsx" src/ | grep -v "await\|const.*="
```

## Step 5: Null Safety Check
Search for potentially unsafe property access:
```
grep -rn "\\.data\\." --include="*.ts" --include="*.tsx" src/
```

Each should either:
- Have a null check before access
- Use optional chaining (`data?.property`)
- Be inside an `if (data)` block

## Step 6: API Route Security Audit
For each file in `src/app/api/`:
1. Check for `getUser()` call (authentication)
2. Check for organization_id scoping (authorization)
3. Check for input validation
4. Check for proper error responses with status codes

## Step 7: Build Test
// turbo
Run full build to catch any remaining issues:
```
npm run build
```

## Step 8: Report Findings
Create a summary with:
- **Critical**: Bugs that will cause errors in production
- **High**: Security or data integrity issues
- **Medium**: Code quality issues
- **Low**: Style/cleanup items

Fix all Critical and High issues before proceeding.
