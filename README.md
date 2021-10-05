# KnowledgeHub

 ## Group Number - 53
 
 ## Group Members 
 
 #####   18000738      L.D.L.S. Jayasinghe
 #####   18000614      R.M.D.S. Harischandra
 #####   18001513      G.R.N. Sankalani
 #####   18020712      P.R.S.T. Sandeepani
 #####   18020722      G.T.S. Sathindra


## Configure the FrontEnd

 ### Step 01
   #### Clone the frontend from Github.
   #### Open the command line or terminal and execute the below command.
    $ git clone https://github.com/project3ucsc/frontend.git 

 ### Step 02
   #### Go to the frontend folder
    $ cd frontend
    
### Step 03
  #### To install dependencies 
    $ npm install
    
### Step 04
  #### If you running the backend server locally no need to do this step.Because by default frontend sends HTTP requests to ‘localhost:3001’.

  #### If you running the backend server in a different host, You need to change the value of apiurl constant in ‘/src/utils/common.js’ file

### Step 05:
  #### Then to run the development build
    $ npm start
    
  ## To run the production build:

  ### Step 05.1
   #### To create an optimized build of the app in the build folder
    $ npm run build

### Step 05.2
  #### To run this build you need ‘serve’. To install it,
    $ npm i serve 

### Step 05.3
  #### To run the production build
    $ serve -s build








