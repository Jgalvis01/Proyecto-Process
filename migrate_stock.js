// Script para agregar campo stock a la tabla producto
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gqojhkbmkqnvvosvcfhm.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxb2poa2Jta3Fudnb2c3ZjZmhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTM3NTcwNiwiZXhwIjoyMDQwOTUxNzA2fQ.sKlKRlq8hMBFRrUlLdFFPnRV-v4M_1lKDm6MjA1tFas'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function addStockField() {
  console.log('🔧 Agregando campo stock a la tabla producto...')
  
  try {
    // Verificar si el campo ya existe
    const { data: columns, error: columnsError } = await supabase.rpc('get_table_columns', {
      table_name: 'producto'
    })
    
    if (columnsError) {
      console.log('⚠️ No se pudo verificar columnas existentes, continuando...')
    } else if (columns && columns.some(col => col.column_name === 'stock')) {
      console.log('✅ El campo stock ya existe en la tabla producto')
      return
    }
    
    // Agregar la columna stock
    const { error } = await supabase.rpc('execute_sql', {
      sql: 'ALTER TABLE producto ADD COLUMN IF NOT EXISTS stock INTEGER NOT NULL DEFAULT 0'
    })
    
    if (error) {
      // Intentar método alternativo
      console.log('⚠️ Método RPC falló, intentando consulta directa...')
      
      // Crear algunos productos de prueba con stock para verificar que funciona
      const { data: testProduct, error: testError } = await supabase
        .from('producto')
        .select('*')
        .limit(1)
        
      if (testError) {
        console.error('❌ Error al verificar tabla:', testError)
        return
      }
      
      if (testProduct && testProduct.length > 0) {
        console.log('📋 Campos actuales en producto:', Object.keys(testProduct[0]))
        
        if (!Object.keys(testProduct[0]).includes('stock')) {
          console.log('❌ El campo stock NO existe. Necesitas agregarlo manualmente en Supabase:')
          console.log('   ALTER TABLE producto ADD COLUMN stock INTEGER NOT NULL DEFAULT 0;')
        } else {
          console.log('✅ El campo stock ya existe!')
        }
      }
    } else {
      console.log('✅ Campo stock agregado exitosamente')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

addStockField()
