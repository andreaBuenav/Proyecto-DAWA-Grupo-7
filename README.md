# Sistema de Control de Acceso Vehicular (SCAI-VEH)

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 20.3.8.

## Servidor de Desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté ejecutándose, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques cualquiera de los archivos fuente.

## Usuarios del Sistema

El sistema cuenta con 3 tipos de usuarios con diferentes niveles de acceso:

### 👨‍💼 Administrador
- **Usuario:** `admin`
- **Contraseña:** `admin123`
- **Nombre:** Ernesto
- **Permisos:** Acceso completo a todos los módulos
  - Gestión de Guardias
  - Gestión de Residentes
  - Auditoría
  - Visitantes
  - LPR
  - Panel de Control de Acceso

### 🏠 Residente
- **Usuario:** `residente`
- **Contraseña:** `residente123`
- **Nombre:** María González
- **Permisos:** Acceso limitado
  - Visitantes

### 👮 Guardia
- **Usuario:** `guardia`
- **Contraseña:** `guardia123`
- **Nombre:** Carlos Pérez
- **Permisos:** Acceso a módulos operativos
  - LPR
  - Panel de Control de Acceso

## Generación de Código

Angular CLI incluye potentes herramientas de scaffolding. Para generar un nuevo componente, ejecuta:

```bash
ng generate component nombre-componente
```

Para una lista completa de esquemas disponibles (como `components`, `directives`, o `pipes`), ejecuta:

```bash
ng generate --help
```

## Construcción

Para construir el proyecto ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los artefactos de construcción en el directorio `dist/`. Por defecto, la construcción de producción optimiza tu aplicación para rendimiento y velocidad.

## Ejecutar Pruebas Unitarias

Para ejecutar las pruebas unitarias con el test runner [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

## Ejecutar Pruebas End-to-End

Para pruebas end-to-end (e2e), ejecuta:

```bash
ng e2e
```

Angular CLI no viene con un framework de pruebas end-to-end por defecto. Puedes elegir uno que se adapte a tus necesidades.

## Dependencias

Este proyecto usa las siguientes librerías npm:

### Librerías de Exportación
- **jspdf** (^2.5.2): Librería para generar documentos PDF
- **jspdf-autotable** (^3.8.4): Plugin para jsPDF para generar tablas en PDF
- **xlsx** (^0.18.5): Librería para leer y escribir archivos Excel

Para instalar estas dependencias:

```bash
npm install jspdf jspdf-autotable xlsx --save
```
O:

```bash
npm ci
```
### Uso

Estas librerías se usan en el módulo de auditoría (`admin-audit`) para exportar reportes de acceso a formatos PDF y Excel:

- **Exportar a PDF**: Genera un PDF formateado con una tabla de registros de acceso
- **Exportar a Excel**: Crea una hoja de cálculo Excel con columnas ajustables y datos de acceso

## Recursos Adicionales

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
