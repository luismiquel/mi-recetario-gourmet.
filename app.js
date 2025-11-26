// app.js
// ============================================
// APP GOURMET – LÓGICA PRINCIPAL Y DATOS
// ============================================
"use strict";

// =============================================================
// 🌟 CONTENIDO DE RECETAS.JS (FUSIONADO)
// 🌟 ESTA SECCIÓN CONTIENE LAS 160 RECETAS NAVIDEÑAS
// =============================================================

const recetas = [
  // =============================================================
  // 🧀 40 APERITIVOS (Índices 0 - 39)
  // =============================================================
  {
    id: 1,
    titulo: 'Tartaletas de salmón y eneldo',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Deliciosas tartaletas rellenas de una suave crema de queso y salmón ahumado, perfectas para empezar la cena.',
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
    descripcion: 'Pequeños volovanes de hojaldre rellenos de una bechamel cremosa con champiñones salteados y un toque de Jerez.',
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
    descripcion: 'Elegantes bocados de *foie gras* recubiertos de crujiente almendra picada, un clásico sofisticado.',
    ingredientes: '*Foie gras* o *micuit*, almendra picada tostada, sal Maldom (opcional).',
    instrucciones: 'Forma bolitas con el *foie* frío. Reboza cada bolita en la almendra picada. Sirve inmediatamente o mantén en frío.',
    tiempo: '10 min',
    dificultad: 'Fácil'
  },
  {
    id: 4,
    titulo: 'Canapés de queso crema y nueces',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Una combinación sencilla pero deliciosa de texturas, ideal para montar en pan tostado o *crackers*.',
    ingredientes: 'Pan tostado o *crackers*, queso crema, nueces picadas, miel o sirope de arce, pimienta.',
    instrucciones: 'Unta el queso crema sobre el pan. Espolvorea con nueces y un hilo de miel. Sazona con pimienta si lo deseas.',
    tiempo: '5 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 5,
    titulo: 'Brochetas de langostino y piña',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Brochetas refrescantes y con contraste de sabores, el toque tropical en la mesa.',
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
    descripcion: 'Blinis caseros o comprados con crema agria y huevas de lumpo, una alternativa económica al caviar.',
    ingredientes: 'Blinis, crema agria o *crème fraîche*, huevas de lumpo (negro o rojo), cebollino picado.',
    instrucciones: 'Calienta ligeramente los blinis. Coloca una cucharadita de crema agria en cada uno, añade las huevas y decora con cebollino.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 7,
    titulo: 'Chupitos de crema de marisco',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Una versión concentrada y cremosa de la clásica sopa de marisco, servida en pequeños vasos.',
    ingredientes: 'Crema de marisco (caliente o fría), gambas pequeñas cocidas, un chorrito de coñac (opcional).',
    instrucciones: 'Prepara o calienta la crema de marisco. Sirve en chupitos decorando cada uno con una gamba pequeña.',
    tiempo: '20 min',
    dificultad: 'Media'
  },
  {
    id: 8,
    titulo: 'Mini croquetas de jamón ibérico',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'El clásico español, en formato mini y con el sabor intenso del jamón ibérico.',
    ingredientes: 'Jamón ibérico picado, mantequilla, harina, leche, nuez moscada, huevo, pan rallado, aceite para freír.',
    instrucciones: 'Prepara la bechamel con el jamón. Deja enfriar. Forma las mini croquetas, rebózalas y fríelas hasta que estén doradas.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 9,
    titulo: 'Hojaldritos de sobrasada y miel',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Contraste de sabor salado y dulce en un bocado crujiente y fácil de preparar.',
    ingredientes: 'Masa de hojaldre, sobrasada, miel, semillas de sésamo.',
    instrucciones: 'Corta tiras de hojaldre. Unta con sobrasada y añade un hilo de miel. Enrolla y hornea hasta que el hojaldre esté dorado.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 10,
    titulo: 'Pinchos de mozzarella y tomate confitado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Una variación de la *Caprese* con tomates dulces y un toque de albahaca.',
    ingredientes: 'Bolas de mozzarella mini, tomates *cherry* confitados, hojas de albahaca fresca, aceite de oliva.',
    instrucciones: 'Ensarta en un palillo la mozzarella, una hoja de albahaca y un tomate confitado. Aliña con un poco de aceite de oliva.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 11,
    titulo: 'Mini quiches de espinacas',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Quiches individuales con relleno cremoso de espinacas y queso.',
    ingredientes: 'Masa quebrada o de hojaldre, espinacas cocidas, huevos, nata para cocinar, queso rallado, nuez moscada.',
    instrucciones: 'Cubre moldes pequeños con masa. Mezcla el relleno y vierte. Hornea hasta que estén cuajadas y doradas.',
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
    instrucciones: 'Saltea la morcilla sin piel con la manzana picada. Rellena pequeños cuadrados de pasta filo con la mezcla. Hornea.',
    tiempo: '25 min',
    dificultad: 'Media'
  },
  {
    id: 13,
    titulo: 'Canapés de aguacate y gambas',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Frescos y coloridos, con la cremosidad del aguacate y el sabor a mar de las gambas.',
    ingredientes: 'Tostas pequeñas, aguacate, gambas cocidas, cebolleta, mayonesa, pimentón dulce.',
    instrucciones: 'Haz una mezcla de aguacate machacado, gambas picadas y un poco de mayonesa. Unta en las tostas y decora con cebolleta.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 14,
    titulo: 'Empanaditas de pollo especiado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Mini empanadas con un relleno jugoso y aromático a especias navideñas.',
    ingredientes: 'Masa de empanadillas, pechuga de pollo, especias (*curry*, pimentón), tomate frito, cebolla.',
    instrucciones: 'Prepara el relleno de pollo guisado y especiado. Rellena las obleas, séllalas y fríelas u hornéalas.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 15,
    titulo: 'Tartaletas de queso azul y pera',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'El sabor fuerte del queso azul se equilibra con la dulzura suave de la pera.',
    ingredientes: 'Tartaletas, queso azul, dados de pera, nata, huevo, nueces picadas.',
    instrucciones: 'Mezcla el queso desmenuzado, la pera, la nata y el huevo. Rellena las tartaletas. Hornea hasta cuajar.',
    tiempo: '25 min',
    dificultad: 'Fácil'
  },
  {
    id: 16,
    titulo: 'Bocados de bacalao gratinado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pequeños trozos de bacalao cubiertos de una muselina de ajo y gratinados.',
    ingredientes: 'Bacalao desalado, aceite de oliva, ajo, perejil, patata cocida (opcional).',
    instrucciones: 'Cocina el bacalao. Coloca los lomos en cazuelitas. Cúbrelos con una muselina de ajo y gratina.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 17,
    titulo: 'Tosta de roast beef con mostaza dulce',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Finas lonchas de carne asada sobre pan, aderezadas con una salsa vibrante.',
    ingredientes: 'Pan de cereales tostado, *roast beef* en lonchas, mostaza dulce, rúcula.',
    instrucciones: 'Unta el pan con un poco de mostaza dulce. Coloca la rúcula y las lonchas de *roast beef* encima.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 18,
    titulo: 'Rollitos de salmón con queso y cebollino',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Sencillos y visualmente atractivos, ideales para servir fríos.',
    ingredientes: 'Lonchas de salmón ahumado, queso crema, cebollino, pimienta, limón.',
    instrucciones: 'Mezcla el queso crema con cebollino y pimienta. Unta una loncha de salmón y enróllala. Pincha con un palillo.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 19,
    titulo: 'Hummus con crudités navideños',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Opción vegetariana y saludable, con bastones de verduras de colores.',
    ingredientes: 'Garbanzos cocidos, tahini, limón, ajo, aceite de oliva, pimentón. Crudités (zanahoria, apio, pimiento).',
    instrucciones: 'Tritura los ingredientes para hacer el *hummus*. Sirve con un chorrito de aceite, pimentón y las verduras cortadas.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 20,
    titulo: 'Dátiles rellenos de queso y nueces',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'La dulzura del dátil contrasta con el queso salado y el crujiente de la nuez.',
    ingredientes: 'Dátiles sin hueso, queso tipo *rulo* de cabra, nueces.',
    instrucciones: 'Abre los dátiles y rellena cada uno con un trozo de queso y media nuez. Sirve.',
    tiempo: '5 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 21,
    titulo: 'Gougères de queso al horno',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pequeños bocaditos de pasta choux salada con queso, ligeros y aireados.',
    ingredientes: 'Agua, mantequilla, harina, huevos, queso rallado (*Gruyère* o *Emmental*), pimienta.',
    instrucciones: 'Prepara la pasta *choux*. Añade el queso y hornea pequeñas porciones hasta que se hinchen y doren.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 22,
    titulo: 'Pincho de pulpo a la gallega',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'El sabor tradicional del pulpo cocido, patata, pimentón y aceite en formato individual.',
    ingredientes: 'Pulpo cocido, patata cocida, aceite de oliva virgen extra, pimentón de la Vera, sal gorda.',
    instrucciones: 'Corta el pulpo y la patata en rodajas. Monta en pinchos, aliña con el aceite, sal y pimentón.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 23,
    titulo: 'Mini hamburguesas de cordero especiado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pequeñas hamburguesas de cordero con especias marroquíes, servidas en pan mini.',
    ingredientes: 'Carne picada de cordero, pan mini, especias (*comino*, *cilantro*, *menta*), cebolla, salsa de yogur.',
    instrucciones: 'Mezcla la carne con las especias. Forma mini hamburguesas y cocínalas. Sirve en el pan con la salsa de yogur.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 24,
    titulo: 'Saquitos de pasta filo con setas',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Masa crujiente de pasta filo que envuelve un cremoso relleno de setas variadas.',
    ingredientes: 'Pasta filo, setas variadas, ajo, perejil, nata o bechamel, mantequilla derretida.',
    instrucciones: 'Saltea las setas con ajo y perejil. Mezcla con un poco de nata. Rellena los cuadrados de pasta filo, cierra como un saquito y hornea.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 25,
    titulo: 'Tostadas de tomate seco y ricotta',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Canapés con el sabor intenso del tomate seco y la suavidad del queso *ricotta*.',
    ingredientes: 'Pan tostado, queso *ricotta*, tomate seco en aceite, orégano, aceite de oliva.',
    instrucciones: 'Tuesta el pan. Unta una capa de *ricotta* y coloca trozos de tomate seco por encima. Espolvorea orégano.',
    tiempo: '10 min',
    dificultad: 'Fácil'
  },
  {
    id: 26,
    titulo: 'Cucharitas de tartar de atún',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Elegante y fresco, con atún crudo marinado en soja y sésamo.',
    ingredientes: 'Atún fresco para *tartar*, salsa de soja, aceite de sésamo, jengibre rallado, semillas de sésamo.',
    instrucciones: 'Corta el atún en dados pequeños. Marínalo con el resto de ingredientes. Sirve en cucharitas de porcelana.',
    tiempo: '20 min',
    dificultad: 'Media'
  },
  {
    id: 27,
    titulo: 'Montaditos de lomo con pimientos',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Un clásico reconfortante de la cocina española en pequeño formato.',
    ingredientes: 'Pan en rebanadas, lomo de cerdo, pimientos de Padrón o del piquillo, ajo, aceite de oliva.',
    instrucciones: 'Fríe o asa el lomo y los pimientos. Coloca la carne sobre el pan y los pimientos por encima.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 28,
    titulo: 'Espirales de hojaldre y pesto',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Crujientes y aromáticos, con el sabor herbal del pesto y el queso.',
    ingredientes: 'Masa de hojaldre, salsa *pesto*, queso rallado (*parmesano*), huevo para pintar.',
    instrucciones: 'Extiende el *pesto* sobre la masa de hojaldre. Enrolla y corta en rodajas. Pinta con huevo y hornea.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 29,
    titulo: 'Bocados de tortilla trufada',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pequeños trozos de tortilla española con un toque sofisticado de trufa.',
    ingredientes: 'Huevos, patatas, aceite de trufa, aceite de oliva, sal.',
    instrucciones: 'Prepara una tortilla de patatas jugosa. Al cuajar, añade el aceite de trufa. Corta en cuadrados pequeños para servir.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 30,
    titulo: 'Crema de queso trufado con pan tostado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Una crema untable intensa, perfecta para acompañar un buen pan artesano.',
    ingredientes: 'Queso crema, queso de cabra, aceite de trufa, pimienta, pan en rebanadas finas.',
    instrucciones: 'Bate el queso crema con el de cabra y el aceite de trufa hasta obtener una crema. Sirve con las tostadas.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 31,
    titulo: 'Langostinos en tempura',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Langostinos crujientes y ligeros, ideales para mojar en salsa agridulce.',
    ingredientes: 'Langostinos, harina de *tempura*, agua muy fría, aceite para freír, salsa de soja (opcional).',
    instrucciones: 'Prepara la mezcla de *tempura*. Reboza los langostinos en ella y fríelos rápidamente en aceite caliente.',
    tiempo: '20 min',
    dificultad: 'Media'
  },
  {
    id: 32,
    titulo: 'Brioches mini de jamón y mantequilla',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pequeños bocados dulces y salados con el clásico relleno de jamón ibérico.',
    ingredientes: 'Pan de *brioche* mini, jamón ibérico en lonchas finas, mantequilla.',
    instrucciones: 'Corta el *brioche* por la mitad. Unta con mantequilla y rellena generosamente con el jamón.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 33,
    titulo: 'Canapés de rúcula y parmesano',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Canapés frescos con el amargor de la rúcula y el sabor salado del parmesano.',
    ingredientes: 'Pan tostado, queso crema, rúcula, láminas de queso *parmesano*, vinagre balsámico de Módena.',
    instrucciones: 'Unta el pan con queso. Coloca un manojo de rúcula, unas láminas de *parmesano* y un chorrito de balsámico.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 34,
    titulo: 'Chips de boniato especiado',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Alternativa saludable y sabrosa a las patatas fritas, con un toque dulce y especiado.',
    ingredientes: 'Boniato, aceite de oliva, pimentón, comino, sal.',
    instrucciones: 'Corta el boniato muy fino. Mézclalo con las especias y aceite. Hornea hasta que estén crujientes.',
    tiempo: '25 min',
    dificultad: 'Fácil'
  },
  {
    id: 35,
    titulo: 'Bolitas de queso y pistacho',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Bolitas de queso tierno rebozadas en crujientes pistachos picados.',
    ingredientes: 'Queso de cabra tierno, queso crema, pistachos picados, aceite de oliva.',
    instrucciones: 'Mezcla los quesos y forma bolitas. Reboza cada una en los pistachos. Sírvelas frías.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 36,
    titulo: 'Tartar de salmón sobre pepino',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Porciones individuales frescas, reemplazando el pan por rodajas de pepino.',
    ingredientes: 'Salmón fresco, pepino, aguacate, aceite de oliva, limón, eneldo, sal.',
    instrucciones: 'Corta el salmón y el aguacate en dados. Aliña. Coloca una cucharada sobre rodajas de pepino.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 37,
    titulo: 'Crostinis de setas y parmesano',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Rebanadas de pan crujientes con un salteado de setas y queso gratinado.',
    ingredientes: 'Pan rústico, setas variadas, ajo, aceite, queso *parmesano* rallado.',
    instrucciones: 'Tuesta el pan. Saltea las setas con ajo. Coloca las setas sobre el pan, espolvorea *parmesano* y gratina.',
    tiempo: '20 min',
    dificultad: 'Media'
  },
  {
    id: 38,
    titulo: 'Mini tacos de pollo navideño',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pequeñas tortillas de maíz rellenas de pollo marinado con especias de temporada.',
    ingredientes: 'Tortillas de maíz mini, pollo deshebrado, especias (*canela*, *clavo*), cebolla, cilantro, salsa cremosa.',
    instrucciones: 'Guisa el pollo con las especias. Rellena las tortillas y decora con un poco de cilantro y salsa.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 39,
    titulo: 'Ensaladilla rusa gourmet sobre tosta',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Versión refinada de la ensaladilla con un toque de marisco o anguila ahumada.',
    ingredientes: 'Patata, zanahoria, guisantes, huevo, mayonesa casera, tostas, langostinos/anguila.',
    instrucciones: 'Prepara una ensaladilla cremosa. Sirve una cucharada generosa sobre una tosta y decora con la guarnición *gourmet*.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 40,
    titulo: 'Bocados de bacalao al pil-pil',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'El sabor potente del bacalao en salsa de ajo y guindilla, servido en porciones reducidas.',
    ingredientes: 'Bacalao desalado, aceite de oliva, ajo, guindilla, perejil.',
    instrucciones: 'Confitar el bacalao y montar el *pil-pil* ligando el aceite. Servir en cuencos pequeños o sobre cucharas.',
    tiempo: '45 min',
    dificultad: 'Difícil'
  },

  // =============================================================
  // 🍲 40 PRIMEROS PLATOS (Índices 40 - 79)
  // =============================================================
  {
    id: 41,
    titulo: 'Crema de calabaza especiada',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Crema suave con un toque de jengibre y coco, ideal para calentar.',
    ingredientes: 'Calabaza, caldo de verduras, leche de coco, jengibre, cebolla, aceite, crutones.',
    instrucciones: 'Sofríe la cebolla, añade la calabaza y el caldo. Cuece hasta que esté tierna, tritura con leche de coco y jengibre.',
    tiempo: '35 min',
    dificultad: 'Fácil'
  },
  {
    id: 42,
    titulo: 'Sopa de marisco tradicional',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Un clásico festivo con base de pescado y marisco, reconfortante y lleno de sabor.',
    ingredientes: 'Pescado de roca, gambas, almejas, cebolla, tomate, pan frito, coñac.',
    instrucciones: 'Haz un fumet con las cabezas y espinas. Sofríe y guisa el marisco, añade el fumet y cocina a fuego lento.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 43,
    titulo: 'Consomé al Jerez',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Caldo de carne y verduras clarificado, servido muy caliente con un golpe de vino de Jerez.',
    ingredientes: 'Carne de ternera, huesos, verduras (zanahoria, puerro), huevo para clarificar, Jerez seco.',
    instrucciones: 'Elabora un caldo concentrado. Clarifícalo. Sirve en tazas con un chorrito de Jerez en el momento.',
    tiempo: '90 min',
    dificultad: 'Media'
  },
  {
    id: 44,
    titulo: 'Crema de setas trufada',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Crema aterciopelada con setas de temporada y aroma intenso a trufa.',
    ingredientes: 'Setas variadas, caldo de verduras, nata, cebolla, aceite de trufa.',
    instrucciones: 'Sofríe cebolla y setas. Añade el caldo y cuece. Tritura, calienta con nata y termina con el aceite de trufa.',
    tiempo: '40 min',
    dificultad: 'Fácil'
  },
  {
    id: 45,
    titulo: 'Lasaña de espinacas y ricotta',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Lasaña vegetariana con capas de pasta, espinacas, queso *ricotta* y salsa bechamel.',
    ingredientes: 'Placas de lasaña, espinacas, *ricotta*, queso *parmesano*, bechamel, nuez moscada.',
    instrucciones: 'Prepara el relleno y la bechamel. Monta las capas y hornea hasta que esté gratinada.',
    tiempo: '50 min',
    dificultad: 'Media'
  },
  {
    id: 46,
    titulo: 'Ensalada templada de queso de cabra',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Hojas verdes con rulo de queso de cabra fundido, nueces y un aliño de miel.',
    ingredientes: 'Mezcla de lechugas, rulo de queso de cabra, nueces, tomate *cherry*, miel, vinagre.',
    instrucciones: 'Tuesta el queso brevemente. Monta la ensalada y aliña con la vinagreta de miel y vinagre.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 47,
    titulo: 'Ensalada de granada y nueces',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Ensalada festiva y colorida, con el toque agridulce de la granada.',
    ingredientes: 'Escarola o lechugas, granada, nueces, manzana verde, aceite de oliva, vinagre de Jerez.',
    instrucciones: 'Mezcla todos los ingredientes en un bol. Aliña justo antes de servir para mantener la frescura.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 48,
    titulo: 'Risotto de champiñones y parmesano',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Arroz cremoso italiano, con setas, vino blanco y un acabado de mantequilla y queso.',
    ingredientes: 'Arroz *Arborio*, champiñones, caldo de verduras, vino blanco, cebolla, *parmesano*, mantequilla.',
    instrucciones: 'Sofríe la cebolla, tuesta el arroz, añade vino. Incorpora el caldo poco a poco sin dejar de remover. Termina con mantequilla y *parmesano*.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 49,
    titulo: 'Arroz meloso de bogavante',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Un plato de lujo con arroz cocinado en un potente caldo de bogavante.',
    ingredientes: 'Bogavante, arroz, caldo de pescado, azafrán, cebolla, tomate, aceite de oliva.',
    instrucciones: 'Sofríe el bogavante y las verduras. Añade el arroz, el caldo caliente y el azafrán. Cocina hasta que el arroz esté meloso.',
    tiempo: '45 min',
    dificultad: 'Difícil'
  },
  {
    id: 50,
    titulo: 'Crema de puerros y patata (Vichyssoise)',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Crema elegante, tradicionalmente servida fría, pero deliciosa también caliente.',
    ingredientes: 'Puerros, patatas, caldo de pollo, nata, mantequilla, cebollino.',
    instrucciones: 'Rehoga los puerros. Añade las patatas y el caldo. Cuece, tritura y pasa por el colador. Añade nata y sirve.',
    tiempo: '40 min',
    dificultad: 'Fácil'
  },
  {
    id: 51,
    titulo: 'Raviolis de calabaza y salvia',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pasta rellena con una salsa simple de mantequilla, salvia y nueces.',
    ingredientes: 'Raviolis de calabaza (frescos o secos), mantequilla, hojas de salvia, nueces picadas, queso *parmesano*.',
    instrucciones: 'Cuece la pasta. Derrite la mantequilla, fríe la salvia. Mezcla la pasta con la salsa y las nueces. Espolvorea *parmesano*.',
    tiempo: '20 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 52,
    titulo: 'Sopa castellana con huevo',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Sopa tradicional de ajo, pan duro y jamón, un clásico para días fríos.',
    ingredientes: 'Pan duro, ajo, jamón, pimentón, caldo de pollo, huevo.',
    instrucciones: 'Sofríe ajo y jamón, añade pimentón y el pan. Vierte el caldo y cuece. Casca un huevo en cada ración antes de servir.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 53,
    titulo: 'Ensalada de bacalao y naranja',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Plato refrescante con lomos de bacalao desalado, naranja y aceitunas negras.',
    ingredientes: 'Bacalao desalado y desmigado, naranja en gajos, aceitunas negras, cebolla morada, aceite de oliva.',
    instrucciones: 'Mezcla los ingredientes y aliña. Idealmente, deja macerar un poco antes de servir.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 54,
    titulo: 'Crema de zanahoria y jengibre',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Crema dulce de zanahoria con el toque picante y aromático del jengibre.',
    ingredientes: 'Zanahorias, jengibre, caldo de verduras, naranja (zumo), nata (opcional).',
    instrucciones: 'Cocer las zanahorias con el jengibre. Triturar con el caldo. Ajustar de sal y pimienta. Servir con un poco de zumo de naranja.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 55,
    titulo: 'Canelones de carne gratinados',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pasta rellena de carne picada, cubierta con bechamel y queso.',
    ingredientes: 'Placas de canelones, carne picada (ternera y cerdo), tomate, cebolla, bechamel, queso para gratinar.',
    instrucciones: 'Prepara el relleno de carne. Rellena los canelones. Cúbrelos con bechamel y queso y hornea para gratinar.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 56,
    titulo: 'Lentejas gourmet con foie',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Un plato de cuchara tradicional elevado con un toque de *foie* y un buen sofrito.',
    ingredientes: 'Lentejas, verduras, *chorizo*, *morcilla*, *foie* fresco (para añadir al final).',
    instrucciones: 'Cuece las lentejas. Prepara el sofrito con las verduras y los embutidos. Mezcla y cocina a fuego lento. Termina con un trozo de *foie* por ración.',
    tiempo: '70 min',
    dificultad: 'Media'
  },
  {
    id: 57,
    titulo: 'Risotto de parmesano y limón',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Risotto cremoso y ligeramente ácido, ideal para limpiar el paladar.',
    ingredientes: 'Arroz *Arborio*, caldo, vino blanco, cebolla, *parmesano*, ralladura de limón, mantequilla.',
    instrucciones: 'Prepara el *risotto* de manera tradicional. Al final, añade una buena cantidad de ralladura de limón y zumo.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 58,
    titulo: 'Fideuá de marisco',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Plato de fideos con base de marisco, cocinado con un potente fumet.',
    ingredientes: 'Fideos finos para *fideuá*, caldo de pescado, gambas, mejillones, calamares, pimiento, cebolla, tomate.',
    instrucciones: 'Sofríe las verduras, añade el marisco y los fideos. Incorpora el caldo y cocina hasta que los fideos estén dorados y secos.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 59,
    titulo: 'Ensalada de pollo navideña',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Ensalada completa con pollo, manzana, pasas y un aliño de mostaza y miel.',
    ingredientes: 'Pollo cocido y deshebrado, manzana, pasas, nueces, lechuga, mostaza, miel, mayonesa.',
    instrucciones: 'Mezcla los ingredientes del aliño. Combina todos los sólidos en un bol y adereza. Sirve fría.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 60,
    titulo: 'Sopa thai suave de coco y pollo',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Sopa exótica con leche de coco, pollo y especias suaves.',
    ingredientes: 'Leche de coco, caldo de pollo, pollo en tiras, *lemongrass*, hojas de lima *kaffir*, chili suave.',
    instrucciones: 'Calienta la leche de coco y el caldo. Añade el pollo y las especias. Cocina hasta que el pollo esté tierno. Sirve caliente.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 61,
    titulo: 'Sopa miso con setas',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Sopa japonesa ligera y sabrosa, con pasta de miso y setas shiitake.',
    ingredientes: 'Pasta *miso*, caldo *dashi*, setas *shiitake*, tofu, cebolleta.',
    instrucciones: 'Calienta el caldo *dashi*. Disuelve la pasta *miso*. Añade las setas y el tofu cortados. Sirve con cebolleta picada.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 62,
    titulo: 'Crema de queso azul con crujiente',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Crema intensa de queso, ideal con un poco de pan crujiente o *bacon* frito.',
    ingredientes: 'Queso azul, nata, caldo de pollo, cebolla, pan o *bacon* para el crujiente.',
    instrucciones: 'Sofríe la cebolla. Añade el caldo y el queso desmenuzado. Tritura y pasa por el colador. Añade la nata. Sirve con el crujiente por encima.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 63,
    titulo: 'Tortellini en caldo suave',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pasta rellena en un caldo ligero, un clásico italiano para empezar.',
    ingredientes: '*Tortellini* de carne o queso, caldo de pollo suave, *parmesano* rallado.',
    instrucciones: 'Cuece los *tortellini* en el caldo. Sirve en cuencos hondos con queso *parmesano* por encima.',
    tiempo: '20 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 64,
    titulo: 'Cazuela de alubias con almejas',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Guiso marinero de alubias con el sabor de las almejas y un sofrito de marisco.',
    ingredientes: 'Alubias cocidas, almejas, vino blanco, ajo, cebolla, perejil, caldo de pescado.',
    instrucciones: 'Sofríe el ajo, cebolla y el perejil. Añade las alubias y el caldo. Cocina las almejas aparte y añádelas al final.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 65,
    titulo: 'Ensalada de pera, roquefort y nueces',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Combinación clásica de sabores fuertes y dulces en un plato equilibrado.',
    ingredientes: 'Mezcla de hojas, pera, queso *Roquefort*, nueces, miel, aceite de oliva, vinagre de manzana.',
    instrucciones: 'Desmenuza el queso y corta la pera. Combina los ingredientes y aliña con la vinagreta de miel.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 66,
    titulo: 'Arroz negro con alioli suave',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Arroz cocinado con tinta de calamar, servido con un *alioli* casero ligero.',
    ingredientes: 'Arroz, caldo de pescado, calamar, tinta de calamar, cebolla, ajo, *alioli* suave.',
    instrucciones: 'Prepara un sofrito y añade el calamar. Incorpora el arroz, la tinta y el caldo. Cocina. Sirve con una cucharada de *alioli*.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 67,
    titulo: 'Crema de marisco ligera',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Sopa de marisco con poco espesante, resaltando el sabor puro del pescado y marisco.',
    ingredientes: 'Pescado, marisco (gambas, cangrejos), tomate, cebolla, zanahoria, arroz (poco para espesar).',
    instrucciones: 'Sofríe y guisa el marisco. Tritura el sofrito y añade el caldo. Cocina y pasa por el colador. Sirve.',
    tiempo: '50 min',
    dificultad: 'Media'
  },
  {
    id: 68,
    titulo: 'Pasta fresca con trufa',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Plato sencillo de pasta con mantequilla y láminas de trufa negra.',
    ingredientes: 'Pasta fresca (*tagliatelle* o *pappardelle*), mantequilla, láminas de trufa negra, *parmesano*.',
    instrucciones: 'Cuece la pasta. Derrite la mantequilla. Mezcla la pasta, la mantequilla y láminas finas de trufa. Espolvorea *parmesano*.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 69,
    titulo: 'Ensalada de salmón y mango',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Contraste de sabores entre el salmón ahumado y el dulzor tropical del mango.',
    ingredientes: 'Salmón ahumado, mango, aguacate, lechuga, lima, aceite de oliva, cilantro.',
    instrucciones: 'Corta todos los ingredientes en dados. Mezcla y aliña con aceite y zumo de lima.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 70,
    titulo: 'Alcachofas confitadas con jamón',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Corazones de alcachofa cocidos lentamente en aceite y servidos con virutas de jamón ibérico.',
    ingredientes: 'Corazones de alcachofa, aceite de oliva, ajo, lonchas de jamón ibérico.',
    instrucciones: 'Confita las alcachofas con ajo. Sírvelas templadas con las virutas de jamón por encima.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 71,
    titulo: 'Polenta cremosa al parmesano',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Sémola de maíz cocida lentamente hasta obtener una textura suave, con mucho queso.',
    ingredientes: 'Harina de *polenta*, caldo de pollo, mantequilla, queso *parmesano* rallado.',
    instrucciones: 'Calienta el caldo y vierte la *polenta* poco a poco, sin dejar de remover. Cocina hasta que espese. Incorpora la mantequilla y el *parmesano*.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 72,
    titulo: 'Gnocchi de patata con mantequilla y salvia',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pequeñas bolas de patata con una salsa de mantequilla dorada y salvia crujiente.',
    ingredientes: '*Gnocchi* de patata, mantequilla, hojas de salvia, nueces, *parmesano*.',
    instrucciones: 'Cuece los *gnocchi*. Derrite la mantequilla hasta que se dore. Fríe la salvia. Mezcla todo y espolvorea *parmesano*.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 73,
    titulo: 'Sopa de cebolla gratinada',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Sopa clásica francesa con cebolla caramelizada, pan y queso *Gruyère* gratinado.',
    ingredientes: 'Cebollas, caldo de carne, vino blanco, pan tostado, queso *Gruyère*.',
    instrucciones: 'Carameliza las cebollas. Vierte el vino y el caldo. Sirve la sopa, cubre con pan y queso, y gratina.',
    tiempo: '50 min',
    dificultad: 'Media'
  },
  {
    id: 74,
    titulo: 'Hojaldre relleno de setas',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Volovanes o cestitas de hojaldre con un cremoso guiso de setas de bosque.',
    ingredientes: 'Masa de hojaldre, setas variadas, nata, cebolla, ajo, yema de huevo.',
    instrucciones: 'Prepara un relleno de setas cremoso. Rellena las formas de hojaldre y hornea hasta que el hojaldre esté dorado.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 75,
    titulo: 'Ceviche suave de lubina',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pescado blanco marinado en cítricos con verduras picadas, servido en formato de aperitivo grande.',
    ingredientes: 'Lubina fresca, zumo de lima, cebolla morada, cilantro, ají (opcional), maíz tierno.',
    instrucciones: 'Corta el pescado fino. Marínalo en zumo de lima por unos minutos. Mezcla con el resto de ingredientes y sirve frío.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 76,
    titulo: 'Pochas con verduras',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Guiso de alubias frescas (pochas) con un sofrito de verduras de temporada.',
    ingredientes: 'Pochas frescas, pimiento verde, pimiento rojo, cebolla, tomate, aceite de oliva.',
    instrucciones: 'Cuece las pochas. Prepara un sofrito y añádelo al guiso. Cocina a fuego lento para que se integren los sabores.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 77,
    titulo: 'Sopa de verduras al estilo navideño',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Sopa de verduras enriquecida con pequeños trozos de carne y fideos finos.',
    ingredientes: 'Caldo de carne, fideos finos, verduras (zanahoria, apio, nabo), trozos de carne cocida.',
    instrucciones: 'Calienta el caldo. Añade las verduras y la carne. Incorpora los fideos al final y sirve caliente.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 78,
    titulo: 'Ensalada de langostinos y aguacate',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Ensalada ligera y sabrosa, con langostinos, aguacate y vinagreta de cítricos.',
    ingredientes: 'Lechuga, langostinos cocidos, aguacate, pomelo o naranja, aceite, vinagre, mostaza.',
    instrucciones: 'Mezcla los ingredientes y prepara la vinagreta. Aliña justo antes de servir.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 79,
    titulo: 'Crema de tomate asado',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Tomates asados al horno para un sabor más intenso y ahumado en la crema.',
    ingredientes: 'Tomates, caldo de verduras, cebolla, ajo, albahaca fresca, nata (opcional).',
    instrucciones: 'Asa los tomates con ajo y cebolla. Tritura con el caldo. Cuela y calienta, añadiendo albahaca y nata.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 80,
    titulo: 'Raviolis de carne en salsa cremosa',
    categoria: 'primer-plato',
    img: 'placeholder.jpg',
    descripcion: 'Raviolis de carne con una salsa a base de nata y tomate o setas.',
    ingredientes: 'Raviolis de carne, nata para cocinar, salsa de tomate o setas, *parmesano*.',
    instrucciones: 'Cuece la pasta. Prepara la salsa calentando la nata con los ingredientes elegidos. Mezcla la pasta y sirve.',
    tiempo: '25 min',
    dificultad: 'Fácil'
  },

  // =============================================================
  // 🍖 40 SEGUNDOS PLATOS (Índices 80 - 119)
  // =============================================================
  {
    id: 81,
    titulo: 'Cordero asado tradicional',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Paletilla o pierna de cordero asada lentamente con patatas y hierbas.',
    ingredientes: 'Paletilla de cordero, patatas, manteca de cerdo, agua, vino blanco, romero, tomillo, sal.',
    instrucciones: 'Marina el cordero. Ásalo lentamente a baja temperatura, añadiendo el líquido y las patatas a mitad de cocción.',
    tiempo: '120 min',
    dificultad: 'Media'
  },
  {
    id: 82,
    titulo: 'Pollito relleno de frutos secos',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pollitos de corral rellenos de un picadillo de frutas, frutos secos y carne.',
    ingredientes: 'Pollos de corral (pequeños), carne picada, ciruelas pasas, orejones, piñones, coñac, caldo.',
    instrucciones: 'Rellena los pollos con la mezcla de carne y frutos secos. Ásalos al horno, bañándolos con el caldo y coñac.',
    tiempo: '90 min',
    dificultad: 'Difícil'
  },
  {
    id: 83,
    titulo: 'Cochinillo crujiente al horno',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Piel crujiente y carne tierna, un manjar de la cocina castellana.',
    ingredientes: 'Cochinillo, agua, sal gorda.',
    instrucciones: 'Asa el cochinillo lentamente en el horno con agua en la base. Sube la temperatura al final para conseguir el crujiente.',
    tiempo: '180 min',
    dificultad: 'Difícil'
  },
  {
    id: 84,
    titulo: 'Merluza al cava',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Lomos de merluza cocinados en una salsa cremosa a base de cava o vino espumoso.',
    ingredientes: 'Lomos de merluza, cava, nata para cocinar, harina, cebolla, aceite.',
    instrucciones: 'Pocha la cebolla. Añade harina y el cava. Incorpora la nata y el pescado. Cocina a fuego lento hasta que esté hecho.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 85,
    titulo: 'Bacalao confitado con ajo',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Lomos de bacalao cocinados lentamente en aceite de oliva con láminas de ajo.',
    ingredientes: 'Lomos de bacalao desalado, aceite de oliva, láminas de ajo, guindilla (opcional).',
    instrucciones: 'Cubre los lomos de bacalao con aceite. Confitar a fuego muy bajo. El aceite se usará para el *pil-pil* o como salsa.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 86,
    titulo: 'Solomillo Wellington',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Solomillo de ternera cubierto de *duxelle* de champiñones y envuelto en hojaldre.',
    ingredientes: 'Solomillo de ternera, hojaldre, champiñones, *foie* (opcional), huevo, mostaza.',
    instrucciones: 'Sella el solomillo. Cubre con la mezcla de champiñones. Envuelve en hojaldre y hornea hasta que el hojaldre esté dorado.',
    tiempo: '60 min',
    dificultad: 'Difícil'
  },
  {
    id: 87,
    titulo: 'Lubina a la sal',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pescado cocinado en una costra de sal, resultando en una carne muy jugosa.',
    ingredientes: 'Lubina entera, sal gorda (mínimo 1kg), claras de huevo, hierbas aromáticas.',
    instrucciones: 'Mezcla la sal con las claras de huevo. Cubre la lubina con la mezcla y hornea. Rompe la costra para servir.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 88,
    titulo: 'Entrecot con mantequilla de hierbas',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Corte de carne a la parrilla servido con mantequilla derretida y hierbas frescas.',
    ingredientes: 'Entrecot, mantequilla, perejil, ajo, romero, tomillo, aceite de oliva.',
    instrucciones: 'Prepara la mantequilla de hierbas. Sella el entrecot a la parrilla o sartén y termina la cocción. Coloca una rodaja de mantequilla encima.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 89,
    titulo: 'Pularda rellena navideña',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Ave grande rellena con una mezcla de carne, frutos secos y manzana, bañada en vino.',
    ingredientes: 'Pularda, carne picada, manzana, ciruelas pasas, coñac, vino dulce, caldo de ave.',
    instrucciones: 'Rellena la pularda. Ásala, regándola constantemente con la salsa de vino y caldo. Trinchado en la mesa.',
    tiempo: '180 min',
    dificultad: 'Difícil'
  },
  {
    id: 90,
    titulo: 'Rape a la marinera',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Cola de rape en una salsa suave de marisco, con almejas y gambas.',
    ingredientes: 'Rape, gambas, almejas, cebolla, ajo, vino blanco, caldo de pescado, perejil.',
    instrucciones: 'Sofríe el ajo y la cebolla. Añade el vino y el caldo. Incorpora el rape, las almejas y las gambas. Cuece a fuego lento.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 91,
    titulo: 'Pavo asado con salsa de arándanos',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pavo asado con piel crujiente y una salsa agridulce de arándanos.',
    ingredientes: 'Pavo (pechuga o entero), arándanos rojos frescos, azúcar, agua, vino tinto, hierbas.',
    instrucciones: 'Asa el pavo. Prepara la salsa hirviendo los arándanos, azúcar y vino. Sirve el pavo loncheado con la salsa.',
    tiempo: '120-240 min',
    dificultad: 'Difícil'
  },
  {
    id: 92,
    titulo: 'Magret de pato con salsa de naranja',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pechuga de pato con la piel crujiente, servida con una salsa cítrica.',
    ingredientes: 'Magret de pato, naranjas (zumo y ralladura), coñac, miel, vinagre.',
    instrucciones: 'Marca el *magret* por la piel. Cocínalo y déjalo reposar. Prepara la salsa con el zumo de naranja y demás ingredientes. Lonchea y sirve.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 93,
    titulo: 'Redondo de ternera en salsa',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Redondo de ternera guisado en una salsa espesa de verduras y vino tinto.',
    ingredientes: 'Redondo de ternera, cebolla, zanahoria, pimiento, vino tinto, caldo de carne, harina.',
    instrucciones: 'Sella la carne. Sofríe las verduras. Guisa la carne con las verduras y el vino hasta que esté tierna. Lonchea y sirve con la salsa triturada.',
    tiempo: '120 min',
    dificultad: 'Media'
  },
  {
    id: 94,
    titulo: 'Carrilleras al vino tinto',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Carrilleras de ternera o cerdo cocinadas lentamente en vino, hasta que la carne se deshace.',
    ingredientes: 'Carrilleras, vino tinto de calidad, cebolla, zanahoria, puerro, caldo de carne, harina.',
    instrucciones: 'Sella las carrilleras. Sofríe las verduras y guisa todo junto con el vino y el caldo durante horas.',
    tiempo: '180 min',
    dificultad: 'Media'
  },
  {
    id: 95,
    titulo: 'Cabrito al horno',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Asado de cabrito o lechal con ajo y romero, con la piel crujiente.',
    ingredientes: 'Cabrito, ajo, romero, tomillo, vino blanco, agua, aceite de oliva, sal.',
    instrucciones: 'Marina el cabrito con hierbas y ajo. Ásalo a baja temperatura, subiendo al final. Báñalo con vino y agua.',
    tiempo: '150 min',
    dificultad: 'Media'
  },
  {
    id: 96,
    titulo: 'Salmón al eneldo con miel',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Filetes de salmón al horno o plancha con una salsa de miel y eneldo.',
    ingredientes: 'Lomos de salmón, miel, eneldo fresco, limón, aceite de oliva.',
    instrucciones: 'Mezcla miel, limón, aceite y eneldo. Unta el salmón y cocínalo al horno o a la plancha.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 97,
    titulo: 'Lubina al horno con patatas panaderas',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Lubina entera asada en el horno, con patatas y cebolla en rodajas.',
    ingredientes: 'Lubina entera, patatas, cebolla, pimiento, vino blanco, aceite de oliva, limón.',
    instrucciones: 'Sofríe las patatas y la cebolla. Coloca la lubina encima y hornea hasta que el pescado esté en su punto.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 98,
    titulo: 'Albóndigas caseras en salsa gourmet',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Albóndigas de ternera y cerdo en una salsa con vino, setas o almendras.',
    ingredientes: 'Carne picada, huevo, pan rallado, cebolla, vino tinto, setas o almendras.',
    instrucciones: 'Forma y sella las albóndigas. Guísalas en una salsa a base de verduras, vino y caldo.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 99,
    titulo: 'Dorada al horno con cítricos',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Dorada entera con rodajas de limón, naranja y lima para un sabor refrescante.',
    ingredientes: 'Dorada entera, limón, naranja, lima, aceite de oliva, perejil, vino blanco.',
    instrucciones: 'Rellena la dorada con rodajas de cítricos. Ásala al horno. Riega con vino y aceite.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 100,
    titulo: 'Solomillo con salsa de setas',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Tacos de solomillo de ternera con una salsa cremosa de setas de bosque.',
    ingredientes: 'Solomillo, setas variadas, nata para cocinar, coñac, cebolla, aceite.',
    instrucciones: 'Sella el solomillo. Sofríe las setas. Añade la nata y el coñac. Sirve el solomillo loncheado con la salsa.',
    tiempo: '30 min',
    dificultad: 'Media'
  },
  {
    id: 101,
    titulo: 'Costillas de cerdo glaseadas',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Costillas de cerdo cocinadas a baja temperatura y cubiertas con un glaseado dulce y pegajoso.',
    ingredientes: 'Costillas de cerdo, salsa BBQ, miel, mostaza, salsa de soja, especias.',
    instrucciones: 'Hornea las costillas lentamente. Prepara el glaseado y úntalo en las costillas, subiendo la temperatura para caramelizar.',
    tiempo: '180 min',
    dificultad: 'Media'
  },
  {
    id: 102,
    titulo: 'Pollo a la cerveza especiada',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pollo guisado en cerveza con un toque de especias navideñas.',
    ingredientes: 'Pollo troceado, cerveza negra, cebolla, ajo, especias (*laurel*, *clavo*, *tomillo*), caldo.',
    instrucciones: 'Sella el pollo. Sofríe las verduras. Guisa el pollo con la cerveza y las especias hasta que la carne esté tierna.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 103,
    titulo: 'Merluza rellena de marisco',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Lomos de merluza rellenos de una mezcla de gambas y mejillones.',
    ingredientes: 'Lomos de merluza, gambas, mejillones, huevo duro, cebolla, pan rallado.',
    instrucciones: 'Prepara el relleno de marisco. Rellena los lomos y átalos. Cocina al horno o en salsa suave.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 104,
    titulo: 'Lubina con verduras asadas',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Filetes de lubina con una guarnición de verduras de invierno asadas.',
    ingredientes: 'Lomos de lubina, verduras (brócoli, zanahoria, calabacín), aceite de oliva, limón.',
    instrucciones: 'Asa las verduras con aceite. Cocina la lubina al horno o a la plancha. Sirve el pescado sobre las verduras.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 105,
    titulo: 'Conejo en salsa de almendras',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Guiso de conejo con una salsa espesa y aromática de almendras.',
    ingredientes: 'Conejo troceado, almendras, cebolla, ajo, vino blanco, caldo de pollo, perejil.',
    instrucciones: 'Sella el conejo. Sofríe el ajo y la cebolla. Prepara una picada con las almendras. Guisa el conejo con la picada y el caldo.',
    tiempo: '90 min',
    dificultad: 'Media'
  },
  {
    id: 106,
    titulo: 'Zarzuela de marisco',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Guiso de pescado y marisco variado, servido en cazuela de barro.',
    ingredientes: 'Pescado blanco (rape), gambas, mejillones, almejas, calamares, cebolla, tomate, vino blanco.',
    instrucciones: 'Prepara un sofrito. Incorpora el pescado y marisco por tandas. Cuece a fuego lento con el vino y el caldo.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 107,
    titulo: 'Brochetas de solomillo y verduras',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Piezas de carne y verdura intercaladas, cocinadas a la parrilla o al horno.',
    ingredientes: 'Solomillo de ternera, pimiento, cebolla, calabacín, aceite de oliva, salsa chimichurri.',
    instrucciones: 'Corta los ingredientes en dados. Ensarta en las brochetas. Cocina a la parrilla y sirve con salsa.',
    tiempo: '25 min',
    dificultad: 'Fácil'
  },
  {
    id: 108,
    titulo: 'Lomo de cerdo con ciruelas',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Corte de lomo de cerdo asado con un relleno dulce de ciruelas pasas.',
    ingredientes: 'Lomo de cerdo, ciruelas pasas, vino dulce, caldo de carne, mantequilla, especias.',
    instrucciones: 'Abre el lomo y rellénalo. Ásalo al horno, regándolo con la salsa de vino y ciruelas.',
    tiempo: '90 min',
    dificultad: 'Media'
  },
  {
    id: 109,
    titulo: 'Pato a la manzana',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pato entero asado con un relleno aromático de manzana caramelizada.',
    ingredientes: 'Pato entero, manzanas, cebolla, vino, hierbas aromáticas.',
    instrucciones: 'Rellena el pato con las manzanas y hierbas. Ásalo lentamente hasta que esté tierno y dorado. La salsa se hace con los jugos de la cocción.',
    tiempo: '150 min',
    dificultad: 'Difícil'
  },
  {
    id: 110,
    titulo: 'Arroz con magro y verduras',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Arroz seco o meloso con carne de cerdo y un sofrito de verduras de temporada.',
    ingredientes: 'Arroz, magro de cerdo, pimiento, tomate, cebolla, caldo de carne, azafrán.',
    instrucciones: 'Sofríe el magro y las verduras. Añade el arroz y el caldo. Cocina hasta que esté en su punto.',
    tiempo: '40 min',
    dificultad: 'Media'
  },
  {
    id: 111,
    titulo: 'Secreto ibérico a la plancha',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Corte jugoso de cerdo ibérico, cocinado rápidamente a la plancha.',
    ingredientes: 'Secreto ibérico, sal, pimienta, aceite de oliva.',
    instrucciones: 'Sazona el secreto. Cocina a fuego fuerte en la plancha o sartén hasta que esté dorado por fuera y jugoso por dentro.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 112,
    titulo: 'Guiso de ternera con verduras',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Estofado de ternera cocinado a fuego lento con patatas, zanahorias y guisantes.',
    ingredientes: 'Ternera para guisar, patatas, zanahoria, guisantes, cebolla, caldo de carne, vino tinto.',
    instrucciones: 'Sella la carne. Sofríe las verduras. Guisa la carne con el caldo y el vino hasta que esté muy tierna.',
    tiempo: '120 min',
    dificultad: 'Media'
  },
  {
    id: 113,
    titulo: 'Pizza navideña gourmet',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pizza con ingredientes festivos, como *foie*, setas o jamón ibérico.',
    ingredientes: 'Masa de pizza, base cremosa (nata o queso), *mozzarella*, *foie*, setas, aceite de trufa.',
    instrucciones: 'Estira la masa. Añade la base y los ingredientes. Hornea hasta que la masa esté crujiente y el queso fundido.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 114,
    titulo: 'Hamburguesa premium gourmet',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Hamburguesa de carne de vacuno con quesos especiales y pan de *brioche*.',
    ingredientes: 'Carne de vacuno (200g), pan de *brioche*, queso *cheddar* madurado, *bacon*, salsa especial.',
    instrucciones: 'Cocina la carne a tu gusto. Monta la hamburguesa con los ingredientes *premium* y salsa casera.',
    tiempo: '20 min',
    dificultad: 'Fácil'
  },
  {
    id: 115,
    titulo: 'Chuletón a la brasa',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Corte de carne de buey o vaca, cocinado a la parrilla y servido con sal gorda.',
    ingredientes: 'Chuletón, sal gorda, aceite de oliva.',
    instrucciones: 'Sazona la carne. Cocina a fuego fuerte en la brasa, volteando. Sirve el punto de cocción deseado.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 116,
    titulo: 'Salmón a la plancha con limón',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Lomos de salmón sencillos con el toque ácido del limón.',
    ingredientes: 'Lomos de salmón, limón, aceite de oliva, sal, pimienta.',
    instrucciones: 'Cocina el salmón en la plancha con un poco de aceite. Sirve con rodajas de limón por encima.',
    tiempo: '15 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 117,
    titulo: 'Cordero al romero',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Pierna de cordero con un fuerte sabor a romero y ajo.',
    ingredientes: 'Pierna de cordero, romero fresco, ajo, aceite de oliva, vino blanco.',
    instrucciones: 'Pincha la pierna y rellena con ajo y romero. Ásala en el horno, regándola con el vino.',
    tiempo: '120 min',
    dificultad: 'Media'
  },
  {
    id: 118,
    titulo: 'Pulpo a la parrilla',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Patas de pulpo cocido, terminadas a la parrilla para un exterior crujiente.',
    ingredientes: 'Pulpo cocido, aceite de oliva, pimentón de la Vera, sal gorda.',
    instrucciones: 'Cocina las patas de pulpo en la parrilla para dorarlas. Aliña con aceite y pimentón.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 119,
    titulo: 'Atún a la plancha con soja',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Lomos de atún sellados a la plancha y marinados en salsa de soja.',
    ingredientes: 'Lomos de atún fresco, salsa de soja, jengibre, aceite de sésamo.',
    instrucciones: 'Sella los lomos de atún rápidamente. Sirve con una salsa de soja y jengibre.',
    tiempo: '10 min',
    dificultad: 'Muy Fácil'
  },
  {
    id: 120,
    titulo: 'Bacalao al pil-pil',
    categoria: 'segundo-plato',
    img: 'placeholder.jpg',
    descripcion: 'Clásico vasco de bacalao confitado con una emulsión de su gelatina y aceite.',
    ingredientes: 'Lomos de bacalao, aceite de oliva, ajo, guindilla.',
    instrucciones: 'Confita el bacalao. Retira y enfría el aceite. Liga el aceite con la gelatina del bacalao para formar el *pil-pil*.',
    tiempo: '45 min',
    dificultad: 'Difícil'
  },

  // =============================================================
  // 🎂 40 POSTRES (Índices 120 - 159)
  // =============================================================
  {
    id: 121,
    titulo: 'Tarta de queso al horno',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Tarta cremosa con base de galleta y un acabado ligeramente dorado.',
    ingredientes: 'Queso crema, nata, huevos, azúcar, galletas tipo *Digestive*, mantequilla.',
    instrucciones: 'Haz la base de galleta. Mezcla el relleno y hornea a temperatura baja hasta que esté cuajada.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 122,
    titulo: 'Tronco de Navidad',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Brazo de gitano relleno de crema de chocolate y decorado como un tronco.',
    ingredientes: 'Bizcocho para brazo de gitano, chocolate, nata para montar, azúcar, cacao en polvo.',
    instrucciones: 'Rellena el bizcocho con la crema. Cúbrelo con el glaseado de chocolate y haz estrías para simular la corteza.',
    tiempo: '90 min',
    dificultad: 'Difícil'
  },
  {
    id: 123,
    titulo: 'Tiramisú clásico',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Postre italiano de capas de bizcocho mojado en café, crema de *mascarpone* y cacao.',
    ingredientes: 'Queso *Mascarpone*, huevos, azúcar, bizcochos de soletilla, café fuerte, licor (*Amaretto* o ron), cacao en polvo.',
    instrucciones: 'Prepara la crema de *mascarpone*. Moja los bizcochos en café. Monta las capas y refrigera. Espolvorea cacao.',
    tiempo: '30 min (+ refrigeración)',
    dificultad: 'Media'
  },
  {
    id: 124,
    titulo: 'Mousse de chocolate',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Postre aireado y ligero, a base de chocolate negro y huevos.',
    ingredientes: 'Chocolate negro, huevos, azúcar, mantequilla.',
    instrucciones: 'Derrite el chocolate. Incorpora las yemas y el azúcar. Monta las claras a punto de nieve e incorpóralas con movimientos envolventes. Refrigera.',
    tiempo: '20 min (+ refrigeración)',
    dificultad: 'Media'
  },
  {
    id: 125,
    titulo: 'Flan casero cremoso',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Postre tradicional con caramelo líquido y una textura suave de huevo y leche.',
    ingredientes: 'Huevos, leche, azúcar, vainilla, caramelo líquido.',
    instrucciones: 'Prepara la mezcla. Vierte en moldes caramelizados y cocina al baño maría en el horno o en olla. Enfría antes de desmoldar.',
    tiempo: '60 min',
    dificultad: 'Fácil'
  },
  {
    id: 126,
    titulo: 'Tarta de manzana caliente',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Tarta de masa quebrada con rodajas de manzana y canela, perfecta servida templada.',
    ingredientes: 'Masa quebrada, manzanas, azúcar, canela, zumo de limón, mermelada de albaricoque.',
    instrucciones: 'Rellena la masa con las rodajas de manzana y hornea. Pinta con mermelada al salir del horno.',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: 127,
    titulo: 'Arroz con leche casero',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Arroz cocido lentamente en leche con canela y limón.',
    ingredientes: 'Arroz, leche entera, azúcar, cáscara de limón, rama de canela.',
    instrucciones: 'Cocina el arroz en la leche a fuego muy bajo con la cáscara de limón y la canela. Remueve constantemente. Endulza al final.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 128,
    titulo: 'Natillas caseras',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Crema de huevo y leche con galleta y canela espolvoreada.',
    ingredientes: 'Leche, yemas de huevo, azúcar, maicena, rama de canela, galletas María.',
    instrucciones: 'Calienta la leche. Mezcla las yemas y el azúcar. Espesa la mezcla con la maicena. Sirve con una galleta y canela.',
    tiempo: '30 min',
    dificultad: 'Fácil'
  },
  {
    id: 129,
    titulo: 'Tarta de turrón',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Tarta fría a base de queso y turrón de Jijona, muy popular en Navidad.',
    ingredientes: 'Turrón de Jijona, nata para montar, leche, cuajada o gelatina, azúcar, base de galleta.',
    instrucciones: 'Tritura el turrón con la leche. Calienta y añade la cuajada. Vierte sobre la base de galleta y refrigera.',
    tiempo: '20 min (+ refrigeración)',
    dificultad: 'Fácil'
  },
  {
    id: 130,
    titulo: 'Coulant de chocolate',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Bizcocho de chocolate con el centro líquido, servido caliente.',
    ingredientes: 'Chocolate negro, mantequilla, huevos, azúcar, harina.',
    instrucciones: 'Prepara la masa y hornea en moldes pequeños el tiempo justo para que el centro quede líquido.',
    tiempo: '25 min',
    dificultad: 'Media'
  },
  {
    id: 131,
    titulo: 'Profiteroles con nata',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Bolas de pasta *choux* rellenas de nata montada y cubiertas de chocolate.',
    ingredientes: 'Pasta *choux*, nata para montar, azúcar, chocolate para fundir.',
    instrucciones: 'Hornea los *profiteroles*. Rellénalos con la nata fría y báñalos en el chocolate derretido.',
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
    ingredientes: 'Chocolates (negro, leche, blanco), nata, leche, cuajada, galletas tipo *Digestive*, mantequilla.',
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
    ingredientes: 'Harina, huevos, leche, mantequilla, plátano, *Nutella* o salsa de chocolate.',
    instrucciones: 'Prepara la masa de *crepes* y cocínalos. Rellena con trozos de plátano y salsa de chocolate.',
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
    descripcion: 'Bizcocho especiado de zanahoria con un *frosting* de queso crema.',
    ingredientes: 'Zanahoria rallada, harina, azúcar, huevos, especias (*canela*, *nuez moscada*), queso crema, mantequilla.',
    instrucciones: 'Prepara el bizcocho y hornéalo. Deja enfriar y cúbrelo con el *frosting* de queso.',
    tiempo: '60 min',
    dificultad: 'Media'
  },
  {
    id: 139,
    titulo: 'Cupcakes de Navidad',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Pequeñas magdalenas con *frosting* y decoración festiva.',
    ingredientes: 'Masa de *cupcake*, *frosting* de mantequilla o queso, colorantes y decoración navideña.',
    instrucciones: 'Hornea los *cupcakes*. Prepara el *frosting* y decora con motivos navideños.',
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
    descripcion: 'Versión del *tiramisú* con fresas frescas en lugar de café.',
    ingredientes: 'Queso *Mascarpone*, huevos, azúcar, bizcochos de soletilla, fresas trituradas, licor de fresa (opcional).',
    instrucciones: 'Prepara la crema de *mascarpone*. Moja los bizcochos en el puré de fresas. Monta las capas y refrigera.',
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
    ingredientes: 'Base de masa quebrada, crema pastelera, fruta fresca (*kiwi*, *fresa*, *uva*), gelatina neutra.',
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
    ingredientes: 'Helado de limón (*sorbete*), cava o champagne, vodka (opcional).',
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
    ingredientes: 'Harina, mantequilla, azúcar, huevo, jengibre en polvo, canela, *glaseado* real.',
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
    descripcion: 'Bombones de *ganache* de chocolate, cubiertos de cacao en polvo.',
    ingredientes: 'Chocolate negro, nata para montar, mantequilla, cacao en polvo, ron (opcional).',
    instrucciones: 'Calienta la nata y viértela sobre el chocolate. Enfría el *ganache*. Forma las trufas y reboza en cacao.',
    tiempo: '20 min (+ refrigeración)',
    dificultad: 'Fácil'
  },
  {
    id: 160,
    titulo: 'Tiramisú de cacao amargo',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Versión intensa del *tiramisú* con mucho cacao amargo en polvo.',
    ingredientes: 'Queso *Mascarpone*, huevos, azúcar, bizcochos, café, licor, cacao amargo.',
    instrucciones: 'Prepara la crema y monta el *tiramisú* por capas. Utiliza una cantidad generosa de cacao amargo para espolvorear.',
    tiempo: '30 min (+ refrigeración)',
    dificultad: 'Media'
  }
];

