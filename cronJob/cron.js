const sayHello = () => {
	const currentHour = new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours();
	const currentMinutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
	const amPm = new Date().getHours() > 12 ? 'P.M' : 'A.M';

	console.log(`Hello, it's ${currentHour}:${currentMinutes}${amPm}`);

	return setTimeout(() => sayHello(), 60000);
};

sayHello();
