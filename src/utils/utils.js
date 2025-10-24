import { Pagination } from "antd";

export default {
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

    // Pagination(data, callback) {
    //     return {
    //         onChange: (current, pageSize) => {
    //             callback({
    //                 current,
    //                 pageSize,
    //             })
    //         },
    //         current: data.current,
    //         pageSize: data.pageSize,
    //         total: data.total,
    //         showTotal: (total, range) => {
    //             return `共 ${total} 条`
    //         },
    //         showQuickJumper: true,
    //     }
    // }
}   