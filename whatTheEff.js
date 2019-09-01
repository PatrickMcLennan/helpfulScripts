const hello = 'hello';
const o = ['o'];

console.log(hello.split('').reduce((allChar, nextChar) => o.includes(nextChar) ? allChar : [...allChar, nextChar], []).join('-'));

