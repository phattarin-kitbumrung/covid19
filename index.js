const express = require('express')
const axios = require('axios')
const lineapi = require('line-api')
const app = express()
const port = process.env.PORT || 3000

app.get('/covid19', async(req, res) => {
  const thaidata = await getcountries()
  const date = new Date()
  //const time = date.getHours() + ':' + date.getMinutes()
  try {
    const notify = new lineapi.Notify({
        token: 'v9nOsQexb6EV0Gpenyb6hocwnOcqdSfwOB7yJRSYczD'
    })
    //if(time == '10:10'){
        notify.send({
            message: 'Thailand Updated' + '\ncases:' + thaidata.cases + '\ntodayCases:' + thaidata.todayCases
            + '\ndeaths:' + thaidata.deaths + '\ntodayDeaths:' + thaidata.todayDeaths
            + '\nrecovered:' + thaidata.recovered + '\nactive:' + thaidata.active
            + '\ncritical:' + thaidata.critical
        }).then(res.send(thaidata))
    //}
  } catch (error) {
      res.send(error)
  }
});

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
});

const getcountries = async() => {
    try {
        const response = await axios.get("https://corona.lmao.ninja/countries/thailand");
        return response.data
      } catch (error) {
        return error
      }
}