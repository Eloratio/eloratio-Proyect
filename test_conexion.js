/**
 * @file test_conexion.js
 * @description Script de prueba sencillo para verificar que la base de datos sqlite y
 * la estructura del proyecto funcionan correctamente.
 */

const db = require('./db');

try {
  console.log('--- Iniciando Prueba de Conexión y Estado ---');

  // 1. Probar la base de datos
  const resultado = db.prepare('SELECT 1 + 1 AS suma').get();
  if (resultado && resultado.suma === 2) {
    console.log('✅ Base de datos (SQLite): Conexión establecida correctamente.');
  } else {
    throw new Error('No se pudo verificar el resultado esperado de la base de datos.');
  }

  // 2. Verificar que las tablas requeridas existan
  const tablaCursos = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='cursos';").get();
  if (tablaCursos) {
    console.log('✅ Base de datos (Tablas): Tabla "cursos" verificada y lista.');
  } else {
    console.log('⚠️ Base de datos (Tablas): La tabla "cursos" no se encuentra o no ha sido creada.');
  }

  // 3. Verificar la carga de módulos del backend
  const app = require('./backend/app');
  if (app) {
    console.log('✅ Backend: Módulo de la aplicación cargado correctamente.');
  }

  console.log('\n🎉 ¡Todo parece estar en orden y funcionando de forma correcta!');
} catch (error) {
  console.error('\n❌ Error al ejecutar la prueba:', error.message);
  process.exit(1);
}
