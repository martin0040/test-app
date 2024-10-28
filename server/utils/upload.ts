import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

// Extend NextApiRequest to include files property
// ... existing imports ...

// Extend NextApiRequest to include both files and fields
interface ExtendedNextApiRequest extends NextApiRequest {
    files: formidable.Files;
    body: formidable.Fields;
}

// ... config stays the same ...

// Updated middleware with proper error handling and typing
export const uploadMiddleware = (
    req: ExtendedNextApiRequest,
    res: NextApiResponse,
    next: NextHandler
): void => {
    const form = formidable.IncomingForm({
        keepExtensions: true,
        multiples: true,
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(500).json({
                error: true,
                message: 'Error processing file upload',
                details: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }

        try {
            req.body = fields;
            req.files = files;
            next();
        } catch (error) {
            console.error('Middleware error:', error);
            return res.status(500).json({
                error: true,
                message: 'Internal server error'
            });
        }
    });
};