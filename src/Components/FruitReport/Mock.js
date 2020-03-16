import moment from 'moment';

const getMockData = () => {

    const dateStr = moment().format('YYYY-MM-DD');

    // NOTE: Only use mock data if the Back_End is not running or not returning data
    const mock =
        [
            { date: "2019-01-07", bananas: 401, strawberries: 58, apples: 290, oranges: 191 },
            { date: "2019-02-07", bananas: 354, strawberries: 98, apples: 132, oranges: 123 },
            { date: "2019-03-07", bananas: 512, strawberries: 120, apples: 321, oranges: 159 },
            { date: "2019-04-07", bananas: 287, strawberries: 75, apples: 214, oranges: 187 },
            { date: dateStr, bananas: 11, strawberries: 22, apples: 33, oranges: 44 }

        ];

    return mock;
}


export default getMockData; 