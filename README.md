# Requisitos previos

Asegúrate de tener instalado en tu máquina:


- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) o [pnpm](https://pnpm.io/)  

*Preferiblemente usa npm*

Puedes verificar con:

```bash
node -v
npm -v
```

## Instalación del proyecto

```bash
git clone https://github.com/usuario/mi-proyecto.git
cd mi-proyecto
```

## Instala las dependencias 

Recomendablemente usa npm (o las otras opciones, pero me voy a centrar en npm)
```bash
npm install
```

## Ejecuta el servidor de desarrollo

```bash
npm run dev
```
**al correr el proyecto, ten en cuenta la rama en la que estás**

Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Estructura basica del proyecto

```bash
├── pages/          # Rutas y vistas principales
├── app/            # Rutas y layouts
├── components/     # Componentes reutilizables
├── public/         # Archivos estáticos
└── package.json    # Configuración y dependencias
```

## Para correr la base de datos



### En Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

```bash
sudo -i -u postgres
psql
```

## Configurar la base de datos
```bash
CREATE ROLE calculadora_imc WITH LOGIN PASSWORD 'calculadora_imc';

CREATE DATABASE calculadora OWNER calculadora_imc;

\q
```

```bash
createdb clinica -U calculadora_imc
```

```bash
psql -U calculadora_imc -d calculadora -h localhost -f /home/termihoe/Documents/calculadora-imc/schema.sql
```