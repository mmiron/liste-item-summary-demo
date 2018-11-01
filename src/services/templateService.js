"use strict";
/* global $, Handlebars */

export default class TemplateService {

    constructor() {}

    /**
     * fetch template and return a compiled function of the template.
     **/
    static fetchTemplate(templateName) {
        return $.ajax({
            url: `/templates/${templateName}.ejs`,
            dataFilter: function(rawTemplate, dataType) {
                return Handlebars.compile(rawTemplate);
            }
        });
    }

}
