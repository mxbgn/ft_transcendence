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
- Missing values are `null`, not omitted

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

## Auth

- Access and refresh tokens are `HttpOnly` cookies; the frontend never reads them
- Endpoints that need login return 401 without a valid access token
- Details in `auth.md`
