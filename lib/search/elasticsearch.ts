import {FTSHandler} from "../../helpers/api/ftsHandler";

const {Client} = require('@elastic/elasticsearch')

const client = new Client({
    node: `${process.env.ELASTICSEARCH_HOST}:${process.env.ELASTICSEARCH_PORT}`
});

const createIndex = () => {

}

const getIndex = () => {

}

const deleteIndex = () => {
    
}

const search = async (table: string | null, query: any) => {
    try{
        const res = await client
        .search({
            index: FTSHandler.getIndex(table),
            body: query.toJSON()
        });
        return res;
    } catch (e) {
        console.trace(e.message);
    }
}

export const elasticSearch = {
    client,
    search
}
