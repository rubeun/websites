
// https://www.zipcodeapi.com/rest/<api_key>/distance.<format>/<zip_code1>/<zip_code2>/<units>
// e.g. https://www.zipcodeapi.com/rest/<api_key>/distance.json/<zip_code1>/<zip_code2>/mile
//const ZIPCODE_API_KEY = "PNgC0ZjHD5xMaPRiUztcQgMTCER2i4iCluhG4G3ZzLtEihsDTt3tHsHdnBqeJamo";
const ZIPCODE_API_KEY = "js-vhc8tQ6JOessGeeijntHOD8UWoItMiW37DJZJyd1HnEGmKMFMFH5azr1Kdq8UEuT";

const $main = $('#main');
const $popup = $('#pop-up');

// ######## UTILITY FUNCTIONS #########

// ZIPCODES WITHIN X RADIUS OF ZIP
// Redline Zipcode API

// function zipcodesWithinRadius(zip, radius, done) {
//     let request = `https://redline-redline-zipcode.p.rapidapi.com/rest/radius.json/${zip}/${radius}/mile`;
//     fetch(request, {
//         headers: new Headers({
//           'X-RapidAPI-Host': 'redline-redline-zipcode.p.rapidapi.com',
//           'X-RapidAPI-Key': 'b5ca880ad9msh10e7da127791322p188a25jsn6fcdaf2018c7'
//         })
//     })
//         .then(function(response) {
//             //console.log(response);
//             return response.json();
//         }).then(function(data){
//             console.log(data.zip_codes);
//             done(data.zip_codes);
//         });
// }


// DISTANCE BETWEEN TWO ZIPCODES
function distanceBetweenZipcodes(zip1, zip2, done) {
    let request = `https://www.zipcodeapi.com/rest/${ZIPCODE_API_KEY}/distance.json/${zip1}/${zip2}/mile`;
    fetch(request)
        .then(function(response) {
            //console.log(response);
            return response.json();
        }).then(function(data){
            console.log(data.distance);
            done(data.distance);
        });
}

// NAME OF CITY
function nameOfCity(zip, done) {
    let request = `http://api.zippopotam.us/us/${zip}`;
    fetch(request)
        .then(function(response) {
            //console.log(response);
            return response.json();
        }).then(function(data){
            //console.log(`${data.places[0]['place name']}, ${data.places[0]['state abbreviation']}`);
            done(`${data.places['place name']}, ${data.places['state abbreviation']}`);
            //return `${data.city}, ${data.state}`;
        });
}

// PLAY AUDIO
function playAudio(mp3) {
    let newAudio = document.createElement("audio");
    newAudio.src = mp3;
    newAudio.id = "audio-player";
    newAudio.loop = true;  
    newAudio.volume = 0.1;
    newAudio.pause();
}

// CLEAR PAGE
function clearPage() {
    $main.html('');
}

// ####### DISPLAY POPUP FUNCTIONS ########
// DISPLAY REGISTRATION POPUP
function displayRegistrationPopup() {

    $popup.fadeOut(function(){
        $popup.removeClass('hidden').removeClass('loader').fadeIn(3000);
    });
    // registrationTemplate loaded from templates.js
    $popup.append(registrationTemplate);
    
}

// DISPLAY LOGIN POPUP
function displayLoginPopup() {
    $popup.fadeOut(function(){
        $popup.removeClass('hidden').removeClass('loader').fadeIn(3000);
    });
    // loginTemplate loaded from templates.js    
    $popup.append(loginTemplate);
}

// CLOSE POPUP
function closePopUp() {
    $popup.fadeOut(function(){
        $popup.addClass('hidden').addClass('loader').fadeIn();
        $popup.html('');
    });          
}

// ####### DISPLAY PAGE FUNCTIONS #######
// DISPLAY HOME PAGE
function displayHomePage() {
    $main.fadeOut(function(){
        $main.html(homePageDisplayTemplate);
    });
    $main.fadeIn("slow");
}

