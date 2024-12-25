
// reset function
function reset_function ()
{
    document.getElementById("input_number").value = "";
    document.getElementById("output_number").value = "";
}

// from all type to decimal
function all_to_decimal(x, y) {
  // converting "x" to string, uppercase and removing spaces
  let main_num, int_part, result, basee;
  x = x + "";
  main_num = x.toUpperCase();
  main_num = main_num.replace(/ /g, "");

  int_part = main_num;
  result = 0;
  basee = 10;

  // setting base
  switch (y) {
    case "binary":
      basee = 2;
      break;
    case "octal":
      basee = 8;
      break;
    case "hex":
      basee = 16;
      break;
    default:
      basee = 10;
  }

  // if point . is present in the number
  if (main_num.indexOf(".") != -1) {
    int_part = main_num.slice(0, main_num.indexOf("."));

    let frac_part = main_num.slice(main_num.indexOf(".") + 1);

    // calculating fraction part
    for (let i = 0, l = frac_part.length; i < l; i++) {
      if (isNaN(frac_part[i])) {
        let hex_value = frac_part.charCodeAt(i) - 55;
        result += hex_value * basee ** (-i - 1);
      } else {
        result += frac_part[i] * basee ** (-i - 1);
      }
    }
  }

  // calculating integer part
  for (let i = 0, l = int_part.length; i < l; i++) {
    if (isNaN(int_part[i])) {
      let hex_value = int_part.charCodeAt(i) - 55;
      result += hex_value * basee ** (l - i - 1);
    } else {
      result += int_part[i] * basee ** (l - i - 1);
    }
  }

  return result;
}


// from decimal to all
function decimal_to_all(x, y)
{ 
  x = x+"";
  x = x.replaceAll(" " , "");
  let basee, int_part, frac_part;
  let int_arr = [];
  let frac_result = ".";
  let hex_digit = "ABCDEF";
  let booll = true;

  int_part = parseInt(x);
  frac_part = x - int_part;

  // defining the base
  switch (y) {
    case "binary":
      basee = 2;
      break;
    case "octal":
      basee = 8;
      break;
    case "hex":
      basee = 16;
      break;
    default:
      basee = 10;
  }

  //converting the integer part to defined system.
  if (int_part == 0) {
    int_arr[0] = 0;
  } else {
    for (let i = 0; int_part != 0; i++) {
      
      let reminder = int_part % basee;

      if (reminder >= 10) {
        int_arr[i] = hex_digit[reminder - 10];
      } else {
        int_arr[i] = reminder;
      }

      int_part = parseInt(int_part / basee);
    }

    // reversing the arry for integer part and making string.
    int_arr.reverse();
  }
  int_arr = int_arr.join("");

  //converting the fraction part to defined system
  if(frac_part == 0)
  {
    frac_result = "";
    booll = false;
  }
  else
  {
    for(let i = 0; i < 15; i++)
      {
        frac_part *= basee;
        let x = parseInt(frac_part);

        // stoping loop if getting an integer after multiplying.
        if (frac_part == x)
        {
          frac_result += x;
          booll = false;
          break;
        }

        if(x >= 10)
        {
          frac_result += hex_digit[x-10]
        }
        else
        {
          frac_result += x;  
        }
        frac_part -= parseInt(frac_part);
      }
    if (booll)
    {
      frac_result += "...";
    }
    
    
  }

  return int_arr+frac_result;
}



// defining variables
let user_number ,from_type ,to_type ;


//converting "get_input" into decimal if it's not in decimal.
function convert_function()
{
  user_number = document.getElementById("input_number").value;
  from_type = document.getElementById("from").value;
  to_type = document.getElementById("to").value;

  // main logic
  if (from_type == to_type) {
    let remove_space = user_number.replaceAll(" ", "");
    document.getElementById("output_number").value = remove_space;    
  }
  else if (to_type == "binary")
  {
    let to_decimal = all_to_decimal(user_number , from_type);
    let to_binary = decimal_to_all(to_decimal , "binary");

    document.getElementById("output_number").value = to_binary;
  }
  else if (to_type == "hex")
  {
    let to_decimal = all_to_decimal(user_number , from_type);
    let to_hex = decimal_to_all(to_decimal , "hex");
    console.log(to_hex);
    document.getElementById("output_number").value = to_hex;
  }
    
  else if (to_type == "octal")
  {
    let to_decimal = all_to_decimal(user_number , from_type);
    let to_octal = decimal_to_all(to_decimal , "octal");
    
    document.getElementById("output_number").value = to_octal;
  }
  else
  {
    let to_decimal = all_to_decimal(user_number , from_type);
    document.getElementById("output_number").value = to_decimal;
  }

  
 
}



const text = "NUMBER SYSTEM CONVERTION";
let index = 0;
let x = 1;
function typeLetter()
{
  const typingText = document.getElementById("animation_word");
  typingText.textContent = text.slice(0, index);
  index++;

  if (index > text.length)
      { index = 0;
          setTimeout(typeLetter, 1300);
      }
  else
  { setTimeout(typeLetter, 100);

  }
}
typeLetter();















