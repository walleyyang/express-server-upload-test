/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import fileupload, { UploadedFile } from 'express-fileupload';

const port = '8080';

const createServer = () => {
  const app = express();
  app.use(fileupload());

  app.post('/upload', (req, res) => {
    if (req.files) {
      // uploadedFile is name of input field
      const file = req.files.uploadedFile as UploadedFile;
      const fileName = file.name;

      file.mv(`./public/uploads/${fileName}`, (err: any) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
    } else {
      return res.status(400).send('Files not uploaded');
    }

    return res.send({ status: 'success', path: '/public/uploads/' });
  });

  return app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

export { createServer };
