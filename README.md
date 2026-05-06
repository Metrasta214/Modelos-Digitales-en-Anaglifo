# 🎯 Favicon + README + Disparidad Positiva

# ✅ 1. Agregar un favicon inspirado en el proyecto

La forma más sencilla y profesional es usar un favicon SVG.

---

## 📁 Estructura

```plaintext
proyecto-3d-anaglifo/
│
├── assets/
│   └── favicon.svg
```

---

# ✅ Crea el archivo:

## `assets/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">

  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>
  </defs>

  <rect width="64" height="64" rx="14" fill="#0f0f0f" />

  <circle cx="24" cy="32" r="12" fill="none" stroke="#ef4444" stroke-width="6" />

  <circle cx="40" cy="32" r="12" fill="none" stroke="#06b6d4" stroke-width="6" />

  <path d="M18 16 L32 8 L46 16"
        stroke="url(#grad)"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"/>

</svg>
```

---

# ✅ En tu `index.html`

Busca:

```html
<link rel="icon" href="data:," />
```

Y reemplázalo por:

```html
<link rel="icon" type="image/svg+xml" href="./assets/favicon.svg" />
```

---

---

# 🚀 2. README.md PROFESIONAL

Crea un archivo:

## `README.md`

````markdown
# 👓 Visor 3D Anaglifo FBX

Aplicación web interactiva desarrollada con **Three.js** para visualización de modelos FBX con soporte de:

- Animaciones Mixamo
- Renderizado estereoscópico Anaglifo
- Control mediante teclado
- Interfaz moderna estilo glassmorphism
- Visualización 3D interactiva

---

# 🎮 Controles

| Tecla | Acción              |
| ----- | ------------------- |
| 1     | Idle                |
| 2     | Fast Run            |
| 3     | Roundhouse Kick     |
| 4     | Double Leg Takedown |
| 5     | Jump                |
| Q     | Vista Normal        |
| E     | Vista Anaglifo      |

---

# 🖱️ Interacción

- Arrastrar → rotar cámara
- Scroll → zoom
- Lentes rojo/cian → experiencia estereoscópica

---

# 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6
- Three.js
- FBXLoader
- OrbitControls
- AnaglyphEffect
- Bootstrap 5

---

# 📁 Estructura del proyecto

```plaintext
proyecto-3d-anaglifo/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── main.js
│
├── assets/
│   ├── idle.fbx
│   ├── Fast Run.fbx
│   ├── Roundhouse Kick.fbx
│   ├── Double Leg Takedown - Attacker.fbx
│   ├── Jump.fbx
│   └── favicon.svg
```
````

---

# ▶️ Ejecución

Abrir el proyecto usando un servidor local:

## VSCode + Live Server

1. Instalar extensión Live Server
2. Abrir `index.html`
3. Ejecutar “Open with Live Server”

---

# 👨‍💻 Autor

**Álvaro Madrid Morales**
Instituto Tecnológico de Pachuca

````

---

---

# 👓 3. DISPARIDAD POSITIVA (EFECTO POP-OUT)

Actualmente tu anaglifo probablemente tiene una profundidad neutra.

Si quieres que el personaje parezca SALIR de la pantalla:

✅ debes generar disparidad positiva.

---

# ✅ CAMBIO MÁS IMPORTANTE

Busca esto en `main.js`:

```javascript
camera.position.set(0, 1.55, 3.2);
````

Y reemplázalo por:

```javascript
camera.position.set(0, 1.55, 2.2);
```

---

# ✅ AHORA AGREGA ESTO

Debajo de:

```javascript
const effect = new AnaglyphEffect(renderer);
```

Agrega:

```javascript
effect.eyeSep = 0.065;
```

---

# ✅ TAMBIÉN CAMBIA ESTO

Busca:

```javascript
controls.target.set(0, 1, 0);
```

Y reemplázalo por:

```javascript
controls.target.set(0, 1.15, -0.4);
```

---

# ✅ AGREGA PROFUNDIDAD EXTRA

Debajo de:

```javascript
scene.fog = new THREE.Fog(0x020617, 5, 20);
```

Agrega:

```javascript
camera.fov = 48;
camera.updateProjectionMatrix();
```

---

# 🔥 ¿Qué hará esto?

Ahora:

- el personaje se verá más cercano
- el anaglifo tendrá más separación estereoscópica
- el modelo parecerá salir de la pantalla
- habrá más sensación de profundidad
- el efecto 3D será MUCHO más intenso

Especialmente usando lentes rojo/cian.

---

# ⚠️ IMPORTANTE

No exageres el `eyeSep`.

Valores recomendados:

| Valor | Resultado               |
| ----- | ----------------------- |
| 0.03  | Suave                   |
| 0.05  | Medio                   |
| 0.065 | Fuerte                  |
| 0.08+ | Muy agresivo / incómodo |

El mejor balance suele ser:

```javascript
0.05 - 0.065;
```
