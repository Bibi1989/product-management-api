"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProject = (value) => {
    const { project_name, project_identifier, description, start_date, end_date, } = value;
    const error = {};
    if (!project_name) {
        error.project_name = "Project title field is empty";
    }
    if (!project_identifier) {
        error.project_identifier = "Identifier field is empty";
    }
    if (!description) {
        error.description = "Description field is empty";
    }
    if (!start_date) {
        error.start_date = "Start Date Number field is empty";
    }
    if (!end_date) {
        error.end_date = "End date field is empty";
    }
    return { value, error };
};
//# sourceMappingURL=validateProject.js.map