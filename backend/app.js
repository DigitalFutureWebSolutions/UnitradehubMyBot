const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
var session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const errorMiddleware = require("./middleware/error");
const RedisStore = require("connect-redis")(session);
const redisClient = require("redis").createClient();

app.use(
  cors({
    origin: "https://unitradehub.onrender.com/",
    credentials: true,
  })
);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    httpOnly: true,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set secure: true in production with HTTPS
  })
);

const blogs = require("./routes/blogRoute");
const pages = require("./routes/pageRoute");
const services = require("./routes/serviceRoute");
const user = require("./routes/userRoute");
const settings = require("./routes/settingRoute");
const faqs = require("./routes/faqRoute");
const testimonials = require("./routes/testimonialRoute");

app.use("/admin", user);
app.use("/admin", blogs);
app.use("/admin", services);
app.use("/admin", pages);
app.use("/admin", settings);
app.use("/admin", faqs);
app.use("/admin", testimonials);

app.use("/api/v1", user);
app.use("/api/v1", blogs);
app.use("/api/v1", services);
app.use("/api/v1", pages);
app.use("/api/v1", settings);
app.use("/api/v1", faqs);
app.use("/api/v1", testimonials);

app.use(errorMiddleware);
module.exports = app;
