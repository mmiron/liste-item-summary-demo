"use strict";
/* global $ */

import ListItemSummaryService from './listItemSummaryService.js';
import TemplateService from '../services/templateService.js';

export default class StockLevelCardDemo {

    constructor() {
        document.addEventListener("DOMContentLoaded", this.initializeUI.bind(this));
        $(document).on("click", "#closeSummary", this.closeSummary.bind(this));

        this.summaryContainerEl = undefined;
        this.exampleTable = undefined;
        this.listItemSummaryService = new ListItemSummaryService();
        this.showSummary = this.showSummary.bind(this);
    }

    closeSummary() {
        this.summaryContainerEl.toggle(400);
    }

    showSummary(e, cell, val, row) {
        e.stopImmediatePropagation();
        let data = cell.cell.row.getData();
        // check if container is shown; 
        if (this.summaryContainerEl == undefined) {
            this.summaryContainerEl = $('#summaryContainer');
        }

        if (!this.summaryContainerEl.is(":visible")) {
            // if not - show it
            this.summaryContainerEl.toggle(400);
        }

        // once shown - fetch and display the template with the data
        TemplateService.fetchTemplate("summary-template").done(function(template) {
            this.initializeSummaryTemplate(template, this.summaryContainerEl, data.id);
        }.bind(this));

        console.log("showSummary hit", data);
    }

    initializeSummaryTemplate(template, summaryContainerEl, dataRecordId) {
        // fetch data from backend for selected record; and use to populate our card
        this.listItemSummaryService.fetchRecordById(dataRecordId).done(function(record) {
            var htmlRecord = template(record);

            // Insert the HTML code into the page
            summaryContainerEl.html(htmlRecord);
        });
    }


    //cell - the cell component
    //formatterParams - parameters set for the column
    linkFormatter(cell, formatterParams) {
        var data = cell.getData();
        return "<a href='#'>" + data.name + "</a>";
    }

    initializeUI() {
        this.exampleTable = $("#example-table");
        let formatterFn = this.linkFormatter;
        let showSummaryFn = this.showSummary;
        this.listItemSummaryService.fetchListData().done(function(list) {
            $("#example-table").tabulator
            // this.exampleTable.tabulator
            ({
                // height: "100%", // 311px",
                layout: "fitColumns",
                // ajaxURL: "/exampledata/ajaxprogressive",
                // ajaxProgressiveLoad: "scroll",
                data: list,
                paginationSize: 20,
                placeholder: "No Data Set",
                columns: [{
                        title: "Name",
                        field: "name",
                        sorter: "string",
                        width: 200,
                        formatter: "link",
                        cellClick: showSummaryFn,
                        formatter: formatterFn
                    },
                    { title: "Progress", field: "progress", sorter: "number", formatter: "progress" },
                    {
                        title: "Gender",
                        field: "gender",
                        sorter: "string"
                    },
                    { title: "Rating", field: "rating", formatter: "star", align: "center", width: 100 },
                    { title: "Favourite Color", field: "col", sorter: "string", sortable: false },
                    { title: "Date Of Birth", field: "dob", sorter: "date", align: "center" },
                    { title: "Driver", field: "car", align: "center", formatter: "tickCross", sorter: "boolean" }
                ]
            });
        });
    }
}