// DISPLAY USER PAGE
function displayUserPage(userName, userDB) {

    // TODO - temporarily put here
    displayLoggedInNav();

    $main.fadeOut(function(){
        $main.html(userPageDisplayTemplate);
        
        userDB.on("value", function(snapshot){
            users = snapshot.val();
    
            // loop through all users until username matches, update page with info
            for (let key in users) {
                if(users[key].username === userName) {
                    let interestsString = "";
                    // update global object currentUserInfo & currentUserKey to be for this user 
                    currentUserInfo = users[key];
                    currentUserKey = key;
                    console.log("@displayUserPage Found user ", userName);
                    $('#user-username').html(users[key].username);
                    $('#user-first-name').html(users[key].firstname);
                    $('#user-last-name').html(users[key].lastname);
                    $('#user-gender').html(users[key].gender);
                    $('#user-zipcode').html(users[key].zipcode);
                    $('#user-password').html(users[key].password);
                    $('#user-search-gender').html(users[key].searchGender);
                    $('#user-search-radius').html(users[key].searchradius);
                
                    nameOfCity(users[key].zipcode, function(cityName){
                        $('#user-city').html(cityName);
                    })
                    if (users[key].interests) {
                        users[key].interests.forEach(function(interest){
                            interestsString = interest + "<br /> " + interestsString;
                        });    
                    }

                    $('#user-interests').html("<br />" + interestsString);
                    
                    // user message in header
                    $('#user-message').html(`Welcome ${users[key].firstname}`);

                    return true;
                }
            }
            console.log("displayUserPage User not found ", userName);
            return false;
        });

    });
    $main.fadeIn("slow");
}

// DISPLAY EDIT USER PAGE - TODO - clean this hacked together code up
function displayEditUserPage(username, userDB) {
    clearPage();
    $main.html(userPageEditTemplate);
    $('#edit-username').html(currentUserInfo.username);
    $('#edit-first-name').attr('placeholder', currentUserInfo.firstname);
    $('#edit-last-name').attr('placeholder', currentUserInfo.lastname);
    if (currentUserInfo.gender === "male") {
        $('#edit-gender option[value="male"]').prop('selected', true);
    } else if (currentUserInfo.gender === "female") {
        $('#edit-gender option[value="female"]').prop('selected', true);
    } else if (currentUserInfo.gender === "other") {
        $('#edit-gender option[value="other"]').prop('selected', true);
    }
    if (currentUserInfo.searchradius === "5") {
        $('#edit-radius option[value="5"]').prop('selected', true);
    } else if (currentUserInfo.searchradius === "10") { 
        $('#edit-radius option[value="10"]').prop('selected', true);
    } else if (currentUserInfo.searchradius === "20") {
        $('#edit-radius option[value="20"]').prop('selected', true);
    } else if (currentUserInfo.searchradius === "50") {
        $('#edit-radius option[value="50"]').prop('selected', true);
    }

    if (currentUserInfo.searchGender === "male") {
        $('#edit-search-gender option[value="male"]').prop('selected', true);
    } else if (currentUserInfo.searchGender === "female") {
        $('#edit-search-gender option[value="female"]').prop('selected', true);
    } else if (currentUserInfo.searchGender === "other") {
        $('#edit-search-gender option[value="other"]').prop('selected', true);
    } else if (currentUserInfo.searchGender === "all") {
        $('#edit-search-gender option[value="all"]').prop('selected', true);
    }

    currentUserInfo.interests.forEach(function(interest){
        console.log("Interest:", interest);
        $('input[name="interests"][value="' + interest + '"]').prop("checked", true);
    }); 

    $('#edit-zipcode').attr('value', currentUserInfo.zipcode);
    $('#edit-zipcode').attr('value', '');
    $('#edit-zipcode').attr('placeholder', currentUserInfo.zipcode);
    $('#edit-password').attr('placeholder', currentUserInfo.password);

    console.log("@displayEditUserPage username:", username);

}

