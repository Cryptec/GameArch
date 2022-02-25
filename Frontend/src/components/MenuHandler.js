import { logout } from '../utils'

const $ = require('jquery');
const { remote } = window.require('electron');
var mainWindow = remote.getCurrentWindow();
const { getCurrentWindow, globalShortcut } = window.require('electron').remote;

$(window).on("load", function () {
    console.log("loaded");

    $("#minimize").click(function () {
        console.log("minimize");
        mainWindow.minimize();
    });

    $("#maximize").click(function () {
        console.log("maximize");
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });

    $("#close").click(function () {
        console.log("close");
        mainWindow.close();
        logout();
    });

});

var reload = ()=>{
    getCurrentWindow().reload()
  }
  
  globalShortcut.register('F5', reload);
  globalShortcut.register('CommandOrControl+R', reload);
  // here is the fix bug #3778, if you know alternative ways, please write them
  window.addEventListener('beforeunload', ()=>{
    globalShortcut.unregister('F5', reload);
    globalShortcut.unregister('CommandOrControl+R', reload);
  })