// Confirm script is running
console.log("IT’S ALIVE!");

// Utility function to select multiple elements
function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}
//
// // Add Theme Switcher Dropdown
// document.body.insertAdjacentHTML("afterbegin", `
//     <label class="color-scheme">
//         Theme:
//         <select id="theme-selector">
//             <option value="auto">Auto (System Default)</option>
//             <option value="dark">Dark Mode</option>
//             <option value="light">Light Mode</option>
//         </select>
//     </label>
// `);

// const themeSelect = document.querySelector("#theme-selector");

// // Function to update theme
// function updateTheme(theme) {
//     document.body.classList.remove("light-mode", "dark-mode");

//     if (theme === "dark") {
//         document.body.classList.add("dark-mode");
//     } else if (theme === "light") {
//         document.body.classList.add("light-mode");
//     } else {
//         // Auto mode (system preference)
//         if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//             document.body.classList.add("dark-mode");
//         } else {
//             document.body.classList.add("light-mode");
//         }
//     }

//     // Save theme to localStorage
//     localStorage.setItem("theme", theme);
// }

// // Change theme on dropdown selection
// themeSelect.addEventListener("change", function (event) {
//     updateTheme(event.target.value);
// });

// // Load saved theme or use system preference
// const savedTheme = localStorage.getItem("theme") || "auto";
// themeSelect.value = savedTheme;
// updateTheme(savedTheme);

// // Listen for system preference changes (Auto Mode)
// window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
//     if (localStorage.getItem("theme") === "auto") {
//         updateTheme("auto");
//     }
// });
///////Assignment4  Tableau Integration ///////
var divElement = document.getElementById('vizContainer');
var vizElement = divElement.getElementsByTagName('object')[0];
vizElement.style.width = '100%';
vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';

var scriptElement = document.createElement('script');
scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
vizElement.parentNode.insertBefore(scriptElement, vizElement);

//////////////////////////////////////////////////////////////////////////////////////////////////////
