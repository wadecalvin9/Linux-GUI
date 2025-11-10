## Web Desktop Environment (HTML , CSS, JavaScript)

A fully interactive desktop-like environment built in HTML, CSS, and JavaScript. It features draggable windows, a taskbar, blur effects, a start menu, and dynamic app launching. The UI design uses a modern, glass-blur aesthetic inspired by Kali Linux and Windows.

## Features
**1. Desktop**

- Fullscreen responsive desktop with background image

- Right-click context menu

- Click-to-hide context menu

- Click-outside to close start menu

**2. Taskbar**

- Dynamic icons generated when apps launch

- Icons match the app’s metadata (data-icon)

- Click icon to restore minimized windows

- Only one icon per app (prevents duplicates)

- Active icon highlight states

**3. Start Menu**

- Smooth fade/slide animation

- Fully toggleable

- Automatically closes when clicking outside

**4. Windows**

- Independent draggable windows

- Resizable in all directions

- Minimize, maximize, close buttons

- Restore from taskbar

- Increased z-index on focus

- Only one open window per app (using data-id)

- OS-style window maximizing animation

- Strong blur + glassmorphism effect

- System Behavior

- Automatically cascades windows (top/left offset increments)

- Context menu options

- Prevents background caret selection

- Desktop-level containment for all draggable windows


## Project Structure
```bash
/project
│── index.html
│── style.css
│── app.js
│── README.md
│── assets/
│     └── icons
│     └── wallpapers
```
##  How It Works
**App Buttons**
Each app launcher contains metadata:
```html
<button class="app"
        data-title ="browser"
        data-id="google"
        data-url="https://google.com"
        data-icon="fa-brands fa-chrome">
    Google
</button>
```
* data-id → unique ID to prevent duplicates

* data-url → window content

* data-icon → taskbar icon

* Clicking an app checks if it is already open.

* If open → window is brought forward

* If closed → window + taskbar icon are created

## Window Creation Logic

Windows are dynamically created:
```js
$win = $(`
  <div class="container" data-id="${appID}">
      <div class="tophandle">
          <i class="fa-solid fa-window-minimize"></i>
          <i class="fa-solid fa-window-maximize"></i>
          <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="content"></div>
  </div>
`).appendTo(".desktop");
```
**Features include:**

* Dragging via .tophandle

* Full resizable edges

* Independent z-index stacking

* Restore via taskbar

## Taskbar System

A matching taskbar icon is created on launch:

```js
$taskBtn = $(
  `<i class="${icon} task-btn" data-id="${appID}"></i>`
).appendTo(".left");

```
**Clicking restores the window**

* Closing the window removes the icon

* Only one taskbar icon per app

## Window Controls
Control	Behavior

|       Feature      |        Description           |
| :------------      | :----------------------------
|Minimize	     |Hides window, keeps taskbar icon|
|Maximize	     |Toggles fullscreen with animation|
|Close	             | Removes window and taskbar icon|

## Context Menu
Right-click on the desktop triggers:

```js
$(document).on("contextmenu", ".desktop", function (e) {
    e.preventDefault();
    $(".context").css({...}).show();
});
```

## Styling

- The UI uses a glass-blur aesthetic:

- backdrop-filter: blur(...)

- Translucent backgrounds

- Clean blue highlight accents

- Soft shadows

- Rounded window corners

- Smooth transitions for all animations

*Window maximize styling:*
```css
.container.maximize {
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    border-radius: 0 !important;
}


```
## Dependencies

1. jQuery
2. jQuery UI (draggable + resizable)
3. Font Awesome (icons)

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.13.3/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
```

## How to Run
1. Download or clone this repository.
2. Open index.html in a browser.
3. No build tools or servers needed.
4. Everything runs client-side.

## Customization
You can easily customize:

Wallpapers

- App list

- Taskbar icons

- Window titlebars

- Drag/resize behavior

- Context menu options

- Start menu contents
  
## License

MIT — Free to modify and use.





