## How to use project
Server is running on port 3000
Link: http://localhost:3000
Filename image only endwith extension: jpg | jpeg | png

### Scripts for running project
- ```npm install``` -> Install dependencies from package.json
- ```npm run build``` -> Complie typescript to javascript
- ```npm run test``` -> Complie code and run unit tests


### Endpoint to process images

#### 1. Display hint how to get endpoint to resize image
http://localhost:3000

#### 2. Display hint how to pass image in query segment
http://localhost:3000/api/images

Pass available filenames are: 
- ace-sabo-luffy.jpg
- luffy-funny.jpg
- monkeyDLuffy.jpg
- songoku.png

#### 3. Get orginal image by passing filename in query segment
http://localhost:3000/api/images?filename=songoku.png

#### 4. Resize image by passing width and height in query segment
http://localhost:3000/api/images?filename=songoku.png&width=50&height=50

#### 5. Show missing param in query segment
http://localhost:3000/api/images?filename=songoku.png&width=50
http://localhost:3000/api/images?filename=songoku.png&height=50