// 🔁 ADAPTADOR PARA LA APP (Convierte el formato de datos al esperado por la lógica)
function mapCategoria(cat) {
  switch (cat) {
    case "aperitivos":
      return "aperitivo";
    case "primer-plato":
      return "primero";
    case "segundo-plato":
      return "segundo";
    case "postre":
      return "postre";
    default:
      return "otros";
  }
}

const RECETAS = recetas.map((r) => {
  const ingredientesArray = r.ingredientes
    ? r.ingredientes.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const pasosArray = r.instrucciones
    ? r.instrucciones.split(".").map((t) => t.trim()).filter(Boolean)
    : [];

  const imagePath =
    r.img && r.img !== "placeholder.jpg" ? r.img : "";

  return {
    id: r.id,
    title: r.titulo,
    category: mapCategoria(r.categoria),
    image: imagePath,
    description: r.descripcion,
    time: r.tiempo,
    difficulty: r.dificultad,
    servings: 4, // Valor por defecto
    ingredients: ingredientesArray,
    steps: pasosArray,
  };
});

// ============================================
// APP GOURMET – LÓGICA PRINCIPAL (CON DATOS FUSIONADOS)
// ============================================
"use strict";

// 1) CARGAR RECETAS DESDE la constante RECETAS (YA ESTÁ DEFINIDA ARRIBA)
let TODAS_LAS_RECETAS = [];

