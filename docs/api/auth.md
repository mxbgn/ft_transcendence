# Auth API

Follows `conventions.md`. Once DTOs exist, the Swagger page served by the backend at `https://localhost/api/docs` is the source of truth.

## Cookies

| Cookie | Content | Lifetime | Path |
| --- | --- | --- | --- |
| `access_token` | JWT (`sub` = user id) | 15 min | `/` |
| `refresh_token` | Random token, stored hashed in `refresh_tokens` | 7 days | `/api/auth` |

- Both are `HttpOnly`, `Secure`, `SameSite=Strict`; the frontend never reads them
- `refresh_token` uses path `/api/auth` so it is only sent to `refresh` and `logout`
- Clearing a cookie = `Set-Cookie` with the same name and path and `Max-Age=0`

## User object

Returned by `register`, `login` and `me`:

```json
{
  "id": 7,
  "email": "ana@example.com",
  "displayName": "Ana",
  "avatarUrl": null,
  "balance": { "available": 1000, "held": 0 }
}
```

## POST /api/auth/register

Creates an account and logs the user in.

**Auth:** none

**Request**

```json
{ "email": "ana@example.com", "password": "secret123", "displayName": "Ana" }
```

| Field | Rules |
| --- | --- |
| `email` | required, valid email, max 254, trimmed and stored lowercase |
| `password` | required, 8–128 chars |
| `displayName` | required, 3–20 chars, not unique |

**Response 201:** User object. Sets `access_token` and `refresh_token`.

**Errors**

| Code | When |
| --- | --- |
| 400 | Validation failed (`errors` array per field) |
| 409 | Email already registered |

## POST /api/auth/login

Logs in with email and password.

**Auth:** none

**Request**

```json
{ "email": "ana@example.com", "password": "secret123" }
```

| Field | Rules |
| --- | --- |
| `email` | required, valid email |
| `password` | required |

**Response 200:** User object. Sets `access_token` and `refresh_token`.

**Errors**

| Code | When |
| --- | --- |
| 400 | Validation failed |
| 401 | Wrong email or password (same message for both: `Invalid email or password`) |
| 429 | Too many login attempts |

## POST /api/auth/logout

Ends the current session.

**Auth:** `refresh_token` cookie (if missing, still succeeds)

**Request:** no body

**Response 204:** Revokes the refresh token and clears both cookies.

**Errors:** none. Logout always succeeds, so the frontend can always reset its state.

## POST /api/auth/refresh

Issues a new access token. Called by the frontend's `api.ts` when a request returns 401, then the original request is retried once.

**Auth:** `refresh_token` cookie

**Request:** no body

**Response 204:** Sets a new `access_token`. Rotates the refresh token: the old one is revoked and a new `refresh_token` is set.

**Errors**

| Code | When |
| --- | --- |
| 401 | Refresh token missing, expired or revoked. Clears both cookies; the frontend treats the user as logged out |

## GET /api/auth/me

Returns the logged-in user. Called once when the app starts to restore the session.

**Auth:** `access_token` cookie

**Request:** no body

**Response 200:** User object.

**Errors**

| Code | When |
| --- | --- |
| 401 | Not logged in, or access token expired (frontend tries `refresh` once) |