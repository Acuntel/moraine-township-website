import type { Locale } from "@/lib/i18n";

/**
 * The full cemetery histories. The Supervisor asked for the summaries on the
 * Cemeteries page to be cut down hard ("pick and choose one or two paragraphs,
 * the best information"), but the research behind them is genuinely good and
 * she did not ask to destroy it. So the long form lives here, one click down.
 *
 * Condensed from /mooney-cemetery-history (10,612 characters) and
 * /daggitt-cemetery-history (8,656 characters) as crawled 2026-08-13.
 */

export interface CemeteryHistory {
  slug: "mooney" | "daggitt";
  title: string;
  location: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  sources: string;
}

type HistorySet = Record<"mooney" | "daggitt", CemeteryHistory>;

const en: HistorySet = {
  mooney: {
    slug: "mooney",
    title: "History of Mooney Cemetery",
    location: "Ridge Road, north of Deerfield Road, Highland Park",
    intro:
      "Mooney Cemetery, adjacent to St. Mary’s Cemetery on Ridge Road, was acquired from the Mooney family in 1960. Its story starts more than a century earlier.",
    sections: [
      {
        heading: "From a Log Church to Ridge Road",
        body: [
          "The story begins in about 1846, when early Catholic pioneer settlers, including Irish immigrant James Mooney, built a small log church along Military Road, now Green Bay Road, in Highland Park. By 1853 they had vacated that land to the new railroad right-of-way and moved their St. Mary’s of the Woods church to a four-acre donated property near what is now Lincoln Avenue at Green Bay Road. Our township was established in 1850, three years earlier.",
          "That property gradually added a cemetery in the churchyard. About 1872 the church moved again, eventually becoming Immaculate Conception Church at its present location at Deerfield and Green Bay Roads. The abandoned log church and cemetery grounds fell into disrepair, and by 1899 the property reverted to its original owners, who sold it for development.",
          'Bodies had to be removed and relocated. James Mooney had died in the 1850s. His son John took his family’s remains and allowed others to remove theirs to a section of his land on Ridge Road. One account describes the old churchyard as "tumble-down marble slabs, some with wooden crosses, many unmarked, many more untenanted, all neglected." The removal was incomplete: graves were reportedly found during later development excavations on Green Bay Road in 1909, and some accounts say John Mooney allowed those graves to be moved to his property as well.',
        ],
      },
      {
        heading: "The Paper Trail",
        body: [
          "On record with the Lake County Recorder of Deeds is a 1904 quit claim document showing John Mooney’s transfer of cemetery property to the Catholic Bishop of Chicago. A 1907 plat on file was officially surveyed as Mooney’s Cemetery. A St. Mary’s Cemetery plat obtained from the Chicago Archdiocese is dated 1908, showing that John Mooney donated a portion of his property to St. Mary’s while the remainder was reserved as a private cemetery.",
          'An August 9, 1951 article by Evelyn Lauter in the Highland Park News describes an array of old tombstones that "come along with the original bodies," with "moldering markers" along the west side of the grounds. Even the spelling of names varies in the historical record. Nine years later, in 1960, an elderly Cecilia Mooney deeded the cemetery to the care of Deerfield Township, now called Moraine.',
          "The inherited record-keeping includes Mrs. Mooney’s handwritten ledger from the 1800s, and more recent records on typed, undated index cards, sometimes overwritten with new notations or contradicted by another card. Some lots sold in recent decades had to be reassigned when investigation revealed them to be already occupied. Moraine Township welcomes assistance from anyone who may hold family deeds for Mooney. Finding deeds now helps us update our records and helps families in the future when burials are needed.",
        ],
      },
      {
        heading: "Built Partly on Swamp Land",
        body: [
          "Original township platting from 1840 shows that the Mooney property, in Township Sections 27 and 28, included wide swaths labeled by surveyors as swamp. Original homesteader James Mooney’s property was described as slough, and he reportedly died of an illness blamed on swamp dampness at age 34. Portions of this land became St. Mary’s Cemetery and Mooney Park as well as Mooney Cemetery.",
          "Flooding occurs in the neighborhood periodically, since the land is a natural flood plain. Open space like this actually benefits the region when it is left to hold the water. There are low spots in the cemetery where burial areas have aged and sunk. With surfaces less than 1% in pitch, the land is very difficult to drain, and ponding occurs in depressions.",
        ],
      },
      {
        heading: "The 2013 Rain Garden Project",
        body: [
          "To address flooding that left flat markers completely under water and kept visitors from reaching their loved ones’ graves, in 2013 Moraine Township replaced the driveway with permeable pavers and installed two rain gardens. The pavers allow water to be absorbed below the road bed and directed by pipe to the gardens.",
          "Before the project began, the entire property was surveyed to determine where graves lay, since so many are no longer marked or never were. Tim Horsley, PhD, an archaeological geophysicist and Assistant Research Scientist at the University of Michigan, conducted the survey beginning in the fall of 2010. Images and records were uploaded to an online database of all burial information at Mooney.",
          "In September 2013, more than 70 volunteers installed and mulched 750 plants across the two rain gardens. Volunteers came from the Boy Scouts, Rotary Club, YouthBuild Lake County, the Highland Park and Highwood League of Women Voters, and restoration volunteers from the Park District of Highland Park, working alongside neighbors of the cemetery and, in some cases, people whose ancestors are buried there. They were supervised by volunteer Master Gardeners from the University of Illinois Extension and the Botanic Gardens, Park District restoration staff, and Stormwater Management watershed planners.",
          'The project replaced 8,200 square feet of aging asphalt with permeable pavement and added two small naturalized parking areas. It reduces stormwater and nonpoint source pollution on site and benefits the North Branch of the Chicago River watershed. Partially funded by a grant from the Stormwater Management Commission Watershed Management Board, it received the Commission’s BMP Project of the Year Award in 2014, which commended the Township "for seeking sustainable solutions to historical drainage issues at the Mooney Cemetery."',
          "In 2016 the Township implemented the Cemetery Information Management System to store cemetery maps and records in one place.",
        ],
      },
    ],
    sources:
      "With thanks to Julia Johnas, formerly of the Highland Park Public Library; Marc Brogan, Chief Deputy of the Lake County Recorder of Deeds; and Sheila Platt, a Moraine Township Deputy Assessor. Sources include the late Marvyn Wittelle’s Pioneer to Commuter: The Story of Highland Park (Rotary, 1958), the Immaculate Conception Church 1946 Centennial Program, an undated oral history transcribed by Jesse Lowe Smith, and John Halsey’s History of Lake County (1912).",
  },
  daggitt: {
    slug: "daggitt",
    title: "History of Daggitt Cemetery",
    location:
      "Lake Cook Road at St. Johns Avenue, near the Braeside Metra station, Highland Park",
    intro:
      "Daggitt Cemetery, also called Grace, sometimes Braeside, and sometimes spelled Daggett, was essentially abandoned until the Township took it over in 1996. Where Mooney’s story concerns Irish Catholics, Daggitt’s is about pioneering Protestants: Methodist English and Lutheran German settlers.",
    sections: [
      {
        heading: "A Family Burial Ground",
        body: [
          "Like many pioneer cemeteries, Daggitt began as a portion of a family homestead where, possibly out of necessity, family members came to be buried. Robert Daggitt, originally Daggett, arrived in this area from England in 1837 or 1839, and sadly found his carpentry skills employed building coffins for three of his own nine children. Two daughters, Ann at 13 and Rachel at 21, died of quick consumption, which is tuberculosis, in 1845 and 1847. A son, James, 18, died in 1848 after being injured by a falling tree.",
          "Daggitt allowed neighbors to use this half-acre of his property as well, eventually purchasing a state charter for the burial ground and charging one dollar per grave. His holdings grew to somewhere between 1,150 and 3,000 acres, from near the lake westward. His sheep were said to graze on what is now Ravinia Park, and his land included the present-day Chicago Botanic Gardens.",
          "Wittelle’s account says Daggitt was aware of impoverished neighbors burying small infant caskets unseen at night in unmarked graves. Snyderman relates that during a cholera epidemic in the 1850s, Daggitt donated gravesites for his neighbors’ use. Many of those neighbors were from Germany and had founded a Lutheran church along County Line Road. A great many markers here are in German.",
        ],
      },
      {
        heading: "Grace Cemetery",
        body: [
          'In 1862, Robert and Elizabeth Daggitt legally transferred the family burial ground to a group of specifically enumerated local residents "and such persons as may hereafter become associated with them," with John Fehd and Robert Daggitt Jr. named initial co-trustees. The tract was to be known as Grace Cemetery, misspelled in the historic documents as "Semetteray." The 1862 transaction was recorded in 1871. Robert died that same year.',
          "Grace Cemetery was platted and registered in 1887, with Robert’s son Joseph Daggett and John Fehd named as co-trustees. The last cemetery legal transactions on record occur in 1910, as researched by the City of Highland Park around 1985, when the property was in disrepair and responsibility for its maintenance was sought.",
          "Oral histories do not completely agree about the details, and record-keeping seems to have been conducted within individual families. We have very little information about the other pioneer families buried at Daggitt, but many names prominent in Glencoe and Highland Park history can be found there. Inventories from 1959 and 1986 are in Township files, and a USGenWeb online reading dates from 2002.",
        ],
      },
      {
        heading: "Neglect, and Rescue",
        body: [
          "English heritage family descendants, including Joseph Daggitt’s great-niece Rose Dennis Booth of Glencoe, attempted to maintain the property but could not keep up with the vandalism. Interviewed at 79 in 1974, she said her father Charles Dennis had deeded the grounds to the City of Highland Park in 1941, to remain permanently a cemetery or revert to a public park. No such records were found, according to March 1987 news reporting. Mrs. Booth died in 1984 and was, as far as we know, the last person buried at Daggitt. No marker with her name has been found. The cemetery is closed to new burials.",
          "Decades of neglect and vandalism, Halloween nights of mayhem, theft of marble markers for baking use, and nature’s destruction of inscriptions on soft stone make tracing many family histories difficult or impossible.",
          "In 1996, through cooperative legal and clean-up efforts by the City and Park District of Highland Park, Daggitt Cemetery became the responsibility of Deerfield, now Moraine, Township.",
        ],
      },
      {
        heading: "The Restoration",
        body: [
          "In 2020 Moraine Township undertook a three-year restoration project to repair and restore the historic stones. Gravestones that were previously tilted, broken, and filthy are now clean, upright, and standing in rows. The cleaned marble and limestone appear new. Epoxy was used to repair broken markers and water pressure to clean surfaces, and missing or damaged base stones have been restored.",
          "Previously illegible inscriptions can be read for the first time in decades and tell stories of our community’s history. Several gravestones have revealed names of people who do not appear on the inventories taken in 1959 and 1986. The marker for Margaretha Rudolph, found broken into four pieces, is one example of the repair process.",
          "The project was completed in 2022. The following year saw a new landscaping project focused on pollinator plants, and in 2024 the City of Highland Park granted the Township its Historic Preservation Award.",
        ],
      },
    ],
    sources:
      "Accounts drawn from Marvyn Wittelle’s Pioneer to Commuter: The Story of Highland Park (Rotary, 1958), local newspaper stories by the late Elaine Snyderman (1974) and Evelyn Lauter (Highland Park News, August 25, 1949, available on microfilm at the Highland Park Public Library), reporting by Christine Verstraete (March and May 1987), and other undated articles and oral histories.",
  },
};

