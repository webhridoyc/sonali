# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Admin dashboard

This project includes a protected admin inbox at `/admin` that collects:
- Contact inquiries (from the Contact form)
- Membership applications (from Member Portal)

### Protect `/admin` (required)

Set these server environment variables:
- `ADMIN_USER`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

If they are not set, `/admin` returns 404.

You will log in at `/admin/login` and a secure HttpOnly cookie session will be created.

### Store submissions in Firestore (optional, recommended)

To enable collection + viewing inside `/admin`, set ONE of:
- `FIREBASE_ADMIN_CREDENTIALS` = full Firebase service account JSON string
- `FIREBASE_ADMIN_CREDENTIALS_BASE64` = base64 of that JSON

Without these, forms will still email via Resend, but the admin inbox will show a configuration message.

### Show Admin link in nav (optional)

Set:
- `NEXT_PUBLIC_SHOW_ADMIN_LINK=true`
