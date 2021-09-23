
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

export function showMd() {
    document.getElementById("mdEditor").style.display = "var(--display-true)";
    document.getElementById("markdownPress").style.display = "none";
    document.getElementById("back").style.display = "flex";}

export function hideMd() {
    document.getElementById("mdEditor").style.display = "none";
    document.getElementById("markdownPress").style.display = "flex";
    document.getElementById("back").style.display = "none";
}