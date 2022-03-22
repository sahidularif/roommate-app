
// function vowelsAndConsonants(s) {
//     let a = 'aeiou';
//     let consonants = '';
//     for (let i = 0; i < s.length; i++) {
//       if( a.includes )
//     }

//     console.log(consonants.trim());
// }
// vowelsAndConsonants('javascriptloops');

// function vowelsAndConsonants(s) {
//     const vowels = 'aeiou';
//     var consonants = '';

//     for(var i = 0; i < s.length; i++) {
//        if (vowels.includes(s[i])) {
//            console.log(s[i]);
//        }
//        else {
//            consonants += s[i] + '\n';
//        }
//     }

//     console.log(consonants.trim());
// }

// vowelsAndConsonants('javascriptloops')

// function factorial(n) {

//     // if number is 0
//     if (n === 0) {
//         return 1;
//     }

//     // if number is positive
//     else {
//         return n * factorial(n - 1);
//     }
// }



// calling factorial() if num is non-negative

// let result = factorial(4);
// console.log(`${result}`);

//     function getGrade(score) {
//         let grade;

//         if(score>25 && score <30){
//             grade = 'A';
//         } 
//         else if(score>20 && score <25){
//              grade ='B'
//         }
//          else if(score>15 && score <20){
//              grade = 'C';
//         }
//         else if(score>10 && score <15){
//             grade = 'D';
//         }
//         else if(score>5 && score <10){
//             grade = 'E';
//         }
//         else grade = 'F';


//         return grade;
//     }
// console.log(getGrade(11) );   


function getLetter(s) {
    let letter;
        letter = s.charAt(0);
    switch (letter) {
    case 'a':
        letter = 'A';
        break;
    case 'b':
        letter = 'B';
        break;
    case 'c':
        letter = 'C';
        break;
    default:
         letter = 'C';
}

    return letter;
}

console.log(getLetter('bbcd'))