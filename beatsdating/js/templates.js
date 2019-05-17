// NAV TEMPLATES
let loggedOutNav = `
    <li><a id="user-register" class="nav-button" href="#">Register</a></li>
    <li><a id="user-signin" class="nav-button" href="#">Sign In</a></li>
`;

let loggedInNav = `
    <li><a id="user-page" class="nav-button" href="#">User Info</a></li>
    <li><a id="user-matches" class="nav-button" href="#">Your Matches</a></li>
    <li><a id="user-signout" class="nav-button" href="#">Sign Out</a></li>
`;


// POPUP TEMPLATES
let registrationTemplate = `
    <a href="#" class="closePopUp">X</a>
    <div class="container">
        <h3>Register New User</h3>
        <p><label for="register-username">Username: </label><input id="register-username" type="text" name="username" placeholder="Username"></p>
        <p><label for="register-first-name">First Name: </label><input id="register-first-name" type="text" name="first-name" value="" placeholder="First Name"></p>
        <p><label for="register-last-name">Last Name: </label><input id="register-last-name" type="text" name="last-name" value="" placeholder="Last Name"></p>
        <p><label for="register-gender">Gender: </label><select id="register-gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </p>
        <p><label for="register-zipcode">Zipcode: </label><input id="register-zipcode" type="text" name="zipcode" placeholder="Zipcode" maxlength="5"></p>
        <p><label for="register-password">Password: </label><input id="register-password" name="password" type="password"></p>
        <p><input id="submit-registration" type="submit" value="Register"></p>
        <p><span id="register-status"></span></p>
    </div>
`;

let loginTemplate = `
    <a href="#" class="closePopUp">X</a>
    <div class="container">
        <h3>Login User</h3>
        <p><label for="login-username">Username: </label><input id="login-username" type="text" name="login-username" value="" placeholder="Username"></p>
        <p><label for="login-password">Password: </label><input id="login-password" type="password" name="login-password" value="" placeholder="Password"></p>
        <p><input id="submit-login" type="submit" value="Login"></p>
        <p><span id="login-status"></span></p>
    </div>
`;

// PAGE TEMPLATES
let homePageDisplayTemplate = `
    <div class="home-page">
        <h3>Beats Dating</h3>
        <h4>The Dating Site for the Electronic Dance Music Community</h4>
        <p>Find single people around you with shared musical tastes</p>
    </div>
`;


let userPageDisplayTemplate = `
    <div class="home-page">
        <h3>User Details</h3>
        <p>Username: <span id="user-username"></span></p>
        <p>First Name: <span id="user-first-name"></span></p>
        <p>Last Name: <span id="user-last-name"></span></p>
        <p>Gender: <span id="user-gender"></span></p>
        <p>Zipcode: <span id="user-zipcode"></span> (<span id="user-city"></span>)</p>
        <p>Password: <span id="user-password"></span></p>
        <p>Search Gender: <span id="user-search-gender"></span></p>
        <p>Search Radius: <span id="user-search-radius"></span> Miles</p>
        <p>Interests: <span id="user-interests"></span></p>
        <p><input id="submit-edit" type="submit" value="Edit"></p>
    </div>        
`;

let userPageEditTemplate = `
    <div class="home-page">
        <h3>Edit User Details</h3>
        <p>Username: <span id="edit-username"></span></p>
        <p><label for="edit-first-name">First Name: </label><input id="edit-first-name" type="text" name="first-name" value="" placeholder=""></p>
        <p><label for="edit-last-name">Last Name: </label><input id="edit-last-name" type="text" name="last-name" value="" placeholder=""></p>
        <p><label for="edit-gender">Gender: </label><select id="edit-gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </p>
        <p><label for="edit-search-gender">Looking for: </label><select id="edit-search-gender" name="search-gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="all">All</option>
            </select>
        </p>
        <p><label for="edit-radius">Search Radius: </label><select id="edit-radius" name="radius">
                <option value="5">5 Miles</option>
                <option value="10">10 Miles</option>
                <option value="20">20 Miles</option>
                <option value="50">50 Miles</option>
            </select>
        </p>
        <p><label for="edit-interests">Interests: </label><br />
            Techno <input type="checkbox" name="interests" value="Techno" /> <br />
            Progressive House <input type="checkbox" name="interests" value="Progressive House" /> <br />
            Electro House <input type="checkbox" name="interests" value="Electro House" /> <br />
            House <input type="checkbox" name="interests" value="House" /> <br />
            Deep House <input type="checkbox" name="interests" value="Deep House" /> <br />
            Drum and Bass <input type="checkbox" name="interests" value="Drum and Bass" /> <br />
            Dubstep <input type="checkbox" name="interests" value="Dubstep" /> <br />
            Trap <input type="checkbox" name="interests" value="Trap" /> <br />
            Breaks <input type="checkbox" name="interests" value="Breaks" /> <br />
            Trance <input type="checkbox" name="interests" value="Trance" /> <br />
            Psytrance <input type="checkbox" name="interests" value="Psytrance" /> <br />
            EDM <input type="checkbox" name="interests" value="EDM" />
        </p>
        <p><label for="edit-zipcode">Zipcode: </label><input id="edit-zipcode" type="text" name="zipcode" placeholder="" maxlength="5"></p>
        <p><label for="edit-password">Password: </label><input id="edit-password" name="password" type="password"></p>
        <p><input id="submit-save" type="submit" value="Save"></p>
        <p><span id="edit-status"></span></p>
    </div>    
`;

let matchesPageTemplate = `
    <div class="home-page">
        <h3>Your Matches</h3>
        <p>Based on your choices:</p>

        <ul id="user-matches-list">

        </ul>
    
    </div>
`;