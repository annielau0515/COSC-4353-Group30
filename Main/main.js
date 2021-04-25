conn = require("../Database/database")
app_setup = require("../Setup/app_setup")

const app = app_setup.app
const path = app_setup.path
const session = app_setup.session

require("../LoginModule/login")
require("../FuelQuoteModule/fuel")

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));