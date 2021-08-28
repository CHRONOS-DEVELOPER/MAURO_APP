const { app, BrowserWindow, Tray } = require('electron');
app.setAppUserModelId('com.chronosdev.appbiblioteca');

function createWindow() {
    const appIcon = new Tray(__dirname + '/icons/home_icon.png');
    var mainWindow = new BrowserWindow({
        width: 1024,
        height: 820,
        show: false,
        icon: __dirname + '/icons/home_icon.png'
    });
    mainWindow.loadFile(__dirname + '/src/welcome.html');
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    //mainWindow.setMenu(null);
}
app.on('ready', createWindow);