try {
  // Usamos la constante RECETAS (fusionada)
  if (typeof RECETAS !== 'undefined' && Array.isArray(RECETAS)) {
    TODAS_LAS_RECETAS = RECETAS.map(receta => ({
        ...receta,
        ingredients: Array.isArray(receta.ingredients) ? receta.ingredients : [],
        steps: Array.isArray(receta.steps) ? receta.steps : [],
    }));
  } else {
    console.error("❌ RECETAS no está definido. La fusión falló.");
  }
} catch (e) {
  console.error("❌ Error al acceder a RECETAS. Detalles:", e);
  TODAS_LAS_RECETAS = [];
}

// 2) REFERENCIAS AL DOM
const listadoEl = document.getElementById("listado");
const buscarInput = document.getElementById("buscar");
const filtroBtns = document.querySelectorAll(".filtros button[data-filtro]");
const btnFavs = document.getElementById("btn-favs");

// Lista de la compra
const listaCompraEl = document.getElementById("lista-compra");
const btnVaciarLista = document.getElementById("btn-vaciar");

// Modal
const modal = document.getElementById("modal");
const modalFondo = modal.querySelector(".fondo");
const modalDialogo = modal.querySelector(".dialogo");
const modalCerrar = document.getElementById("cerrar");
const modalContenido = document.getElementById("contenido-modal");

