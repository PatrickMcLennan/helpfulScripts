const logger = (num: number): NodeJS.Timeout => {
	console.log(num);
	return setTimeout(() => hello(num), 1000);
};

const hello = (num: number): void | NodeJS.Timeout => (num === 10 ? console.log(num) : logger(num + 1));

hello(0);
