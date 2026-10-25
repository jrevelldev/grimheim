# Rosterheim Local (Español)

Versión local, completamente funcional offline y traducida al castellano de **Rosterheim** (el gestor y creador de bandas para *Mordheim: La Ciudad de los Condenados*).

---

## 🚀 Cómo Iniciar la Aplicación

Tienes dos opciones muy sencillas para iniciar la aplicación:

### Opción 1: Doble Clic (Recomendada para Mac)
Haz **doble clic** sobre el archivo:
```
iniciar.command
```
Se abrirá automáticamente una ventana de Terminal y tu navegador habitual en `http://localhost:8080`.

### Opción 2: Desde el Terminal
Abre el Terminal en esta carpeta y ejecuta:
```bash
python3 -m http.server 8080
```
Y luego abre en tu navegador web: [http://localhost:8080](http://localhost:8080)

---

## 🛡️ Guardado y Privacidad 100% Offline

- **Sin servidores externos:** La aplicación no depende de Firebase ni de ninguna base de datos en la nube.
- **Guardado automático:** Todas tus bandas, guerreros, equipo, atributos y notas se guardan de forma instantánea en el `localStorage` de tu propio navegador web.
- **Copias de Seguridad (Exportar / Importar JSON):**
  - Puedes exportar cualquier banda individual haciendo clic en **Opciones > Exportar Banda (JSON)**.
  - Puedes exportar todas tus bandas a la vez con el botón **Exportar Todo** en la barra superior.
  - Puedes restaurar tus bandas en cualquier momento o llevarlas a otro ordenador usando el botón **Importar (JSON)**.

---

## ⚔️ Terminología Oficial de Games Workshop (Castellano)

Toda la aplicación ha sido adaptada al castellano siguiendo el reglamento oficial de Mordheim:

- **Atributos:**
  - **M**: Movimiento
  - **HA**: Habilidad de Armas *(WS)*
  - **HP**: Habilidad de Proyectiles *(BS)*
  - **F**: Fuerza *(S)*
  - **R**: Resistencia *(T)*
  - **H**: Heridas *(W)*
  - **I**: Iniciativa *(I)*
  - **A**: Ataques *(A)*
  - **L**: Liderazgo *(Ld)*
- **Moneda:** **CO** (Coronas de Oro, en lugar de *GC*).
- **Experiencia:** **PX** (Puntos de Experiencia, en lugar de *XP*).
- **Roles:**
  - Héroe
  - Secuaz
  - Espada de Alquiler
  - Personaje Ilustre
  - Vehículo
- **Bandas:**
  - Mercenarios de Reikland, Middenheim, Marienburgo, Ostermark
  - Cazadores de Brujas
  - Hermanas de Sigmar
  - No Muertos
  - Culto de los Poseídos
  - Skavens
  - Enanos Buscadores de Tesoros
  - Hombres Bestia
  - ¡Y todas las bandas suplementarias!
- **Herramientas de Campaña:**
  - **Creador e Impresión de Cartas de Guerreros**
  - **Secuencia del Turno y Modo Batalla interactivo**
  - **Resolución de Bajas y Reparto de Experiencia**
  - **Fase de Exploración de Tesoro y Venta de Piedra Bruja**
  - **Armería de la Banda y Libro Mayor de Ingresos/Gastos**
  - **Impresión de Hoja de Banda en PDF o papel**

---

¡Disfruta de tus campañas en las ruinas de Mordheim!
