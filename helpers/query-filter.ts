import {IFilterCondition} from "./interfaces";
import {EFilterOperator} from "./enums";
const moment = require('momnet');

const buildSQLWhereClauseForGroup = (conditions: IFilterCondition, tablename: string): string => {
    let filterConditionArray = [];
    for (let condition of conditions.conditions){
        if (condition.conditions.length > 0){
            filterConditionArray.push(buildSQLWhereClauseForGroup(condition, tablename));
        }else{
            filterConditionArray.push(buildSQLWhereStatementForCondition(condition, tablename));
        }
    }

    let filterCondition = "";
    if (filterConditionArray.length > 0){
        filterCondition = `( ${filterConditionArray.join( ' ' + conditions.logicalOperator + ' '  )} )`;
    }

    return filterCondition;
}

const buildSQLWhereStatementForCondition = (condition: IFilterCondition , tablename: string): string =>{
    let retSQLString = "";
    switch (condition.operator) {
        case EFilterOperator.empty:
            retSQLString = `(${tablename}.${condition.field} is null or ${tablename}.${condition.field}='')`;
            break;
        case EFilterOperator.notempty:
            retSQLString = `(${tablename}.${condition.field} is not null and ${tablename}.${condition.field} <> '')`;
            break;
        case EFilterOperator.equals:
            retSQLString = `(${tablename}.${condition.field} = '${condition.filterValue}' )`;
            break;
        case EFilterOperator.oneof:
            const valueArray = Array.isArray(condition.filterValue) ? condition.filterValue : condition.filterValue.split(',');
            retSQLString = ` ${tablename}.${condition.field} in (${valueArray.join(',')}) `;
            break;
        case EFilterOperator.true:
            retSQLString = `${tablename}.${condition.field} = 1`;
            break;
        case EFilterOperator.false:
            retSQLString = `${tablename}.${condition.field} = 0`;
            break;
        case EFilterOperator.contains:
            retSQLString = `${tablename}.${condition.field} like '%${condition.filterValue}%' `;
            break;
        case EFilterOperator.ncontains:
            retSQLString = `${tablename}.${condition.field} not like '%${condition.filterValue}%' `;
            break;
        case EFilterOperator.greater:
            retSQLString = `${tablename}.${condition.field} > '${condition.filterValue}' `;
            break;
        case EFilterOperator.gequal:
            retSQLString = `${tablename}.${condition.field} >= '${condition.filterValue}' `;
            break;
        case EFilterOperator.less:
            retSQLString = `${tablename}.${condition.field} < '${condition.filterValue}' `;
            break;
        case EFilterOperator.lequal:
            retSQLString = `${tablename}.${condition.field} <= '${condition.filterValue}' `;
            break;
        case EFilterOperator.between:
            retSQLString = `(${tablename}.${condition.field} >= '${condition.filterValue}' and  ${tablename}.${condition.field} <= '${condition.filterValueTo}')`;
            break;
        case EFilterOperator.betweend:
            retSQLString = `(${tablename}.${condition.field} >= '${condition.filterValue} 00:00:00' and  ${tablename}.${condition.field} <= '${condition.filterValueTo} 23:59:59')`;
            break;
        case EFilterOperator.today:
            const today = moment(new Date(), "YYYY-MM-DD");
            retSQLString = `(${tablename}.${condition.field} >= '${today} 00:00:00' AND ${tablename}.${condition.field} <= '${today} 23:59:59' )`;
            break;
        case EFilterOperator.past:
            const now = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
            retSQLString = `${tablename}.${condition.field} < '${now}' `;
            break;
        case EFilterOperator.future:
            const now1 = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
            retSQLString = `${tablename}.${condition.field} > '${now1}' `;
            break;
        case EFilterOperator.thismonth:
            let date = new Date();
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            let from = moment(firstDay, "YYYY-MM-DD");
            let to = moment(lastDay, "YYYY-MM-DD");
            retSQLString = `(${tablename}.${condition.field} > '${from} 00:00:00' and ${tablename}.${condition.field} < '${to} 23:59:00' )`;
            break;
        case EFilterOperator.nextmonth:
            // let now2 = new Date();
            // let current;
            // if (now2.getMonth() == 11) {
            //     current = new Date(now2.getFullYear() + 1, 0, 1);
            // } else {
            //     current = new Date(now2.getFullYear(), now2.getMonth() + 1, 1);
            // }
            break;
        case EFilterOperator.thisday:
            break;
        case EFilterOperator.thisyear:
            break;
        case EFilterOperator.inlastndays:
            break;
        case EFilterOperator.inndays:
            break;
        case EFilterOperator.lastndays:
            break;
        case EFilterOperator.ndaysago:
            break;
        default:

    }
    return retSQLString;
}

export const queryFilter = {

}
