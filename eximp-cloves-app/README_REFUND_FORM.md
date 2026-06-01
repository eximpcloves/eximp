Integration notes - Refund Form

Files added:
- src/components/RefundForm.jsx
- src/components/RefundForm.css

Usage:
- Import and mount the `RefundForm` component in your React app, for example in `src/pages/RefundPage.jsx`:

  import RefundForm from '../components/RefundForm';
  export default function RefundPage(){
    return <RefundForm apiBase={import.meta.env.VITE_BACKEND_API_URL || ''} />
  }

- Ensure `VITE_BACKEND_API_URL` points to the backend base URL (e.g. https://api.eximps-cloves.com) or leave empty to use relative path. When using Vite, environment variables are available via `import.meta.env.VITE_*`.

CORS and backend:
- The backend `pos-eximp-fresh` already allows CORS from any origin. The form POSTs to `/api/refunds/public/submit`.
- Files are uploaded as multipart/form-data.

Notes:
- Allowed file types: PDF, PNG, JPEG. Max file size: 10MB per file (client-side validation).
- The dashboard admin UI can retrieve signed URLs for uploaded files from `/api/refunds/{id}/files` (admin-only).
