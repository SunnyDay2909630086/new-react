import Jsonp from "jsonp";
import axios from "axios";  

export default class Axios{
    static jsonP(){
        return new Promise((resolve, reject) => {
            // Jsonp(url, {
            //     param: 'callback',
            // }, (err, data) => {
            //     if (err) {
            //         reject(err);
            //     } else {
            //         resolve(data);
            //     }
            // })
        })
    }
}
