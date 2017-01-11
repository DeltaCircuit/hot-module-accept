# hot-module-accept

This is a simple loader which will append the `module.accept()` to the bottom of the entry script of your project. So you don't have to worry about having a `module` statement in the production build.

## Getting Started
* Install the package  
   `npm i hot-module-accept`
* Modify your `webpack` config file  
```javascript  
var config = {  
    entryPoint: './src/index.js' //This will be your app's main entry point  
    // Also add 'hot-module-accept' to your existing JS/JSX loaders. 
    //For Example:
    loaders: [
        {
            test: /\.(js|jsx)$/,  
            loaders: [  
                'babel' //Not necessary for this loader
                'hot-module-accept'
            ]  
        }        
}  
```  
* Start hacking!
