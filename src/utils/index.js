
const Utils = {
    formateDate(time) {
        if (!time) {
            return '';
        }
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
}   

export default Utils;