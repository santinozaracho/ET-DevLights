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
