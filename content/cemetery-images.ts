import type { Locale } from "@/lib/i18n";

/**
 * Photographs of the Township's two cemeteries, taken from the Township's own
 * pages.
 *
 * Every description below was written after opening the file and looking at it.
 * That is not a formality: alt text that describes the wrong picture is worse
 * than none at all, because a screen reader user has no way to detect it, and
 * under ADA Title II a text alternative has to actually convey what the image
 * conveys.
 *
 * These are photographs of real graves. The descriptions name what is legibly
 * carved on the stone and nothing beyond it.
 */

export interface CemeteryPhoto {
  id: string;
  src: string;
  cemetery: "mooney" | "daggitt";
  /** CSS background-position. Keeps the subject the alt text names in frame. */
  focal?: string;
  /** Rendered as a visible caption as well as the accessible name. */
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
}

export const CEMETERY_PHOTOS: CemeteryPhoto[] = [
  {
    id: "mooney-sign",
    src: "/images/cemetery-mooney.webp",
    cemetery: "mooney",
    focal: "center 32%",
    alt: {
      en: "A wooden sign reading Mooney Cemetery, Moraine Township, standing behind a bed of flowering native plants and tall grasses, with mature trees beyond.",
      es: "Un letrero de madera que dice Mooney Cemetery, Moraine Township, colocado detrás de un cantero de plantas nativas en flor y pastos altos, con árboles maduros al fondo.",
      ru: "Деревянная табличка с надписью Mooney Cemetery, Moraine Township, стоящая за клумбой с цветущими местными растениями и высокими травами, вдали старые деревья.",
    },
    caption: {
      en: "The entrance to Mooney Cemetery on Ridge Road.",
      es: "La entrada al cementerio Mooney en Ridge Road.",
      ru: "Вход на кладбище Муни на Ридж-роуд.",
    },
  },
  {
    id: "mooney-grounds",
    src: "/images/cem-mooney2.webp",
    cemetery: "mooney",
    alt: {
      en: "A wide view across the mown lawn of Mooney Cemetery, with rows of flat and upright grave markers, small American flags placed beside several of them, mature trees along the boundary and a clear blue sky.",
      es: "Vista amplia del césped cortado del cementerio Mooney, con filas de lápidas planas y verticales, pequeñas banderas estadounidenses junto a varias de ellas, árboles maduros en el límite y un cielo azul despejado.",
      ru: "Широкий вид на подстриженный газон кладбища Муни: ряды плоских и вертикальных надгробий, у некоторых из них небольшие американские флаги, по краю участка старые деревья, ясное синее небо.",
    },
    caption: {
      en: "Mooney Cemetery remains open, and burials take place here from time to time.",
      es: "El cementerio Mooney sigue abierto y allí se realizan entierros de tiempo en tiempo.",
      ru: "Кладбище Муни остаётся действующим, здесь время от времени проводятся захоронения.",
    },
  },
  {
    id: "mooney-rain-garden",
    src: "/images/cem-raingarden.webp",
    cemetery: "mooney",
    alt: {
      en: "One of the two rain gardens at Mooney Cemetery in full bloom, planted with tall native grasses and purple, yellow and red wildflowers beside a gravel path, with grave markers and woodland behind.",
      es: "Uno de los dos jardines de lluvia del cementerio Mooney en plena floración, plantado con pastos nativos altos y flores silvestres moradas, amarillas y rojas junto a un camino de grava, con lápidas y arboleda detrás.",
      ru: "Один из двух дождевых садов на кладбище Муни в полном цвету: высокие местные травы и фиолетовые, жёлтые и красные полевые цветы у гравийной дорожки, позади надгробия и лес.",
    },
    caption: {
      en: "The rain gardens installed in 2013 to absorb the flooding that once left flat markers under water.",
      es: "Los jardines de lluvia instalados en 2013 para absorber las inundaciones que antes dejaban las lápidas planas bajo el agua.",
      ru: "Дождевые сады, устроенные в 2013 году, чтобы впитывать воду, из-за которой плоские надгробия раньше уходили под воду.",
    },
  },
  {
    id: "mooney-manfredini",
    src: "/images/cem-manfredini.webp",
    cemetery: "mooney",
    alt: {
      en: "A polished granite family marker carved with the name Manfredini at Mooney Cemetery, set behind a planting of roses, red and pink flowers and low evergreen shrubs, with a small American flag among them.",
      es: "Una lápida familiar de granito pulido con el apellido Manfredini en el cementerio Mooney, colocada detrás de un macizo de rosas, flores rojas y rosadas y arbustos perennes bajos, con una pequeña bandera estadounidense entre ellos.",
      ru: "Семейное надгробие из полированного гранита с фамилией Manfredini на кладбище Муни, за клумбой с розами, красными и розовыми цветами и низкими вечнозелёными кустами, среди них небольшой американский флаг.",
    },
    caption: {
      en: "Family plantings are maintained by relatives throughout the season.",
      es: "Las plantaciones familiares son cuidadas por los familiares durante toda la temporada.",
      ru: "Семейные посадки поддерживаются родственниками в течение всего сезона.",
    },
  },
  {
    id: "daggitt-sign",
    src: "/images/cemetery-daggitt.webp",
    cemetery: "daggitt",
    focal: "center 60%",
    alt: {
      en: "A black and gold sign reading Daggitt Cemetery, Moraine Township, mounted on a wrought iron fence, with weathered upright gravestones and mature trees on the lawn behind it.",
      es: "Un letrero negro y dorado que dice Daggitt Cemetery, Moraine Township, montado sobre una reja de hierro forjado, con lápidas verticales desgastadas y árboles maduros en el césped detrás.",
      ru: "Чёрно-золотая табличка с надписью Daggitt Cemetery, Moraine Township, закреплённая на кованой ограде; за ней на лужайке выветренные вертикальные надгробия и старые деревья.",
    },
    caption: {
      en: "Daggitt Cemetery at Lake Cook Road and St. Johns Avenue, closed to new burials.",
      es: "El cementerio Daggitt en Lake Cook Road y St. Johns Avenue, cerrado a nuevos entierros.",
      ru: "Кладбище Дэггитт на пересечении Лейк-Кук-роуд и Сент-Джонс-авеню, закрыто для новых захоронений.",
    },
  },
  {
    id: "daggitt-hessler",
    src: "/images/cem-hessler.webp",
    cemetery: "daggitt",
    alt: {
      en: "A tall white marble obelisk, the Hessler monument, carved with a shield emblem and standing among smaller upright headstones at Daggitt Cemetery, with an iron fence, orange daylilies and a road beyond.",
      es: "Un alto obelisco de mármol blanco, el monumento Hessler, tallado con un emblema de escudo y erguido entre lápidas más pequeñas en el cementerio Daggitt, con una reja de hierro, lirios anaranjados y una calle al fondo.",
      ru: "Высокий обелиск из белого мрамора, памятник Хесслеров, с резным гербовым щитом, стоящий среди меньших надгробий на кладбище Дэггитт; за ним кованая ограда, оранжевые лилейники и дорога.",
    },
    caption: {
      en: "The Hessler monument, among the tallest markers at Daggitt.",
      es: "El monumento Hessler, una de las lápidas más altas de Daggitt.",
      ru: "Памятник Хесслеров, один из самых высоких на кладбище Дэггитт.",
    },
  },
];