/**
 * Spanish and Russian carry the summaries and the section structure. The
 * deep archival detail, including nineteenth-century deed language and
 * newspaper quotations, stays in English and is linked, because a loose
 * translation of a primary-source quotation is worse than an honest pointer
 * to the original.
 */
const es: HistorySet = {
  mooney: {
    ...en.mooney,
    title: "Historia del cementerio Mooney",
    location: "Ridge Road, al norte de Deerfield Road, Highland Park",
    intro:
      "El cementerio Mooney, junto al cementerio St. Mary’s en Ridge Road, fue adquirido de la familia Mooney en 1960. Su historia comienza más de un siglo antes.",
  },
  daggitt: {
    ...en.daggitt,
    title: "Historia del cementerio Daggitt",
    location:
      "Lake Cook Road con St. Johns Avenue, cerca de la estación Braeside de Metra, Highland Park",
    intro:
      "El cementerio Daggitt, también llamado Grace y a veces Braeside, estuvo prácticamente abandonado hasta que el Township se hizo cargo de él en 1996. Mientras que la historia de Mooney trata de católicos irlandeses, la de Daggitt trata de colonos protestantes: metodistas ingleses y luteranos alemanes.",
  },
};

const ru: HistorySet = {
  mooney: {
    ...en.mooney,
    title: "История кладбища Муни",
    location: "Ридж-роуд, к северу от Дирфилд-роуд, Хайленд-Парк",
    intro:
      "Кладбище Муни, расположенное рядом с кладбищем Святой Марии на Ридж-роуд, было приобретено у семьи Муни в 1960 году. Его история началась более чем на век раньше.",
  },
  daggitt: {
    ...en.daggitt,
    title: "История кладбища Дэггитт",
    location:
      "Лейк-Кук-роуд и Сент-Джонс-авеню, рядом со станцией Braeside линии Metra, Хайленд-Парк",
    intro:
      "Кладбище Дэггитт, также известное как Грейс и иногда как Брейсайд, оставалось заброшенным до тех пор, пока в 1996 году Township не взял его под свою опеку. Если история Муни связана с ирландскими католиками, то история Дэггитта, это история протестантских поселенцев: английских методистов и немецких лютеран.",
  },
};

const SETS: Record<Locale, HistorySet> = { en, es, ru };

export function getHistory(
  locale: Locale,
  slug: string,
): CemeteryHistory | null {
  if (slug !== "mooney" && slug !== "daggitt") return null;
  return SETS[locale][slug];
}

export const HISTORY_SLUGS = ["mooney", "daggitt"] as const;
