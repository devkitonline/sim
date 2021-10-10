const {Client} = require('@elastic/elasticsearch')

const client = new Client({
    node: `${process.env.ELASTICSEARCH_HOST}:${process.env.ELASTICSEARCH_PORT}`
});


export const elasticSearch = {
    client
}
