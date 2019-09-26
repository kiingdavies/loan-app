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
    const pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


    //email validation
    if(pattern.test(email) === false || email === '') {
      $('.regMessage').html('Email Incorrect!');
      return;
    }  

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
      url: `http://localhost:3004/user?email=${email}`,
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
            url: 'http://localhost:3004/user',
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

  //UserLogin Function
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
      url: `http://localhost:3004/user?email=${emailLogin}&password=${passwordLogin}`,
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

  //AdminLogin Function
  $('.adminSubmitBtn').click(function(event) {
    event.preventDefault();
    const passwordLogin = $('#passwordLogin').val();
    const emailLogin = $('#emailLogin').val();
    if (!passwordLogin || !emailLogin) {
      $('.regMessage').html('Kindly fill in all fields');
      return;
    }

    //Check if the admin is in the database
    $.ajax({
      method: 'GET',
      url: `http://localhost:3004/admin?email=${emailLogin}&password=${passwordLogin}`,
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
          window.location.assign('admindash.html'); //send admin to the admindashborad not user dashboard
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
          $('.myProfile').hide();

     $('.homeBtn').click(function(){
         $('.myProfile').fadeOut();
         $('.myLoan').fadeOut();
         $('.applyForm').fadeOut();
         $('.welcomeNote').fadeIn();
     });

     $('.profileBtn').click(function(event){
        event.preventDefault();
        $('.welcomeNote').fadeOut();
        $('.myLoan').fadeOut();
        $('.applyForm').fadeOut();
        $('.myProfile').fadeIn();
     });

     $('.loanBtn').click(function(event){
       event.preventDefault();
       $('.myProfile').fadeOut();
       $('.welcomeNote').fadeOut();
       $('.applyForm').fadeOut();
       $('.myLoan').fadeIn();
     });

     $('.formBtn').click(function(event){
       event.preventDefault();
       $('.myProfile').fadeOut();
       $('.myLoan').fadeOut();
       $('.welcomeNote').fadeOut();
       $('.applyForm').fadeIn();
     });

     $('#myLoanBtn').click(function(event){
       event.preventDefault();
       $('.myProfile').fadeOut();
       $('.myLoan').fadeOut();
       $('.welcomeNote').fadeOut();
       $('.applyForm').fadeIn();
     });

     //Admin Menu Buttons Function
     $('.userTable').hide();
     $('.loanTable').hide();

     $('.homeBtn').click(function(){
      $('.userTable').fadeOut();
      $('.loanTable').fadeOut();
      $('.adminWelcome').fadeIn();
  });

  $('.usersBtn').click(function(event){
    event.preventDefault();
    $('.adminWelcome').fadeOut();
    $('.loanTable').fadeOut();
    $('.userTable').fadeIn();
 });

 $('.loanBtn').click(function(event){
  event.preventDefault();
  $('.adminWelcome').fadeOut();
  $('.userTable').fadeOut();
  $('.loanTable').fadeIn();
});


     //Loan Application Form Submit
     $('.LoanSubmitBtn').click(function(event){
       event.preventDefault();

       //geting value from the form to database
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

        //validate lesseramt is lower than eligible amount
        if(lesseramt > eligibility){
          $('.loanMsg').html('Invalid Lesser Amount');
          return;
        }
        //check Account Num is 10 digits
        if (acctno.length < 10 || acctno.length > 10 ){
          $('.loanMsg').html('Account Number Incorrect!');
          return;
        }

       //prevent empty form submission
       if(!bank || !employer || !location || !acctno || !eligibility || !lesseramt || !duration ){
        alert("Complete all empty fields");
        return false;
       }else {
        //Submit application form
        $.ajax({
          method: 'POST',
          url: 'http://localhost:3004/loan',
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



     //fetch Value from Loan DataBase to display on myLoan page

     function getLoanData() {
       $.ajax({
          method: 'GET',
          url: 'http://localhost:3004/loan',
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

     //update  user profile
     function loadProfile(){
       let email = window.localStorage.getItem('email')
       $.ajax({
         method: 'GET',
         url: `http://localhost:3004/user?email=${email}`,
         success: function(data){
           $.each(data, function(i,v){
             $('#fullname').val(v.fullname)
             $('#Phonenumber').val(v.phoneNum)
             $('#bvn').val(v.BvnNum)
           })
         }
       });
     }
     loadProfile();

     

     //delete button function
     $('body').on('click','.deleteBtn', function(e){
       e.preventDefault();
       let id = $(this).val()
       $.ajax({
         "url": "http://localhost:3004/loan/"+id,
         "method": "DELETE",
         data:{id},
         beforeSend: function(){
           alert("Deleted?")
         },
         success: function(data){
           alert("Record Deleted Successfully!")
         },
         error: function(e){
           alert("", JSON.stringify(e))
         }
       })
     })

     //fetch Value from Profile DataBase to display on admin users profile
     function getUserProfile() {
      $.ajax({
         method: 'GET',
         url: 'http://localhost:3004/user',
         success: function (data) {
           let userList = ''
           $.each(data, function(i,v){
             userList += `
             <tr>
                       <td>${v.id}</td>
                       <td>${v.fullname}</td>
                       <td>${v.username}</td>
                       <td>${v.phoneNum}</td>
                       <td>Pending</td>
                       <td>${v.password}</td>
                       <td>${v.BvnNum}</td>
                       <td>${v.email}</td>
                       <td><button type="button" class="btn btn-danger deleteBtn" value="${v.id}"><i class="fa fa-trash"></i> Delete</button></td>
                   </tr>`;
           })
           $("#userHistory").html(userList);
         }
      });
    }
    getUserProfile();

    //fetch Value from Loan DataBase to display on admin users profile
    function getLoanTable() {
      $.ajax({
         method: 'GET',
         url: 'http://localhost:3004/loan',
         success: function (data) {
           let loanList = ''
           $.each(data, function(i,v){
            loanList += `
             <tr>
                       <td>${v.id}</td>
                       <td>${v.bank}</td>
                       <td>${v.employer}</td>
                       <td>${v.location}</td>
                       <td>${v.acctno}</td>
                       <td>${v.lesseramt}</td>
                       <td>${v.currentDate}</td>
                       <td>${v.duration}</td>
                       <td><button type="button" class="btn btn-danger deleteBtn" value="${v.id}"><i class="fa fa-trash"></i> Delete</button></td>
                   </tr>`;
           })
           $("#LoanHistory").html(loanList);
         }
      });
    }
    getLoanTable();

    
    
});
