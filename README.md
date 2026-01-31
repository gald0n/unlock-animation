# 🔒 Unlock Animation

This is a minimalist web project that simulates the lock screen interaction of an iPhone or iOS device, using HTML, CSS, and vanilla JavaScript (Vanilla JS).

## 🚀 Features

* **Dual Interaction:** Allows you to unlock the screen with a **click/tap** or a **swipe** gesture to the right (touch/mouse drag).

* **Touch Feedback:** Includes a slight vibration (if the device supports it) upon completion or failure of the unlock gesture.

* **CSS Transitions:** Uses CSS transforms and opacity to create a smooth sliding and fading effect when unlocking.

* **Simple Structure:** All the code resides in a single HTML file for easy demonstration.

## 🛠️ How It Works

1. The `#unlock-animation` element acts as an overlay layer.

2. The JavaScript detects `touchstart` and `touchmove` events to calculate the horizontal scrolling.

3. If the scrolling exceeds **35% of the screen width**, the unlock function is executed, which applies a transition to move the layer out of view and reveal the `#main-content`.

4. If the threshold is not reached, the element returns to its initial position with a bounce animation.
