How to run server/Client  
Server:  
>1. npm install
>2. Ensure your server port is opened in your router settings IE: Portforwarding
>3. npm run dev

Client:  
>1. npm install
>2. Edit line 9 of Index.html to have your Server IP/PORT configuration   
>    ```html
>       <script src="http://IPADDRESS:PORT/socket.io/socket.io.js"></script>
>    ``` 
>3. npm run start  
>4. http://localhost:1234  

