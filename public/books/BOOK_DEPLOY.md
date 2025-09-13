# PDF Files in Production

When deploying this application, make sure all PDF files in this directory are correctly uploaded to your production environment. 

## Vercel Deployment Instructions

1. Make sure all PDF files are committed to your Git repository using Git LFS
2. Set the `NEXT_PUBLIC_BASE_URL` environment variable in Vercel to your deployed site URL (e.g., https://your-app.vercel.app)
3. Increase the max lambda size in your Vercel project settings if needed for large PDF files

## General Deployment Notes

- Static files in the `/public` directory should be automatically included in the build
- Make sure your hosting provider supports serving large files like PDFs
- Set the proper MIME types for PDF files on your server (application/pdf)
- PDF files must maintain the same relative paths in production as in development

If you experience blank screens after deployment, check:

1. That all PDF files were uploaded correctly
2. Your environment variables are set correctly
3. The paths in constants.js match the actual locations of the PDF files