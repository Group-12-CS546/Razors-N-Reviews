// var btn1 = document.querySelector('#green');
// var btnlike = document.getElementsByClassName('btnlike')
// var btn2 = document.querySelector('#red');
// var btndislike = document.getElementsByClassName('btndislike')
// var click = 0;

// btn1.addEventListener('click', function() {

//     if (btn2.classList.contains('red')) {
//       btn2.classList.remove('red');
//     } 
//   this.classList.toggle('green');
//   click += 1;
// //   document.getElementById("clicks").innerHTML = clicks;

// });

// btn2.addEventListener('click', function() {

//     if (btn1.classList.contains('green')) {
//       btn1.classList.remove('green');
//     } 
//   this.classList.toggle('red');
//   click = click - 1
// //   document.getElementById("clicks").innerHTML = clicks;
// });

// function onClick() {
//     clicks += 1;
//     btn1.innerHTML = clicks;
// };

$(function () {
    $(".like").click(function () {
        var input = $(this).find('.qty1');
        input.val(parseInt(input.val()) + 1);
    });

    $(".dislike").click(function () {
        var input = $(this).find('.qty2');
        input.val(input.val() - 1);
    });
});
