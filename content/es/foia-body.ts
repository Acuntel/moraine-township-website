import type { Dictionary, FoiaBodyKey } from "../types";

/** See content/en/foia-body.ts. */
export const foiaBody: Pick<Dictionary["foia"], FoiaBodyKey> = {
  orgHeading: "Cómo está organizado el Township",
  orgIntro:
    "Este esquema es el diagrama de bloques de las subdivisiones funcionales del Township. Cada elemento con sangría forma parte del elemento que está encima.",
  orgChart: [
    {
      label: "Moraine Township",
      children: [
        {
          label: "Junta de Síndicos",
          detail:
            "La Junta está formada por la Supervisora y cuatro síndicos, todos elegidos por los votantes del Township. Adopta el presupuesto anual y el gravamen fiscal.",
        },
        {
          label: "Oficina del Supervisor",
          children: [
            { label: "Asistencia General y Asistencia de Emergencia" },
            { label: "Despensa de alimentos" },
            {
              label: "Servicios para residentes",
              detail:
                "Incluyen pasaportes, servicio de notario e inscripción en seguros de salud.",
            },
            { label: "Transporte puerta a puerta" },
          ],
        },
        {
          label: "Oficina del Secretario",
          detail:
            "La oficina del Secretario mantiene los registros del Township, se ocupa de las reuniones y los avisos públicos, e inscribe a los votantes.",
        },
        {
          label: "Oficina del Tasador",
          detail: "La oficina del Tasador tasa las propiedades y tramita las exenciones.",
        },
        {
          label: "Administración de los cementerios",
          children: [
            { label: "Cementerio Mooney" },
            { label: "Cementerio Daggitt" },
          ],
        },
        {
          label: "Juntas, comisiones y comités",
          children: [
            { label: "Junta Comunitaria de Salud Mental" },
            { label: "Comisión de Ética" },
            { label: "Comité Asesor Ciudadano de Subvenciones" },
            { label: "Comité Asesor Latino" },
          ],
        },
      ],
    },
  ],

  membershipHeading: "Juntas, comisiones y comités",
  membershipIntro:
    "La ley de Illinois pide al Township que publique la lista de miembros de cada órgano que lo gobierna o lo asesora. Si alguna de estas listas está desactualizada, llame a la oficina del Township.",
  bodyNames: {
    board: "Junta de Síndicos",
    mentalHealth: "Junta Comunitaria de Salud Mental",
    ethics: "Comisión de Ética",
    grants: "Comité Asesor Ciudadano de Subvenciones",
    latino: "Comité Asesor Latino",
  },
  bodyNotes: {
    board:
      "Los votantes del Township eligieron a estos miembros para mandatos de 2025 a 2029.",
    mentalHealth:
      "Esta lista proviene de la publicación anual de FOIA del Township del 8 de enero de 2026.",
    ethics: "Los miembros son designados, y junto a cada uno se indica el año en que termina su mandato.",
    grants:
      "Esta lista proviene de la publicación anual de FOIA del Township del 8 de enero de 2026. El comité revisa las solicitudes de subvención y recomienda las adjudicaciones a la Junta de Síndicos.",
    latino:
      "Esta lista proviene de la publicación anual de FOIA del Township del 8 de enero de 2026, que indica el 30 de junio de 2026 como fin del mandato de cada miembro. Llame a la oficina del Township para conocer la lista actual.",
  },
  memberRoles: {
    supervisor: "Supervisora",
    trustee: "Síndico",
    trusteeWoman: "Síndica",
    clerkNonVoting: "Secretaria de la Junta, sin derecho a voto",
    chair: "Presidente",
    secretary: "Secretario/a",
    trusteeLiaison: "enlace de la Junta de Síndicos",
    administrator: "Administradora",
    termEnds: "su mandato termina en {year}",
    cityCouncilLiaison: "enlace del Concejo Municipal de Highland Park",
    staffLiaison: "enlace del personal del Township",
    district113Liaison: "enlace de la Junta del Distrito 113",
  },

  imrfHeading: "Fondo de Jubilación Municipal de Illinois",
  imrfBody:
    "Moraine Township participa en el Fondo de Jubilación Municipal de Illinois (IMRF). Como exige la ley de Illinois (40 ILCS 5/7-135.5), este enlace lleva a la información que el IMRF publica sobre cada empleador participante: la fecha en que empezó a participar, sus aportaciones pasadas y previstas, y sus resoluciones de participación. La página del IMRF está en inglés.",
  imrfLink: "Información del IMRF sobre costos y participación de empleadores",
};
