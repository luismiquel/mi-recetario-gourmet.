/**
 * =============================================================
 * app.js: VERSIÓN FINAL "WALKIE-TALKIE"
 * Solución: El micrófono se destruye al hablar y se recrea al callar.
 * =============================================================
 */

"use strict";

// =============================================================
// 1. DATOS (160 RECETAS)
// =============================================================

const recetas = [
  // --- APERITIVOS (1-40) ---
  {
    id: 1,
    titulo: 'Tartaletas de salmón y eneldo',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Deliciosas tartaletas rellenas de una suave crema de queso y salmón ahumado.',
    ingredientes: 'Tartaletas pequeñas, queso crema, salmón ahumado, eneldo fresco, zumo de limón, pimienta.',
    instrucciones: 'Mezcla el queso crema con eneldo picado, zumo de limón y pimienta. Rellena las tartaletas y coloca un trozo de salmón ahumado encima.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 2,
    titulo: 'Mini volovanes de champiñones al Jerez',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pequeños volovanes de hojaldre rellenos de una bechamel cremosa con champiñones.',
    ingredientes: 'Mini volovanes, champiñones, cebolla, harina, leche, Jerez, aceite de oliva, sal.',
    instrucciones: 'Saltea la cebolla y los champiñones. Prepara una bechamel con leche y harina, añade el Jerez y el salteado. Rellena los volovanes y hornea brevemente.',
    tiempo: '25 min',
    dificultad: 'Media'
  },
  {
    id: 3,
    titulo: 'Bombones de foie con almendra',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Elegantes bocados de foie gras recubiertos de crujiente almendra picada.',
    ingredientes: 'Foie gras o micuit, almendra picada tostada, sal Maldom (opcional).',
    instrucciones: 'Forma bolitas con el foie frío. Reboza cada bolita en la almendra picada. Sirve inmediatamente o mantén en frío.',
    tiempo: '10 min',
    dificultad: 'Fácil'
  },
  {
    id: 4,
    titulo: 'Canapés de queso crema y nueces',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Una combinación sencilla pero deliciosa de texturas para montar en pan tostado.',
    ingredientes: 'Pan tostado o crackers, queso crema, nueces picadas, miel o sirope de arce, pimienta.',
    instrucciones: 'Unta el queso crema sobre el pan. Espolvorea con nueces y un hilo de miel. Sazona con pimienta si lo deseas.',
    tiempo: '5 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 5,
    titulo: 'Brochetas de langostino y piña',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Brochetas refrescantes y con contraste de sabores, el toque tropical.',
    ingredientes: 'Langostinos cocidos y pelados, piña natural o en almíbar, salsa rosa.',
    instrucciones: 'Corta la piña en dados. Alterna un langostino y un dado de piña en un pincho. Sirve con un cuenco de salsa rosa.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 6,
    titulo: 'Tortitas de blinis con caviar falso',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Blinis con crema agria y huevas de lumpo, una alternativa económica al caviar.',
    ingredientes: 'Blinis, crema agria o crème fraîche, huevas de lumpo, cebollino picado.',
    instrucciones: 'Calienta ligeramente los blinis. Coloca una cucharadita de crema agria, añade las huevas y decora con cebollino.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 7,
    titulo: 'Chupitos de crema de marisco',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Versión concentrada y cremosa de la clásica sopa de marisco en vasitos.',
    ingredientes: 'Crema de marisco (caliente o fría), gambas pequeñas cocidas, un chorrito de coñac.',
    instrucciones: 'Prepara o calienta la crema de marisco. Sirve en chupitos decorando cada uno con una gamba pequeña.',
    tiempo: '20 min',
    dificultad: 'Media'
  },
  {
    id: 8,
    titulo: 'Mini croquetas de jamón ibérico',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'El clásico español en formato mini con sabor intenso a jamón ibérico.',
    ingredientes: 'Jamón ibérico picado, mantequilla, harina, leche, nuez moscada, huevo, pan rallado, aceite.',
    instrucciones: 'Prepara la bechamel con el jamón. Deja enfriar. Forma las mini croquetas, rebózalas y fríelas hasta dorar.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 9,
    titulo: 'Hojaldritos de sobrasada y miel',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Contraste de sabor salado y dulce en un bocado crujiente.',
    ingredientes: 'Masa de hojaldre, sobrasada, miel, semillas de sésamo.',
    instrucciones: 'Corta tiras de hojaldre. Unta con sobrasada y añade un hilo de miel. Enrolla y hornea hasta dorar.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 10,
    titulo: 'Pinchos de mozzarella y tomate confitado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Variación de la Caprese con tomates dulces y albahaca.',
    ingredientes: 'Bolas de mozzarella mini, tomates cherry confitados, albahaca fresca, aceite de oliva.',
    instrucciones: 'Ensarta en un palillo la mozzarella, una hoja de albahaca y un tomate. Aliña con aceite.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 11,
    titulo: 'Mini quiches de espinacas',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Quiches individuales con relleno cremoso de espinacas y queso.',
    ingredientes: 'Masa quebrada, espinacas cocidas, huevos, nata, queso rallado, nuez moscada.',
    instrucciones: 'Cubre moldes con masa. Mezcla el relleno y vierte. Hornea hasta que estén cuajadas.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 12,
    titulo: 'Crujientes de morcilla con manzana',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Morcilla especiada y manzana caramelizada en un envoltorio crujiente.',
    ingredientes: 'Morcilla de Burgos, manzana, pasta filo, mantequilla derretida.',
    instrucciones: 'Saltea la morcilla con la manzana picada. Rellena cuadrados de pasta filo con la mezcla. Hornea.',
    tiempo: '25 min',
    dificultad: 'Media'
  },
  {
    id: 13,
    titulo: 'Canapés de aguacate y gambas',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Frescos y coloridos, con cremosidad de aguacate y sabor a mar.',
    ingredientes: 'Tostas, aguacate, gambas cocidas, cebolleta, mayonesa, pimentón.',
    instrucciones: 'Haz una mezcla de aguacate, gambas y mayonesa. Unta en las tostas y decora con cebolleta.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 14,
    titulo: 'Empanaditas de pollo especiado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Mini empanadas con un relleno jugoso y aromático.',
    ingredientes: 'Masa de empanadillas, pechuga de pollo, curry/pimentón, tomate frito, cebolla.',
    instrucciones: 'Prepara el relleno de pollo guisado. Rellena las obleas, séllalas y fríelas u hornéalas.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 15,
    titulo: 'Tartaletas de queso azul y pera',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Sabor fuerte del queso azul equilibrado con la dulzura de la pera.',
    ingredientes: 'Tartaletas, queso azul, dados de pera, nata, huevo, nueces.',
    instrucciones: 'Mezcla queso, pera, nata y huevo. Rellena tartaletas. Hornea hasta cuajar.',
    tiempo: '25 min',
    dificultad: 'Fácil'
  },
  {
    id: 16,
    titulo: 'Bocados de bacalao gratinado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pequeños trozos de bacalao con muselina de ajo gratinada.',
    ingredientes: 'Bacalao desalado, aceite, ajo, perejil.',
    instrucciones: 'Cocina el bacalao. Coloca en cazuelitas. Cubre con muselina de ajo y gratina.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 17,
    titulo: 'Tosta de roast beef con mostaza dulce',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Finas lonchas de carne asada sobre pan con salsa vibrante.',
    ingredientes: 'Pan tostado, roast beef, mostaza dulce, rúcula.',
    instrucciones: 'Unta el pan con mostaza. Coloca la rúcula y las lonchas de roast beef.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 18,
    titulo: 'Rollitos de salmón con queso',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Sencillos y visualmente atractivos, ideales fríos.',
    ingredientes: 'Salmón ahumado, queso crema, cebollino, pimienta, limón.',
    instrucciones: 'Mezcla queso con cebollino. Unta una loncha de salmón, enrolla y pincha con un palillo.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 19,
    titulo: 'Hummus con crudités navideños',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Opción vegetariana con bastones de verduras.',
    ingredientes: 'Garbanzos cocidos, tahini, limón, ajo, aceite, pimentón, verduras variadas.',
    instrucciones: 'Tritura los ingredientes del hummus. Sirve con aceite, pimentón y las verduras cortadas.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 20,
    titulo: 'Dátiles rellenos de queso y nueces',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Dulzura del dátil con queso salado y nuez.',
    ingredientes: 'Dátiles sin hueso, queso de cabra, nueces.',
    instrucciones: 'Abre los dátiles y rellena con un trozo de queso y media nuez.',
    tiempo: '5 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 21,
    titulo: 'Gougères de queso al horno',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Bocaditos de pasta choux salada con queso.',
    ingredientes: 'Agua, mantequilla, harina, huevos, queso rallado, pimienta.',
    instrucciones: 'Prepara la pasta choux con queso. Hornea porciones hasta que se hinchen y doren.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 22,
    titulo: 'Pincho de pulpo a la gallega',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pulpo cocido, patata, pimentón y aceite en formato individual.',
    ingredientes: 'Pulpo cocido, patata cocida, aceite, pimentón, sal gorda.',
    instrucciones: 'Corta el pulpo y la patata en rodajas. Monta en pinchos, aliña con aceite, sal y pimentón.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 23,
    titulo: 'Mini hamburguesas de cordero',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pequeñas hamburguesas de cordero con especias marroquíes.',
    ingredientes: 'Carne de cordero picada, pan mini, comino, cilantro, menta, salsa de yogur.',
    instrucciones: 'Mezcla carne con especias. Forma hamburguesas y cocina. Sirve en pan con salsa.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 24,
    titulo: 'Saquitos de pasta filo con setas',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Masa crujiente con relleno cremoso de setas.',
    ingredientes: 'Pasta filo, setas, ajo, perejil, nata, mantequilla.',
    instrucciones: 'Saltea setas con ajo. Mezcla con nata. Rellena pasta filo, cierra y hornea.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 25,
    titulo: 'Tostadas de tomate seco y ricotta',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Sabor intenso de tomate seco con suavidad de ricotta.',
    ingredientes: 'Pan, ricotta, tomate seco, orégano, aceite.',
    instrucciones: 'Tuesta el pan. Unta ricotta y coloca tomate seco. Espolvorea orégano.',
    tiempo: '10 min',
    dificultad: 'Fácil'
  },
  {
    id: 26,
    titulo: 'Cucharitas de tartar de atún',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Atún crudo marinado en soja y sésamo.',
    ingredientes: 'Atún fresco, soja, aceite sésamo, jengibre, semillas sésamo.',
    instrucciones: 'Corta atún en dados. Marina con el resto. Sirve en cucharitas.',
    tiempo: '20 min',
    dificultad: 'Media'
  },
  {
    id: 27,
    titulo: 'Montaditos de lomo con pimientos',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Clásico español en formato pequeño.',
    ingredientes: 'Pan, lomo de cerdo, pimientos, ajo, aceite.',
    instrucciones: 'Fríe lomo y pimientos. Coloca sobre el pan.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 28,
    titulo: 'Espirales de hojaldre y pesto',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Crujientes y aromáticos con pesto y queso.',
    ingredientes: 'Hojaldre, pesto, queso rallado, huevo.',
    instrucciones: 'Extiende pesto en hojaldre. Enrolla, corta rodajas. Pinta con huevo y hornea.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 29,
    titulo: 'Bocados de tortilla trufada',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Tortilla española con toque de trufa.',
    ingredientes: 'Huevos, patatas, aceite de trufa, aceite, sal.',
    instrucciones: 'Haz una tortilla de patatas. Añade aceite de trufa al cuajar. Corta en cubos.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 30,
    titulo: 'Crema de queso trufado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Crema untable intensa para pan artesano.',
    ingredientes: 'Queso crema, queso cabra, aceite trufa, pimienta, pan.',
    instrucciones: 'Bate los quesos con aceite de trufa. Sirve con tostadas.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 31,
    titulo: 'Langostinos en tempura',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Crujientes y ligeros, para mojar en salsa.',
    ingredientes: 'Langostinos, harina tempura, agua fría, aceite.',
    instrucciones: 'Prepara tempura. Reboza langostinos y fríe en aceite caliente.',
    tiempo: '20 min',
    dificultad: 'Media'
  },
  {
    id: 32,
    titulo: 'Brioches mini de jamón',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Bocados dulces y salados con jamón ibérico.',
    ingredientes: 'Pan brioche mini, jamón ibérico, mantequilla.',
    instrucciones: 'Corta brioche, unta mantequilla y rellena con jamón.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 33,
    titulo: 'Canapés de rúcula y parmesano',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Frescos con amargor de rúcula y salado de parmesano.',
    ingredientes: 'Pan tostado, queso crema, rúcula, parmesano, balsámico.',
    instrucciones: 'Unta pan con queso. Pon rúcula, parmesano y balsámico.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 34,
    titulo: 'Chips de boniato especiado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Alternativa saludable a patatas fritas.',
    ingredientes: 'Boniato, aceite, pimentón, comino, sal.',
    instrucciones: 'Corta boniato fino. Mezcla con especias y aceite. Hornea hasta crujir.',
    tiempo: '25 min',
    dificultad: 'Fácil'
  },
  {
    id: 35,
    titulo: 'Bolitas de queso y pistacho',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Queso tierno rebozado en pistachos.',
    ingredientes: 'Queso cabra, queso crema, pistachos, aceite.',
    instrucciones: 'Mezcla quesos, forma bolas. Reboza en pistachos. Sirve frío.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 36,
    titulo: 'Tartar de salmón sobre pepino',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Fresco, reemplazando pan por pepino.',
    ingredientes: 'Salmón fresco, pepino, aguacate, aceite, limón.',
    instrucciones: 'Corta salmón y aguacate. Aliña. Sirve sobre rodajas de pepino.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 37,
    titulo: 'Crostinis de setas',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pan crujiente con setas y queso gratinado.',
    ingredientes: 'Pan, setas, ajo, aceite, parmesano.',
    instrucciones: 'Tuesta pan. Saltea setas. Pon sobre pan, añade queso y gratina.',
    tiempo: '20 min',
    dificultad: 'Media'
  },
  {
    id: 38,
    titulo: 'Mini tacos de pollo',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Tortillas mini con pollo especiado.',
    ingredientes: 'Tortillas mini, pollo, especias, cebolla, cilantro.',
    instrucciones: 'Guisa pollo con especias. Rellena tortillas y decora.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 39,
    titulo: 'Ensaladilla rusa sobre tosta',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Versión refinada con marisco o anguila.',
    ingredientes: 'Verduras ensaladilla, mayonesa, tostas, langostinos.',
    instrucciones: 'Prepara ensaladilla. Sirve sobre tosta y decora.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 40,
    titulo: 'Bocados de bacalao pil-pil',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Bacalao en salsa de ajo y guindilla.',
    ingredientes: 'Bacalao, aceite, ajo, guindilla.',
    instrucciones: 'Confita bacalao y monta pil-pil. Sirve en cucharas.',
    tiempo: '45 min',
    dificultad: 'Difícil'
  },

  // --- PRIMEROS PLATOS (41-80) ---
  {
    id: 41,
    titulo: 'Crema de calabaza especiada',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Crema suave con toque de jengibre y coco.',
    ingredientes: 'Calabaza, caldo verduras, leche coco, jengibre, cebolla.',
    instrucciones: 'Sofríe cebolla y calabaza. Añade caldo. Cuece, tritura con leche coco y jengibre.',
    tiempo: '35 min',
    dificultad: 'Fácil'
  },
  {
    id: 42,
    titulo: 'Sopa de marisco tradicional',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Clásico festivo con pescado y marisco.',
    ingredientes: 'Pescado roca, gambas, almejas, cebolla, tomate, coñac.',
    instrucciones: 'Haz fumet. Sofríe marisco, añade fumet y cuece lento.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 43,
    titulo: 'Consomé al Jerez',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Caldo clarificado con toque de Jerez.',
    ingredientes: 'Carne ternera, huesos, verduras, huevo (clarificar), Jerez.',
    instrucciones: 'Haz caldo. Clarifica. Sirve con chorrito de Jerez.',
    tiempo: '90 min',
    dificultad: 'Media'
  },
  {
    id: 44,
    titulo: 'Crema de setas trufada',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Crema con setas y aroma de trufa.',
    ingredientes: 'Setas, caldo verduras, nata, cebolla, aceite trufa.',
    instrucciones: 'Sofríe cebolla y setas. Añade caldo. Tritura, añade nata y aceite trufa.',
    tiempo: '40 min',
    dificultad: 'Fácil'
  },
  {
    id: 45,
    titulo: 'Lasaña de espinacas y ricotta',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Lasaña vegetariana con espinacas y queso.',
    ingredientes: 'Lasaña, espinacas, ricotta, parmesano, bechamel.',
    instrucciones: 'Prepara relleno y bechamel. Monta capas y gratina.',
    tiempo: '50 min',
    dificultad: 'Media'
  },
  {
    id: 46,
    titulo: 'Ensalada templada de queso cabra',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Hojas verdes con queso fundido y miel.',
    ingredientes: 'Lechugas, queso cabra, nueces, miel, vinagre.',
    instrucciones: 'Tuesta queso. Monta ensalada y aliña con miel.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 47,
    titulo: 'Ensalada de granada y nueces',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Festiva con toque agridulce.',
    ingredientes: 'Escarola, granada, nueces, manzana, vinagreta.',
    instrucciones: 'Mezcla ingredientes. Aliña al servir.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 48,
    titulo: 'Risotto champiñones y parmesano',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Arroz cremoso con setas.',
    ingredientes: 'Arroz, champiñones, caldo, vino blanco, parmesano.',
    instrucciones: 'Sofríe cebolla y arroz. Añade vino y caldo poco a poco. Termina con queso.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 49,
    titulo: 'Arroz meloso de bogavante',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Lujo con arroz y bogavante.',
    ingredientes: 'Bogavante, arroz, caldo pescado, azafrán, sofrito.',
    instrucciones: 'Sofríe bogavante y verduras. Añade arroz y caldo. Cocina hasta meloso.',
    tiempo: '45 min',
    dificultad: 'Difícil'
  },
  {
    id: 50,
    titulo: 'Vichyssoise',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Crema de puerros y patata.',
    ingredientes: 'Puerros, patatas, caldo, nata, mantequilla.',
    instrucciones: 'Rehoga puerros. Añade patatas y caldo. Cuece, tritura, cuela y añade nata.',
    tiempo: '40 min',
    dificultad: 'Fácil'
  },
  {
    id: 51,
    titulo: 'Raviolis calabaza y salvia',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Pasta rellena con mantequilla y salvia.',
    ingredientes: 'Raviolis calabaza, mantequilla, salvia, nueces, parmesano.',
    instrucciones: 'Cuece pasta. Derrite mantequilla con salvia. Mezcla.',
    tiempo: '20 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 52,
    titulo: 'Sopa castellana con huevo',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Sopa de ajo y pan.',
    ingredientes: 'Pan duro, ajo, jamón, pimentón, caldo, huevo.',
    instrucciones: 'Sofríe ajo y jamón. Añade pan y pimentón. Vierte caldo. Cuaja huevo.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 53,
    titulo: 'Ensalada bacalao y naranja',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Refrescante con bacalao desalado.',
    ingredientes: 'Bacalao, naranja, aceitunas negras, cebolla.',
    instrucciones: 'Mezcla ingredientes y aliña.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 54,
    titulo: 'Crema zanahoria y jengibre',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Dulce con toque picante.',
    ingredientes: 'Zanahorias, jengibre, caldo, naranja.',
    instrucciones: 'Cuece zanahorias con jengibre. Tritura con caldo y zumo.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 55,
    titulo: 'Canelones de carne',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Pasta rellena de carne y bechamel.',
    ingredientes: 'Canelones, carne picada, tomate, bechamel, queso.',
    instrucciones: 'Haz relleno. Rellena pasta. Cubre con bechamel y gratina.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 56,
    titulo: 'Lentejas gourmet con foie',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Lentejas elevadas con foie.',
    ingredientes: 'Lentejas, verduras, chorizo, foie fresco.',
    instrucciones: 'Guisa lentejas. Termina con trozo de foie.',
    tiempo: '70 min',
    dificultad: 'Media'
  },
  {
    id: 57,
    titulo: 'Risotto parmesano y limón',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Cremoso y ácido.',
    ingredientes: 'Arroz, caldo, parmesano, limón.',
    instrucciones: 'Haz risotto. Añade ralladura y zumo al final.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 58,
    titulo: 'Fideuá de marisco',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Fideos con marisco y fumet.',
    ingredientes: 'Fideos, caldo pescado, marisco, sofrito.',
    instrucciones: 'Sofríe verduras y marisco. Añade fideos y caldo. Seca al horno.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 59,
    titulo: 'Ensalada pollo navideña',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Con manzana, pasas y mostaza.',
    ingredientes: 'Pollo, manzana, pasas, nueces, mostaza, miel.',
    instrucciones: 'Mezcla ingredientes y adereza.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 60,
    titulo: 'Sopa thai coco y pollo',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Exótica con leche de coco.',
    ingredientes: 'Leche coco, caldo, pollo, lemongrass, lima.',
    instrucciones: 'Calienta leche y caldo. Cocina pollo y especias.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 61,
    titulo: 'Sopa miso con setas',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Ligera y sabrosa.',
    ingredientes: 'Miso, caldo dashi, setas, tofu.',
    instrucciones: 'Calienta dashi. Disuelve miso. Añade setas y tofu.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 62,
    titulo: 'Crema queso azul',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Intenso, con crujiente.',
    ingredientes: 'Queso azul, nata, caldo, cebolla, crujiente.',
    instrucciones: 'Sofríe cebolla. Añade caldo y queso. Tritura y añade nata.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 63,
    titulo: 'Tortellini en caldo',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Pasta rellena en caldo.',
    ingredientes: 'Tortellini, caldo pollo, parmesano.',
    instrucciones: 'Cuece tortellini en caldo. Sirve con queso.',
    tiempo: '20 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 64,
    titulo: 'Alubias con almejas',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Guiso marinero.',
    ingredientes: 'Alubias, almejas, vino, ajo, perejil.',
    instrucciones: 'Sofríe ajo. Añade alubias y caldo. Abre almejas y añade.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 65,
    titulo: 'Ensalada pera y roquefort',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Fuerte y dulce.',
    ingredientes: 'Hojas, pera, roquefort, nueces, miel.',
    instrucciones: 'Combina y aliña con miel.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 66,
    titulo: 'Arroz negro con alioli',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Con tinta de calamar.',
    ingredientes: 'Arroz, caldo, calamar, tinta, alioli.',
    instrucciones: 'Sofrito con calamar. Añade arroz, tinta y caldo. Sirve con alioli.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 67,
    titulo: 'Crema marisco ligera',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Sabor puro marisco.',
    ingredientes: 'Pescado, marisco, verduras, arroz.',
    instrucciones: 'Sofríe y guisa. Tritura y cuela.',
    tiempo: '50 min',
    dificultad: 'Media'
  },
  {
    id: 68,
    titulo: 'Pasta fresca con trufa',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Sencillo con trufa.',
    ingredientes: 'Pasta, mantequilla, trufa, parmesano.',
    instrucciones: 'Cuece pasta. Mezcla con mantequilla y trufa.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 69,
    titulo: 'Ensalada salmón y mango',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Contraste sabores.',
    ingredientes: 'Salmón ahumado, mango, aguacate, lima.',
    instrucciones: 'Corta dados, mezcla y aliña.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 70,
    titulo: 'Alcachofas con jamón',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Confitadas en aceite.',
    ingredientes: 'Alcachofas, aceite, ajo, jamón.',
    instrucciones: 'Confita alcachofas. Sirve con jamón.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 71,
    titulo: 'Polenta al parmesano',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Cremosa con queso.',
    ingredientes: 'Polenta, caldo, mantequilla, parmesano.',
    instrucciones: 'Cuece polenta en caldo. Añade mantequilla y queso.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 72,
    titulo: 'Gnocchi mantequilla salvia',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Bolas de patata.',
    ingredientes: 'Gnocchi, mantequilla, salvia, parmesano.',
    instrucciones: 'Cuece gnocchi. Saltea en mantequilla y salvia.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 73,
    titulo: 'Sopa cebolla gratinada',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Clásica francesa.',
    ingredientes: 'Cebollas, caldo, pan, queso.',
    instrucciones: 'Carameliza cebolla. Añade caldo. Cubre con pan/queso y gratina.',
    tiempo: '50 min',
    dificultad: 'Media'
  },
  {
    id: 74,
    titulo: 'Hojaldre relleno setas',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Volovanes cremosos.',
    ingredientes: 'Hojaldre, setas, nata, ajo.',
    instrucciones: 'Relleno cremoso setas. Rellena hojaldre y hornea.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 75,
    titulo: 'Ceviche de lubina',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Marinado en cítricos.',
    ingredientes: 'Lubina, lima, cebolla, cilantro.',
    instrucciones: 'Marina pescado en lima. Mezcla y sirve.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 76,
    titulo: 'Pochas con verduras',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Guiso alubias frescas.',
    ingredientes: 'Pochas, pimiento, cebolla, tomate.',
    instrucciones: 'Cuece pochas. Añade sofrito verduras.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 77,
    titulo: 'Sopa verduras navideña',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Con carne y fideos.',
    ingredientes: 'Caldo, fideos, verduras, carne.',
    instrucciones: 'Calienta caldo con verduras y carne. Añade fideos.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 78,
    titulo: 'Ensalada langostinos aguacate',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Ligera con vinagreta.',
    ingredientes: 'Lechuga, langostinos, aguacate, cítricos.',
    instrucciones: 'Mezcla y aliña.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 79,
    titulo: 'Crema tomate asado',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Intenso y ahumado.',
    ingredientes: 'Tomates, caldo, ajo, albahaca.',
    instrucciones: 'Asa tomates. Tritura con caldo y cuela.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 80,
    titulo: 'Raviolis carne salsa cremosa',
    categoria: 'primero',
    img: 'placeholder.jpg',
    descripcion: 'Salsa nata y tomate.',
    ingredientes: 'Raviolis, nata, tomate.',
    instrucciones: 'Cuece pasta. Mezcla con salsa caliente.',
    tiempo: '25 min',
    dificultad: 'Fácil'
  },

  // --- SEGUNDOS PLATOS (81-120) ---
  {
    id: 81,
    titulo: 'Cordero asado tradicional',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Asado lento con patatas.',
    ingredientes: 'Cordero, patatas, manteca, vino.',
    instrucciones: 'Asa lento. Añade agua y patatas a mitad.',
    tiempo: '120 min',
    dificultad: 'Media'
  },
  {
    id: 82,
    titulo: 'Pollito relleno frutos secos',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Relleno dulce y salado.',
    ingredientes: 'Pollitos, carne, ciruelas, piñones.',
    instrucciones: 'Rellena pollos. Asa bañando con caldo.',
    tiempo: '90 min',
    dificultad: 'Difícil'
  },
  {
    id: 83,
    titulo: 'Cochinillo al horno',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Piel crujiente.',
    ingredientes: 'Cochinillo, agua, sal.',
    instrucciones: 'Asa lento. Sube fuego al final para crujir.',
    tiempo: '180 min',
    dificultad: 'Difícil'
  },
  {
    id: 84,
    titulo: 'Merluza al cava',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Salsa cremosa de cava.',
    ingredientes: 'Merluza, cava, nata, cebolla.',
    instrucciones: 'Pocha cebolla. Añade harina y el cava. Incorpora la nata y el pescado. Cocina a fuego lento hasta que esté hecho.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 85,
    titulo: 'Bacalao confitado',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Cocinado en aceite lento.',
    ingredientes: 'Bacalao, aceite, ajo.',
    instrucciones: 'Cubre con aceite. Confita fuego bajo.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 86,
    titulo: 'Solomillo Wellington',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Envuelto en hojaldre.',
    ingredientes: 'Solomillo, hojaldre, champiñones, paté.',
    instrucciones: 'Sella carne. Cubre con duxelle y hojaldre. Hornea.',
    tiempo: '60 min',
    dificultad: 'Difícil'
  },
  {
    id: 87,
    titulo: 'Lubina a la sal',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Costra de sal.',
    ingredientes: 'Lubina, sal gorda, claras huevo.',
    instrucciones: 'Cubre pescado con sal húmeda. Hornea. Rompe costra.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 88,
    titulo: 'Entrecot mantequilla hierbas',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Carne con mantequilla aromática.',
    ingredientes: 'Entrecot, mantequilla, hierbas.',
    instrucciones: 'Sella carne. Sirve con rodaja mantequilla.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 89,
    titulo: 'Pularda rellena',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Ave grande rellena.',
    ingredientes: 'Pularda, carne, manzana, frutos secos.',
    instrucciones: 'Rellena y asa regando con jugos.',
    tiempo: '180 min',
    dificultad: 'Difícil'
  },
  {
    id: 90,
    titulo: 'Rape a la marinera',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Salsa marisco.',
    ingredientes: 'Rape, gambas, almejas, caldo.',
    instrucciones: 'Sofrito. Añade caldo y marisco. Cuece.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 91,
    titulo: 'Pavo asado salsa arándanos',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Salsa agridulce.',
    ingredientes: 'Pavo, arándanos, azúcar, vino.',
    instrucciones: 'Asa pavo. Haz salsa reduciendo arándanos.',
    tiempo: '120 min',
    dificultad: 'Difícil'
  },
  {
    id: 92,
    titulo: 'Magret pato naranja',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Piel crujiente salsa cítrica.',
    ingredientes: 'Magret, naranja, miel.',
    instrucciones: 'Marca piel. Cocina. Haz salsa con zumo.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 93,
    titulo: 'Redondo ternera salsa',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Guisado en salsa verduras.',
    ingredientes: 'Redondo, verduras, vino, caldo.',
    instrucciones: 'Sella carne. Guisa con verduras y vino.',
    tiempo: '120 min',
    dificultad: 'Media'
  },
  {
    id: 94,
    titulo: 'Carrilleras vino tinto',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Melosas al vino.',
    ingredientes: 'Carrilleras, vino tinto, verduras.',
    instrucciones: 'Sella y guisa lento con vino.',
    tiempo: '180 min',
    dificultad: 'Media'
  },
  {
    id: 95,
    titulo: 'Cabrito al horno',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Asado con ajo.',
    ingredientes: 'Cabrito, ajo, vino, agua.',
    instrucciones: 'Marina y asa bañando.',
    tiempo: '150 min',
    dificultad: 'Media'
  },
  {
    id: 96,
    titulo: 'Salmón eneldo miel',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Horno o plancha.',
    ingredientes: 'Salmón, miel, eneldo, limón.',
    instrucciones: 'Unta mezcla y cocina.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 97,
    titulo: 'Lubina horno patatas',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Con panaderas.',
    ingredientes: 'Lubina, patatas, cebolla.',
    instrucciones: 'Sofríe patata. Hornea con pescado.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 98,
    titulo: 'Albóndigas salsa',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Salsa vino o almendras.',
    ingredientes: 'Carne picada, vino, almendras.',
    instrucciones: 'Forma, sella y guisa.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 99,
    titulo: 'Dorada horno cítricos',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Con limón y naranja.',
    ingredientes: 'Dorada, limón, naranja.',
    instrucciones: 'Rellena con cítricos y asa.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 100,
    titulo: 'Solomillo salsa setas',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Salsa cremosa.',
    ingredientes: 'Solomillo, setas, nata.',
    instrucciones: 'Sella carne. Haz salsa con setas y nata.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 101,
    titulo: 'Costillas glaseadas',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Dulces y pegajosas.',
    ingredientes: 'Costillas, miel, BBQ.',
    instrucciones: 'Hornea y glasea al final.',
    tiempo: '180 min',
    dificultad: 'Media'
  },
  {
    id: 102,
    titulo: 'Pollo cerveza',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Guisado en cerveza.',
    ingredientes: 'Pollo, cerveza, cebolla.',
    instrucciones: 'Sella y guisa con cerveza.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 103,
    titulo: 'Merluza rellena',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Rellena de marisco.',
    ingredientes: 'Merluza, gambas, mejillones.',
    instrucciones: 'Rellena, ata y cocina.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 104,
    titulo: 'Lubina verduras',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Con verduras asadas.',
    ingredientes: 'Lomos de lubina, verduras (brócoli, zanahoria, calabacín), aceite de oliva, limón.',
    instrucciones: 'Asa verduras y pescado.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 105,
    titulo: 'Conejo almendras',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Salsa espesa.',
    ingredientes: 'Conejo, almendras, vino.',
    instrucciones: 'Guisa con picada de almendras.',
    tiempo: '90 min',
    dificultad: 'Media'
  },
  {
    id: 106,
    titulo: 'Zarzuela marisco',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Guiso variado.',
    ingredientes: 'Pescado, marisco, tomate.',
    instrucciones: 'Guisa todo en cazuela.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 107,
    titulo: 'Brochetas solomillo',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Con verduras.',
    ingredientes: 'Solomillo, pimiento, cebolla.',
    instrucciones: 'Monta y cocina parrilla.',
    tiempo: '25 min',
    dificultad: 'Fácil'
  },
  {
    id: 108,
    titulo: 'Lomo ciruelas',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Relleno dulce.',
    ingredientes: 'Lomo, ciruelas, vino dulce.',
    instrucciones: 'Rellena y asa.',
    tiempo: '90 min',
    dificultad: 'Media'
  },
  {
    id: 109,
    titulo: 'Pato manzana',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Relleno aromático.',
    ingredientes: 'Pato, manzana, vino.',
    instrucciones: 'Rellena y asa lento.',
    tiempo: '150 min',
    dificultad: 'Difícil'
  },
  {
    id: 110,
    titulo: 'Arroz magro',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Con carne cerdo.',
    ingredientes: 'Arroz, magro, verduras.',
    instrucciones: 'Sofríe y cocina arroz.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 111,
    titulo: 'Secreto plancha',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Jugoso.',
    ingredientes: 'Secreto, sal.',
    instrucciones: 'Cocina plancha fuerte.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 112,
    titulo: 'Guiso ternera',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Con patatas.',
    ingredientes: 'Ternera, patatas, verduras.',
    instrucciones: 'Guisa hasta tierna.',
    tiempo: '120 min',
    dificultad: 'Media'
  },
  {
    id: 113,
    titulo: 'Pizza navideña',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Ingredientes festivos.',
    ingredientes: 'Masa, foie, setas.',
    instrucciones: 'Monta y hornea.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 114,
    titulo: 'Hamburguesa premium',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Carne vacuno.',
    ingredientes: 'Carne, brioche, queso.',
    instrucciones: 'Monta hamburguesa.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 115,
    titulo: 'Chuletón brasa',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Con sal gorda.',
    ingredientes: 'Chuletón, sal.',
    instrucciones: 'Cocina brasa fuerte.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 116,
    titulo: 'Salmón limón',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Sencillo plancha.',
    ingredientes: 'Salmón, limón.',
    instrucciones: 'Cocina plancha.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 117,
    titulo: 'Cordero romero',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Ajo y hierbas.',
    ingredientes: 'Cordero, romero, ajo.',
    instrucciones: 'Mecha y asa.',
    tiempo: '120 min',
    dificultad: 'Media'
  },
  {
    id: 118,
    titulo: 'Pulpo parrilla',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Crujiente.',
    ingredientes: 'Pulpo, pimentón.',
    instrucciones: 'Dora en parrilla.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 119,
    titulo: 'Atún soja',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Marinado.',
    ingredientes: 'Atún, soja, jengibre.',
    instrucciones: 'Sella rápido.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 120,
    titulo: 'Bacalao pil-pil',
    categoria: 'segundo',
    img: 'placeholder.jpg',
    descripcion: 'Salsa ligada.',
    ingredientes: 'Bacalao, aceite, ajo.',
    instrucciones: 'Liga aceite con gelatina.',
    tiempo: '45 min',
    dificultad: 'Difícil'
  },

  // --- POSTRES (121-160) ---
  {
    id: 121,
    titulo: 'Tarta queso horno',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Cremosa.',
    ingredientes: 'Queso, nata, huevos.',
    instrucciones: 'Hornea suave.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 122,
    titulo: 'Tronco Navidad',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Brazo gitano choco.',
    ingredientes: 'Bizcocho, chocolate, nata.',
    instrucciones: 'Rellena y cubre.',
    tiempo: '90 min',
    dificultad: 'Difícil'
  },
  {
    id: 123,
    titulo: 'Tiramisú clásico',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Café y mascarpone.',
    ingredientes: 'Mascarpone, café, bizcochos.',
    instrucciones: 'Monta capas.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 124,
    titulo: 'Mousse chocolate',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Aireada.',
    ingredientes: 'Chocolate, huevos.',
    instrucciones: 'Monta claras. Mezcla.',
    tiempo: '20 min',
    dificultad: 'Media'
  },
  {
    id: 125,
    titulo: 'Flan casero',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Huevo y caramelo.',
    ingredientes: 'Huevos, leche, azúcar.',
    instrucciones: 'Baño maría.',
    tiempo: '60 min',
    dificultad: 'Fácil'
  },
  {
    id: 126,
    titulo: 'Tarta manzana',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Masa quebrada.',
    ingredientes: 'Masa, manzana, crema.',
    instrucciones: 'Hornea.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 127,
    titulo: 'Arroz con leche',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Canela y limón.',
    ingredientes: 'Arroz, leche, canela.',
    instrucciones: 'Cuece lento.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 128,
    titulo: 'Natillas',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Con galleta.',
    ingredientes: 'Leche, yemas, maicena.',
    instrucciones: 'Espesa al fuego.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 129,
    titulo: 'Tarta turrón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Fría Jijona.',
    ingredientes: 'Turrón, nata, cuajada.',
    instrucciones: 'Mezcla y cuaja.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 130,
    titulo: 'Coulant',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Centro líquido.',
    ingredientes: 'Chocolate, mantequilla, huevo.',
    instrucciones: 'Hornea justo.',
    tiempo: '25 min',
    dificultad: 'Media'
  },
  {
    id: 131,
    titulo: 'Profiteroles',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Rellenos nata.',
    ingredientes: 'Choux, nata, chocolate.',
    instrucciones: 'Hornea y rellena.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 132,
    titulo: 'Crème brûlée',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Costra azúcar.',
    ingredientes: 'Nata, yemas, vainilla.',
    instrucciones: 'Cuece y quema azúcar.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 133,
    titulo: 'Helado vainilla',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Casero.',
    ingredientes: 'Nata, leche, vainilla.',
    instrucciones: 'Mantecar.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 134,
    titulo: 'Tarta 3 chocolates',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Capas.',
    ingredientes: '3 chocolates, nata, cuajada.',
    instrucciones: 'Capas sucesivas.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 135,
    titulo: 'Crepes chocolate',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Con plátano.',
    ingredientes: 'Masa crepes, chocolate.',
    instrucciones: 'Haz crepes y rellena.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 136,
    titulo: 'Pudding pan',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Aprovechamiento.',
    ingredientes: 'Pan, leche, pasas.',
    instrucciones: 'Hornea baño maría.',
    tiempo: '75 min',
    dificultad: 'Media'
  },
  {
    id: 137,
    titulo: 'Macedonia',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Frutas variadas.',
    ingredientes: 'Fruta, zumo.',
    instrucciones: 'Corta y mezcla.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 138,
    titulo: 'Tarta zanahoria',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Frosting queso.',
    ingredientes: 'Zanahoria, harina, queso.',
    instrucciones: 'Hornea y cubre.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 139,
    titulo: 'Cupcakes',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Decorados.',
    ingredientes: 'Masa, frosting.',
    instrucciones: 'Hornea y decora.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 140,
    titulo: 'Cheesecake blanco',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Chocolate blanco.',
    ingredientes: 'Choco blanco, queso.',
    instrucciones: 'Mezcla y enfría.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 141,
    titulo: 'Mousse limón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Cítrico.',
    ingredientes: 'Limón, leche condensada.',
    instrucciones: 'Mezcla y enfría.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 142,
    titulo: 'Tarta galleta',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Abuela.',
    ingredientes: 'Galletas, chocolate.',
    instrucciones: 'Capas.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 143,
    titulo: 'Yogur miel',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Griego.',
    ingredientes: 'Yogur, miel, nueces.',
    instrucciones: 'Sirve.',
    tiempo: '5 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 144,
    titulo: 'Tiramisú fresas',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Frutal.',
    ingredientes: 'Mascarpone, fresas.',
    instrucciones: 'Capas.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 145,
    titulo: 'Flan café',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Sabor café.',
    ingredientes: 'Huevo, leche, café.',
    instrucciones: 'Baño maría.',
    tiempo: '60 min',
    dificultad: 'Fácil'
  },
  {
    id: 146,
    titulo: 'Brownie',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Denso.',
    ingredientes: 'Chocolate, nueces.',
    instrucciones: 'Hornea.',
    tiempo: '35 min',
    dificultad: 'Fácil'
  },
  {
    id: 147,
    titulo: 'Tartaletas fruta',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Masa quebrada.',
    ingredientes: 'Masa, crema, fruta.',
    instrucciones: 'Rellena.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 148,
    titulo: 'Semifrío choco',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Helado.',
    ingredientes: 'Chocolate, nata.',
    instrucciones: 'Congela.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 149,
    titulo: 'Bizcocho almendra',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Jugoso.',
    ingredientes: 'Almendra, huevo.',
    instrucciones: 'Hornea.',
    tiempo: '45 min',
    dificultad: 'Fácil'
  },
  {
    id: 150,
    titulo: 'Tarta choco naranja',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Aroma naranja.',
    ingredientes: 'Chocolate, naranja.',
    instrucciones: 'Hornea.',
    tiempo: '50 min',
    dificultad: 'Media'
  },
  {
    id: 151,
    titulo: 'Panna cotta',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Frambuesa.',
    ingredientes: 'Nata, gelatina.',
    instrucciones: 'Cuece y enfría.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 152,
    titulo: 'Mousse turrón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Navideño.',
    ingredientes: 'Turrón, nata.',
    instrucciones: 'Tritura y mezcla.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 153,
    titulo: 'Tarta queso fría',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Sin horno.',
    ingredientes: 'Queso, gelatina.',
    instrucciones: 'Enfría.',
    tiempo: '20 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 154,
    titulo: 'Natillas turrón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Cremosas.',
    ingredientes: 'Leche, turrón.',
    instrucciones: 'Espesa.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 155,
    titulo: 'Sorbete limón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Con cava.',
    ingredientes: 'Helado limón, cava.',
    instrucciones: 'Bate.',
    tiempo: '5 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 156,
    titulo: 'Galletas jengibre',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Navideñas.',
    ingredientes: 'Harina, jengibre.',
    instrucciones: 'Corta y hornea.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 157,
    titulo: 'Brazos mini',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Rellenos.',
    ingredientes: 'Bizcocho, nata.',
    instrucciones: 'Enrolla.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 158,
    titulo: 'Helado turrón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Artesano.',
    ingredientes: 'Turrón, nata.',
    instrucciones: 'Congela.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 159,
    titulo: 'Trufas',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Chocolate.',
    ingredientes: 'Chocolate, nata.',
    instrucciones: 'Forma bolas.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 160,
    titulo: 'Tiramisú cacao',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Intenso.',
    ingredientes: 'Mascarpone, cacao.',
    instrucciones: 'Capas.',
    tiempo: '30 min',
    dificultad: 'Media'
  }
];

