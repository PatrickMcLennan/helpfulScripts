"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const timeStamp = () => {
    const now = new Date();
    const hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
    const dayNight = now.getHours() > 12 ? 'P.M' : 'A.M';
    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, at ${hours}:${minutes} ${dayNight}`;
};
exports.default = timeStamp;
