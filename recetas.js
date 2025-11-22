// RECETAS NAVIDEÑAS GOURMET
// 40 aperitivos, 40 primeros, 40 segundos, 40 postres
// Puedes ir mejorando los ingredientes y pasos de las recetas con texto "Por definir..."

const RECETAS = [
  /*********************
   * APERITIVOS (40)
   *********************/

  // 1 COMPLETA
  {
    id: "aperitivo-1",
    title: "Tartaletas de foie con manzana caramelizada",
    category: "aperitivo",
    servings: "6",
    time: "25 min",
    difficulty: "Media",
    image: "", // ruta imagen si la tienes, ej: "img/aperitivos/tartaletas-foie.jpg"
    ingredients: [
      "12 tartaletas saladas pequeñas",
      "150 g de micuit de foie gras",
      "2 manzanas tipo Golden",
      "20 g de mantequilla",
      "1 cucharada de azúcar moreno",
      "1 chorrito de brandy (opcional)",
      "Sal en escamas",
      "Pimienta negra molida"
    ],
    steps: [
      "Pelar y cortar las manzanas en daditos pequeños.",
      "En una sartén, derretir la mantequilla y añadir la manzana y el azúcar moreno.",
      "Saltear a fuego medio hasta que la manzana esté tierna y caramelizada. Añadir el brandy y dejar evaporar.",
      "Dejar templar ligeramente la manzana.",
      "Rellenar cada tartaleta con una cucharadita de manzana caramelizada.",
      "Colocar encima un dado de foie.",
      "Acabar con una pizca de sal en escamas y pimienta recién molida."
    ]
  },

  // 2 COMPLETA
  {
    id: "aperitivo-2",
    title: "Mini volovanes de crema de marisco",
    category: "aperitivo",
    servings: "6",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: [
      "18 mini volovanes de hojaldre",
      "200 g de gambas peladas",
      "100 g de carne de cangrejo o surimi",
      "1 cebolleta",
      "30 g de mantequilla",
      "30 g de harina",
      "300 ml de fumet de pescado o leche",
      "Aceite de oliva, sal y pimienta"
    ],
    steps: [
      "Picar la cebolleta y pocharla en una sartén con un poco de aceite.",
      "Añadir las gambas troceadas y el cangrejo, saltear brevemente.",
      "Incorporar la mantequilla y la harina, cocinar 1–2 minutos.",
      "Agregar el fumet poco a poco, removiendo hasta obtener una crema espesa.",
      "Rectificar de sal y pimienta, dejar templar y rellenar los volovanes.",
      "Calentar unos minutos en el horno antes de servir."
    ]
  },

  // 3 COMPLETA
  {
    id: "aperitivo-3",
    title: "Brochetas de langostinos al ajillo",
    category: "aperitivo",
    servings: "4",
    time: "15 min",
    difficulty: "Fácil",
    image: "",
    ingredients: [
      "16 langostinos pelados",
      "3 dientes de ajo",
      "1 guindilla seca (opcional)",
      "Aceite de oliva virgen extra",
      "Perejil fresco picado",
      "Sal"
    ],
    steps: [
      "Ensartar los langostinos en brochetas (4 por brocheta).",
      "Laminar los ajos y dorarlos suavemente con la guindilla en aceite.",
      "Incorporar las brochetas y cocinar 1–2 minutos por cada lado.",
      "Espolvorear con perejil picado y sal justo antes de servir."
    ]
  },

  // 4–40: APERITIVOS PLACEHOLDER (títulos reales, texto por definir)
  {
    id: "aperitivo-4",
    title: "Canapés de salmón marinado y eneldo",
    category: "aperitivo",
    servings: "4",
    time: "15 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-5",
    title: "Bombones de queso de cabra y pistacho",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-6",
    title: "Hojaldritos de sobrasada y miel",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-7",
    title: "Cucharitas de tartar de atún rojo",
    category: "aperitivo",
    servings: "4",
    time: "25 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-8",
    title: "Mini croquetas de jamón ibérico",
    category: "aperitivo",
    servings: "6",
    time: "45 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-9",
    title: "Rollitos de calabacín rellenos de ricotta y nueces",
    category: "aperitivo",
    servings: "4",
    time: "25 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-10",
    title: "Blinis de crema agria y caviar",
    category: "aperitivo",
    servings: "4",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-11",
    title: "Tartaletas de brandada de bacalao",
    category: "aperitivo",
    servings: "4",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-12",
    title: "Chupitos de crema de marisco",
    category: "aperitivo",
    servings: "6",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-13",
    title: "Dados de tortilla trufada",
    category: "aperitivo",
    servings: "6",
    time: "25 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-14",
    title: "Mini hamburguesas de cordero con menta",
    category: "aperitivo",
    servings: "4",
    time: "35 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-15",
    title: "Crujientes de morcilla con manzana",
    category: "aperitivo",
    servings: "4",
    time: "25 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-16",
    title: "Canapés de roastbeef y rúcula",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-17",
    title: "Palitos de hojaldre con parmesano",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-18",
    title: "Empanadillas de vieiras y puerros",
    category: "aperitivo",
    servings: "4",
    time: "35 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-19",
    title: "Mini brioche de pulled pork navideño",
    category: "aperitivo",
    servings: "4",
    time: "45 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-20",
    title: "Higos rellenos de queso azul y nueces",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-21",
    title: "Brochetas caprese con pesto de albahaca",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-22",
    title: "Tostas de escalivada y anchoas",
    category: "aperitivo",
    servings: "4",
    time: "30 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-23",
    title: "Langostinos en tempura con mayonesa cítrica",
    category: "aperitivo",
    servings: "4",
    time: "25 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-24",
    title: "Tacos mini de cochinita pibil",
    category: "aperitivo",
    servings: "4",
    time: "45 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-25",
    title: "Dátiles rellenos de almendra y envueltos en bacon",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-26",
    title: "Cucharitas de ceviche de corvina",
    category: "aperitivo",
    servings: "4",
    time: "25 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-27",
    title: "Mini quiche de espinacas y queso de cabra",
    category: "aperitivo",
    servings: "4",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-28",
    title: "Gyozas de pato y naranja",
    category: "aperitivo",
    servings: "4",
    time: "35 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-29",
    title: "Chips de yuca con guacamole suave",
    category: "aperitivo",
    servings: "4",
    time: "25 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-30",
    title: "Canapés de salmón ahumado y crema de rábano",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-31",
    title: "Tartaletas de setas salteadas y trufa",
    category: "aperitivo",
    servings: "4",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-32",
    title: "Paté casero de campaña con tostas",
    category: "aperitivo",
    servings: "6",
    time: "40 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-33",
    title: "Piruletas de queso curado al horno",
    category: "aperitivo",
    servings: "4",
    time: "15 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-34",
    title: "Mejillones en escabeche casero",
    category: "aperitivo",
    servings: "4",
    time: "35 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-35",
    title: "Tostas de burrata con pesto rojo",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-36",
    title: "Rollitos de salmón y queso fresco con cebollino",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-37",
    title: "Brandada de bacalao en cucharita",
    category: "aperitivo",
    servings: "4",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-38",
    title: "Canapés de brie con confitura de frutos rojos",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-39",
    title: "Mini arenques marinados con cebolla encurtida",
    category: "aperitivo",
    servings: "4",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "aperitivo-40",
    title: "Cucharitas de hummus de remolacha y sésamo",
    category: "aperitivo",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },

  /*********************
   * PRIMEROS (40)
   *********************/

  // PRIMEROS COMPLETOS (2) + 38 placeholder, igual que arriba
  {
    id: "primero-1",
    title: "Crema de calabaza asada con jengibre y naranja",
    category: "primero",
    servings: "4",
    time: "45 min",
    difficulty: "Fácil",
    image: "",
    ingredients: [
      "800 g de calabaza pelada y troceada",
      "1 cebolla",
      "1 zanahoria",
      "1 trocito de jengibre fresco (2–3 cm)",
      "1 naranja (zumo y ralladura)",
      "700 ml de caldo de verduras",
      "2 cucharadas de aceite de oliva virgen extra",
      "50 ml de nata líquida (opcional)",
      "Sal y pimienta"
    ],
    steps: [
      "Precalentar el horno a 200 ºC y asar la calabaza con un poco de aceite 20–25 minutos.",
      "Pochar la cebolla y la zanahoria picadas en una olla con aceite.",
      "Añadir el jengibre rallado y saltear 1–2 minutos.",
      "Incorporar la calabaza asada y el caldo, cocer 10 minutos.",
      "Agregar el zumo y ralladura de naranja y triturar hasta obtener una crema fina.",
      "Añadir nata si se desea más cremosa y rectificar de sal y pimienta."
    ]
  },
  {
    id: "primero-2",
    title: "Consomé navideño de ave y verduras",
    category: "primero",
    servings: "6",
    time: "2 h",
    difficulty: "Media",
    image: "",
    ingredients: [
      "1 carcasa de pollo o gallina",
      "1 hueso de jamón (opcional)",
      "1 puerro",
      "2 zanahorias",
      "1 rama de apio",
      "1 cebolla",
      "2 l de agua",
      "Sal, pimienta y hierbas al gusto"
    ],
    steps: [
      "Colocar la carcasa de ave, el hueso y las verduras limpias en una olla con el agua.",
      "Llevar a ebullición y desespumar las impurezas que suban a la superficie.",
      "Cocer a fuego suave 1,5–2 horas.",
      "Colar el caldo, desechar los sólidos y rectificar de sal y pimienta.",
      "Servir muy caliente en tazas o platos hondos."
    ]
  },

  // PRIMEROS 3–40 placeholder (nombres resumidos)
  {
    id: "primero-3",
    title: "Sopa de marisco al aroma de anís",
    category: "primero",
    servings: "4",
    time: "40 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "primero-4",
    title: "Ensalada templada de bogavante y cítricos",
    category: "primero",
    servings: "4",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "primero-5",
    title: "Lasaña de boletus y trufa",
    category: "primero",
    servings: "4",
    time: "45 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "primero-6",
    title: "Risotto de setas silvestres y parmesano",
    category: "primero",
    servings: "4",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "primero-7",
    title: "Crema de castañas con virutas de jamón ibérico",
    category: "primero",
    servings: "4",
    time: "35 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "primero-8",
    title: "Ensalada de burrata, higos y jamón",
    category: "primero",
    servings: "4",
    time: "20 min",
    difficulty: "Fácil",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "primero-9",
    title: "Vichyssoise trufada con crujiente de puerro",
    category: "primero",
    servings: "4",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },
  {
    id: "primero-10",
    title: "Ravioli de calabaza con mantequilla y salvia",
    category: "primero",
    servings: "4",
    time: "35 min",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },

  // ... aquí seguirías con primero-11 hasta primero-40
  // TODOS con la misma estructura: category "primero",
  // texto placeholder en ingredientes y steps.

  /*********************
   * SEGUNDOS (40)
   *********************/

  {
    id: "segundo-1",
    title: "Cordero lechal asado con patatas panadera",
    category: "segundo",
    servings: "4",
    time: "1 h 45 min",
    difficulty: "Media",
    image: "",
    ingredients: [
      "1/2 cordero lechal troceado",
      "4–5 patatas medianas",
      "1 cebolla grande",
      "4 dientes de ajo",
      "200 ml de vino blanco",
      "Agua o caldo suave",
      "Aceite de oliva, sal, pimienta, romero o tomillo"
    ],
    steps: [
      "Precalentar el horno a 190 ºC.",
      "Cortar patatas y cebolla, colocarlas en una bandeja y salpimentar.",
      "Poner el cordero sobre las patatas, añadir ajos, vino blanco y un poco de agua.",
      "Hornear alrededor de 1 hora y 30 minutos, regando con los jugos.",
      "Subir la temperatura los últimos minutos para dorar bien la piel."
    ]
  },
  {
    id: "segundo-2",
    title: "Bacalao confitado con pil-pil de ajos",
    category: "segundo",
    servings: "4",
    time: "40 min",
    difficulty: "Media",
    image: "",
    ingredients: [
      "4 lomos de bacalao desalado",
      "6–8 dientes de ajo",
      "1 guindilla (opcional)",
      "Aceite de oliva virgen extra suave",
      "Sal, si fuera necesario"
    ],
    steps: [
      "Secar bien los lomos de bacalao.",
      "Cubrirlos con aceite en un cazo y confitar a fuego muy suave sin que hierva.",
      "Retirar el bacalao y dorar los ajos laminados y la guindilla en el mismo aceite.",
      "Emulsionar el pil-pil con el aceite templado moviendo la cazuela o con colador.",
      "Servir el bacalao con la salsa y los ajos por encima."
    ]
  },

  // SEGUNDOS placeholder: segundo-3 ... segundo-40
  {
    id: "segundo-3",
    title: "Cochinillo crujiente con puré de manzana",
    category: "segundo",
    servings: "4",
    time: "2 h",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  },

  // ... continuar segundo-4 a segundo-40 igual formato

  /*********************
   * POSTRES (40)
   *********************/

  {
    id: "postre-1",
    title: "Tarta de turrón blando",
    category: "postre",
    servings: "8",
    time: "30 min + frío",
    difficulty: "Fácil",
    image: "",
    ingredients: [
      "200 g de galletas tipo María",
      "80 g de mantequilla derretida",
      "400 ml de nata para montar",
      "250 g de turrón blando de Jijona",
      "250 ml de leche",
      "1 sobre de cuajada o gelatina neutra"
    ],
    steps: [
      "Triturar las galletas y mezclarlas con la mantequilla, forrar la base de un molde.",
      "Calentar la leche con el turrón troceado hasta que se deshaga.",
      "Añadir la cuajada o gelatina, mezclar bien y templar.",
      "Montar ligeramente la nata e incorporarla a la mezcla.",
      "Verter sobre la base de galleta y dejar enfriar varias horas."
    ]
  },
  {
    id: "postre-2",
    title: "Coulant de chocolate negro con corazón de avellana",
    category: "postre",
    servings: "6",
    time: "30 min",
    difficulty: "Media",
    image: "",
    ingredients: [
      "200 g de chocolate negro",
      "150 g de mantequilla",
      "150 g de azúcar",
      "4 huevos",
      "80 g de harina",
      "Crema de avellanas para el relleno"
    ],
    steps: [
      "Fundir chocolate y mantequilla.",
      "Batir huevos con azúcar e incorporar el chocolate.",
      "Añadir la harina tamizada y mezclar.",
      "Rellenar moldes engrasados con parte de la masa, poner una cucharadita de crema de avellanas y cubrir.",
      "Hornear a 200 ºC 8–10 minutos, hasta que el exterior esté hecho y el interior líquido."
    ]
  },

  // POSTRES placeholder: postre-3 ... postre-40
  {
    id: "postre-3",
    title: "Cheesecake de Baileys y chocolate blanco",
    category: "postre",
    servings: "8",
    time: "40 min + frío",
    difficulty: "Media",
    image: "",
    ingredients: ["Por definir ingredientes detallados."],
    steps: ["Por definir preparación paso a paso."]
  }

  // ... continuar con todos los títulos de postres hasta postre-40
];
