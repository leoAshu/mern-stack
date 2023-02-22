var output = [];
var count = 1

function fizzBuzz() {
    var divBy3 = count%3;
    var divBy5 = count%5;

    if(divBy3 === 0 && divBy5 === 0) {
        output.push("FizzBuzz");
    } else if(divBy3 === 0) {
        output.push("Fizz");
    } else if(divBy5 === 0) {
        output.push("Buzz");
    } else {
        output.push(count);
    }
    
    count++;
    console.log(output);
}