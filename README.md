# Eldar Lottery

Hola! Esta es mi propuesta para el challenge de Eldar. Antes de que comiences, tengo que avisar una cosa: el front end es muy simplista y bastante feo! Pero eso tiene una buena razón:

Como fue revizado en las entrevistas técnicas, tengo mucha experiencia en frontend usando React, pero nunca usé Angular antes. Y, a pesar del muy restringente límite de 48 horas, dado que la consigna pedía hacer un frontend en Angular, decidí demostrar mis capacidades y aprender Angular desde 0 mientras hacía el challenge.

Así que en este corto tiempo, aprendí lo básico de Angular y hice un frontend funcional, pero muy simple. Pero no te preocupes, el backend es mucho mejor! :)

## Como correr el proyecto

El proyecto está dockerizado para una muy fácil ejecución. Solo necesitas tener Docker instalado en tu computadora. Aunque para facilitar aún más el proceso de creación de tablas y eso, también recomiendo instalar sequelize-cli con:

```bash
npm install -g sequelize-cli
```

Después, solo tenés que correr el siguiente comando en la raíz del proyecto:

```bash
docker-compose up --build
```

Por último, para crear las tablas necesarias en la base de datos, solo tenés que correr:

```bash
sequelize db:migrate
```

Y listo! Ya podés acceder a la aplicación en http://localhost:80

Espero su feedback! Muchas gracias por la oportunidad!