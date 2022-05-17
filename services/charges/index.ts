import express from 'express'
import {getCharge} from "./service/getCharge.js";
import {listCharges} from "./service/listCharges.js";

const app = express.Router()

app.get('/company/:company_number/charges', async (req, res) => {
  const {company_number} = req.params
  const response = await listCharges(company_number)
  res.json(response)
})

app.get('/company/:company_number/charges/:charge_id', async (req, res) => {
  const {company_number, charge_id} = req.params
  const response = await getCharge(company_number, charge_id)
  res.json(response)
})


const server = express()
server.use(app)
server.listen(3000)
