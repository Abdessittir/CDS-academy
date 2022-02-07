
export const correctToken = `
let part1 = token.slice(0, 11);
let part2 = token.slice(11, 21);
let part3 = token.slice(22);
return part1.slice(0,10) + part2.slice(0, 10) + part3;
`;

export function incorrectToken(token){
   let part1 = token.slice(0, 10);
   let part2 = token.slice(10, 20);
   let part3 = token.slice(20)
   return part1 + "F" + part2 + "A" + part3;
}