export interface QueryParameters {
    type: QueryType;
    where: string;
    args: any[];
  }

 export class QueryTool {
    private queryList: QueryParameters[];
  
    constructor(queryList?: QueryParameters[]) {
      this.queryList = queryList ?? [];
    }
    addQueryParameter(param: QueryParameters) {
      this.queryList.push(param);
    }
    addQueryId(queryId:string | undefined){
      if (queryId){
        this.addQueryParameter({
          type: QueryType.IN,
          where: "id",
          args: [queryId]
        })
      }
    }
    addCreateDateRange(dateArray:Date[] | string []){
      if (dateArray.length > 0){
        this.addQueryParameter({
          type: QueryType.GTE_AND_LTE,
          where: "createDate",
          args: dateArray.map(date => {
            if (date instanceof Date){
              return date.getTime()
            }
          })
        })
      }
    }
    addDateRange(dateArray:Date[] | string [],where:string){
      if (dateArray.length > 0){
        this.addQueryParameter({
          type: QueryType.GTE_AND_LTE,
          where: where,
          args: dateArray.map(date => {
            if (date instanceof Date){
              return date.getTime()
            }
          })
        })
      }
    }
  }


  export  enum QueryType {
        IN_FUZZY = 'IN_FUZZY',
        IN = 'IN',
        NIN = 'NIN',
        REGEX = 'REGEX',
        GTE = 'GTE',
        LTE = 'LTE',
        NE = 'NE',
        GTE_AND_LTE = 'GTE_AND_LTE',
        NOT_NULL = 'NOT_NULL',
        TEXT = 'TEXT',
        IN_LIST = 'IN_LIST',
        EXISTS = 'EXISTS',
        TYPE = 'TYPE',
        LIST_SIZE = 'LIST_SIZE',
        SET_NO_EMPTY = 'SET_NO_EMPTY',
        GT = 'GT',
        LT = 'LT',
        GT_AND_LT = 'GT_AND_LT',
      }