import type { Dictionary } from "../types";
import { common, footer, leadCapture, nav, notFound } from "./site";
import {
  foiaEmployees,
  grantees,
  minutesCards,
  noticeGroups,
  shared,
} from "./shared";
import { about, home, services } from "./pages-a";
import { officialPhotoAlts, pantryImageAlt } from "./photos";
import {
  assessor,
  boardMeetings,
  cemeteries,
  foodPantry,
  transportation,
} from "./pages-b";
import {
  accessibility,
  contact,
  donate,
  foia,
  getInvolved,
  programs,
  thankYou,
} from "./pages-c";

export const es: Dictionary = {
  locale: "es",
  shared,
  common,
  nav,
  footer,
  leadCapture,
  notFound,
  home,
  about: { ...about, officialPhotoAlts },
  services,
  foodPantry: { ...foodPantry, imageAlt: pantryImageAlt },
  assessor,
  transportation,
  boardMeetings: { ...boardMeetings, minutesCards },
  cemeteries,
  programs: { ...programs, grantees },
  getInvolved,
  donate,
  thankYou,
  foia: { ...foia, ...foiaEmployees, noticeGroups },
  contact,
  accessibility,
};