/**
 * The Margaretha Rudolph headstone, before and after the 2020 to 2022
 * restoration. The same stone in both photographs.
 */
export const DAGGITT_RESTORATION: CemeteryPhoto[] = [
  {
    id: "rudolph-before",
    src: "/images/cem-rudolph_broken.webp",
    cemetery: "daggitt",
    alt: {
      en: "The marble headstone of Margaretha Rudolph lying broken on the ground among fallen leaves, split into several pieces, with its German inscription and the date August 1825 still legible.",
      es: "La lápida de mármol de Margaretha Rudolph tendida y rota en el suelo entre hojas caídas, partida en varios pedazos, con su inscripción en alemán y la fecha de agosto de 1825 aún legibles.",
      ru: "Мраморное надгробие Маргареты Рудольф лежит на земле среди опавших листьев, расколотое на несколько частей; надпись на немецком языке и дата, август 1825 года, всё ещё читаются.",
    },
    caption: {
      en: "Before: found broken into four pieces.",
      es: "Antes: encontrada rota en cuatro pedazos.",
      ru: "До: найдено расколотым на четыре части.",
    },
  },
  {
    id: "rudolph-after",
    src: "/images/cem-rudolph_repaired.webp",
    cemetery: "daggitt",
    alt: {
      en: "The same headstone repaired and reset upright in fresh soil beside the cemetery’s iron fence, its carved dove and the German inscription naming Margaretha, wife of Georg Rudolph, legible once more.",
      es: "La misma lápida reparada y colocada de nuevo en pie sobre tierra fresca junto a la reja de hierro del cementerio, con su paloma tallada y la inscripción en alemán que nombra a Margaretha, esposa de Georg Rudolph, otra vez legible.",
      ru: "То же надгробие, отреставрированное и вновь установленное вертикально в свежей земле у кованой ограды кладбища; резной голубь и немецкая надпись с именем Маргареты, жены Георга Рудольфа, снова читаются.",
    },
    caption: {
      en: "After: cleaned, repaired with epoxy and reset on a restored base.",
      es: "Después: limpiada, reparada con epoxi y recolocada sobre una base restaurada.",
      ru: "После: очищено, склеено эпоксидной смолой и установлено на восстановленное основание.",
    },
  },
];

export function photosFor(cemetery: "mooney" | "daggitt"): CemeteryPhoto[] {
  return CEMETERY_PHOTOS.filter((p) => p.cemetery === cemetery);
}
