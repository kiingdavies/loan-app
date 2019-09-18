$(document).ready(function() {
  //Over sabi Effect
  $('.registerBtn').click(function() {
    $('.regForm').fadeIn();
    $('.loginForm').hide();
  });
  $('.closeBtn').click(function() {
    $('.regForm').fadeOut();
  });
  $('.loginBtn').click(function() {
    $('.regForm').hide();
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
    const phoneNum = $('#phone-number').val();
    const BvnNum = $('#bvn').val();
    
    //check BvnNum is 11 digits
    if (BvnNum.length < 11 || BvnNum.length > 11 ){
      $('.regMessage').html('Bvn not correct!');
      return;
    }

    //Check if user input is empty
    if (!fullname || !username || !password || !email || !phoneNum || !BvnNum) {
      $('.regMessage').html('Kindly fill in all fields');
      return;
    }

    //Make get request to check if the user already exist
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/user?email=${email}`,
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
            url: 'http://localhost:3000/user',
            data: {
              fullname,
              username,
              email,
              password,
              phoneNum,
              BvnNum,
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
      url: `http://localhost:3000/user?email=${emailLogin}&password=${passwordLogin}`,
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
          window.location.assign('dashboad.html'); //send to the dashborad not index again
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

  
          //Menu Buttons Function
          $('.myLoan').hide();
          $('.applyForm').hide();
     
     $('.homeBtn').click(function(){
         $('.myLoan').fadeOut();
         $('.applyForm').fadeOut();
         $('.welcomeNote').fadeIn();
     });

     $('.loanBtn').click(function(event){
       event.preventDefault();
       $('.welcomeNote').fadeOut();
       $('.applyForm').fadeOut();
       $('.myLoan').fadeIn();
     });

     $('.formBtn').click(function(event){
       event.preventDefault();
       $('.myLoan').fadeOut();
       $('.welcomeNote').fadeOut();
       $('.applyForm').fadeIn();
     });

     $('#myLoanBtn').click(function(event){
       event.preventDefault();
       $('.myLoan').fadeOut();
       $('.welcomeNote').fadeOut();
       $('.applyForm').fadeIn();
     });

     //Application Form Submit
     $('.LoanSubmitBtn').click(function(event){
       event.preventDefault();

       //geting value from the form
       const bank = $('#bank').val();
       const employer = $('#employer').val();
       const location = $('#location').val();
       const acctno = $('#acctno').val();
       const eligibility = $('#eligibility').val();
       const lesseramt = $('#lesseramt').val();
       const duration = $('#duration').val();

       //get Date Applied
        const appliedDate = new Date();
        const month = ((appliedDate.getMonth().length+1) ===1)? (appliedDate.getMonth()+1) : '0' + (appliedDate.getMonth()+1);
        const currentDate = appliedDate.getDate() + "-" + month + "-" + appliedDate.getFullYear();
        

       //prevent empty form submission
       if(!bank || !employer || !location || !acctno || !eligibility || !lesseramt || !duration ){
        alert("Complete all empty fields");
        return false;
       }else {
        //Submit application form
        $.ajax({
          method: 'POST',
          url: 'http://localhost:3000/loan',
          data: {
            bank,
            employer,
            location,
            acctno,
            eligibility,
            lesseramt,
            duration,
            currentDate,
          },
          beforeSend: function() {
            $('.loanMsg').html('Loading....');
          },
          success: function() {
            $('.loanMsg').html('Application Successfull!');
          },
        });
      }
     });

     //fetch Value from DataBase

     function getLoanData() {
       $.ajax({
          method: 'GET',
          url: 'http://localhost:3000/loan',
          success: function (data) {
            let loanList = ''
            $.each(data, function(i,v){
              loanList += `
              <tr>
                        <td>${i + 1}</td>
                        <td>${v.currentDate}</td>
                        
                        <td>${v.lesseramt}</td>
                        <td>Pending</td>
                        <td>${v.duration}</td>
                        <td><button type="button" class="btn btn-danger">Delete</button></td>
                    </tr>`;
            })
            $("#LoanHistory").html(loanList);
          }
       });
     }
     getLoanData();
});