// Accesibilidad y contraste
const btnContraste = document.getElementById("btn-contraste");
const btnTexto = document.getElementById("btn-texto");

// 3) ESTADO DE LA APLICACIÓN
let filtroActual = "todas"; 	// "todas" | "aperitivo" | "primero" | "segundo" | "postre"
let mostrarSoloFavs = false;
let textoBusqueda = "";

// Para gestionar el foco de accesibilidad
let elementoQueAbrioModal = null; 

// Favoritos (localStorage)
const KEY_FAVS = "recetario_navidad_favs";
let favoritos = new Set(cargarFavoritos());

// Lista de la compra (localStorage)
const KEY_LISTA = "recetario_navidad_lista";
let listaCompra = new Set(cargarListaCompra());

// ============================================
// UTILIDADES DE LOCALSTORAGE
// ============================================
function cargarFavoritos() {
  try {
    const raw = localStorage.getItem(KEY_FAVS);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}

function guardarFavoritos() {
  localStorage.setItem(KEY_FAVS, JSON.stringify([...favoritos]));
}

function cargarListaCompra() {
  try {
    const raw = localStorage.getItem(KEY_LISTA);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}

function guardarListaCompra() {
  localStorage.setItem(KEY_LISTA, JSON.stringify([...listaCompra]));
}

// ============================================
// FILTRADO DE RECETAS
// ============================================
function recetaPasaFiltro(receta) {
  if (filtroActual !== "todas" && receta.category !== filtroActual) {
    return false;
  }

  if (mostrarSoloFavs && !favoritos.has(receta.id)) {
    return false;
  }

  if (textoBusqueda.trim() !== "") {
    const t = textoBusqueda.toLowerCase();
    const enTitulo = receta.title.toLowerCase().includes(t);
    const enDesc = receta.description.toLowerCase().includes(t);
    return enTitulo || enDesc;
  }

  return true;
}

function obtenerRecetasFiltradas() {
  return TODAS_LAS_RECETAS.filter(recetaPasaFiltro);
}

// ============================================
// PINTAR TARJETAS DE RECETA (OPTIMIZADO CON DocumentFragment)
// ============================================
function getEtiquetaCategoria(cat) {
  switch (cat) {
    case "aperitivo":
      return "Aperitivo";
    case "primero":
      return "Primer plato";
    case "segundo":
      return "Segundo plato";
    case "postre":
      return "Postre";
    default:
      return "Otros";
  }
}

function getClaseCategoria(cat) {
  switch (cat) {
    case "aperitivo":
      return "card-aperitivo";
    case "primero":
      return "card-primero";
    case "segundo":
      return "card-segundo";
    case "postre":
      return "card-postre";
    default:
      return "card-otros";
  }
}

function pintarRecetas() {
  const recetas = obtenerRecetasFiltradas();

  if (!recetas.length) {
    listadoEl.innerHTML = `
      <p class="sin-resultados">
        No se han encontrado recetas con esos filtros o búsqueda.
      </p>
    `;
    return;
  }

  // Optimización: Limpiar y usar DocumentFragment para mejor rendimiento
  listadoEl.innerHTML = '';
  const fragment = document.createDocumentFragment();

  recetas.forEach((r) => {
    const esFav = favoritos.has(r.id);
    const claseCat = getClaseCategoria(r.category);
    const etiquetaCat = getEtiquetaCategoria(r.category);

    // Añadimos el data-id a los botones para que la delegación de eventos funcione
    const htmlString = `
      <article class="card-receta ${claseCat}" data-id="${r.id}">
        <header class="card-header">
          <span class="badge-categoria">${etiquetaCat}</span>
          <button 
            class="btn-fav-toggle" 
            type="button" 
            aria-label="${esFav ? "Quitar de favoritos" : "Añadir a favoritos"}"
            data-id="${r.id}"
          >
            ${esFav ? "★" : "☆"}
          </button>
        </header>

        <h3 class="card-titulo">${r.title}</h3>
        <p class="card-descripcion">${r.description}</p>

        <div class="card-meta">
          <span>⏱️ ${r.time}</span>
          <span>🎯 ${r.difficulty}</span>
        </div>

        <footer class="card-footer">
          <button class="btn ver-receta" type="button" data-id="${r.id}">
            Ver receta
          </button>
        </footer>
      </article>
    `;

    // Crear el nodo y añadirlo al fragmento
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString.trim();
    fragment.appendChild(tempDiv.firstChild);
  });
  
  // Inserción única al DOM
  listadoEl.appendChild(fragment);
}

// ============================================
// MODAL – VER RECETA
// ============================================
// Variable global para el footer del modal (Se inicializa a null)
let modalFooter = null;

function abrirModal(recetaId) {
  const receta = TODAS_LAS_RECETAS.find((r) => r.id === recetaId);
  if (!receta) return;

  // Detenemos el asistente si ya estaba activo para una receta anterior
  detenerAsistenteVoz();

  const esFav = favoritos.has(receta.id);
  const etiquetaCat = getEtiquetaCategoria(receta.category);

  // NOTA: ingredients y steps se asumen como arrays gracias a la normalización
  const ingredientesHtml = receta.ingredients
    .map((ing) => `<li>${ing}</li>`)
    .join("");

  const pasosHtml = receta.steps
    .map((p, i) => `<li data-paso="${i}">${p}</li>`)
    .join("");

  modalContenido.innerHTML = `
    <article class="detalle-receta">
      <header>
        <p class="detalle-categoria">${etiquetaCat}</p>
        <h2>${receta.title}</h2>
        <p class="detalle-meta">
          ⏱️ ${receta.time} · 🎯 ${receta.difficulty} · 👥 ${receta.servings} raciones
        </p>
      </header>

      <section>
        <h3>Descripción</h3>
        <p>${receta.description}</p>
      </section>

      <section>
        <h3>Ingredientes</h3>
        <ul class="lista-ingredientes">
          ${ingredientesHtml}
        </ul>
      </section>

      <section>
        <h3>Pasos</h3>
        <ol class="lista-pasos">
          ${pasosHtml}
        </ol>
      </section>

      <footer class="detalle-acciones">
        <button 
          type="button" 
          class="btn btn-primario" 
          id="btn-add-lista"
          data-id="${receta.id}"
        >
          Añadir ingredientes a la lista
        </button>

        <button 
          type="button" 
          class="btn ${esFav ? "btn-fav-on" : "btn-fav-off"}" 
          id="btn-fav-detalle"
          data-id="${receta.id}"
        >
          ${esFav ? "★ En favoritos" : "☆ Añadir a favoritos"}
        </button>

        <button 
          type="button" 
          class="btn btn-voz" 
          id="btn-voz"
          data-id="${receta.id}"
        >
          🎙️ Asistente de voz
        </button>
      </footer>
    </article>
  `;

  modal.classList.add("abierto");
  // 🌟 CORRECCIÓN SCROLL: Añadir clase para bloquear scroll de fondo del body
  document.body.classList.add('modal-abierto'); 
  
  // Obtener la referencia al modalFooter
  modalFooter = modalDialogo.querySelector(".detalle-acciones"); 
  
  // Establecer la receta en lectura (CRÍTICO: disponible para el asistente)
  recetaEnLectura = receta; 

  // Foco para accesibilidad: establecer tabindex y enfocar
  modalDialogo.setAttribute('tabindex', '-1'); 
  modalDialogo.focus();

  // Es crucial llamar a esta función aquí para que el feedback visual se inicialice
  actualizarFeedbackVoz("inactivo"); 
}

function cerrarModal() {
  modal.classList.remove("abierto");
  // 🌟 CORRECCIÓN SCROLL: Quitar clase para desbloquear scroll de fondo del body
  document.body.classList.remove('modal-abierto'); 
  
  detenerAsistenteVoz();
  
  // Accesibilidad: devolver el foco al elemento que abrió el modal
  if (elementoQueAbrioModal) {
    elementoQueAbrioModal.focus();
    elementoQueAbrioModal = null; 
  }
  // Limpiar la referencia de la receta al cerrar el modal
  recetaEnLectura = null;
}

// ============================================
// LISTA DE LA COMPRA
// ============================================
function agregarIngredientesALista(receta) {
  if (Array.isArray(receta.ingredients)) {
    receta.ingredients.forEach((ing) => {
      if (ing && ing.trim()) {
        listaCompra.add(ing.trim());
      }
    });
  }
  guardarListaCompra();
  pintarListaCompra();
}

function pintarListaCompra() {
  if (!listaCompra.size) {
    listaCompraEl.innerHTML = `<p class="lista-vacia">Tu lista de la compra está vacía.</p>`;
    return;
  }

  const html = [...listaCompra].map((ing) => `
    <li class="item-lista">
      <span>${ing}</span>
      <button 
        type="button" 
        class="btn quitar-ingrediente" 
        data-ingrediente="${ing.replace(/"/g, "&quot;")}"
      >
        ×
      </button>
    </li>
  `).join("");

  listaCompraEl.innerHTML = `<ul class="lista-compra-ul">${html}</ul>`;
}

// Quitar un ingrediente (delegación)
listaCompraEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".quitar-ingrediente");
  if (!btn) return;
  const ing = btn.dataset.ingrediente;
  listaCompra.delete(ing);
  guardarListaCompra();
  pintarListaCompra();
});

