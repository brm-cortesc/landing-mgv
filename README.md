# NG BRM

**ng-brm** es el paquete de herramientas con el que se construyen apps Angular 5 en ***BRM***, provee un flujo de trabajo optimizado en FrontEND para ayudar a tener mejor calidad y rendimiento en el desarrollo de aplicaciones web.

![NG BRM](https://brm.com.co/images/ng-brm.jpg "NG BRM")

## Características 
|Característica|Descripción|
|------------------|-----------|
|Development|[AngularCLI](https://cli.angular.io),  [Angular - Bootstrap](https://ng-bootstrap.github.io/#/components/accordion/examples)|
|CSS| [Stylus](http://stylus-lang.com/), [SMACSS](https://goo.gl/Skz2Ew), [Bootpstrap-Stylus](https://goo.gl/htL5nT), [FontAwesome-Stylus](http://fontawesome.io/)|
|JS|[typescript](https://www.typescriptlang.org/)
|Testing|[Karma](https://karma-runner.github.io), [JasmineJS](https://jasmine.github.io/) |
|HTML| [Pug Engine](pugjs.org)|

# Cómo usarlo
Antes que nada hay que tener instalado:
- [NodeJS](https://nodejs.org/) 6.10.*
- [GulpJS](http://gulpjs.com/)
- [Angular Cli](https://cli.angular.io) 1.6.0.

# Iniciando un proyecto

### 1 - Clonar el código

```bash
git clone https://github.com/BRMBog/ng-brm <nombre-proyecto>
cd <nombre-proyecto>
```
### 2 - Setup del proyecto

En el archivo  ***frontend.json*** 

```json
"name": "nombre-proyecto",
"author":{
"name": "nombre",
"email": "email@brm.com.co"
}
```

### 3 - Instalar las dependecias

```bash
npm install
```

# Tareas/comandos

```bash
npm start
```

Se crea  http://localhost:4200/ donde podrá ver el corte, css y js que va generando y la tarea se queda escuchando cambios en los archivos para refrescar automaticamente el navegador.

```bash
npm run build
```
Genera un directorio ***dist*** con los bundles, html y assets para cargar en un servidor.

```bash
npm run reports
```
Genera un reporte de peso de archivos para html, css, js y assets.

```bash
npm run css
```
Se genera un bundle.css minificado con el nombre del proyecto

```bash
npm run test
```
Ejecuta pruebas unitarias via [Karma](https://karma-runner.github.io)

```bash
npm run e2e
```
Ejecuta pruebas punto a punto  via [Protractor](http://www.protractortest.org/)

# Para tener en cuenta

- La carpeta de archivos fuente es ***src/dev***, la carpeta ***src/apps*** se genera automáticamente
- Los assets gráficos como imágenes y webfonts van dentro de la carpeta ***src/assets***
- En la carpeta stylus están todos los módulos de estilos, incluyendo Bootstrap y FontAwesome
- el archivo index de la aplicación, se encuentra en ***src/dev/templates*** 
- El root de la web app es el componente ***public/home***

# Soporte 

Cualquier inquietud, no duden en comunicarse con:
Julian Barrera julian.barrera@brm.com.co, Cristian Cortés cristian.cortes@brm.com.co o Luis Cruz luis.cruz@brm.com.co 

:muscle:

# Licencia
MIT

![Code with love by BRM](https://www.brm.com.co/by-brm.svg "Code with love by BRM")



