const express = require('express');
const cors = require('cors');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('./src/models/database');
const app = express();
const sequelize = require('./src/models/database');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rotas = require('./src/routes/WareRoutes');

// Modelos
const Clientes = require('./src/models/clientes');
const Empresas = require('./src/models/empresas');
const TipoUser = require('./src/models/tipouser');
const Tiposoftadd = require('./src/models/tiposoftadd');
const Avaliacoes = require('./src/models/avaliacoes');
const LicencasAtribuidas = require('./src/models/licencasatribuidas');
const Orcamentos = require('./src/models/orcamentos');
const Pedidos = require('./src/models/pedidos');
const Versoes = require('./src/models/Versoes');
const SoftwaresAdquiridos = require('./src/models/softwaresadquiridos');
const Tickets = require('./src/models/tickets');
const TiposSoftwares = require('./src/models/tipossoftwares');
const Ware = require('./src/models/ware');

// Configurações
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '500Mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500Mb' }));

// Configurar CORS
app.use(cors({
  origin: 'https://frontend-o9wj.onrender.com', // Permitir requisições do frontend React
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));





// Configurar sessão
app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: 'seuSegredoAqui',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } // Para testes locais sem HTTPS
}));

// Sincronizar modelos e inserir dados iniciais
async function syncModels() {
  try {
    await sequelize.sync();
    console.log('Modelo sincronizado com o banco de dados.');

    await Empresas.sync();
    await TipoUser.sync();
    await Clientes.sync();
    await Pedidos.sync();
    await Versoes.sync();
    await Ware.sync();
    await TiposSoftwares.sync();
    await SoftwaresAdquiridos.sync();
    await Tickets.sync();
    await Orcamentos.sync();
    await LicencasAtribuidas.sync();
    await Tiposoftadd.sync();
    await Avaliacoes.sync();

    console.log("All models were synchronized successfully.");

    await TipoUser.bulkCreate([
      { iduser: 1, designacao: 'Comprador_Gestor' },
      { iduser: 2, designacao: 'Gestor' }
    ], { ignoreDuplicates: true });

    console.log("Initial data for TipoUser inserted successfully.");

    await Ware.bulkCreate([
      { idware: 1, username: 'admin', password: 'admin', lucros: 0, gastos: 0 }
    ], { ignoreDuplicates: true });

    await Tiposoftadd.bulkCreate([
      { idtipo: 2, designcaosoftadd: 'Addons' },
      { idtipo: 1, designcaosoftadd: 'Software' }
    ], { ignoreDuplicates: true });

    console.log("Initial data for Ware and Tiposoftadd inserted successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
}

// Rotas
app.use(rotas);

// Iniciar sincronização dos modelos
syncModels();

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor iniciado na porta " + PORT);
});

module.exports = app;