// DISPLAY USER MATCHES
function displayUserMatches(userDB) {
    clearPage();
    $main.html(matchesPageTemplate);
    let matchesString = "";

    // call findMatches function to return all matches in DB
    findMatches(currentUserInfo.zipcode, currentUserInfo.searchradius, currentUserInfo.gender, currentUserInfo.searchGender, userDB, function(matches){
        console.log("@findMatches Got a match:", matches);
        matches.forEach(function(match){
            console.log("@findMatches Match:", match);
            matchesString += `<li><p>${match.firstname}</p><p>Distance from you: ${match.distance} miles</p><p>Music interests: `;
            match.interests.forEach(function(interest){
                matchesString += `${interest} `;
            });
            matchesString += `</p></li>`;
        });
        console.log("@findMatches All matches: ", matchesString);
        $('#user-matches-list').html(matchesString);
                            
    });
    
}



// ####### DISPLAY NAV FUNCTIONS #######
// DISPLAY LOGGED OUT NAV
function displayLoggedOutNav() {
    $('#user-nav').html(loggedOutNav);
    $('#user-message').html("Please Sign In &rarr;");
    $('#user-message').addClass('blink');    
}

// DISPLAY LOGGED IN NAV
function displayLoggedInNav() {
    $('#user-nav').html(loggedInNav);
    $('#user-message').removeClass('blink');
}


// ####### USER FUNCTIONS #######
// DOES USERNAME EXIST
function doesUsernameExist(username, userDB) {

    userDB.on("value", function(snapshot){
        users = snapshot.val();

        // loop through and output all foods
        for (let key in users) {
            if(users[key].username === username) {
                console.log("Found user ", username);
                return true;
            }
        }
    });
    console.log("User not found ", username);
    return false;
}

// CHECK PASSWORD
function checkPassword(username, password, userDB, done) {
    console.log("@checkPassword Checking password");
    userDB.on("value", function(snapshot){
        users = snapshot.val();

        // loop through all users until username matches, when found check if password matches
        for (let key in users) {
            if(users[key].username === username) {
                console.log("@checkPassword Found user ", username);
                if (users[key].password === password) {
                    console.log("@checkPassword Password correct for ", username);
                    //return true;
                    done(true);
                } else {
                    console.log("@checkPassword Password incorrect for ", username);
                    //return false;
                    done(false);
                }
            }
        }
        console.log("@checkPassword User not found ", username);
        //return false;
        done(false);
    });
}

// REGISTER USER
function registerUser(userDB, usernameDB) {
    let userName = $('#register-username').val();
    let firstName = $('#register-first-name').val();
    let lastName = $('#register-last-name').val();
    let gender = $('#register-gender').val();
    let zipcode = parseInt($('#register-zipcode').val());
    let password = $('#register-password').val();
    //console.log(userName + ',' + firstName + ' ' + lastName + ', ' + gender + ', ' + zipcode + ', pass:' + password);

    // If username is available, create new user with username
    if (!doesUsernameExist(userName, userDB)) {
        let newUser = {
            username: userName,
            firstname: firstName,
            lastname: lastName,
            gender: gender,
            zipcode: zipcode,
            password: password,
            interests: [],
            searchradius: 5,
            searchGender: 'all'
        };
        userDB.push(newUser);
        $('#register-status').html("Success, " + userName + " has been registered");
        console.log("@registerUser New User Added: ", userName);
        closePopUp();
        displayUserPage(userName, userDB);
    } else {
        console.log("@registerUser Username taken: ", userName);
        $('#register-status').html("Username " + userName + " is not availabe, please choose another username");
    }

}

// LOGIN USER 
function loginUser(userDB) {
    let username = $('#login-username').val();
    let password = $('#login-password').val();
    
    // calls checkPassword and waits for callback result
    checkPassword(username, password, userDB, function(result){
        if (result) {
            console.log("@loginUser Logged In ", username);
            closePopUp();
            displayUserPage(username, userDB);
        } else {
            console.log("@loginUser Wrong password for "+ username + ":" + password);
        }

    });

}

// LOG OUT USER - TODO - Only clears globals, should use sessionstorage
function logOutUser() {
    currentUserInfo = {};
    currentUserKey = "";
    displayLoggedOutNav();
    displayHomePage();
}

