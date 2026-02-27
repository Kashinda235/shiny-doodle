# 🎮 Canvas Game — Controls Guide

This document describes the current player and camera controls implemented in the game.

---

## 🧍 Player Movement

| Keys           | Action            |
| ------------- | ----------------- |
| ⬆ (Arrow Up, W, Numpad 8) | Move player up    |
| ⬇ (Arrow Down, S, Numpad 2)  | Move player down  |
| ⬅ (Arrow Left, A, Numpad 4)  | Move player left  |
| ➡ (Arrow Right, D, Numpad 6) | Move player right |
| `+` (Equal key) | Zoom in  |
| `-` (Minus key) | Zoom out |
| Space bar     | Explosion shake |

> The player moves within the world while the **camera follows smoothly**.

---

## 🎥 Camera Controls

### Camera Follow

* The camera automatically follows the player.
* Movement uses **smooth interpolation** (no snapping).
* A **dead zone** allows small player movement without moving the camera immediately.

---

### 🔍 Camera Zoom

| Key             | Action   |
| --------------- | -------- |
| `+` (Equal key) | Zoom in  |
| `-` (Minus key) | Zoom out |

**Notes:**

* Zoom is smooth and interpolated.
* Zoom is centered on the viewport.
* World physics and player movement are unaffected by zoom.

---

### 💥 Camera Shake

(Camera shake is currently triggered programmatically.)

Used for:

* explosions
* impacts
* special events

Example trigger:

```js
camera.shake(duration, magnitude);
```

---

## 🌍 Camera Features Enabled

* ✅ Smooth camera follow
* ✅ Dead zone tracking
* ✅ World bounds clamping
* ✅ Camera shake
* ✅ Smooth zoom system

---

## 🧠 Coordinate System

The game uses **world coordinates**:

```
screen position = world position transformed by camera
```

Game objects are drawn using world positions only — the camera handles movement and zoom internally.

---

## 🚧 Planned Additions (Next)

* Mouse world interaction
* Parallax backgrounds
* Entity culling
* Mini-map system
* Camera transitions

---

Enjoy building! 🚀
