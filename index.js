const express = require('express')
const axios = require('axios')
const lineapi = require('line-api')
const app = express()
const port = process.env.PORT || 3000

app.get('/covid19', async(req, res) => {
  const thaidata = await getcountries()
  try {
    const notify = new lineapi.Notify({
        token: 'your token here'
    })
    notify.send({
      message: 'Thailand Updated' + '\ncases:' + thaidata.cases + '\ntodayCases:' + thaidata.todayCases
        + '\ndeaths:' + thaidata.deaths + '\ntodayDeaths:' + thaidata.todayDeaths
        + '\nrecovered:' + thaidata.recovered + '\nactive:' + thaidata.active
        + '\ncritical:' + thaidata.critical
        + '\n\n developed by minizymint'
    }).then(res.send(thaidata))
  } catch (error) {
      res.send(error)
  }
});

app.listen(port, async() => {
  console.log('Example app listening on port 3000!')
  const thaidata = await getcountries()
  try {
    const notify = new lineapi.Notify({
        token: 'your token here'
    })
    notify.send({
      message: 'Thailand Updated' + '\ncases:' + thaidata.cases + '\ntodayCases:' + thaidata.todayCases
        + '\ndeaths:' + thaidata.deaths + '\ntodayDeaths:' + thaidata.todayDeaths
        + '\nrecovered:' + thaidata.recovered + '\nactive:' + thaidata.active
        + '\ncritical:' + thaidata.critical
        + '\n\n developed by minizymint'
      }).then()
    }
    catch(error){
      console.log(error)
    }
    
});

const getcountries = async() => {
    try {
        const response = await axios.get("https://corona.lmao.ninja/v2/countries/thailand");
        return response.data
      } catch (error) {
        return error
      }
}