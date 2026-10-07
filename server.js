const fastify = require('fastify')({ logger: false });
const path = require('path');

const port = Number(process.env.PORT) || 3000;

fastify.register(require('@fastify/view'), {
    engine: {
        ejs: require('ejs')
    }
});

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'static'),
    prefix: '/'
});

// Routes
fastify.register(require('./routes/home.js'), { prefix: '/' });
fastify.register(require('./routes/login.js'), { prefix: '/' });

async function start() {
    try {
        await fastify.listen({
            port: port,
            host: '0.0.0.0'
        });

        console.log(
            `sertex is running on http://${fastify.server.address().address}:${fastify.server.address().port}`
        );
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();
