//Este aplicativo en un to do list con opcion para organizar y filtrar por categorias
mas un footer conectado a firebase que se muestra

//pasos para instalar el proyecto y correrlo en local

npm install @angular/cli
npm install -g @ionic/cli
npm install --legacy-peer-deps
npm install swiper


//pasos para generar la build para Android ---------------------------------------
# 1️⃣ Instalar la plataforma Android de Capacitor
npm install @capacitor/android

# 2️⃣ Inicializar Capacitor (solo la primera vez si no hay config)
npx cap init

# 3️⃣ (Opcional) Borrar carpetas previas si se crearon mal
# Borrar la carpeta android y borrar la carpeta www

# 4️⃣ Agregar la plataforma iOS a tu proyecto
ionic capacitor add android

# 5️⃣ Construir la app de Ionic
ionic build

# 6️⃣ Sincronizar los cambios de la build a la plataforma
npx cap sync

# 7️⃣ Abrir android studio para generar el .apk o ejecutar en simulador/dispositivo
npx cap open ios

//pasos para generar la build oara IOS -------------------------------------------

# 1️⃣ Instalar la plataforma iOS de Capacitor
npm install @capacitor/ios

# 2️⃣ Inicializar Capacitor (solo la primera vez si no hay config)
npx cap init

# 3️⃣ (Opcional) Borrar carpetas previas si se crearon mal
# Borrar la carpeta android y borrar la carpeta www

# 4️⃣ Agregar la plataforma iOS a tu proyecto
ionic capacitor add ios

# 5️⃣ Construir la app de Ionic
ionic build

# 6️⃣ Sincronizar los cambios de la build a la plataforma
npx cap sync

# 7️⃣ Abrir Xcode para generar el .ipa o ejecutar en simulador/dispositivo
npx cap open ios