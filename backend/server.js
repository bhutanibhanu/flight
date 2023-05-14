import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import axios from "axios"
import Amadeus from "amadeus"

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

const PORT = 8000

const amadeus = new Amadeus({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

app.get('/city/:endpoint?', async (req, res) => {
    const endpoint = req.params.endpoint || '';
    const url = `https://www.skyscanner.co.in/g/autosuggest-search/api/v1/search-flight/IN/en-GB/${endpoint}`

    try{
        const response = await axios.get(url)
        const data = response.data.map((item) => {
            return {
              PlaceId: item.PlaceId,
              PlaceName: item.PlaceName,
              IataCode: item.IataCode || "",
              CityName: item.CityName || ""
            };
          });
        res.send(data)
    } catch(error){
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.get(`/flight-search`, (req, res) => {
    const originCode = req.query.originCode;
    const destinationCode = req.query.destinationCode;
    const dateOfDeparture = req.query.dateOfDeparture
    // Find the cheapest flights
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: dateOfDeparture,
        adults: '1',
        max: '7'
    }).then(function (response) {
        res.send(response.result);
    }).catch(function (response) {
        res.send(response);
    });
    });



app.listen(PORT , () => console.log(`server is listening on http://localhost:8000/`))