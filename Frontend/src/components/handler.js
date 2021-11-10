
export function openNav() {
    document.getElementById("mySidebar").style.width = "var(--sidebar-width)";
    document.getElementById("topbar").style.marginLeft = "var(--sidebar-width)";
    document.getElementById("contentpage").style.marginLeft = "var(--sidebar-width)";
}

export function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("topbar").style.marginLeft = "0";
    document.getElementById("contentpage").style.marginLeft = "0";
}