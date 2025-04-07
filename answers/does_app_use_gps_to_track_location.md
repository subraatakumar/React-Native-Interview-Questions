

## 📡 Does `watchPositionAsync` use GPS?

### ✅ Yes — **it can use GPS**, but also:
It uses the **best available location provider**, which may include:
- **GPS (Global Positioning System)** – most accurate, especially outdoors.
- **Wi-Fi** – useful indoors or in urban areas.
- **Cellular networks** – less accurate but helps when GPS is weak.
- **Bluetooth (on some platforms)** – used in special cases (like BLE beacons).

The actual source depends on:
- Your device
- What location services are enabled
- What **accuracy level** you request

---

### 🧭 Accuracy Levels and GPS

When you set `accuracy`, you're telling the system *how accurate* you want the location to be — and indirectly *whether to use GPS*:

| Accuracy Level | Constant | Uses GPS? | Description |
|----------------|----------|-----------|-------------|
| Low            | `Location.Accuracy.Low` | ❌ | Fast and low power, may use Wi-Fi or cell |
| Balanced       | `Location.Accuracy.Balanced` | ⚠️ | Decent accuracy with low battery use |
| High           | `Location.Accuracy.High` | ✅ | Will use GPS if available |
| BestForNavigation | `Location.Accuracy.BestForNavigation` | ✅✅ | Most precise (like for turn-by-turn navigation) |

So, if you want GPS-quality precision, set:

```js
accuracy: Location.Accuracy.High
```

---

### ⚡ Battery Usage

- GPS is **power-hungry**, especially if you request frequent updates.
- Use high accuracy **only when needed** (e.g., during tracking).
- Turn off the watcher with `.remove()` when done to save battery.

---

### 📱 Summary

| Question                         | Answer                    |
|----------------------------------|---------------------------|
| Does it use GPS?                | ✅ Yes, if needed         |
| Can I force GPS only?           | ❌ Not directly, but high accuracy will use GPS if possible |
| Is it always GPS?               | ❌ No, it may use Wi-Fi/cell for efficiency |
| Does accuracy affect GPS use?   | ✅ Yes, higher accuracy → more chance of using GPS |

---
