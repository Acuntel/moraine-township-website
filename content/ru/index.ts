import type { Dictionary } from "../types";
import { common, footer, leadCapture, nav, notFound } from "./site";
import { foiaEmployees, grantees, minutesCards, shared } from "./shared";
import { about, foodPantry, home, services } from "./pages-a";
import { assessor, boardMeetings, cemeteries, transportation } from "./pages-b";
import {
  accessibility,
  contact,
  donate,
  foia,
  getInvolved,
  programs,
  thankYou,
} from "./pages-c";

export const ru: Dictionary = {
  locale: "ru",
  shared,
  common,
  nav,
  footer,
  leadCapture,
  notFound,
  home,
  about,
  services,
  foodPantry,
  assessor,
  transportation,
  boardMeetings: { ...boardMeetings, minutesCards },
  cemeteries,
  programs: { ...programs, grantees },
  getInvolved,
  donate,
  thankYou,
  foia: { ...foia, ...foiaEmployees },
  contact,
  accessibility,
};
