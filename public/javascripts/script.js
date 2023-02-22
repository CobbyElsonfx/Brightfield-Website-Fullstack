// const toggler = document.getElementByClassName("nav-toggler")
// toggler.onclick = function(){
//     document.getElementByClassName("collapse")

// }


// var docWidth = document.documentElement.offsetWidth;

// [].forEach.call(
//   document.querySelectorAll('*'),
//   function(el) {
//     if (el.offsetWidth > docWidth) {
//       console.log(el);
//     }
//   }
// );



//contact view 
// hiding and displaying of success message


// document.getElementById("button").onsubmit(ev =>{
//   alert("submitted succesfully")
// }).preventDefault()


//COUNTER FOR DAYS
var then = new Date(2021, 0, 02), // month is zero based
now  = new Date;               // no arguments -> current date

// 24 hours, 60 minutes, 60 seconds, 1000 milliseconds
Math.round((now - then) / (1000 * 60 * 60 * 24)); // round the amount of days
// result: 712