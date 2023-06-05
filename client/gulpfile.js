const { task, src, dest } = require("gulp");
const rename = require("gulp-rename");

task("pre-build", function (cb) {
  const env = process.env.NODE_ENV;
  if (env === "prod") {
    src("./api.config.prod.ts")
      .pipe(rename("api.config.ts"))
      .pipe(dest("./src"));
  } else {
    src("./api.config.dev.ts")
      .pipe(rename("api.config.ts"))
      .pipe(dest("./src"));
  }
  cb();
});
task("post-build", function (cb) {
  const env = process.env.NODE_ENV;
  src("./api.config.ts").pipe(dest("./src"));
  cb();
});