// =============================================================
// 2. LÓGICA DE LA APLICACIÓN
// =============================================================
let TODAS_LAS_RECETAS = [];

// 🔁 ADAPTADOR
function mapCategoria(cat) {
  switch (cat) {
    case "aperitivos": return "aperitivo";
    case "primer-plato": return "primero";
    case "segundo-plato": return "segundo";
    case "postre": return "postre";
    default: return "otros";
  }
}

TODAS_LAS_RECETAS = recetas.map((r) => {
  const ingredientesArray = r.ingredientes ? r.ingredientes.split(",").map(t => t.trim()).filter(Boolean) : [];
  const pasosArray = r.instrucciones ? r.instrucciones.split(".").map(t => t.trim()).filter(Boolean) : [];
  return {
    id: r.id,
    title: r.titulo,
    category: mapCategoria(r.categoria),
    image: r.img && r.img !== "placeholder.jpg" ? r.img : "",
    description: r.descripcion,
    time: r.tiempo,
    difficulty: r.dificultad,
    servings: 4,
    ingredients: ingredientesArray,
    steps: pasosArray,
  };
});

// Referencias DOM
const listadoEl = document.getElementById("listado");
const buscarInput = document.getElementById("buscar");
const filtroBtns = document.querySelectorAll(".filtros button[data-filtro]");
const btnFavs = document.getElementById("btn-favs");
const listaCompraEl = document.getElementById("lista-compra");
const btnVaciarLista = document.getElementById("btn-vaciar");
const modal = document.getElementById("modal");
const modalFondo = modal.querySelector(".fondo");
const modalDialogo = modal.querySelector(".dialogo");
const modalCerrar = document.getElementById("cerrar");
const modalContenido = document.getElementById("contenido-modal");
const btnContraste = document.getElementById("btn-contraste");
const btnTexto = document.getElementById("btn-texto");

