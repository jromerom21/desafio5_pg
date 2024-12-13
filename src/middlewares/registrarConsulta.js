
const fs = require('fs');
const path = require('path');

// Middleware para registrar las consultas
const registrarConsulta = (req, res, next) => {
    const log = `Ruta consultada: ${req.originalUrl} - Método: ${req.method} - Fecha: ${new Date().toISOString()}\n`;
    
    // Ruta del archivo de log en la carpeta raíz del proyecto
    const logFilePath = path.join(__dirname, '..', 'logs', 'consultas.log');

    // Crear la carpeta 'logs' si no existe
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
        fs.mkdirSync(path.join(__dirname, '..', 'logs'));
    }

    // Guardar el log en el archivo
    fs.appendFile(logFilePath, log, (err) => {
        if (err) {
            console.error('Error al registrar la consulta:', err);
        }
    });

    next();
};

module.exports = registrarConsulta;