$(document).ready(function() {
  //Over sabi Effect
  $('.registerBtn').click(function() {
    $('.regForm').fadeIn();
  });
  $('.closeBtn').click(function() {
    $('.regForm').fadeOut();
  });
  $('.loginBtn').click(function() {
    $('.loginForm').fadeIn();
  });
  $('.closeLoginBtn').click(function() {
    $('.loginForm').fadeOut();
  });
  //Registration Function
  $('.regSubmitBtn').click(function(event) {
    event.preventDefault();
    const fullname = $('#fullname').val();
    const username = $('#username').val();
    const password = $('#password').val();
    const email = $('#email').val();
    //Check if user input is empty
    if (!fullname || !username || !password || !email) {
      $('.regMessage').html('Kindly fill in all fields');
      return;
    }
    //Make get request to check if the user already exist
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/users?email=${email}`,
      data: {
        email,
      },
      beforeSend: function() {
        $('.regMessage').html('Loading....');
      },
      success: function(response) {
        if (response.length) {
          $('.regMessage').html('User already exist');
        } else {
          //Submit the user data if the user does not exist
          $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/users',
            data: {
              fullname,
              username,
              email,
              password,
            },
            beforeSend: function() {
              $('.regMessage').html('Loading....');
            },
            success: function() {
              $('.regMessage').html('Registration Successfull');
            },
          });
        }
      },
    });
  });
  //Login Function
  $('.loginSubmitBtn').click(function(event) {
    event.preventDefault();
    const passwordLogin = $('#passwordLogin').val();
    const emailLogin = $('#emailLogin').val();
    if (!passwordLogin || !emailLogin) {
      $('.regMessage').html('Kindly fill in all fields');
      return;
    }
    //Check if the user is in the database
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/users?email=${emailLogin}&password=${passwordLogin}`,
      data: {
        email: emailLogin,
        password: passwordLogin,
      },
      beforeSend: function() {
        $('.regMessage').html('Loading....');
      },
      success: function(response) {
        if (response.length) {
          $('.regMessage').html('Login sucessful');
          $('.checkLogin').html('You are logged in');
          localStorage.setItem('email', emailLogin);
          //redirect to home page if the login is successfull
          window.location.assign('index.html');
        } else {
          $('.regMessage').html('Username or password Incorrect');
        }
      },
    });
  });
  //Logout Function
  $('.logoutBtn').click(function() {
    //clear the localstorage and redirect to signup page
    localStorage.clear();
    $('.checkLogin').html('Kindly login');
    window.location.assign('signup.html');
  });
});
