const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const mesRoutes = require("./routes/mes");

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use("/mes", mesRoutes);

server.listen(5000, () => {
    console.log("Server has started...");
});
