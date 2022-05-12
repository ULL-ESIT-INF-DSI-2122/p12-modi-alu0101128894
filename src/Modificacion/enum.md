Desarrolle el siguiente ejercicio en un proyecto alojado en un nuevo repositorio de GitHub.

Implemente un servidor Express en el que se exponga un punto de acceso JSON en la ruta '/execmd'. Al mismo tiempo, haga que el servidor devuelva como respuesta, por defecto, un estado 404, en el caso de que se intente acceder a una ruta no válida.

Se espera que la URL que permite acceder a dicho punto de acceso contenga una query string. La primera clave de la query string, denominada 'cmd', consistirá en un comando Unix/Linux, mientras que la segunda, denominada args, consistirá en las opciones y posible fichero con los que se desea ejecutar el comando.

En el servidor, la ejecución del comando, dado que se trata de código asíncrono, deberá incluirse en una función o método basado en promesas.

El punto de acceso deberá contestar, siempre, con un objeto JSON:
En caso de que se produzca un error durante el proceso, un objeto JSON con una propiedad error que contenga información acerca del error que ha ocurrido. Tenga en cuenta que, en los casos en los que el comando especificado no llegara a ejecutarse, por ejemplo, porque no existe, o se ejecutara produciendo una salida no satisfactoria, por ejemplo, porque se le pasan argumentos no válidos a un comando que si existe, el error correspondiente deberá devolverse en este tipo de objeto JSON.
En el caso de que el comando, con sus correspondientes argumentos, se ejecute correctamente, un objeto JSON con una propiedad output que contenga la salida emitida por el comando.
Como entrega de esta tarea deberá indicar el enlace al repositorio GitHub con los ejercicios de evaluación solicitados.