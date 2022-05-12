import * as express from 'express';
import { spawn } from 'child_process';

const app = express();

app.get('/execmd', (req, res) => {
  if (!req.query.c || !req.query.a) {
    return res.send({
      error: 'A command has to be provided',
    });
  }

  const command = req.query.c.toString();
  const argumentos = req.query.a.toString().split(" ");
  let com = spawn(command, argumentos);
  let er = '';

  console.log('Ejecutando comando: ' + command + ' ' + req.query.a.toString());

  com.on('error', (data) => {
    console.log("<h1>404</h1>\n" + data);
    res.send(JSON.stringify({ error: data }));
  });

  com.stderr.on('data', (data) => {
    console.log("Ha sucedido un error: " + data.toString());
    res.send(JSON.stringify({ error: data.toString() }));
  });

  com.stdout.on('data', (data) => {
    console.log('Resultado:\n' + data.toString());
    res.send(JSON.stringify({ c: data.toString() }));
  });

  com.on('close', (code) => {
    if (code !== 0) {
      console.log("El comando terminó con el código " + code);
      res.send(JSON.stringify({ code: code }));
    // } if (er != '') {
    //   res.send(JSON.stringify({ error: er }));
    // } else {
      res.send(JSON.stringify({ error: er }));
    }
  });

});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

/*
http://localhost:3000/execmd?c=ls&a=-l
http://localhost:3000/execmd?c=cat&a=-n .gitignore
http://localhost:3000/execmd?c=cat&a=-n info.html
 */
