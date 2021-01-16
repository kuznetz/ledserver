# ledserver
Led Server for Raspberry Pi for matrix 12x12 made from neopixel led strip

Common operation (before):
- cd led-server
- npm i
- npm start

Run dev web server (http://localhost:8080/) on any platform:
- cd browser
- npm i
- npm start

Prod server on Raspberry Pi OS from root:
- cd rpi
- npm i --unsafe-perm
- npm run build
- npm start

You may copy rpi/led-server.service to /etc/systemd/system to autostart server
