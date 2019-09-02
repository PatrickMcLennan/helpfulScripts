const days: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const months: string[] = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const timeStamp = (): string => {
    const now: Date = new Date();
    const hours: number = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    const minutes: string = now.getMinutes() < 10 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
    const dayNight: string = now.getHours() > 12 ? 'P.M' : 'A.M';

    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, at ${hours}:${minutes} ${dayNight}`;
}

export default timeStamp;