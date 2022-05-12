import * as express from 'express';
import { spawn } from 'child_process';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/execmd', (req, res) => {
  const command = req.query.cmd ? { cmd: req.query.cmd.toString() } : {};
  const argument = req.query.args ? { args: req.query.args.toString() } : {};

  if ('cmd' in command) {
    const myPromise = new Promise<any>((resolve, reject) => {
      const exe = spawn(command.cmd as string, argument.args ? argument.args.split(' ') as string[] : ['']);
      let errmsg: string = '';

      exe.on('error', function(err) {
        errmsg = err.message;
        reject(errmsg);
      });

      let commandOut: string = '';
      let errOut = '';
      let result = false;

      exe.stderr.on('data', (data) => {
        errOut += data;
        result = false;
      });
      exe.stdout.on('data', (data) => {
        commandOut += data;
        result = true;
      });
      exe.on('close', () => {
        if (errOut == '') {
          const response = { 'cmd': command.cmd, 'args': argument.args, 'success': result, 'output': commandOut };
          resolve(response);
        } else {
          const response = { 'cmd': command.cmd, 'args': argument.args, 'success': result, 'output': errOut };
          resolve(response);
        }
      });
    });
    myPromise.then((response) => {
      res.status(200).send(JSON.stringify(response));
    }).catch((error) => {
      const response = { 'cmd': command.cmd, 'args': argument.args, 'success': false, 'output': 'Comando no válido', 'err': error };
      /* Envío de respuesta al cliente. */
      res.status(200).send(JSON.stringify(response));
    });
  } else {
    res.status(404).send({
      error: 'A command has to be provided',
    });
  }
});

app.all('*', (_, res) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// http://localhost:3000/execmd?cmd=cat&args=-n prueba.txt