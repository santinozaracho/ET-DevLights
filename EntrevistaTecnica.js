/*
Jane loves strings more than anything. She made a function related to the string some days ago and
forgot about it. She is now confused about calculating the value of this function. She has a string with
her, and value of string over function can be calculated as given below:

f(S)= |S| x S in T

Jane wants to know the maximum value of among all the substrings of string . Can you help
her?

Input Format
A single line containing string in small letter('a' - 'z').

Output Format
An integer containing the value of output.

Constraints 
1 <= |T| <= 10^5 
 */

//This is the main Function
const StrFunctionCalc = (stringIn) => {
    if ( stringIn.length < 10**5 ) {
        let string = stringIn.trim().toLowerCase()
        let results = generateAllsCom(string).map(subStr => searchAndCount(string,subStr) * subStr.length)
        // let results = combinationOfLetters(string).map(subStr => searchAndCount(string,subStr) * subStr.length)
        // return Math.max.apply(null,results)   
        return getMaxValFromArr(results)
    }else {
        return 0
    }
}
//this function was created for solve the limit of in Math.max.apply...
const getMaxValFromArr = array => {
    let max = 0
    array.forEach(num => {
        if(num>max){max=num}})
    return max
}

//This is a fucntion that return alls combinations of string, is recursive and repeat some words, but its mine.
const generateAllsCom = string => {
        let recursive = (active, rest, arrResult)  => {
            if (!active && !rest)
                return;
            if (!rest) {
                arrResult.push(active);
            } else {
                recursive(active + rest[0], rest.slice(1), arrResult);
                recursive(active, rest.slice(1), arrResult);
            }
            return arrResult;
        }
        return recursive("", string, []);
    }
// this function search and count how many times appear the word or subString in a string.
const searchAndCount = (string,subStr) => {
    
    for(var count=-1,index=-2; 
        index != -1; 
        count++,index=string.indexOf(subStr,index+1) );
    // console.log(subStr+' Qty:'+count);
    return count
}


/* this function for get all combinations of string was finded in StackOverflow, an this is the most optimized function*/
function process(w, word) {
    let temp = [];
    for (let j = 1; j < word.length; j++) {
        temp.push(w + word[j].charAt(word[j].length - 1));
    }
    return temp;
}

function combinationOfLetters(word) {
    let arr = [],
        copy = [
            []
        ],
        copyCondition = true,
        save = word.split(''),
        copyInx = 0;

    function loopFunc(prword) {

        if (copy[0].includes(word)) {
            if (copyInx === 0) arr.unshift(save);
            //recording the index of the last element in the array
            //we'll use it later, when creating a new 'copy' array;
            copyInx = arr.length;
            //to be able to create a new 'copy' array
            //(with the next loopFunc call) we set it to true;
            copyCondition = true;
            return save.slice(1);
        }
        //explicit block    
        {
            let w;

            while (prword.length > 1) {
                w = prword[0];
                prword = process(w, prword);
                arr.push(prword);
            }
            //end of explicit block
        }
        if (copyCondition) {
            copyCondition = false;
            copy = [];
            //we don't want to process any old values again
            //so we are using copyInx to copy only new values (into the copy array)
            //that need to be processed.
            for (let val of arr.slice(copyInx)) {
                let copyVal = [];
                [].push.apply(copyVal, val);
                copy.push(copyVal);
            }
        }

        if (copy[0].length === 1 && !copy[0].includes(word)) {
            copy.shift();
        }
        if (copy[0].length > 1 && !copy[0].includes(word)) {
            copy[0].shift();
        }
        return loopFunc(copy[0]);
    }
    //creating all combs of a string
    do {
        save = loopFunc(save);
        word = word.slice(1);
    } while (save.length > 1);
    //when arr is created return it
    return arr.reduce((a, b) => a.concat(b));
}