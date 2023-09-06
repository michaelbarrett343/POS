document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementsByTagName("input");
  const result = document.getElementById('result');
  console.log(result);
  for (var i = 0; i < calcBtn.length; i++) {
  
    calcBtn[i].addEventListener('click', (e) => {
      console.log(e.target.value);
      if (typeof(e.target.value == 'number')) {
        console.log('is a number')
        result.value += e.target.value;
      }
      if (e.target.value == 'C') {
        result.value = "";
      }
    })
  }
})

