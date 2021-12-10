$(() => {
    const $form = $('#login');
    var $form = $('#signup-form'),
      
      newUsernameInput = $('#username'),
      newPasswordInput = $('#password')
  
    $form.on('submit', handleLogin);
  
    function handleLogin (e) {
      e.preventDefault();

      var newUsername = newUsernameInput.val();
      var newPassword = newPasswordInput.val();
      
      
      var newContent = $('#new-content');
  
      if (newUsername && newPassword) {
        var useJson = false;
        if (useJson) {
          var requestConfig = {
            method: $form.attr('method'),
            url: $form.attr('action'),
            contentType: 'application/json',
            data: JSON.stringify({
              username : newEmail,
              password : newPassword,
            
            })
          };
  
          $.ajax(requestConfig).then(function (responseMessage) {
            console.log(responseMessage);
            newContent.html(responseMessage.message);
          });
        }
      }
    }
  })