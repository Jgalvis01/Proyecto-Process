# Script de inicialización para POS_PROCESOS (PowerShell)
Write-Host "🚀 Configurando POS_PROCESOS..." -ForegroundColor Green

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js detectado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js primero." -ForegroundColor Red
    exit 1
}

# Verificar si npm está disponible
try {
    $npmVersion = npm --version
    Write-Host "✅ npm detectado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm no está disponible." -ForegroundColor Red
    exit 1
}

# Instalar dependencias
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
npm install

# Crear archivo .env si no existe
if (!(Test-Path .env)) {
    Write-Host "📝 Creando archivo .env..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠️  IMPORTANTE: Configura las variables de Supabase en el archivo .env" -ForegroundColor Yellow
} else {
    Write-Host "✅ Archivo .env ya existe" -ForegroundColor Green
}

# Verificar compilación
Write-Host "🔍 Verificando compilación..." -ForegroundColor Yellow
npm run build

Write-Host "🎉 ¡Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar el servidor de desarrollo:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Para obtener ayuda adicional, lee el README.md" -ForegroundColor Cyan
