# Support2You Client project

Este proyecto contiene el cliente/interfaz de usuario de Support2You que permite al usuario interactuar con el chat para la solución de problemas técnicos que los clientes de la empresa hipotética de atención al cliente tienen.

## Tecnologías
- HTML.
- CSS.
- JavaScript.
- NodeJS.
- AstroJS.

## Ejecución del proyecto
- Instalación de paquetes: Ejecutar `npm install`.
- Creación de archivo `.env`: Crear archivo `.env` en la raíz del proyecto y copiar el contenido del archivo `.env.example` cambiando los valores de las variables al correspondiente.
- Ejecutar proyecto: Ejecutar la aplicación con `npm start` o `npm run dev` (la recarga activa de cambios está habilitada por defecto).

## Estructura

Dentro del proyecto, se encuentra la siguiente estructura de directorios y archivos:
```text
/
├── public/
├── src/
│   └── assets/
│   │   └── images/
│   │   └── styles/
│   └── components/
│   └── layouts/
│   └── pages/
│   └── scripts/
│   └── templates/
└── package.json
```

Descrita de la siguiente manera:
- public: Archivos estáticos como imágenes, fuentes, scripts, documentos, etc. que no pretendemos que astro empaquete.
- assets: Archivos estáticos que son parte directa e indispensable del código de la aplicación y queremos procesar.
    - images: Imágenes utilizadas dentro del proyecto.
    - styles: Estilos `.css` utilizados dentro de las páginas, componentes y templates.
- components: Partes reutilizables de código HTML, pueden ser componentes de  Astro/React/Vue/Svelte/Preact.
- layouts: Componentes estructurales que permiten organizar los elementos de UI en la aplicación.
- pages: Páginas del sitio formadas por código HTML, componentes o markdown.
- scripts: Archivos de JavaScript con funcionalidades que pueden ser importadas en las páginas y componentes del proyecto.
- templates: Componentes estructurales que permiten definir plantillas reutilizables para las páginas de la aplicación.

## Docker
Para ejecutar Support2YouClient como contenedor existen las siguientes opciones:
- Obtener la imagen del API con cualquiera de las siguientes opciones:
    - Realizar el build de la imagen en local: `docker build -t brventura/support2you-client:tagname .`
    - Descargar la imagen desde DockerHub: `docker pull brventura/support2you-client:tagname`, ver última versión en [Support2You Client repository](https://hub.docker.com/repository/docker/brventura/support2you-client/tags)
- Ejecutar el contenedor: `docker run --rm -d --name support2you-client -p 4321:80 brventura/support2you-client:tagname` o `docker run -d --name support2you-client -p 4321:80 brventura/support2you-client:tagname` en caso que se quiera preservar el contenedor despues de detenido.
- Docker compose: `docker compose up --build -d`
