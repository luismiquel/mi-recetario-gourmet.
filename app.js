/**
 * =============================================================
 * app.js: VERSIÓN FINAL DEFINITIVA
 * - Lógica de escucha corregida por el usuario (Sin bucles).
 * - 160 Recetas.
 * - UX completa.
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
    descripcion: 'Contraste de la morcilla especiada y la frescura de la manzana caramelizada en un envoltorio crujiente.',
    ingredientes: 'Morcilla de Burgos, manzana, masa de pasta filo, mantequilla derretida.',
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
    instrucciones: 'Pocha cebolla. Añade cava y nata. Cocina pescado.',
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
    ingredientes: 'Lubina, verduras variadas.',
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
    ingredientes: 'Pasta choux, nata para montar, azúcar, chocolate para fundir.',
    instrucciones: 'Hornea los profiteroles. Rellénalos con la nata fría y báñalos en el chocolate derretido.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 132,
    titulo: 'Crème brûlée',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Crema de huevo y nata con una capa crujiente de azúcar caramelizado.',
    ingredientes: 'Nata, yemas de huevo, azúcar, vaina de vainilla, azúcar moreno para caramelizar.',
    instrucciones: 'Cuece la crema. Refrigera. Justo antes de servir, espolvorea azúcar y quémalo con un soplete.',
    tiempo: '40 min (+ refrigeración)',
    dificultad: 'Media'
  },
  {
    id: 133,
    titulo: 'Helado casero de vainilla',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Helado cremoso y aromático, sin aditivos, ideal para acompañar otros postres.',
    ingredientes: 'Nata, leche, yemas de huevo, azúcar, vaina de vainilla.',
    instrucciones: 'Prepara una crema inglesa de vainilla. Enfríala y bátela en la heladera hasta obtener la textura deseada.',
    tiempo: '30 min (+ congelación)',
    dificultad: 'Media'
  },
  {
    id: 134,
    titulo: 'Tarta tres chocolates',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Tarta fría sin horno, con tres capas de chocolate (negro, con leche y blanco).',
    ingredientes: 'Chocolates (negro, leche, blanco), nata, leche, cuajada, galletas tipo Digestive, mantequilla.',
    instrucciones: 'Haz la base. Prepara las tres capas por separado con la cuajada, vertiendo la siguiente cuando la anterior esté cuajada.',
    tiempo: '45 min (+ refrigeración)',
    dificultad: 'Media'
  },
  {
    id: 135,
    titulo: 'Crepes de chocolate y plátano',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Finos crepes rellenos de plátano y cubiertos con salsa de chocolate.',
    ingredientes: 'Harina, huevos, leche, mantequilla, plátano, Nutella o salsa de chocolate.',
    instrucciones: 'Prepara la masa de crepes y cocínalos. Rellena con trozos de plátano y salsa de chocolate.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 136,
    titulo: 'Pudding de pan navideño',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Postre de aprovechamiento con pan duro, pasas, ron y especias.',
    ingredientes: 'Pan duro, leche, huevos, azúcar, pasas, ron, canela, nuez moscada.',
    instrucciones: 'Remoja el pan en la leche. Mezcla con el resto de ingredientes y hornea al baño maría.',
    tiempo: '75 min',
    dificultad: 'Media'
  },
  {
    id: 137,
    titulo: 'Macedonia de frutas',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Combinación refrescante de fruta fresca de temporada, ideal para aligerar la cena.',
    ingredientes: 'Frutas variadas (naranja, kiwi, uvas, manzana, pera), zumo de naranja, licor dulce (opcional).',
    instrucciones: 'Corta la fruta y mézclala. Aliña con zumo de naranja y un toque de licor si lo deseas. Sirve fría.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 138,
    titulo: 'Tarta de zanahoria',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Bizcocho especiado de zanahoria con un frosting de queso crema.',
    ingredientes: 'Zanahoria rallada, harina, azúcar, huevos, especias (canela, nuez moscada), queso crema, mantequilla.',
    instrucciones: 'Prepara el bizcocho y hornéalo. Deja enfriar y cúbrelo con el frosting de queso.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 139,
    titulo: 'Cupcakes de Navidad',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Pequeñas magdalenas con frosting y decoración festiva.',
    ingredientes: 'Masa de cupcake, frosting de mantequilla o queso, colorantes y decoración navideña.',
    instrucciones: 'Hornea los cupcakes. Prepara el frosting y decora con motivos navideños.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 140,
    titulo: 'Cheesecake de chocolate blanco',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Tarta de queso con el dulzor y cremosidad del chocolate blanco.',
    ingredientes: 'Chocolate blanco, queso crema, nata, azúcar, gelatina, base de galleta.',
    instrucciones: 'Derrite el chocolate y mézclalo con el queso y la nata. Vierte sobre la base y refrigera.',
    tiempo: '20 min (+ refrigeración)',
    dificultad: 'Fácil'
  },
  {
    id: 141,
    titulo: 'Mousse de limón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Postre ligero y cítrico, con una textura espumosa de zumo de limón.',
    ingredientes: 'Zumo de limón, ralladura de limón, leche condensada, nata para montar, gelatina.',
    instrucciones: 'Mezcla el limón con la leche condensada. Incorpora la nata montada con movimientos suaves. Refrigera en copas.',
    tiempo: '15 min (+ refrigeración)',
    dificultad: 'Fácil'
  },
  {
    id: 142,
    titulo: 'Tarta de galleta',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Tarta tradicional de capas de galleta, crema pastelera y chocolate.',
    ingredientes: 'Galletas María, leche, crema pastelera o pudín, chocolate para cubrir.',
    instrucciones: 'Alterna capas de galleta remojada en leche y crema. Cúbrela con chocolate fundido y refrigera.',
    tiempo: '30 min (+ refrigeración)',
    dificultad: 'Fácil'
  },
  {
    id: 143,
    titulo: 'Postre de yogur griego con miel',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Postre sencillo, con el toque ácido del yogur, miel y nueces.',
    ingredientes: 'Yogur griego, miel, nueces picadas, canela.',
    instrucciones: 'Sirve el yogur en cuencos. Añade un chorrito de miel, nueces y canela.',
    tiempo: '5 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 144,
    titulo: 'Tiramisú de fresas',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Versión del tiramisú con fresas frescas en lugar de café.',
    ingredientes: 'Queso Mascarpone, huevos, azúcar, bizcochos de soletilla, fresas trituradas, licor de fresa (opcional).',
    instrucciones: 'Prepara la crema de mascarpone. Moja los bizcochos en el puré de fresas. Monta las capas y refrigera.',
    tiempo: '30 min (+ refrigeración)',
    dificultad: 'Media'
  },
  {
    id: 145,
    titulo: 'Flan de café',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Flan tradicional con un intenso sabor a café.',
    ingredientes: 'Huevos, leche, azúcar, café fuerte (expresso), caramelo líquido.',
    instrucciones: 'Sustituye parte de la leche del flan tradicional por café fuerte. Cocina al baño maría y enfría.',
    tiempo: '60 min',
    dificultad: 'Fácil'
  },
  {
    id: 146,
    titulo: 'Brownie con nueces',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Bizcocho denso de chocolate con trozos de nueces, ideal con helado.',
    ingredientes: 'Chocolate negro, mantequilla, huevos, azúcar, harina, nueces.',
    instrucciones: 'Derrite el chocolate y la mantequilla. Mezcla los ingredientes secos. Hornea hasta que el centro esté ligeramente húmedo.',
    tiempo: '35 min',
    dificultad: 'Fácil'
  },
  {
    id: 147,
    titulo: 'Tartaletas de fruta fresca',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Base de masa quebrada rellena de crema pastelera y cubierta con fruta de temporada.',
    ingredientes: 'Base de masa quebrada, crema pastelera, fruta fresca (kiwi, fresa, uva), gelatina neutra.',
    instrucciones: 'Rellena la base con crema. Coloca la fruta por encima. Barniza con la gelatina para darle brillo.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 148,
    titulo: 'Semifrío de chocolate',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Postre helado ligero con textura de mousse, perfecto para el final de la cena.',
    ingredientes: 'Chocolate negro, nata, azúcar, huevos, gelatina.',
    instrucciones: 'Prepara la base de chocolate. Incorpora la nata montada con movimientos envolventes. Congela en un molde.',
    tiempo: '30 min (+ congelación)',
    dificultad: 'Media'
  },
  {
    id: 149,
    titulo: 'Bizcocho de almendras',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Bizcocho jugoso con harina de almendras y un toque de licor.',
    ingredientes: 'Harina de almendras, huevos, azúcar, ralladura de limón, licor de almendras (opcional).',
    instrucciones: 'Bate los huevos con el azúcar. Incorpora la harina de almendras. Hornea. Sirve con azúcar glas.',
    tiempo: '45 min',
    dificultad: 'Fácil'
  },
  {
    id: 150,
    titulo: 'Tarta de chocolate y naranja',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Tarta densa de chocolate con el aroma de la naranja confitada.',
    ingredientes: 'Chocolate negro, mantequilla, huevos, azúcar, harina, naranja confitada.',
    instrucciones: 'Prepara la masa. Añade la ralladura y trozos de naranja confitada. Hornea y cubre con glaseado de chocolate.',
    tiempo: '50 min',
    dificultad: 'Media'
  },
  {
    id: 151,
    titulo: 'Panna cotta de frambuesa',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Postre italiano de nata cocida con una salsa brillante de frambuesa.',
    ingredientes: 'Nata, azúcar, gelatina, vainilla. Para la salsa: frambuesas, azúcar.',
    instrucciones: 'Calienta la nata con azúcar y vainilla. Disuelve la gelatina e incorpórala. Vierte en moldes y refrigera. Sirve con la salsa de frambuesa.',
    tiempo: '20 min (+ refrigeración)',
    dificultad: 'Fácil'
  },
  {
    id: 152,
    titulo: 'Mousse de turrón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Mousse festiva a base de turrón de Jijona, muy ligera.',
    ingredientes: 'Turrón de Jijona, nata para montar, leche, gelatina, azúcar (opcional).',
    instrucciones: 'Tritura el turrón con la leche. Mezcla la nata montada y la gelatina disuelta. Refrigera en copas.',
    tiempo: '20 min (+ refrigeración)',
    dificultad: 'Fácil'
  },
  {
    id: 153,
    titulo: 'Tarta de queso fría',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Tarta de queso sin horno, con base de galleta y cubierta de mermelada.',
    ingredientes: 'Queso crema, nata, azúcar, gelatina, leche, base de galleta, mermelada de fresa o arándanos.',
    instrucciones: 'Prepara la crema con gelatina. Vierte sobre la base y refrigera. Cubre con mermelada.',
    tiempo: '20 min (+ refrigeración)',
    dificultad: 'Muy Fácil'
  },
  {
    id: 154,
    titulo: 'Natillas de turrón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Natillas clásicas con el sabor añadido de turrón blando.',
    ingredientes: 'Leche, yemas de huevo, azúcar, maicena, turrón de Jijona.',
    instrucciones: 'Infusiona la leche con turrón. Prepara las natillas. Sirve frías con canela.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 155,
    titulo: 'Sorbete de limón al cava',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Postre digestivo y refrescante con helado de limón y cava.',
    ingredientes: 'Helado de limón (sorbete), cava o champagne, vodka (opcional).',
    instrucciones: 'Mezcla el helado y el cava en una batidora hasta obtener una textura granizada. Sirve inmediatamente.',
    tiempo: '5 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 156,
    titulo: 'Galletas de jengibre navideñas',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Galletas de mantequilla y especias, con formas y decoración festivas.',
    ingredientes: 'Harina, mantequilla, azúcar, huevo, jengibre en polvo, canela, glaseado real.',
    instrucciones: 'Prepara la masa, refrigera y corta con moldes. Hornea y decora con motivos festivos una vez frías.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 157,
    titulo: 'Brazos gitanos mini',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Pequeños rollos de bizcocho rellenos de crema o nata.',
    ingredientes: 'Bizcocho fino, nata montada o crema pastelera, azúcar glas.',
    instrucciones: 'Rellena el bizcocho y enróllalo. Corta en porciones pequeñas. Espolvorea azúcar glas.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 158,
    titulo: 'Helado artesanal de turrón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Helado cremoso con trozos de turrón de Jijona.',
    ingredientes: 'Nata, leche, turrón de Jijona, azúcar.',
    instrucciones: 'Tritura el turrón con la leche. Mezcla con la nata y congela en la heladera, o congela y bate cada hora si no tienes.',
    tiempo: '30 min (+ congelación)',
    dificultad: 'Media'
  },
  {
    id: 159,
    titulo: 'Trufas de chocolate',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Bombones de ganache de chocolate, cubiertos de cacao en polvo.',
    ingredientes: 'Chocolate negro, nata para montar, mantequilla, cacao en polvo, ron (opcional).',
    instrucciones: 'Calienta la nata y viértela sobre el chocolate. Enfría el ganache. Forma las trufas y reboza en cacao.',
    tiempo: '20 min (+ refrigeración)',
    dificultad: 'Fácil'
  },
  {
    id: 160,
    titulo: 'Tiramisú de cacao amargo',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Versión intensa del tiramisú con mucho cacao amargo en polvo.',
    ingredientes: 'Queso Mascarpone, huevos, azúcar, bizcochos, café, licor, cacao amargo.',
    instrucciones: 'Prepara la crema y monta el tiramisú por capas. Utiliza una cantidad generosa de cacao amargo para espolvorear.',
    tiempo: '30 min (+ refrigeración)',
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

// Soporte APIs
const tieneSpeechRecognition = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
const tieneSpeechSynthesis = "speechSynthesis" in window;

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
         <button class="btn btn-voz" onclick="iniciarAsistenteVoz()">🎙️ Iniciar Voz</button>
      </footer>
    </article>
  `;

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
// ASISTENTE DE VOZ (ESTRATEGIA "ESCUCHA SEGURA" SIN BUCLES)
// =============================================================

function crearReconocimiento() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recog = new SR();
  recog.lang = "es-ES";
  recog.continuous = false;       // Un comando cada vez
  recog.interimResults = false;  // Solo resultados finales
  return recog;
}

function actualizarFeedbackVoz(estado) {
  if (!modalFooter) return;
  if (!feedbackVozEl) {
    feedbackVozEl = document.createElement("div");
    feedbackVozEl.id = "feedback-voz-estado";
    feedbackVozEl.style.cssText = "margin-top:10px;font-weight:bold;padding:5px;border-radius:5px;text-align:center;";
    modalFooter.appendChild(feedbackVozEl);
  }

  switch (estado) {
    case "escuchando":
      feedbackVozEl.textContent = "🎙️ ESCUCHANDO... Di un comando.";
      feedbackVozEl.style.backgroundColor = "#ffc107";
      feedbackVozEl.style.color = "#333";
      break;
    case "procesando":
      feedbackVozEl.textContent = "⚙️ PROCESANDO...";
      feedbackVozEl.style.backgroundColor = "#17a2b8";
      feedbackVozEl.style.color = "#fff";
      break;
    case "pausado":
      feedbackVozEl.textContent = "⏸️ Asistente en PAUSA. Di reanudar para continuar.";
      feedbackVozEl.style.backgroundColor = "#dc3545";
      feedbackVozEl.style.color = "#fff";
      break;
    case "inactivo":
    default:
      feedbackVozEl.textContent = "Asistente inactivo. Pulsa 🎙️ para empezar.";
      feedbackVozEl.style.backgroundColor = "transparent";
      feedbackVozEl.style.color = "#888";
      break;
  }
}

function leerTexto(texto, onEnd) {
  if (!tieneSpeechSynthesis) {
    if (onEnd) onEnd();
    return;
  }

  // Parar reconocimiento antes de hablar para evitar conflictos
  if (reconocimientoActivo && reconocimiento) {
     try { reconocimiento.abort(); } catch(e) {}
     reconocimientoActivo = false;
  }

  window.speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  msg.rate = 0.95;

  msg.onend = () => {
    if (onEnd) onEnd();
  };

  if (!enPausa) {
    window.speechSynthesis.speak(msg);
  } else {
    if (onEnd) setTimeout(onEnd, 100);
  }
}

function detenerAsistenteVoz() {
  indicePaso = 0;
  enPausa = false;

  if (reconocimiento) {
    try {
      reconocimiento.abort();
    } catch (e) {}
    reconocimiento = null; // Limpieza profunda
  }
  reconocimientoActivo = false;

  if (tieneSpeechSynthesis) {
    window.speechSynthesis.cancel();
  }

  actualizarFeedbackVoz("inactivo");
}

function leerPasoActual() {
  if (!recetaEnLectura || enPausa) return;

  const totalPasos = recetaEnLectura.steps.length;

  document
    .querySelectorAll(".lista-pasos li")
    .forEach((li) => li.classList.remove("paso-activo"));

  if (indicePaso >= totalPasos) {
    leerTexto(
      "Has llegado al final de la receta. El asistente se detiene. ¡Buen provecho!",
      () => { detenerAsistenteVoz(); }
    );
    return;
  }

  const pasoActualEl = modalDialogo.querySelector(`[data-paso="${indicePaso}"]`);
  if (pasoActualEl) {
    pasoActualEl.classList.add("paso-activo");
    pasoActualEl.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  const totalTexto =
    recetaEnLectura.steps.length > 1
      ? `Paso ${indicePaso + 1} de ${totalPasos}: `
      : "Instrucción: ";

  const texto = totalTexto + recetaEnLectura.steps[indicePaso];

  leerTexto(texto, () => {
    if (tieneSpeechRecognition && !enPausa) {
      escucharComando();
    }
  });
}

function manejarComando(comandoBruto) {
  const t = (comandoBruto || "").toLowerCase().trim();
  console.log("🎙️ Comando reconocido:", t);
  actualizarFeedbackVoz("procesando");

  if (tieneSpeechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  if (t.includes("siguiente")) {
    indicePaso++;
    leerPasoActual();
    return;
  }

  if (t.includes("anterior") || t.includes("atrás")) {
    if (indicePaso > 0) {
      indicePaso--;
      leerPasoActual();
    } else {
      leerTexto(
        "Ya estás en el primer paso. Di siguiente para avanzar.",
        () => escucharComando()
      );
    }
    return;
  }

  if (t.includes("repetir") || t.includes("otra vez")) {
    leerPasoActual();
    return;
  }

  if (t.includes("pausar") || t.includes("descanso")) {
    enPausa = true;
    leerTexto(
      "Asistente pausado. Di reanudar para continuar.",
      () => actualizarFeedbackVoz("pausado")
    );
    return;
  }

  if (t.includes("reanudar") || t.includes("continuar")) {
    if (enPausa) {
      enPausa = false;
      leerTexto("Reanudando la receta.", () => leerPasoActual());
    } else {
      leerTexto("El asistente no estaba pausado.", () => escucharComando());
    }
    return;
  }

  if (t.includes("ayuda") || t.includes("qué puedo decir")) {
    leerTexto(
      "Puedes decir: siguiente, anterior, repetir, pausar, reanudar o parar.",
      () => escucharComando()
    );
    return;
  }

  if (t.includes("parar") || t.includes("stop") || t.includes("terminar")) {
    leerTexto("Asistente de voz detenido. ¡Adiós!");
    detenerAsistenteVoz();
    return;
  }

  leerTexto(
    "No he entendido el comando. Di ayuda para conocer las opciones.",
    () => escucharComando()
  );
}

function escucharComando() {
  if (!tieneSpeechRecognition || !recetaEnLectura || enPausa) {
    reconocimientoActivo = false;
    actualizarFeedbackVoz("inactivo");
    return;
  }

  // SIEMPRE creamos una nueva instancia limpia para evitar el InvalidStateError
  if (reconocimiento) {
      try { reconocimiento.abort(); } catch(e) {}
      reconocimiento = null;
  }
  reconocimiento = crearReconocimiento();

  reconocimientoActivo = true;
  actualizarFeedbackVoz("escuchando");

  reconocimiento.onresult = (ev) => {
    reconocimientoActivo = false;
    if (!ev.results || !ev.results[0] || !ev.results[0][0]) {
      actualizarFeedbackVoz("inactivo");
      return;
    }
    const comando = ev.results[0][0].transcript;
    manejarComando(comando);
  };

  reconocimiento.onend = () => {
    // Fin normal. No reiniciamos para evitar bucles.
    reconocimientoActivo = false;
    actualizarFeedbackVoz("inactivo");
  };

  reconocimiento.onerror = (ev) => {
    console.error("Error en reconocimiento:", ev.error);
    reconocimientoActivo = false;
    
    if (ev.error === "not-allowed") {
      leerTexto(
        "No tengo permiso para usar el micrófono.",
        () => actualizarFeedbackVoz("inactivo")
      );
      return;
    }
    
    // 🚨 CORRECCIÓN FINAL: Si hay error, PARAMOS y avisamos. NO reiniciamos.
    if (ev.error === "no-speech") {
       leerTexto(
         "No he oído nada. Pulsa el botón para intentarlo de nuevo.",
         () => actualizarFeedbackVoz("inactivo")
       );
       return;
    }
    
    actualizarFeedbackVoz("inactivo");
  };

  try {
    reconocimiento.start();
  } catch (e) {
    console.warn("Error al iniciar reconocimiento:", e);
    reconocimientoActivo = false;
    actualizarFeedbackVoz("inactivo");
  }
}

function iniciarAsistenteVoz(receta) {
  if (!receta) receta = recetaEnLectura;

  if (!tieneSpeechSynthesis) {
    alert("Tu navegador no soporta síntesis de voz.");
    return;
  }
  
  detenerAsistenteVoz(); 
  recetaEnLectura = receta; 
  indicePaso = 0;
  enPausa = false;

  if (modalDialogo) {
      modalDialogo.className = `dialogo modal-${receta.category}`;
  }

  const intro = `
    Vamos a cocinar: ${receta.title}.
    Tiempo: ${receta.time}.
    Dificultad: ${receta.difficulty}.
  `;

  const textoIngredientes =
    receta.ingredients && receta.ingredients.length
      ? "Ingredientes: " + receta.ingredients.join(". ")
      : "Sin ingredientes detallados.";

  leerTexto(intro, () => {
    leerTexto(textoIngredientes, () => {
      if (!receta.steps || !receta.steps.length) {
        leerTexto("Sin pasos detallados. Fin.");
        detenerAsistenteVoz();
        return;
      }
      leerPasoActual();
    });
  });
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
