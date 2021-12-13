$(() => {
    // const $form = $('#login');
    var $form = $('#login'),
      
      newUsernameInput = $('#username'),
      newPasswordInput = $('#password')
      console.log(newUsernameInput,"OOOOOO")
    $form.on('submit', handleLogin);
  
    function handleLogin (e) {
      e.preventDefault();
      let errorcode = $('#errormessage');
       errorcode.empty();
      errorcode.hide();
     $('#showList').hide();
      $('#show').empty();

      var newUsername = newUsernameInput.val();
      console.log(newUsername,"OOOOOO")
      var newPassword = newPasswordInput.val();
      
      
      var newContent = $('#error');
  
      if (newUsername && newPassword) {
        var useJson = true;
        if (useJson) {
          $.ajax({
            method: 'POST',
            url:'/login',
            contentType: 'application/json',
            data:JSON.stringify({
              username: newUsername,
              password: newPassword
            }),
            success:function(response){
              if(response.message==="success"){
                window.location.href='/private'
              }
            },
            error:function(response){
              if(response.message==="failed"){
                window.location.href='/signup'
                console.log("error is coming")
                // window.location.href='/private'
                // var errorMessage =xhr.response.JSON.error;
                // console.log(errorMessage)
                // let p=`<p>${errorMessage}</p>`
                // errorcode.removeClass('d-none')
                // errorcode.append(p)
                // errorcode.show()
              }
             
            }
          })
          };
  
        }
      
    }
  })


