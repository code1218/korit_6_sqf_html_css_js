let names = ["김준일", "김준이", "김준삼"];

console.log(names);

names = names.map((name, index) => {return name + "님";}); 
// ["김준일님", "김준이님", "김준삼님"];
console.log(names);

names = names.filter((name, index) => index !== 1);
console.log(names);