# Biblioteca Virtual UTN

Proyecto de Biblioteca Virtual para la Facultad Regional Trenque Lauquen (UTN).

## Características

- **Diseño Moderno**: Interfaz responsive con modo oscuro.
- **Gestión de Libros**: CRUD completo para libros.
- **Autenticación**: Sistema de login y registro.
- **Perfil de Usuario**: Gestión de datos personales.
- **Búsqueda y Filtros**: Funcionalidades avanzadas de búsqueda.

## Tecnologías

- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express
- **Base de Datos**: Mockup

## Estructura del Proyecto

```
utn-biblioteca-virtual/
├── Frontend/              # Interfaz de usuario
│   ├── index.html
│   ├── libros.html
│   ├── categorias.html
│   ├── contacto.html
│   ├── login.html
│   ├── register.html
│   ├── js/
│   └── css/
├── Backend/               # API y lógica del servidor
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── middleware/
└── README.md              # Documentación del proyecto
```

## Instalación y Ejecución

### Backend

1. Navega al directorio del backend:
   ```bash
   cd Backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno (crea un archivo `.env` en la raíz de Backend):
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/biblioteca_utn
   JWT_SECRET=tu_secreto_jwt
   ```

4. Ejecuta el servidor:
   ```bash
   npm start
   ```

### Frontend

1. Abre el archivo `Frontend/index.html` en tu navegador.

## Profesor

- David Tolosa

## Licencia

Este proyecto es de código cerrado y pertenece a la UTN FRTL.

---

**Hecho por Delfor Vicondo - Estudiante de Ingeniería en Sistemas**
