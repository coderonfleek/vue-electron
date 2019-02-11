## How to Run the Application

1. Go into the root of the `api` folder and run `npm install`
2. Start the api server by running `node server`
3. Go into the `frontend` or `frontend2` folder and run `npm install`
4. To start the electron application run `npm run dev`
5. If the electron app throws an error relating to the `keytar` module, fix this by running `./node_modules/.bin/electron-rebuild` or `.\node_modules\.bin\electron-rebuild.cmd` on Windows the run `npm run dev` once again to start the application
