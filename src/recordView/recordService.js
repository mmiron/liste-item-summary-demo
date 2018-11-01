"use strict";
/* global $ */

export default class RecordService {

    constructor() {}

    fetchRecordById(recordId) {
        return $.getJSON("/data/sample/" + recordId + ".json");
    }
}
