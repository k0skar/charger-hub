


function consoleToHTML() {
    var old = console.log;
    var logger = document.getElementById('console');


        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
}