"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./app/modules/students/student.route");
const user_route_1 = require("./app/modules/users/user.route");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use('/api/v1/students', student_route_1.StudentRoute);
app.use('/api/v1/users', user_route_1.UserRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Global error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(globalErrorHandler_1.default);
// Not found route
exports.default = app;
