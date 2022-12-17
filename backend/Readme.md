### App deployment to internet:
Add a procfile with contents "web: node index.js"
Gitignore the node_modules
Install heroku
run "heroku create",
Initialize git in the backend - "git init"
The git add and git push heroku main.

#### Frontend production build
run "npm run build"
copy the generated build/dist file to backend
In the entry point of backend, app.use(express.static('biuld/dist'))

In package.json of backend, streamline deployment by adding these lines;
Replace build with dist where necessary

```json
"build:ui": "rm -rf build && cd ../frontend/ && npm run build && cp -r build ../backend",
"deploy": "git push heroku main",
"deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",    
"logs:prod": "heroku logs --tail"
```


### Validation of ESLint
1. install eslint as a dev dependency
2. initialize a default ESlint configuration with the command: "npx eslint --init"
3. Add lint to package.json "lint:eslint ."
4. add the build/dist to .eslintignore

### Testing the backend
1. run npm install --save-dev jest
2. add test to package .json "test:jest --verbose"
3. add below to package.json
```json
"jest": {
    "testEnvironment": "node",
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
}
```
4. If you run into jest error of "can't use import outside...."
5. Add a babel.config.json file with contents. ALso download the @babel/preset-env as a dev dep
```json
{
    "presets": ["@babel/preset-env"]
}
```
6. Add "jest:true" to eslint config file
