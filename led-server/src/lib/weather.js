import dayjs from 'dayjs'

class Weather {
    constructor() {
        /** @type dayjs */
        this.lastRequest = null
        this.data = null
    }

    async loadTemp() {
        const location = '607497'
        const apikey = 'gjvPz6TfHUQ6k4wtWJgawuuDq264YBOU'
        let resp = await fetch(
            `http://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${apikey}&language=ru-ru`,
            { method: 'GET' }
        )
        let json = await resp.json()
        //console.log('json',json)
        return json[0].Temperature.Metric.Value
    }

    async getTemp() {
        let needLoad = true
        if (this.lastRequest) {
            let diff = dayjs().diff(this.lastRequest,"seconds")
            //console.log('diff',diff)
            if (diff < 30*60) {
                needLoad = false
            }
        }
        if (needLoad) {
            this.lastRequest = dayjs()
            this.data = await this.loadTemp()
            console.log('loaded',this.lastRequest.format())
        }
        return this.data
    }
}

export default new Weather()

/*
[
    {
    "LocalObservationDateTime":"2021-05-30T18:55:00+03:00",
    "EpochTime":1622390100,
    "WeatherText":"Солнечно",
    "WeatherIcon":1,
    "HasPrecipitation":false,
    "PrecipitationType":null,
    "IsDayTime":true,
    "Temperature":{
        "Metric":{
            "Value":12.8,
            "Unit":"C",
            "UnitType":17
        },
        "Imperial":{
        "Value":55.0,
        "Unit":"F",
        "UnitType":18
        }
    },
    "MobileLink":"http://m.accuweather.com/ru/ru/grazhdanka/607497/current-weather/607497",
    "Link":"http://www.accuweather.com/ru/ru/grazhdanka/607497/current-weather/607497"
    }
]
*/
