import { TimePeriod, type WeatherMediaDetails } from "../types";

export const getTimePeriod = (date: Date = new Date()): TimePeriod => {
  const currentHour = date.getHours();

  if (currentHour >= 6 && currentHour < 18) {
    return TimePeriod.Day;
  }

  return TimePeriod.Night;
};

export const getIcon = (period: TimePeriod) => (day: string, night: string) => {
  const variation = period === TimePeriod.Day ? day : night;

  return `wi-${period}-${variation}`;
};

export const getWeatherMediaDetailsFrom = (
  code: number,
  period: TimePeriod
): WeatherMediaDetails => {
  /*
    Code        -> Description
    0           -> Clear sky
    1, 2, 3     -> Mainly clear, partly cloudy, and overcast
    45, 48      -> Fog and depositing rime fog
    51, 53, 55  -> Drizzle: Light, moderate, and dense intensity
    56, 57      -> Freezing Drizzle: Light and dense intensity
    61, 63, 65  -> Rain: Slight, moderate and heavy intensity
    66, 67      -> Freezing Rain: Light and heavy intensity
    71, 73, 75  -> Snow fall: Slight, moderate, and heavy intensity
    77          -> Snow grains
    80, 81, 82  -> Rain showers: Slight, moderate, and violent
    85, 86      -> Snow showers slight and heavy
    95 *        -> Thunderstorm: Slight or moderate
    96, 99 *    -> Thunderstorm with slight and heavy hail
  */

  const icon = getIcon(period);

  if ([0].includes(code)) {
    return {
      icon: icon("sunny", "clear"),
      description: "Clear sky",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/photo-1623846736569-1d90cba76d65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
          "https://images.unsplash.com/photo-1617142137869-325955e2d3cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
          "https://images.unsplash.com/photo-1462524500090-89443873e2b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1517838503506-3b561768809d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
          "https://images.unsplash.com/photo-1655997863761-d173392b2587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1534371485328-a30cc1f849b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80",
        ],
      },
    };
  }

  if ([1, 2, 3].includes(code)) {
    return {
      icon: icon("cloudy", "alt-cloudy"),
      description: "Partly cloud",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/photo-1608471562901-b6c1a1132539?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1556032743-69fa16a14fb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1613379293095-d81837c1502d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1604083142449-79b1babd12d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1497490289391-7f819265b05a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80",
          "https://images.unsplash.com/photo-1486411959861-41a3eb8da389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        ],
      },
    };
  }

  if ([45, 48].includes(code)) {
    return {
      icon: icon("fog", "fog"),
      description: "Fog",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/photo-1553763067-36846297f54d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1835&q=80",
          "https://images.unsplash.com/photo-1505672678657-cc7037095e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1497216429614-5bd7dbd9fc48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80",
          "https://images.unsplash.com/photo-1634461909815-fbfe910c162c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80",
        ],
      },
    };
  }

  if ([51, 53, 55].includes(code)) {
    return {
      icon: icon("showers", "alt-showers"),
      description: "Drizzle",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/photo-1600415684478-744cf4f8f8d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1654262306933-6a8df67b5c35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80",
        ],
      },
    };
  }

  if ([56, 57].includes(code)) {
    return {
      icon: icon("rain-mix", "alt-rain-mix"),
      description: "Freezing Drizzle",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/photo-1600415684478-744cf4f8f8d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1654262306933-6a8df67b5c35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80",
        ],
      },
    };
  }

  if ([61, 63, 65].includes(code)) {
    return {
      icon: icon("rain", "alt-rain"),
      description: "Rain",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/photo-1531131195136-b6c56677e314?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1523965422831-c6dcc7272e77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
        ],
      },
    };
  }

  if ([66, 67].includes(code)) {
    return {
      icon: icon("rain", "alt-rain"),
      description: "Freezing Rain",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/photo-1645221986876-8e3255ba006c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1621124266180-727515a3974a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1463780324318-d1a8ddc05a11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        ],
      },
    };
  }

  if ([71, 73, 75, 77].includes(code)) {
    return {
      icon: icon("snow", "alt-snow"),
      description: "Snow Fall",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/photo-1579169559034-4d5f2c407edc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1625619452995-7f8d57448c1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1573669057147-97499c76f739?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2180&q=80",
        ],
      },
    };
  }

  if ([80, 81, 82].includes(code)) {
    return {
      icon: icon("showers", "alt-showers"),
      description: "Rain showers",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/uploads/14116603688211a68546c/30f8f30b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1494824789449-08323153c06e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1492227982298-644b223e666d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        ],
      },
    };
  }

  if ([85, 86].includes(code)) {
    return {
      icon: icon("snow", "alt-snow"),
      description: "Snow showers",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/photo-1611492593325-ee9f1c0c7d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1516715094483-75da7dee9758?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1457270508644-1e4905fabd7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
          "https://images.unsplash.com/photo-1561378552-1a7f6f193840?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
        ],
      },
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      icon: icon("thunderstorm", "alt-thunderstorm"),
      description: "Thunderstorm",
      images: {
        [TimePeriod.Day]: [
          "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
          "https://images.unsplash.com/photo-1576290134419-915a21939122?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        ],
        [TimePeriod.Night]: [
          "https://images.unsplash.com/photo-1527572756213-1cda99a355c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1502038971589-c21cc5121366?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80",
        ],
      },
    };
  }
};
