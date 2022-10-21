
const signupFormHandler = async (event) => {
    event.preventDefault();
    
    const username= document.querySelector('#username-signup').value.trim();
    const password= document.querySelector('#password-signup').value.trim();
    
    if (username && password) {
        const response = await fetch('/api/user',{
            method:'post',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'}
        });
    
        if (response.ok) {
            document.location.replace('/dashboard');
            console.log("pressed signup");
        } else {
            alert(response.statusText);
        }
    }
    
    }


    
    const loginFormHandler = async (event) => {
        event.preventDefault();
        
        const username= document.querySelector('#username-login').value.trim();
        const password= document.querySelector('#password-login').value.trim();
        
        if (username && password) {
            const response = await fetch('/api/user/login',{
                method:'post',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json'}
            });
        
            if (response.ok) {
                document.location.replace('/dashboard');
                console.log("pressed login");
            } else {
                alert(response.statusText);
            }
        }
        
        }
       
        document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
        document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);