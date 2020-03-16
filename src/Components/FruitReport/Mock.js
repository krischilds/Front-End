import moment from 'moment';
let instance = null;

class Mock {
    constructor() {

        if (!instance) {
            instance = this;

            const dateStr = moment().format('YYYY-MM-DD');
            this.data =
                [
                    { date: "2019-01-07", bananas: 401, strawberries: 58, apples: 290, oranges: 191 },
                    { date: "2019-02-07", bananas: 354, strawberries: 98, apples: 132, oranges: 123 },
                    { date: "2019-03-07", bananas: 512, strawberries: 120, apples: 321, oranges: 159 },
                    { date: "2019-04-07", bananas: 287, strawberries: 75, apples: 214, oranges: 187 },
                    { date: dateStr, bananas: 11, strawberries: 22, apples: 33, oranges: 44 }
                ];
        }
        return instance;
    }

    getData() {
        return this.data;
    }

    addData(row) {
        row.bananas = parseInt(row.bananas);
        row.strawberries = parseInt(row.strawberries);
        row.apples = parseInt(row.apples);
        row.oranges = parseInt(row.oranges);
        this.data.push(row);
    }
}

export default Mock;