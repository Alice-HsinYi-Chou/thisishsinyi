const icon = document.getElementById("icon__sun");
icon.onclick = function() {
    // Get the current theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Toggle between light and dark
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Set the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update the icon
    if (newTheme === 'light') {
        icon.src = "/assets/icons/dark mode.svg";
    } else {
        icon.src = "/assets/icons/bright mode2.svg";
    }
}