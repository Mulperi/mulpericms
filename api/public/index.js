"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const posts_1 = require("./routers/posts");
/*
  Routers
*/
app_1.default.use('/posts', posts_1.default);
app_1.default.listen(app_1.default.get('port'), () => {
    console.log('  App is running at http://localhost:%d in %s mode', app_1.default.get('port'), app_1.default.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=index.js.map