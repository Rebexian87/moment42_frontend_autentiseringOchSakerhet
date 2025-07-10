

let menuEl=document.getElementById("headmenu");

let logInFormEl =document.getElementById("logInForm")

window.onload=init;

function init() {
    changeMenu()

    if(logInFormEl) {
        logInFormEl.addEventListener("submit", loginUser)
    }
}


function changeMenu(){

    // localStorage.setItem("user_token", "testtest")

    if(localStorage.getItem("user_token")) {
        menuEl.innerHTML= `
           <li class="liheadmenu"><a href="register.html">Startsida</a></li>
            
            <li class="liheadmenu"><a href="secretPage.html">secret</a></li>
            <li class="liheadmenu"><button id="logoutButton">Logga ut</button></li>
        
        `

    } else { 
        
           menuEl.innerHTML= `
           <li class="liheadmenu"><a href="register.html">Startsida</a></li>
           
               <li class="liheadmenu"><a href="loggaIn.html">Logga in</a></li>
        
        `
    }

    let logoutButton= document.getElementById("logoutButton");
    if(logoutButton) {
        logoutButton.addEventListener("click", ()=> {
            localStorage.removeItem("user_token");
            window.location.href="loggaIn.html"

        })
    }
}

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
            localStorage.setItem("user_token", data.token);
            window.location.href= "secretPage.html"
            
        } else {
            throw error;
        }
       }catch (error) {
        console.log("Fel anv eller lösenro");
        
       }
 
}


 document.getElementById("submits").addEventListener("click", createUser); 

      async function createUser (username,  email, password){
            let usernameEl=document.getElementById("username")
            let emailEl=document.getElementById("email")
            let passwordEl=document.getElementById("password")

            username=usernameEl.value
            email=emailEl.value
            password=passwordEl.value

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