// Vaciar lista
btnVaciarLista.addEventListener("click", () => {
  if (!listaCompra.size) return;
  const ok = confirm("¿Seguro que quieres vaciar toda la lista de la compra?");
  if (!ok) return;
  listaCompra.clear();
  guardarListaCompra();
  pintarListaCompra();
});

// ============================================
// FAVORITOS
// ============================================
function toggleFavorito(id) {
  if (favoritos.has(id)) {
    favoritos.delete(id);
  } else {
    favoritos.add(id);
  }
  guardarFavoritos();
}

// ============================================
// SINCRONIZAR UI DE FILTROS/FAVS
// ============================================
function sincronizarUIFiltros() {
  // Filtros de categoría
  filtroBtns.forEach((b) => {
    b.classList.toggle("active", b.dataset.filtro === filtroActual);
  });

  // Botón de favoritos (solo favoritos)
  if (btnFavs) {
    btnFavs.classList.toggle("active", mostrarSoloFavs);
  }
}

// Botón "Solo favoritos"
btnFavs.addEventListener("click", () => {
  mostrarSoloFavs = !mostrarSoloFavs;
  sincronizarUIFiltros();
  pintarRecetas();
});

// ============================================
// DELEGACIÓN DE EVENTOS
// ============================================

// Delegación para estrella de fav y "Ver Receta" en tarjetas
listadoEl.addEventListener("click", (e) => {
  const btnFav = e.target.closest(".btn-fav-toggle");
  if (btnFav) {
    const id = Number(btnFav.dataset.id); // Usar data-id del botón
    toggleFavorito(id);
    pintarRecetas();
    sincronizarUIFiltros();
    return;
  }

  const btnVer = e.target.closest(".ver-receta");
  if (btnVer) {
    const id = Number(btnVer.dataset.id); // Usar data-id del botón
    // Accesibilidad: Guardar el elemento que abrió el modal
    elementoQueAbrioModal = btnVer; 
    abrirModal(id);
  }
});

