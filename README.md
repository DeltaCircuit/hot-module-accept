# hot-module-accept

This is a simple loader which will append the `module.accept()` to the bottom of the entry script of your project. So you don't have to worry about having a `module` statement in the production build.  

Works best with `webpack-dev-server`

## Getting Started
1. Install the package  
    ..  ..  `npm i hot-module-accept`
2. Modify your `webpack` config file  
    ```javascript  
    var config = {  
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
        ]
    }  
   ```  
   The loader will take process the `entry` in your webpack config.
    * If it's a string, then that alone will be your entry file.  
    * If it's an array of files, then the last item in that array will be your entry file.  
    * If it's a named entry and the value is a string, then it'll be the entry file.  
    * If it's an named entry and the value is an array, then the last item in that array will be your entry file.  
     
    Optionally, you can add an `entryPoint` field to your webpack config. The loader will treat it as the entry point. It should be a valid string

* Start hacking!
