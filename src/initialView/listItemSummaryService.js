"use strict";
/* global $ */

export default class ListItemSummaryService {

    constructor() {}

    fetchListData() {
        return $.getJSON("/data/sample/list-data.json");
    }
    
    fetchRecordById(recordId) {
        return $.getJSON("/data/sample/" + recordId + ".json");
    }
}
