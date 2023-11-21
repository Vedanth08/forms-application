let formContainerel = document.getElementById('formContainer');

let nameInputel = document.getElementById('nameInput');

let nameContainerel = document.getElementById('nameContainer');

let mailContainerel = document.getElementById('mailContainer');

let emailInputel = document.getElementById('emailInput');

let workStatusel = document.getElementById('workingstatusSelect');

let maleInputel = document.getElementById('maleInput');

let femaleInputel = document.getElementById('femaleInput');

let formsubmitButton = document.getElementById('submitButton');

let formData = {
    name : "",
    email: "",
    status: "Active",
    gender : "Male"
};


function nameformvalidation(event){

    if( nameInputel.value === ""){

        nameErrormessage.textContent = '*Required';

    }

    else{

        nameErrormessage.textContent = '';
    };

    formData.name  = event.target.value;

};


function mailformvalidation(event){

    if ( emailInputel.value === ""){

        mailErrormessage.textContent = '*Required';

    }

    else{
      
        mailErrormessage.textContent = '';

    };

    formData.email = event.target.value;

};

nameInputel.addEventListener('blur',nameformvalidation);

emailInputel.addEventListener('blur',mailformvalidation);


function workstatusChange(event){

    formData.status = event.target.value;
    
}

workStatusel.addEventListener('change', workstatusChange);


function malestatusChange(event){

    if(event.target.value === 'on');{

        formData.gender = "Male";

    }

}

maleInputel.addEventListener('change',malestatusChange);


function femalestatusChange(event){

    if(event.target.value === 'on'){

        formData.gender = "Female";

    }
    formData.gender = event.target.value;

};

femaleInputel.addEventListener('change',femalestatusChange);


function submitformData(formData){

    console.log(formData);

    let options = {
        method : 'POST',
        headers : {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 5dd433f80efb4f5afa3667ff269f4da658b20661aa3cf58f0d0b36b627952d8d",
        },

        body: JSON.stringify(formData)
    }

    let url = "https://gorest.co.in/public-api/users";

    fetch(url,options)
    .then(function(response){

        return response.json();
        
    })
    .then(function(jsonData){

        if(jsonData.code === 422){

            if(jsonData.data[0].message === "has already been taken"){

                mailErrormessage.textContent = "Email has already been taken";

            }
        }
    });

};


function formSubmission(event){

    event.preventDefault();

    submitformData(formData);

};

formContainerel.addEventListener('submit', formSubmission);  
