const HT = process.env.HOST
const US = process.env.USER
const PS = process.env.PASSWORD
const DB = process.env.DATABASE

const DS = {
    user:US,
    password:PS,
    host: HT,
    database:DB
};

export default DS