// Delegación de eventos para botones DENTRO del Modal
modalDialogo.addEventListener("click", (e) => {
    const target = e.target;
    // Si no tenemos recetaEnLectura, no hacemos nada (seguridad)
    if (!recetaEnLectura) return; 

    // Utilizamos la recetaEnLectura ya cargada para las acciones
    const recetaId = recetaEnLectura.id;

    if (target.id === "btn-add-lista") {
        agregarIngredientesALista(recetaEnLectura);
        return;
    }
    
    if (target.id === "btn-fav-detalle") {
        toggleFavorito(recetaId);
        abrirModal(recetaId); // repinta estado del modal
        pintarRecetas();
        sincronizarUIFiltros();
        return;
    }
    
    if (target.id === "btn-voz") {
        iniciarAsistenteVoz(recetaEnLectura);
        return;
    }
});


// ============================================
// FILTROS Y BÚSQUEDA
// ============================================
filtroBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filtroActual = btn.dataset.filtro;
    sincronizarUIFiltros();
    pintarRecetas();
  });
});

buscarInput.addEventListener("input", () => {
  textoBusqueda = buscarInput.value || "";
  pintarRecetas();
});

// ============================================
// MODAL – CIERRE
// ============================================
modalFondo.addEventListener("click", cerrarModal);
modalCerrar.addEventListener("click", cerrarModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("abierto")) {
    cerrarModal();
  }
});

