

let menuEl=document.getElementById("headmenu");

let logInFormEl =document.getElementById("logInForm")

let flagForm=document.getElementById("flagForm")

let registerForm=document.getElementById("registerForm")



//Saker som sker när sidan startas
window.onload=init;

function init() {
    changeMenu()
    let flaggor=document.getElementById("flaggor")
    if(flaggor) {
    getFlags()}
     

    if(logInFormEl) {
        logInFormEl.addEventListener("submit", loginUser)}
      
    if(flagForm) {
      document.getElementById("addFlag").addEventListener("click", createFlag); 
       }
   
       

   
    }
document.getElementById("submits").addEventListener("click", createUser);  

    //Function som visar meny beroende på om man har ett tokan eller inte
function changeMenu(){

   
    if(localStorage.getItem("user_token")) {
        menuEl.innerHTML= `
            <li class="liheadmenu"><a href="index.html">Startsida</a></li>       
            <li class="liheadmenu"><a href="secretPage.html">secret</a></li>
            <li class="liheadmenu"><button id="logoutButton">Logga ut</button></li>`

    } else { 
        
           menuEl.innerHTML= `
                <li class="liheadmenu"><a href="index.html">Startsida</a></li>
                <li class="liheadmenu"><a href="register.html">Registrera dig</a></li>
                <li class="liheadmenu"><a href="loggaIn.html">Logga in</a></li>`

           
    }

    //Logoutbutton som tar bort token om man loggar ut. 
    let logoutButton= document.getElementById("logoutButton");
    if(logoutButton) {
        logoutButton.addEventListener("click", ()=> {
            localStorage.removeItem("user_token");
            window.location.href="loggaIn.html"

        })
    }
}

//Funktion för att kunna logga in en användare
async function loginUser(e) {
    e.preventDefault();
        let userEl=document.getElementById("username").value;
        let passwordEl=document.getElementById("password").value;

       if(!userEl||!passwordEl)  {
        console.log("fyll i allt");
        return;
        
       }

       let user = {
        username: userEl,
        password: passwordEl
       }

       try {

        const resp = await fetch("http://127.0.0.1:3001/api/login", {
            method: "POST", 
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })

        if(resp.ok) {
            const data = await resp.json();
            // console.log(data);
            localStorage.setItem("user_token", data.response.token);//Sparar token i localstoraage
            window.location.href= "secretPage.html"
            console.log(data.response.token);
            
            
        } else {
            throw error;
        }
       }catch (error) {
        console.log("Fel anv eller lösenro");
        
       }
 
}



        //Funktion som skapar en användare
      async function createUser (e){
           e.preventDefault();
            let usernameEl=document.getElementById("username")
            let emailEl=document.getElementById("email")
            let passwordEl=document.getElementById("password")

            let username=usernameEl.value
            let email=emailEl.value
            let password=passwordEl.value

            let user = {  
            username: username,
            email: email,
            password:password
            }

            const response = await fetch ("http://127.0.0.1:3001/api/register", {
                method: "POST",
                headers: {
                    "content-type": "Application/json"
                },
                body: JSON.stringify(user)
            })
            const data= await response.json();
            console.log(data);
            
        }


          
        //Funtion som skapar en flagga
      async function createFlag (e){

            e.preventDefault();
            let countryEl=document.getElementById("country")
            let colorsEl=document.getElementById("colors")
     

            let country=countryEl.value
            let colors=colorsEl.value
        

            let flag = {  
            country: country,
            colors: colors,
            }
            const token = localStorage.getItem("user_token")

            try {const response = await fetch ("http://127.0.0.1:3001/api/flags", {
                method: "POST",
                headers: {
                    "content-type": "Application/json",
                    "authorization":"Bearer " + token
                },
                body: JSON.stringify(flag)
            })

            if(response.ok) {
            const data= await response.json();
            console.log(data);
            
        
        } }catch(error) {

            console.log("går ej att lägga till flagga" +error);
            
        }
    }

    //Funktion som hämtar flaggorna ifrån REST-API
        async function getFlags (){

       
            try {const response = await fetch ("http://127.0.0.1:3001/api/flags")
                if(response.ok) {
                const data= await response.json();
                console.log(data);

                displayFlags(data) }} catch {
                console.log("fel");
                
            } }


        async function displayFlags (data) {
            let flags = document.getElementById("flaggor")
            flags.innerHTML="";


            data.forEach(flag => {
            let newElLi= document.createElement ("li")      //Skapar nytt element (li)
            let newText=document.createTextNode (flag.country+ " " + flag.colors ) //Skapar texten till det som visas i listan
             //newElLi.setAttribute('id', flag.id) //Skapar attributet id
            newElLi.appendChild(newText) //Lägger newText som "barn" till newElLi
            flags.appendChild(newElLi) // Lägger newElLi som "barn" till expEl
    }) } 



