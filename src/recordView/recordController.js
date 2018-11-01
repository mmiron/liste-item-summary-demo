"use strict";
/* global $, URLSearchParams */

import RecordService from './recordService.js';
import TemplateService from '../services/templateService.js';

export default class StockLevelCardDemo {

    constructor() {
        document.addEventListener("DOMContentLoaded", this.initializeUI.bind(this));

        this.recordContainerEl = undefined;
        this.recordService = new RecordService();
        this.recordId = new URLSearchParams(document.location.search).get("recordId");
        // once shown - fetch and display the template with the data
        TemplateService.fetchTemplate("report-view-template").done(function(template) {
            this.initializeRecordTemplate(template, this.recordContainerEl, this.recordId);
        }.bind(this));
    }

    initializeRecordTemplate(template, recordContainerEl, dataRecordId) {
        // fetch data from backend for selected record; and use to populate our card
        this.recordService.fetchRecordById(dataRecordId).done(function(record) {
            var htmlRecord = template(record);

            // Insert the HTML code into the page
            recordContainerEl.html(htmlRecord);
        });
    }

    initializeUI() {
        this.recordContainerEl = $('#recordContainer');
    }
}
