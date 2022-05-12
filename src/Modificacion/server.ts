import * as express from 'express';
import { spawn } from 'child_process';

/* Creando una nueva aplicación express. */
const app = express();
/* Establecer el puerto en el valor de la variable de entorno PORT o 3000 si la variable de entorno no está configurada. */
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/execmd', (req, res) => {
  /* Comprobando si los parámetros de consulta están presentes y, si lo están, los está convirtiendo en cadenas. */
  const command = req.query.cmd ? { cmd: req.query.cmd.toString() } : {};
  const argument = req.query.args ? { args: req.query.args.toString() } : {};

  if ('cmd' in command) {
    /* Creando una nueva promesa que será resuelta o rechazada dependiendo del resultado del comando. */
    const myPromise = new Promise<any>((resolve, reject) => {
      /* Crear un nuevo proceso con el comando y los argumentos provistos. */
      const exe = spawn(command.cmd as string, argument.args ? argument.args.split(' ') as string[] : ['']);
      let errorMsg: string = '';

      exe.on('error', function(err) {
        errorMsg = err.message;
        reject(errorMsg);
      });

      let commandOut: string = '';
      let errOut = '';
      let result = false;

      /* Escuchando un error y si encuentra uno, establecerá el resultado en falso. */
      exe.stderr.on('data', (data) => {
        errOut += data;
        result = false;
      });
      /* Escuchando datos del comando y si encuentra algunos, establecerá el resultado en verdadero. */
      exe.stdout.on('data', (data) => {
        commandOut += data;
        result = true;
      });
      /* Escuchando el evento de cierre y si no hay error, resolverá la promesa con la respuesta. */
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
    /* Una promesa que está esperando la respuesta del comando. */
    myPromise.then((response) => {
      /* Envío de respuesta al cliente. */
      res.status(200).send(JSON.stringify(response));
    }).catch((error) => {
      const response = { 'cmd': command.cmd, 'args': argument.args, 'success': false, 'output': 'Comando no válido', 'err': error };
      /* Envío de respuesta al cliente. */
      res.status(200).send(JSON.stringify(response));
    });
  } else {
  /* Enviando un mensaje de error 404 al cliente. */
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