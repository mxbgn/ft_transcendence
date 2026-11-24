# API Conventions

Rules every endpoint follows. Endpoint details live in their own files (`auth.md`, …). Once DTOs exist, Swagger (`/api/docs`) is the source of truth.

## URLs

- All endpoints start with `/api`
- Plural nouns for resources: `/api/tasks`, `/api/tasks/7`
- Actions that aren't plain CRUD are sub-paths: `POST /api/tasks/7/accept`
- Lowercase, `kebab-case` for multi-word paths: `/api/ledger-entries`

## Methods

| Method | Use |
| --- | --- |
| `GET` | Read, never changes data |
| `POST` | Create, or trigger an action |
| `PATCH` | Partial update |
| `DELETE` | Delete |

## JSON

- `camelCase` fields in requests and responses (`displayName`, `createdAt`)
- Dates: ISO 8601 strings in UTC (`2026-11-23T10:00:00.000Z`)
- Credits: integers, no decimals
- Requests: required fields must be present, optional fields may be omitted
- `PATCH`: omitted fields stay unchanged; `null` clears a field (only if it's nullable)
- Responses: every field is always present; missing values are `null`, not omitted

## Status codes

| Code | When |
| --- | --- |
| 200 | Success with a body |
| 201 | Resource created |
| 204 | Success, no body (e.g. logout) |
| 400 | Validation failed |
| 401 | Not logged in, or bad credentials |
| 403 | Logged in but not allowed |
| 404 | Not found |
| 409 | Conflict (email taken, task already accepted) |
| 429 | Too many requests (rate limit) |
| 500 | Unexpected server error |

## Errors

Every error uses this shape:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "must be an email" }]
}
```

- `errors` is only present on 400 validation errors (set via `ValidationPipe`'s `exceptionFactory`)
- Other errors only have `statusCode` and `message`

## Pagination

List endpoints take `?page=1&limit=20` (default `limit` 20, max 100) and return:

```json
{ "items": [], "total": 0, "page": 1, "limit": 20 }
```

## Validation

- `ValidationPipe` with `whitelist`, `forbidNonWhitelisted` and `transform`
- Unknown fields → 400

## Auth

- Access and refresh tokens are `HttpOnly`, `Secure`, `SameSite=Strict` cookies; the frontend never reads them
- `SameSite=Strict` is the CSRF protection (single origin behind Nginx, no CSRF tokens needed)
- Refresh tokens are stored hashed and revocable
- Endpoints that need login return 401 without a valid access token
- Details in `auth.md`

## Authorization

- Only the owner can change a resource (e.g. only a task's creator can edit or cancel it)
- Visible but not allowed → 403 (editing someone else's task)
- Private to another user → 404 (another user's wallet), so its existence isn't revealed
