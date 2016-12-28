module.exports = {
    development: {
        url: 'postgres://postgres:password@localhost:5432/postgres',
        dialect: 'postgres'
    },
    quality: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres'
    },
    production: {
        url: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/bookmark_test',
        dialect: 'postgres'
    }
};
