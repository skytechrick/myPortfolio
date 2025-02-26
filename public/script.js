const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
    themeToggle.querySelector('i').classList.toggle('fa-moon');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Form submission prevented!");


    const name = document.getElementById("name").value;
    if(name.length < 3){
        alert("Enter a valid name.");
        return;
    };


    let mobileNumber = document.getElementById("mobileNumber").value;
    if(mobileNumber.length !== 10){
        if(mobileNumber.length < 1){
            mobileNumber = undefined;
        }else{
            alert("Enter a valid mobile number or if you are not going enter mobile number leave empty.");
            return;
        }
    }


    const email = document.getElementById("email").value;
    if(email.length < 3){
        alert("Enter a valid Email.");
        return;
    }



    const reason = document.getElementById("reason").value;
    if(reason.length < 3){
        alert("Reason must be atleast 3 characters.");
        return;
    };

    if(reason.length > 90){
        alert("Reason cannot be more than 90 characters.");
        return;
    };




    const message = document.getElementById("message").value;
    if(message.length < 3){
        alert("Message must be atleast 3 characters.");
        return;
    }
    if(message.length > 1000){
        alert("Message cannot be more than 1000 characters.");
        return;
    };



    const data = {
        name,
        mobileNumber,
        email,
        type: reason,
        message
    };
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("Loading").style.display = "flex";

    const response = await fetch('/api/response',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),

    });

    const responsedata = await response.json();
    
    document.getElementById("Loading").style.display = "none";
    document.getElementById("submitBtn").disabled = false;
    if(responsedata.status === "success"){
        document.getElementById("contact-form").reset();
        setTimeout(() => {
            alert("Thank you for your response, we will get back to you soon.");
        }, 500);
    }else{;
        alert(responsedata.message);
    }
});