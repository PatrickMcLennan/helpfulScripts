const logger = (num) => {
    console.log(num);
    return setTimeout(() => hello(num), 1000);
};
const hello = (num) => (num === 10 ? console.log(num) : logger(num + 1));
hello(0);