// Estado
let filtroActual = "todas";
let mostrarSoloFavs = false;
let textoBusqueda = "";
let elementoQueAbrioModal = null;
let favoritos = new Set(JSON.parse(localStorage.getItem("recetario_favs") || "[]"));
let listaCompra = new Set(JSON.parse(localStorage.getItem("recetario_lista") || "[]"));

// Estado Voz
let recetaEnLectura = null;
let indicePaso = 0;
let enPausa = false;
let reconocimiento = null;
let reconocimientoActivo = false;
let feedbackVozEl = null;
let modalFooter = null;

// SEMÁFORO DE VOZ: 
// - true: el asistente está hablando (micrófono bloqueado)
// - false: el asistente calló (micrófono disponible)
let hablando = false;

// Soporte APIs
const tieneSpeechRecognition = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
const tieneSpeechSynthesis = "speechSynthesis" in window;
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioContext = (tieneSpeechRecognition && AudioContextClass) ? new AudioContextClass() : null;

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(console.error);
  });
}

// --- FUNCIONES PRINCIPALES ---

function pintarRecetas() {
  const filtradas = TODAS_LAS_RECETAS.filter(r => {
    if (filtroActual !== "todas" && r.category !== filtroActual) return false;
    if (mostrarSoloFavs && !favoritos.has(r.id)) return false;
    if (textoBusqueda && !r.title.toLowerCase().includes(textoBusqueda.toLowerCase())) return false;
    return true;
  });

  listadoEl.innerHTML = "";
  if (!filtradas.length) {
    listadoEl.innerHTML = `<p class="sin-resultados">No hay recetas.</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  filtradas.forEach(r => {
    const esFav = favoritos.has(r.id);
    const div = document.createElement("article");
    div.className = `receta-card cat-${r.category}`;
    div.innerHTML = `
      <header class="card-header">
        <span class="badge-categoria">${r.category.toUpperCase()}</span>
        <button class="btn-fav-toggle">${esFav ? "★" : "☆"}</button>
      </header>
      <h3 class="card-titulo">${r.title}</h3>
      <p class="card-descripcion">${r.description}</p>
      <div class="card-meta"><span>⏱️ ${r.time}</span><span>🎯 ${r.difficulty}</span></div>
      <footer class="card-footer"><button class="btn ver-receta">Ver receta</button></footer>
    `;
    
    div.querySelector(".btn-fav-toggle").onclick = (e) => {
      e.stopPropagation();
      toggleFavorito(r.id);
    };
    div.querySelector(".ver-receta").onclick = () => abrirModal(r.id);
    fragment.appendChild(div);
  });
  listadoEl.appendChild(fragment);
}

function toggleFavorito(id) {
  if (favoritos.has(id)) favoritos.delete(id);
  else favoritos.add(id);
  localStorage.setItem("recetario_favs", JSON.stringify([...favoritos]));
  pintarRecetas();
}

// --- MODAL ---

function abrirModal(id) {
  const r = TODAS_LAS_RECETAS.find(x => x.id === id);
  if (!r) return;

  detenerAsistenteVoz(); 
  recetaEnLectura = r;

  modalDialogo.className = `dialogo modal-${r.category}`;
  
  const ings = r.ingredients.map(i => `<li>${i}</li>`).join("");
  const pasos = r.steps.map((p, i) => `<li data-paso="${i}">${p}</li>`).join("");

  modalContenido.innerHTML = `
    <article class="detalle-receta">
      <header class="modal-header"><h2>${r.title}</h2></header>
      <section><h3>Ingredientes</h3><ul class="lista-ingredientes">${ings}</ul></section>
      <section><h3>Pasos</h3><ol class="lista-pasos" id="lista-pasos-lectura">${pasos}</ol></section>
      <footer class="detalle-acciones">
         <button class="btn btn-primario" onclick="agregarIngredientes('${r.id}')">Añadir Ingredientes</button>
         <button class="btn btn-voz" id="btn-iniciar-voz">🎙️ Iniciar Voz</button>
      </footer>
    </article>
  `;

  modalContenido.querySelector("#btn-iniciar-voz").onclick = () => iniciarAsistenteVoz(r);

  modalFooter = modalDialogo.querySelector(".detalle-acciones");
  modal.classList.add("abierto");
  document.body.classList.add("modal-abierto");
  modalDialogo.focus();
}

function cerrarModal() {
  detenerAsistenteVoz();
  modal.classList.remove("abierto");
  document.body.classList.remove("modal-abierto");
}

// =============================================================
// ASISTENTE DE VOZ (ESTABILIZADO CON SEMÁFORO)
// =============================================================

function crearReconocimiento() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recog = new SR();
  recog.lang = "es-ES";
  recog.continuous = false; 
  recog.interimResults = false;
  return recog;
}

function emitirFeedbackAuditivo() {
  if (!audioContext) return;
  if (audioContext.state === 'suspended') audioContext.resume();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.frequency.setValueAtTime(440, audioContext.currentTime);
  gain.gain.setValueAtTime(0.1, audioContext.currentTime);
  osc.start();
  osc.stop(audioContext.currentTime + 0.2);
}

function actualizarFeedbackVoz(estado) {
  if (!modalFooter) return;
  if (!feedbackVozEl) {
    feedbackVozEl = document.createElement("div");
    feedbackVozEl.id = "feedback-voz-estado";
    feedbackVozEl.style.cssText = "margin-top:10px;font-weight:bold;text-align:center;padding:5px;border-radius:5px;";
    modalFooter.appendChild(feedbackVozEl);
  }
  
  if (estado === "escuchando") {
    feedbackVozEl.textContent = "🎙️ ESCUCHANDO... Di: Siguiente, Repetir, Salir";
    feedbackVozEl.style.background = "#ffc107";
    feedbackVozEl.style.color = "#333";
  } else if (estado === "hablando") {
    feedbackVozEl.textContent = "🔊 LEYENDO (Micro apagado)...";
    feedbackVozEl.style.background = "#17a2b8";
    feedbackVozEl.style.color = "#fff";
  } else if (estado === "pausado") {
    feedbackVozEl.textContent = "⏸️ PAUSADO";
    feedbackVozEl.style.background = "#dc3545";
    feedbackVozEl.style.color = "#fff";
  } else {
    feedbackVozEl.textContent = "Asistente inactivo. Pulsa el botón para iniciar.";
    feedbackVozEl.style.background = "transparent";
    feedbackVozEl.style.color = "inherit";
  }
}

function detenerEscuchaFisica() {
    // Mata el reconocimiento inmediatamente
    if (reconocimiento) {
        try { reconocimiento.abort(); } catch(e) {}
    }
    reconocimientoActivo = false;
}

function leerTexto(texto, callback) {
    if (!tieneSpeechSynthesis) {
        if (callback) callback();
        return;
    }
    
    // 🔴 SEMÁFORO ROJO: Empieza a hablar, prohibido escuchar
    hablando = true;
    detenerEscuchaFisica(); 
    actualizarFeedbackVoz("hablando");

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-ES";
    u.rate = 0.9;
    
    u.onend = () => {
        // 🟢 SEMÁFORO VERDE con RETRASO ANTI-ECO
        // Esperamos 1000ms (1 seg) para que el sonido desaparezca de la habitación
        setTimeout(() => {
            hablando = false; 
            if (callback) callback();
        }, 1000);
    };
    
    u.onerror = () => { hablando = false; };

    if (!enPausa) window.speechSynthesis.speak(u);
    else setTimeout(() => { hablando = false; if (callback) callback(); }, 100);
}

function escucharComando() {
    // Si el semáforo está rojo (hablando), NO INICIAMOS
    if (hablando) return;

    if (!tieneSpeechRecognition || !recetaEnLectura || enPausa) {
        reconocimientoActivo = false;
        actualizarFeedbackVoz("inactivo");
        return;
    }

    // Destruir instancia previa siempre para limpiar memoria del navegador
    if (reconocimiento) {
        try { reconocimiento.abort(); } catch(e) {}
        reconocimiento = null;
    }
    reconocimiento = crearReconocimiento();

    reconocimientoActivo = true;
    actualizarFeedbackVoz("escuchando");
    emitirFeedbackAuditivo();

    reconocimiento.onresult = (ev) => {
        reconocimientoActivo = false;
        if (!ev.results || !ev.results[0] || !ev.results[0][0]) {
            actualizarFeedbackVoz("inactivo");
            return;
        }
        const comando = ev.results[0][0].transcript.toLowerCase();
        console.log("Comando detectado:", comando);
        
        // Filtro extra: si el comando es larguísimo, es eco. Ignorar.
        if (comando.length > 60) {
             console.warn("Eco detectado. Ignorando.");
             actualizarFeedbackVoz("inactivo");
             return;
        }
        
        procesarComando(comando);
    };

    reconocimiento.onend = () => {
        reconocimientoActivo = false;
        // NO reiniciamos automáticamente. Evita bucles.
        if (!hablando) actualizarFeedbackVoz("inactivo");
    };

    reconocimiento.onerror = (ev) => {
        console.warn("ASR Error:", ev.error);
        reconocimientoActivo = false;
        
        // En caso de error, PARAMOS y pedimos pulsación manual. 
        // Cero riesgos de bucle.
        if (ev.error === 'no-speech') {
             leerTexto("No te he oído. Pulsa el botón para intentarlo.");
        } else {
             actualizarFeedbackVoz("inactivo");
        }
    };

    try {
        // Pequeño delay de seguridad antes de start
        setTimeout(() => {
            if (!hablando && reconocimiento) reconocimiento.start();
        }, 200);
    } catch (e) {
        console.error("Fallo start:", e);
        reconocimientoActivo = false;
        actualizarFeedbackVoz("inactivo");
    }
}

function procesarComando(cmd) {
    if (hablando) return; 

    if (cmd.includes("siguiente")) {
        indicePaso++;
        leerPaso();
    } else if (cmd.includes("repetir")) {
        leerPaso();
    } else if (cmd.includes("anterior")) {
        if (indicePaso > 0) indicePaso--;
        leerPaso();
    } else if (cmd.includes("salir") || cmd.includes("cerrar")) {
        cerrarModal();
    } else if (cmd.includes("pausar")) {
        enPausa = true;
        actualizarFeedbackVoz("pausado");
        leerTexto("Pausado. Di reanudar.");
    } else if (cmd.includes("reanudar")) {
        enPausa = false;
        leerPaso();
    } else {
        leerTexto("No entendí. Pulsa y repite.", () => actualizarFeedbackVoz("inactivo"));
    }
}

function leerPaso() {
    if (indicePaso >= recetaEnLectura.steps.length) {
        leerTexto("Fin de la receta. ¡Buen provecho!", () => detenerAsistenteVoz());
        return;
    }
    
    document.querySelectorAll("#lista-pasos-lectura li").forEach((li, i) => {
        li.classList.toggle("paso-activo", i === indicePaso);
        if (i === indicePaso) li.scrollIntoView({behavior: "smooth", block: "center"});
    });

    const texto = `Paso ${indicePaso + 1}. ${recetaEnLectura.steps[indicePaso]}`;
    // Callback: Solo escuchar CUANDO termine de hablar y pase el tiempo de seguridad
    leerTexto(texto, () => {
        if (!enPausa) escucharComando();
    });
}

function iniciarAsistenteVoz(receta) {
    if (!receta) receta = recetaEnLectura;
    if (!tieneSpeechSynthesis) { alert("No soportado"); return; }
  
    detenerAsistenteVoz(); 
    recetaEnLectura = receta; 
    indicePaso = 0;
    enPausa = false;
    hablando = false;

    if (modalDialogo) modalDialogo.className = `dialogo modal-${receta.category}`;

    const intro = `Receta: ${receta.title}.`;
    leerTexto(intro, () => {
         if (!receta.steps.length) return;
         leerPaso(); 
    });
}

function detenerAsistenteVoz() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    hablando = false;
    reconocimientoActivo = false;
    if (reconocimiento) {
        try { reconocimiento.abort(); } catch(e){}
        reconocimiento = null;
    }
    actualizarFeedbackVoz("inactivo");
}

// --- INICIALIZACIÓN ---
function agregarIngredientes(id) {
    const r = TODAS_LAS_RECETAS.find(x => x.id == id);
    if(r) {
        r.ingredients.forEach(i => listaCompra.add(i));
        localStorage.setItem("recetario_lista", JSON.stringify([...listaCompra]));
        pintarListaCompra();
    }
}
function pintarListaCompra() {
    listaCompraEl.innerHTML = [...listaCompra].map(i => `<li>${i} <button onclick="borrarItem('${i}')">x</button></li>`).join("");
}
window.borrarItem = (i) => {
    listaCompra.delete(i);
    localStorage.setItem("recetario_lista", JSON.stringify([...listaCompra]));
    pintarListaCompra();
}

document.addEventListener("DOMContentLoaded", () => {
    pintarRecetas();
    pintarListaCompra();
    
    filtroBtns.forEach(btn => {
        btn.onclick = () => {
            filtroActual = btn.dataset.filtro;
            document.querySelector(".filtros .active")?.classList.remove("active");
            btn.classList.add("active");
            pintarRecetas();
        }
    });
    
    buscarInput.addEventListener("input", () => {
        textoBusqueda = buscarInput.value;
        pintarRecetas();
    });

    modalFondo.addEventListener("click", cerrarModal);
    modalCerrar.addEventListener("click", cerrarModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("abierto")) cerrarModal();
    });

    btnContraste.addEventListener("click", () => document.body.classList.toggle("alto-contraste"));
    btnTexto.addEventListener("click", () => document.body.classList.toggle("texto-grande"));
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').catch(console.error);
    }
});