// ============================================
// CONTRASTE Y TAMAÑO DE TEXTO
// ============================================
btnContraste.addEventListener("click", () => {
  document.body.classList.toggle("alto-contraste");
});

btnTexto.addEventListener("click", () => {
  document.body.classList.toggle("texto-grande");
});

// ============================================
// ASISTENTE DE VOZ (VERSIÓN FINAL Y ESTABLE)
// ============================================
let reconocimiento = null;
let reconocimientoActivo = false;
let recetaEnLectura = null; 
let indicePaso = 0;
let enPausa = false;

// Comprobación de APIs
const tieneSpeechRecognition =
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
const tieneSpeechSynthesis = "speechSynthesis" in window;

// Elemento para el feedback visual
let feedbackVozEl = null; 

// 🌟 INICIALIZACIÓN PWA: REGISTRO DEL SERVICE WORKER 🌟
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // 🌟 REGISTRO DEL SERVICE WORKER 🌟
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registrado con éxito:', registration.scope);
      })
      .catch(error => {
        console.log('Fallo el registro de ServiceWorker:', error);
      });
  });
}

// 🌟 Feedback Auditivo: Creación del Contexto de Audio
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioContext = tieneSpeechRecognition && AudioContextClass ? new AudioContextClass() : null;


function crearReconocimiento() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SR();
    recog.lang = "es-ES";
    recog.continuous = false; // Queremos un solo comando por activación
    recog.interimResults = false;
    return recog;
}

