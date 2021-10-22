import {elasticSearch} from "@/lib/search/elasticsearch";

const esb = require('elastic-builder');
import ftsConfig from '../../constants/ftsConfiguration.json';

export const FTSHandler = {
    getSearchResults: async (table: string | null, searchTerm: string, checkAuthor: boolean, checkPublisher: boolean) => {
        let result = [];
        let searchFields = [];
        if (table != null) {
            searchFields = FTSHandler.getSearchFields(table);
        } else {
            searchFields = FTSHandler.getSearchFields('all');
        }
        const requestBody = esb.requestBodySearch()
        .size(1000)
        .from(0)
        .query(
            esb.boolQuery()
            .must(
                esb.multiMatchQuery(searchFields, searchTerm)
            )
            .filter(
                esb.boolQuery()
                .should([checkAuthor ? esb.matchQuery('author', '123') : '', checkPublisher ? esb.matchQuery('publisher', '456') : ''])
                .minimumShouldMatch('1')
            )
        )

        result = await elasticSearch.search(table, requestBody);
        return result;
    },
    getSearchFields: (table): string[] => {
        const t = ftsConfig.find(t => t.tableName == table);
        return t.searchFields;
    },
    getIndex: (table): string =>{
        const t = ftsConfig.find(t => t.tableName == table);
        return t.indexName;
    }
}
