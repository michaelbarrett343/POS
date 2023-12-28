

document.addEventListener('DOMContentLoaded', () => {
  let result = document.getElementById("result");
  const buttons = document.querySelectorAll('input[type="button"]');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      let val = e.target.value
      
      if(val === '.') {
      result.value += val;
      e.target.disabled = true;
      }
      if (isNaN(val)) {
        console.log(val);
        if (val == 'C')
        clear()
       // add table route in later
       // add closing off bills in later
      } else {
        restrictDecimal()
              console.log(result.value);
      }

      function restrictDecimal() {
        const parts = result.value.split('.');
        if (parts.length == 2 && parts[1].length == 2) {
          console.log('only two decimal places')
        } else {
          result.value += val;
        }
      }

    })
  })
  
})
// add in faster user input method later(start at 0.00 move decimal place with each input (*10 + input) )

  // function display(value) {
  //   if (currentInput === '0.00' && value !== '.') {
  //       currentInput = value;
  //   } else {
  //       const parts = currentInput.split('.');
  //       if (parts.length === 2 && parts[1].length < 2) {
  //           currentInput += value;
  //       } else if (parts.length === 1) {
  //           currentInput += value;
  //       }
  //     }
  //   result.value = currentInput;
  // }

  /* currentInput += val
              console.log(val)
              console.log(currentInput)
                  const parts = currentInput.split('.');
                  console.log(parts)
                  if (parts.length === 2 && parts[1].length < 2) {
                      currentInput += val;
                      console.log(currentInput)
                  } else if (parts.length === 1) {
                      currentInput += val;
                      console.log(currentInput)
                  }
              result.value = currentInput; */

  function calculateTotal() {
    // Handle calculation logic if needed
  }

  function restrictDecimal() {
    const parts = result.value.split('.');
    if (parts.length == 2 && parts[1].length == 2) {
      console.log('only two decimal places')
    } else {
      result.value += val;
    }

  }

  //clear the calculator screen
  function clear() {
    console.log('clear');
    currentInput = '';
    document.getElementById('result').value = currentInput;
    document.getElementById('Decimal').disabled = false;
  }







