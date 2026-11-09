/**
 * Справочник городов России с координатами для стилизованной SVG-карты (viewBox 1000x520)
 * и реальными географическими координатами [широта, долгота].
 *
 * Когда вы добавляете новый театр в src/data/theatres.ts, достаточно указать
 * поле `cityKey` (например, "moscow", "spb", "novosibirsk", "ekaterinburg"),
 * и точка автоматически встанет на нужное место на карте России!
 */

export interface CityLocation {
  name: string;
  region: string;
  /** Координаты на SVG-карте России (X: 0..1000, Y: 0..520) */
  mapCoords: { x: number; y: number };
  /** Реальные гео-координаты [lat, lng] */
  geoCoords: [number, number];
}

export const RUSSIA_CITIES: Record<string, CityLocation> = {
  kaliningrad: {
    name: "Калининград",
    region: "Калининградская область",
    mapCoords: { x: 88, y: 245 },
    geoCoords: [54.7104, 20.4522],
  },
  spb: {
    name: "Санкт-Петербург",
    region: "Северо-Запад",
    mapCoords: { x: 162, y: 192 },
    geoCoords: [59.9343, 30.3351],
  },
  murmansk: {
    name: "Мурманск",
    region: "Мурманская область",
    mapCoords: { x: 195, y: 98 },
    geoCoords: [68.9585, 33.0827],
  },
  petrozavodsk: {
    name: "Петрозаводск",
    region: "Республика Карелия",
    mapCoords: { x: 182, y: 168 },
    geoCoords: [61.7849, 34.3469],
  },
  moscow: {
    name: "Москва",
    region: "Центральная Россия",
    mapCoords: { x: 195, y: 256 },
    geoCoords: [55.7558, 37.6173],
  },
  yaroslavl: {
    name: "Ярославль",
    region: "Ярославская область",
    mapCoords: { x: 214, y: 236 },
    geoCoords: [57.6261, 39.8845],
  },
  tula: {
    name: "Тула",
    region: "Тульская область",
    mapCoords: { x: 192, y: 278 },
    geoCoords: [54.1931, 37.6173],
  },
  voronezh: {
    name: "Воронеж",
    region: "Воронежская область",
    mapCoords: { x: 190, y: 312 },
    geoCoords: [51.6608, 39.2003],
  },
  rostov: {
    name: "Ростов-на-Дону",
    region: "Ростовская область",
    mapCoords: { x: 178, y: 358 },
    geoCoords: [47.2357, 39.7015],
  },
  krasnodar: {
    name: "Краснодар",
    region: "Краснодарский край",
    mapCoords: { x: 164, y: 384 },
    geoCoords: [45.0355, 38.9753],
  },
  sochi: {
    name: "Сочи",
    region: "Краснодарский край",
    mapCoords: { x: 168, y: 408 },
    geoCoords: [43.5855, 39.7231],
  },
  nizhny: {
    name: "Нижний Новгород",
    region: "Нижегородская область",
    mapCoords: { x: 238, y: 262 },
    geoCoords: [56.2965, 43.9361],
  },
  kazan: {
    name: "Казань",
    region: "Республика Татарстан",
    mapCoords: { x: 274, y: 278 },
    geoCoords: [55.7961, 49.1064],
  },
  samara: {
    name: "Самара",
    region: "Самарская область",
    mapCoords: { x: 272, y: 312 },
    geoCoords: [53.1959, 50.1002],
  },
  saratov: {
    name: "Саратов",
    region: "Саратовская область",
    mapCoords: { x: 242, y: 328 },
    geoCoords: [51.5336, 46.0343],
  },
  volgograd: {
    name: "Волгоград",
    region: "Волгоградская область",
    mapCoords: { x: 222, y: 354 },
    geoCoords: [48.708, 44.5133],
  },
  perm: {
    name: "Пермь",
    region: "Пермский край",
    mapCoords: { x: 332, y: 258 },
    geoCoords: [58.0105, 56.2502],
  },
  ufa: {
    name: "Уфа",
    region: "Республика Башкортостан",
    mapCoords: { x: 322, y: 304 },
    geoCoords: [54.7388, 55.9721],
  },
  ekaterinburg: {
    name: "Екатеринбург",
    region: "Урал • Свердловская область",
    mapCoords: { x: 368, y: 278 },
    geoCoords: [56.8389, 60.6057],
  },
  chelyabinsk: {
    name: "Челябинск",
    region: "Урал • Челябинская область",
    mapCoords: { x: 366, y: 306 },
    geoCoords: [55.1644, 61.4368],
  },
  tyumen: {
    name: "Тюмень",
    region: "Тюменская область",
    mapCoords: { x: 408, y: 282 },
    geoCoords: [57.1522, 65.5272],
  },
  omsk: {
    name: "Омск",
    region: "Омская область",
    mapCoords: { x: 454, y: 318 },
    geoCoords: [54.9885, 73.3242],
  },
  novosibirsk: {
    name: "Новосибирск",
    region: "Сибирь • Новосибирская область",
    mapCoords: { x: 518, y: 324 },
    geoCoords: [55.0084, 82.9357],
  },
  tomsk: {
    name: "Томск",
    region: "Сибирь • Томская область",
    mapCoords: { x: 536, y: 298 },
    geoCoords: [56.4846, 84.9476],
  },
  barnaul: {
    name: "Барнаул",
    region: "Алтайский край",
    mapCoords: { x: 524, y: 352 },
    geoCoords: [53.3474, 83.7784],
  },
  krasnoyarsk: {
    name: "Красноярск",
    region: "Сибирь • Красноярский край",
    mapCoords: { x: 588, y: 306 },
    geoCoords: [56.0153, 92.8932],
  },
  irkutsk: {
    name: "Иркутск",
    region: "Прибайкалье • Иркутская область",
    mapCoords: { x: 664, y: 348 },
    geoCoords: [52.287, 104.305],
  },
  ulanUde: {
    name: "Улан-Удэ",
    region: "Республика Бурятия",
    mapCoords: { x: 696, y: 362 },
    geoCoords: [51.8335, 107.5841],
  },
  yakutsk: {
    name: "Якутск",
    region: "Республика Саха (Якутия)",
    mapCoords: { x: 775, y: 205 },
    geoCoords: [62.0355, 129.6755],
  },
  khabarovsk: {
    name: "Хабаровск",
    region: "Дальний Восток",
    mapCoords: { x: 862, y: 368 },
    geoCoords: [48.4802, 135.0719],
  },
  vladivostok: {
    name: "Владивосток",
    region: "Приморский край",
    mapCoords: { x: 856, y: 424 },
    geoCoords: [43.1155, 131.8855],
  },
};

export function resolveTheatreCoords(
  cityKey?: string,
  customCoords?: { x: number; y: number }
): { x: number; y: number } {
  if (customCoords) return customCoords;
  if (cityKey && RUSSIA_CITIES[cityKey]) {
    return RUSSIA_CITIES[cityKey].mapCoords;
  }
  return { x: 195, y: 256 }; // По умолчанию Москва
}
