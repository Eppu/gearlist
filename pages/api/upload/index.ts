import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';
import checkSession from '../../../lib/checkSession';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = await checkSession(req, res);
  // There's probably a smarter way to do this but I can't come up with one right now.
  if (!session) {
    res.status(401).json({ message: 'Invalid session' });
    return;
  }

  // POST /upload/
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  if (!session.supabaseAccessToken) {
    res.status(401).json({ message: 'Invalid session, no access token provided' });
    return;
  }

  // TODO: Refactor <any> to a proper type
  const promise = new Promise<any>((resolve, reject) => {
    let imageToUpload;

    const form = new formidable.IncomingForm({
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      // console.log(err, fields, files);
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  promise.then(async (result) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      global: {
        headers: {
          Authorization: `Bearer ${session.supabaseAccessToken}`,
        },
      },
    });

    const fileName = result.files.image.newFilename;
    const rawData = fs.readFileSync(result.files.image.filepath);

    // upload the file to supabase storage
    const { data, error } = await supabase.storage.from('user-uploads').upload(`${fileName}`, rawData, {
      contentType: result.files.image.mimetype,
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      res.status(500).json({ message: 'File upload failed', error: error });
      return;
    }
    const urlBase = `https://eqcxijjyagypsfsdugjz.supabase.co/storage/v1/object/public/user-uploads`;
    res.status(200).json({ url: `${urlBase}/${data.path}` });
  });
}

export default handler;
