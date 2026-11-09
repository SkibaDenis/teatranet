export type EpisodeStatus = "released" | "editing" | "upcoming";

export interface VideoSource {
  /** Заголовок видеообзора */
  title: string;
  /** Короткий логлайн выпуска */
  logline: string;
  /** Статус выпуска: 'released' (вышел), 'editing' (на монтаже), 'upcoming' (в планах съёмок) */
  status: EpisodeStatus;
  /** Дата выхода или плановый месяц (например, "Ноябрь 2026") */
  releaseDate: string;
  /** Длительность видео (например, "34 мин") */
  duration?: string;
  /** ID видео на YouTube (например, "dQw4w9WgXcQ") или полная ссылка */
  youtubeId?: string;
  /** Ссылка на iframe-встраивание ВК Видео (например, "https://vk.com/video_ext.php?oid=-123&id=456&hd=2") */
  vkEmbedUrl?: string;
  /** Ссылка на Rutube / Дзен (опционально) */
  altVideoUrl?: string;
  /** Цитата ведущего-актёра об этом театре */
  hostNote: string;
}

export interface TheatreNeed {
  /** Категория поддержки: оборудование, аренда, спонсор постановки, зрители */
  category: "equipment" | "sponsorship" | "space" | "tickets";
  /** Заголовок запроса от театра */
  title: string;
  /** Описание того, чем бизнес, меценаты или зрители могут помочь театру */
  description: string;
  /** Ориентировочная сумма или формат помощи (опционально) */
  estimate?: string;
}

export interface TheatreLinks {
  website?: string;
  vk?: string;
  telegram?: string;
  afisha?: string;
  /** Прямая ссылка на донат / покупку сертификатов / поддержку конкретного театра */
  supportTheatreUrl?: string;
}

export interface TheatreEpisode {
  /** Уникальный идентификатор (латиницей, например "teatr-18-plus-rostov") */
  id: string;
  /** Номер выпуска (например, 1, 2, 3). Если театр пока только в базе без номера — null */
  episodeNumber: number | null;
  /** Название театра */
  name: string;
  /** Город */
  city: string;
  /** Ключ города из справочника cities.ts (для автоматического размещения точки на карте) */
  cityKey?: string;
  /** Ручные координаты на SVG-карте (0..1000 по X, 0..520 по Y), если нужно переопределить город */
  mapCoords?: {
    x: number;
    y: number;
  };
  /** Реальные географические координаты [широта, долгота] на случай перехода на Яндекс.Карты / MapLibre */
  geoCoords?: [number, number];
  /** Формат театра (например, "Камерный драматический театр", "Независимая театральная компания") */
  stageType: string;
  /** Год основания */
  foundedYear: number;
  /** Количество мест в зале */
  seatsCount?: number;
  /** Основатель / Художественный руководитель */
  artisticDirector: string;
  /** Адрес площадки */
  address: string;
  /** Краткое описание театра для карточки на карте */
  shortPitch: string;
  /** Развёрнутая история театра */
  fullStory: string;
  /** Знаковые спектакли репертуара */
  keyPerformances: string[];
  /** Теги жанров и особенностей */
  tags: string[];
  /** Данные о видеовыпуске проекта «Театра нет» */
  video: VideoSource;
  /** Конкретные задачи и нужды театра (для связи со спонсорами и зрителями) */
  needs: TheatreNeed[];
  /** Ссылки на ресурсы театра */
  links: TheatreLinks;
}
