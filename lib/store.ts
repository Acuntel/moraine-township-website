import { head, list, put } from "@vercel/blob";

/**
 * Storage for the content the Township edits itself: news, events, the food
 * pantry shopping list, board agendas and photographs.
 *
 * Backed by Vercel Blob, which holds both the content JSON and the uploaded
 * image files. One store covers both, and it is the same mechanism already used
 * by the other sites on this account.
 *
 * When no store is configured the site still renders from the seed values
 * below, and the admin panel says plainly that saving is not connected rather
 * than accepting edits and dropping them.
 */

export const STORE_CONFIGURED = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/** Fixed path so every deploy reads and writes the same document. */
const CONTENT_PATH = "content/site.json";

export interface NewsTranslation {
  title: string;
  summary: string;
  body: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  date: string;
  published: boolean;
  /** Optional image, chosen from the photo library. */
  image?: string;
  imageAlt?: string;
  es?: NewsTranslation;
  ru?: NewsTranslation;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
}

export interface PantryList {
  updated: string;
  items: string[];
  itemsEs?: string[];
  itemsRu?: string[];
}

export interface AgendaItem {
  id: string;
  title: string;
  meetingDate: string;
  url?: string;
  body?: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface SiteContent {
  news: NewsItem[];
  events: EventItem[];
  pantry: PantryList;
  agendas: AgendaItem[];
  photos: PhotoItem[];
}

/**
 * Seed content. Everything here was published on morainetownship.org as of the
 * crawl on 2026-08-13, so a fresh deployment shows true information rather than
 * placeholder text.
 */
export const SEED: SiteContent = {
  news: [
    {
      id: "seed-senior-freeze",
      slug: "revised-senior-tax-freeze",
      title: "Revised senior tax freeze",
      summary:
        "The senior tax freeze schedule has been revised for 2026. Contact the Assessor’s office at 847-432-2100 to confirm your exemption.",
      body: "The Moraine Township Assessor’s Office has posted a revised senior tax freeze schedule for 2026. If you are 65 or older, qualified for the Senior Homestead Exemption, and have a total household income of $65,000 or less, the assessed value of your property can be frozen. This exemption must be renewed annually. Call the Assessor’s Office at 847-432-2100 with any questions, or file online through the Lake County e-file system.",
      date: "2026-01-15",
      published: true,
      es: {
        title: "Congelamiento revisado del impuesto para personas mayores",
        summary:
          "El calendario del congelamiento del impuesto para personas mayores fue revisado para 2026. Comuníquese con la Oficina del Tasador al 847-432-2100 para confirmar su exención.",
        body: "La Oficina del Tasador de Moraine Township publicó un calendario revisado del congelamiento del impuesto para personas mayores para 2026. Si tiene 65 años o más, califica para la Exención de Vivienda para Personas Mayores y su ingreso familiar total es de $65,000 o menos, el valor tasado de su propiedad puede quedar congelado. Esta exención debe renovarse cada año. Llame a la Oficina del Tasador al 847-432-2100 si tiene preguntas, o preséntela en línea a través del sistema del condado de Lake.",
      },
      ru: {
        title: "Пересмотренное замораживание налога для пожилых людей",
        summary:
          "График замораживания налога для пожилых людей пересмотрен на 2026 год. Позвоните в офис Оценщика по телефону 847-432-2100, чтобы подтвердить свою льготу.",
        body: "Офис Оценщика Moraine Township опубликовал пересмотренный график замораживания налога для пожилых людей на 2026 год. Если вам 65 лет или больше, вы имеете право на льготу для пожилых домовладельцев и общий доход вашего домохозяйства составляет 65 000 долларов или менее, оценочная стоимость вашей недвижимости может быть заморожена. Эту льготу необходимо продлевать ежегодно. Звоните в офис Оценщика по телефону 847-432-2100 или подайте заявление онлайн через систему округа Лейк.",
      },
    },
    {
      id: "seed-pantry-hours",
      slug: "food-pantry-hours",
      title: "Food Pantry open three days a week",
      summary:
        "The Moraine Township Food Pantry is open Monday, Tuesday and Wednesday. All income-qualified Township residents are eligible.",
      body: "The Moraine Township Food Pantry is open Monday from 2:00 to 4:00 p.m., Tuesday from 10:00 a.m. to noon, and Wednesday from 1:30 to 3:30 p.m. All income-qualified Moraine Township residents are eligible to visit. Applications are available in English, Spanish and Russian. Pantry visitors receive produce, dairy, meat, bread and shelf-stable food. Questions can go to Gissele Valle at 847-432-3240.",
      date: "2026-07-12",
      published: true,
      es: {
        title: "La despensa de alimentos abre tres días por semana",
        summary:
          "La despensa de alimentos de Moraine Township abre lunes, martes y miércoles. Todos los residentes del Township que califican por ingresos son elegibles.",
        body: "La despensa de alimentos de Moraine Township abre los lunes de 2:00 a 4:00 p.m., los martes de 10:00 a.m. a mediodía y los miércoles de 1:30 a 3:30 p.m. Todos los residentes de Moraine Township que califican por ingresos pueden visitarla. Las solicitudes están disponibles en inglés, español y ruso. Quienes visitan la despensa reciben productos frescos, lácteos, carne, pan y alimentos no perecederos. Para preguntas, llame a Gissele Valle al 847-432-3240.",
      },
      ru: {
        title: "Продовольственная кладовая работает три дня в неделю",
        summary:
          "Продовольственная кладовая Moraine Township открыта в понедельник, вторник и среду. Право на посещение имеют все жители Township, соответствующие требованиям по доходу.",
        body: "Продовольственная кладовая Moraine Township открыта в понедельник с 14:00 до 16:00, во вторник с 10:00 до 12:00 и в среду с 13:30 до 15:30. Посещать её могут все жители Moraine Township, соответствующие требованиям по доходу. Заявления доступны на английском, испанском и русском языках. Посетители получают овощи и фрукты, молочные продукты, мясо, хлеб и продукты длительного хранения. По вопросам звоните Жизель Валье по телефону 847-432-3240.",
      },
    },
  ],
  events: [],
  pantry: {
    // From /food-pantry-shopping-list as crawled 2026-08-13.
    updated: "2026-07-12",
    items: [
      "Cereal",
      "Lentils",
      "Sugar",
      "Pasta sauce",
      "Mayonnaise",
      "Multi-purpose cleaner",
    ],
    itemsEs: [
      "Cereal",
      "Lentejas",
      "Azúcar",
      "Salsa para pasta",
      "Mayonesa",
      "Limpiador multiusos",
    ],
    itemsRu: [
      "Хлопья",
      "Чечевица",
      "Сахар",
      "Соус для пасты",
      "Майонез",
      "Универсальное чистящее средство",
    ],
  },
  agendas: [],
  photos: [],
};

/**
 * Blob URLs are content-addressed, so the public URL changes on every write.
 * The current one is looked up by prefix rather than cached, and the read is
 * never allowed to take the public site down with it.
 */
export async function readContent(): Promise<SiteContent> {
  if (!STORE_CONFIGURED) return SEED;
  try {
    const { blobs } = await list({ prefix: CONTENT_PATH, limit: 1 });
    if (blobs.length === 0) return SEED;

    const response = await fetch(blobs[0].url, { cache: "no-store" });
    if (!response.ok) return SEED;

    const parsed = (await response.json()) as Partial<SiteContent>;
    // Merge over the seed so a document written by an older version of the
    // admin never leaves a section undefined at render time.
    return {
      news: parsed.news ?? SEED.news,
      events: parsed.events ?? SEED.events,
      pantry: parsed.pantry ?? SEED.pantry,
      agendas: parsed.agendas ?? SEED.agendas,
      photos: parsed.photos ?? SEED.photos,
    };
  } catch {
    return SEED;
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  if (!STORE_CONFIGURED) {
    throw new Error("CONTENT_STORE_NOT_CONFIGURED");
  }
  await put(CONTENT_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    contentType: "application/json",
    // One document, overwritten in place, so there is a single current version.
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

/** Confirms the store is reachable, for the admin's status panel. */
export async function storeReachable(): Promise<boolean> {
  if (!STORE_CONFIGURED) return false;
  try {
    await list({ limit: 1 });
    return true;
  } catch {
    return false;
  }
}

export async function contentExists(): Promise<boolean> {
  if (!STORE_CONFIGURED) return false;
  try {
    const { blobs } = await list({ prefix: CONTENT_PATH, limit: 1 });
    if (blobs.length === 0) return false;
    await head(blobs[0].url);
    return true;
  } catch {
    return false;
  }
}

export function publishedNews(content: SiteContent): NewsItem[] {
  return content.news
    .filter((item) => item.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * The news item as the reader should see it, plus whether it fell back to the
 * original language. Callers show a note when `translated` is false.
 */
export function localizedNews(
  item: NewsItem,
  locale: string,
): NewsTranslation & { translated: boolean } {
  const t = locale === "es" ? item.es : locale === "ru" ? item.ru : undefined;
  if (locale === "en" || !t || !t.title) {
    return {
      title: item.title,
      summary: item.summary,
      body: item.body,
      translated: locale === "en",
    };
  }
  return { ...t, translated: true };
}

/** Pantry items in the reader's language, falling back per list. */
export function localizedPantryItems(
  pantry: PantryList,
  locale: string,
): { items: string[]; translated: boolean } {
  const t =
    locale === "es"
      ? pantry.itemsEs
      : locale === "ru"
        ? pantry.itemsRu
        : undefined;
  if (locale === "en" || !t || t.length === 0) {
    return { items: pantry.items, translated: locale === "en" };
  }
  return { items: t, translated: true };
}
