"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Global error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(globalErrorHandler_1.default);
// Not found route
app.use(notFound_1.default);
exports.default = app;