// SAVE USER INFO
function saveUserInfo(userDB) {
    let firstname = $('#edit-first-name').val() !== "" ? $('#edit-first-name').val() : currentUserInfo.firstname;
    let lastname = $('#edit-last-name').val() !== "" ? $('#edit-last-name').val() : currentUserInfo.lastname;
    let gender = $('#edit-gender').val();
    let searchgender = $('#edit-search-gender').val();
    let searchradius = $('#edit-radius').val();
    let interests = [];
    let zipcode = $('#edit-zipcode').val() !== "" ? $('#edit-zipcode').val() : currentUserInfo.zipcode;
    let password = $('#edit-password').val() !== "" ? $('#edit-password').val() : currentUserInfo.password;

    $('input:checkbox[name="interests"]:checked').each(function(){
        interests.push($(this).val());
    });

    let updatedUserInfo = {
        username: currentUserInfo.username,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        zipcode: zipcode,
        password: password,
        interests: interests,
        searchradius: searchradius,
        searchGender: searchgender
    }

    userDB.child(currentUserKey).update(updatedUserInfo);
    $('#edit-status').html("User info has been updated successfully");
    displayUserPage(currentUserInfo.username, userDB);
}

// FIND MATCHES
function findMatches(userZip, searchRadius, userGender, searchGender, userDB, done) {
    let matches = [];
    userDB.on("value", function(snapshot){
        users = snapshot.val();

        // loop through all users until username matches, when found check if password matches
        for (let key in users) {
            if ((users[key].gender === searchGender) && (users[key].searchGender === userGender)) {
                console.log("@findMatches Matched gender with user:", users[key].username);
                distanceBetweenZipcodes(userZip, users[key].zipcode, function(distance){
                    if (distance <= searchRadius) {
                        let matchingUser = {
                            username: users[key].username,
                            firstname: users[key].firstname,
                            gender: users[key].gender,
                            zipcode: users[key].zipcode,
                            interests: users[key].interests,
                            distance: distance                
                        };
                        matches.push(matchingUser);
                    } 

                }); 
            }
        }
        console.log("@findMatches Matches:", matches);
        done(matches);
    });

}




/* ####### On DOM Ready ####### */
$(document).ready(function(){
    const userDB = firebase.database().ref("users");
    const usernameDB = firebase.database().ref("usernames");

    // define current user
    let currentUserInfo = {};
    let currentUserKey = "";

    // Load Default Nav and Page
    displayLoggedOutNav();
    displayHomePage();

    // Click Handlers for Nav
    $('#user-nav').on('click', '.nav-button', function(e){
        e.preventDefault();
        if (this.id === 'user-register') {
            displayRegistrationPopup();    
        } else if (this.id === 'user-signin') {
            displayLoginPopup();
        } else if (this.id === 'user-signout') {
            logOutUser();
        } else if (this.id === 'user-matches') {
            displayUserMatches(userDB);
        } else if (this.id === 'user-page') {
            displayUserPage(currentUserInfo.username, userDB);
        } else {
          console.log("Invalid Navigation Choice");
        }
    });

    // Close Popup
    $popup.on('click', '.closePopUp', function(e){
        e.preventDefault();
        closePopUp();
    });

    // Submit Buttons
    $popup.on('click', '#submit-registration', function(e){
        e.preventDefault();
        registerUser(userDB, usernameDB);
    });

    $popup.on('click', '#submit-login', function(e){
        e.preventDefault();
        loginUser(userDB);
    });

    $main.on('click', '#submit-edit', function(e){
        e.preventDefault();
        let username = $('#user-username').html();
        displayEditUserPage(username, userDB);
    });

    $main.on('click', '#submit-save', function(e){
        e.preventDefault();
        saveUserInfo(userDB);
    });
    

    // Audio Player
    // let mp3Track = "media/Pan-Pot - Sleepless (Stephan Bodzin Remix).mp3";
    // playAudio(mp3Track);
    // let mp3Audio = $('#audio-player');
    // mp3Audio.volume = 0.1;

});