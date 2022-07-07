import app from "./app"
import "./database/database"
import port from "./config"


app.listen(port, () => {
    console.log(port);
 });