// ------------------------------------------------------------
// CONTROL DE VOZ
// ------------------------------------------------------------

/** 🌟 MEJORA: Genera un 'ding' auditivo para feedback de escucha */
function emitirFeedbackAuditivo() {
    if (!audioContext) return;
    
    // Si el contexto está suspendido (por las reglas de autoplay del navegador), lo reanuda
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine'; // Tono simple
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz (A4)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05); // Subir volumen rápido
    
    oscillator.start(audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3); // Bajar volumen rápido
    oscillator.stop(audioContext.currentTime + 0.3);
}

function leerTexto(texto, onEnd) {
    if (!tieneSpeechSynthesis) {
        if (onEnd) onEnd();
        return;
    }
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = "es-ES";
    msg.rate = 0.95; // Un poco más lento para mejor comprensión
    
    if (onEnd) {
        msg.onend = onEnd;
    }
    
    // Si estamos en pausa, la lectura se detiene.
    if (!enPausa) {
        // Detener la escucha ANTES de hablar (previene el auto-stop del ASR)
        if (reconocimientoActivo && reconocimiento) {
            try {
                reconocimiento.abort();
                reconocimientoActivo = false;
            } catch(e) {}
        }
        window.speechSynthesis.speak(msg);
    } else if (onEnd) {
        // Si estamos en pausa, simular el end si hay callback
        setTimeout(onEnd, 100); 
    }
}

function detenerAsistenteVoz() {
    indicePaso = 0;
    enPausa = false;
    reconocimientoActivo = false;

    if (reconocimiento) {
        try {
            reconocimiento.abort();
            reconocimiento.onresult = null;
            reconocimiento.onend = null;
            reconocimiento.onerror = null;
        } catch (e) {
             console.warn("Error al intentar abortar reconocimiento:", e);
        }
    }
    if (tieneSpeechSynthesis) {
        window.speechSynthesis.cancel();
    }
    actualizarFeedbackVoz("inactivo");
}

function actualizarFeedbackVoz(estado) {
    // Verifica si modalFooter es null ANTES de usarlo
    if (!modalFooter) return; 

    // 1. Asegurarse de que el elemento existe en el modal
    if (!feedbackVozEl) {
        feedbackVozEl = document.createElement("div");
        feedbackVozEl.id = "feedback-voz-estado";
        feedbackVozEl.style.cssText = "margin-top: 10px; font-weight: bold; padding: 5px; border-radius: 5px; text-align: center;";
        
        // Esto solo se ejecuta la primera vez que se abre el modal
        modalFooter.appendChild(feedbackVozEl); 
    }
    
    // 2. Actualizar el contenido según el estado
    switch (estado) {
        case "escuchando":
            feedbackVozEl.textContent = "🎙️ ESCUCHANDO... Di un comando.";
            feedbackVozEl.style.backgroundColor = "#ffc107"; // Amarillo
            feedbackVozEl.style.color = "#333";
            break;
        case "procesando":
            feedbackVozEl.textContent = "⚙️ PROCESANDO...";
            feedbackVozEl.style.backgroundColor = "#17a2b8"; // Azul
            feedbackVozEl.style.color = "#fff";
            break;
        case "inactivo":
            feedbackVozEl.textContent = "Asistente inactivo. Pulsa 🎙️ para empezar.";
            feedbackVozEl.style.backgroundColor = "transparent";
            feedbackVozEl.style.color = "#888";
            break;
        case "pausado":
             feedbackVozEl.textContent = "⏸️ Asistente en PAUSA. Di reanudar para continuar.";
             feedbackVozEl.style.backgroundColor = "#dc3545"; // Rojo
             feedbackVozEl.style.color = "#fff";
            break;
        default:
            break;
    }
}

// ------------------------------------------------------------
// NAVEGACIÓN DE PASOS
// ------------------------------------------------------------

function leerPasoActual() {
    if (!recetaEnLectura || enPausa) return;
    
    const totalPasos = recetaEnLectura.steps.length;

    // 🌟 MEJORA: Limpiar clase del paso anterior
    document.querySelectorAll('.lista-pasos li').forEach(li => li.classList.remove('paso-activo'));
    
    // Caso: Final de la receta
    if (indicePaso >= totalPasos) {
        leerTexto("Has llegado al final de la receta. ¡Buen trabajo! Asistente detenido.", () => {
            detenerAsistenteVoz();
        });
        return;
    }

    // 🌟 MEJORA: Marcar paso actual en el DOM
    const pasoActualEl = modalDialogo.querySelector(`[data-paso="${indicePaso}"]`);
    if (pasoActualEl) {
        pasoActualEl.classList.add('paso-activo');
    }

    // Caso: Lectura de paso normal
    const textoPaso = recetaEnLectura.steps[indicePaso];
    const textoAlerter = totalPasos > 1
        ? `Paso ${indicePaso + 1} de ${totalPasos}: `
        : "Instrucción única: ";
    
    // Lectura del paso
    leerTexto(textoAlerter + textoPaso, () => {
        if (!enPausa && tieneSpeechRecognition) {
            // Instrucciones de control (solo después de un paso para recordarlas)
            if (indicePaso === 0) {
                 leerTexto("Puedes decir: siguiente, anterior, repetir, ayuda o parar.", () => {
                     escucharComando();
                 });
            } else {
                 escucharComando(); // Continuar la escucha
            }
        }
    });
}

// ------------------------------------------------------------
// MANEJO DE COMANDOS
// ------------------------------------------------------------

function manejarComando(comando) {
    actualizarFeedbackVoz("procesando");
    
    // Cancelar cualquier lectura de voz pendiente para reaccionar al comando
    if (window.speechSynthesis.speaking) {
         window.speechSynthesis.cancel();
    }

    const t = comando; // El comando ya viene en minúsculas y limpio

    if (t.includes("siguiente")) {
        indicePaso++;
        leerPasoActual();

    } else if (t.includes("anterior") || t.includes("atrás")) {
        if (indicePaso > 0) {
            indicePaso--;
            leerPasoActual();
        } else {
            leerTexto("Ya estás en el primer paso. Di siguiente para avanzar.", () => {
                escucharComando();
            });
        }

    } else if (t.includes("repetir") || t.includes("otra vez")) {
        leerPasoActual(); // Se mantiene el índice

    } else if (t.includes("pausar") || t.includes("descanso")) {
        enPausa = true;
        leerTexto("Asistente pausado. Di reanudar para continuar.", () => {
            actualizarFeedbackVoz("pausado");
        });

    } else if (t.includes("reanudar") || t.includes("continuar")) {
        if (enPausa) {
            enPausa = false;
            leerTexto("Reanudando. Paso actual:", () => {
                 leerPasoActual(); // Continúa desde donde se quedó
            });
        } else {
            leerTexto("El asistente no estaba pausado.", () => {
                 escucharComando();
            });
        }

    } else if (t.includes("ayuda") || t.includes("qué puedo decir")) {
        leerTexto("Puedes decir: siguiente, anterior, repetir, pausar, reanudar o parar.", () => {
            escucharComando();
        });

    } else if (t.includes("parar") || t.includes("stop") || t.includes("terminar")) {
        leerTexto("Asistente de voz detenido. ¡Adiós!");
        detenerAsistenteVoz();
        return;

    } else {
        leerTexto("No he entendido el comando. Di ayuda para conocer las opciones.", () => {
            escucharComando();
        });
    }
}


function escucharComando() {
    if (!tieneSpeechRecognition || !recetaEnLectura || enPausa) {
        reconocimientoActivo = false;
        return;
    }
    
    // Reiniciar reconocimiento para evitar estados previos (máxima limpieza)
    if (reconocimiento) {
        try {
            reconocimiento.abort();
        } catch(e) {}
    }

    if (!reconocimiento) {
        reconocimiento = crearReconocimiento();
    }
    
    reconocimientoActivo = true;
    actualizarFeedbackVoz("escuchando");
    
    // 🌟 MEJORA: Emitir feedback auditivo justo antes de empezar a escuchar
    emitirFeedbackAuditivo();

    // Limpiar y re-asignar listeners
    reconocimiento.onresult = null;
    reconocimiento.onend = null;
    reconocimiento.onerror = null;

    reconocimiento.onresult = (ev) => {
        const comando = (ev.results[0][0].transcript || "").toLowerCase().trim();
        console.log("🎙️ Comando reconocido:", comando);
        manejarComando(comando);
    };

    reconocimiento.onend = () => {
        reconocimientoActivo = false;
        // Si no fue un stop intencional, intentamos reanudar la escucha
        if (recetaEnLectura && !enPausa) {
            escucharComando();
        }
    };

    reconocimiento.onerror = (ev) => {
        console.error("Error en reconocimiento:", ev.error);
        reconocimientoActivo = false;
        actualizarFeedbackVoz("inactivo");

        if (ev.error === "no-speech" || ev.error === "audio-capture") {
            // Reintentar la escucha si fue por falta de voz o error de audio
            escucharComando(); 
        } else {
             leerTexto("Ha ocurrido un error grave en el micrófono. Por favor, revisa los permisos del navegador.");
        }
    };

    try {
        reconocimiento.start();
    } catch (e) {
        console.warn("No se pudo iniciar el reconocimiento (probablemente ya activo):", e);
        reconocimientoActivo = false;
        actualizarFeedbackVoz("inactivo");
    }
}

// ------------------------------------------------------------
// INICIO DEL ASISTENTE
// ------------------------------------------------------------

function iniciarAsistenteVoz(receta) {
    if (!tieneSpeechSynthesis) {
        alert("Tu navegador no soporta síntesis de voz. No se puede usar el Asistente.");
        return;
    }
    if (!tieneSpeechRecognition) {
        alert("Tu navegador no soporta reconocimiento de voz. Puedes escuchar la receta, pero tendrás que pulsar Siguiente/Anterior en pantalla.");
    }

    detenerAsistenteVoz();
    // recetaEnLectura ya está cargada en abrirModal()

    const intro = `
      Vamos a cocinar la receta: ${receta.title}.
      Tiempo estimado: ${receta.time}.
      Dificultad: ${receta.difficulty}.
    `;

    const textoIngredientes = receta.ingredients && receta.ingredients.length
        ? "Ingredientes que necesitarás: " + receta.ingredients.join(". ")
        : "Esta receta no tiene ingredientes detallados.";

    // Cadena de lectura: intro -> ingredientes -> Paso 1
    leerTexto(intro, () => {
        leerTexto(textoIngredientes, () => {
            if (!receta.steps.length) {
                leerTexto("Esta receta no tiene pasos detallados.");
                detenerAsistenteVoz();
                return;
            }
            // Llama a leerPasoActual que se encarga de leer el paso 0
            leerPasoActual();
        });
    });
}
// ============================================
// FIN ASISTENTE DE VOZ
// ============================================


// ============================================
// INICIALIZACIÓN
// ============================================
function init() {
  // Sincronizar filtros y botón de favoritos con el estado inicial
  sincronizarUIFiltros();
  pintarRecetas();
  pintarListaCompra();
}

document.addEventListener("DOMContentLoaded", init);
