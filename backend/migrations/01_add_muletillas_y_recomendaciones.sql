-- Agregar columnas para registrar muletillas y recomendaciones de pronunciación en la tabla analisis_sesion
ALTER TABLE analisis_sesion 
ADD COLUMN IF NOT EXISTS muletillas JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS recomendaciones_pronunciacion JSONB DEFAULT '[]'::jsonb;
