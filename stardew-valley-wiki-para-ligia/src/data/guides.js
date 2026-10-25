// Guías originales en español. Referencia: juego base 1.6; sin mods.
// Cada ficha enlaza la fuente consultada. Los consejos son orientación editorial.
export const categories = [
  {
    id: "inicio",
    name: "Primeros pasos",
    icon: "🌱",
    description: "Tu primera granja, sin prisas.",
  },
  {
    id: "cultivos",
    name: "Cultivos",
    icon: "🥕",
    description: "De una semilla a tu próxima cosecha.",
  },
  {
    id: "animales",
    name: "Animales",
    icon: "🐔",
    description: "Una granja llena de pequeños amigos.",
  },
  {
    id: "pesca",
    name: "Pesca",
    icon: "🐟",
    description: "Cada pez tiene su lugar y su momento.",
  },
  {
    id: "habitantes",
    name: "Habitantes",
    icon: "💗",
    description: "Regalos, amistad y corazones.",
  },
  {
    id: "minas",
    name: "Minas y combate",
    icon: "⛏️",
    description: "Tesoros bajo las montañas.",
  },
  {
    id: "artesania",
    name: "Artesanía",
    icon: "🍯",
    description: "Pequeñas máquinas, grandes ideas.",
  },
  {
    id: "cocina",
    name: "Cocina",
    icon: "🍳",
    description: "Recetas para cuidar de ti.",
  },
  {
    id: "mundo",
    name: "Explora el valle",
    icon: "🗺️",
    description: "Estaciones, lugares y descubrimientos.",
  },
  {
    id: "progreso",
    name: "Colecciones y progreso",
    icon: "⭐",
    description: "Un objetivo bonito para cada día.",
  },
];

const section = (title, text, items) => ({
  title,
  text,
  ...(items ? { items } : {}),
});
const guide = (id, title, category, summary, page, sections, tags = []) => ({
  id,
  title,
  category,
  summary,
  sections,
  source: `https://stardewvalleywiki.com/${page}`,
  tags,
});

export const guides = [
  guide(
    "primer-dia",
    "Tu primer día en la granja",
    "inicio",
    "Una pequeña parcela y un paseo: ya es un buen comienzo.",
    "Getting_Started",
    [
      section(
        "Empieza en pequeño",
        "En la mayoría de granjas recibes 15 semillas de chirivía. En la granja de la pradera empiezas con gallinero, dos gallinas y heno. No necesitas limpiar todo el terreno.",
        [
          "Despeja una zona cercana a casa.",
          "Ara con la azada, planta y riega.",
          "Comprueba tu energía antes de seguir talando.",
          "Dedica el resto del día a conocer el pueblo.",
        ],
      ),
      section(
        "Una rutina amable",
        "Elige una tarea principal al día. Guarda algunos recursos para fabricar y deja margen para volver a casa. La granja se construye durante muchos días; no hay que hacerlo todo en una tarde.",
      ),
    ],
    ["principiante", "primavera", "semillas"],
  ),
  guide(
    "elegir-granja",
    "Qué granja elegir",
    "inicio",
    "La distribución importa más que conseguir una granja perfecta.",
    "Farm_Maps",
    [
      section(
        "Según lo que te guste",
        "La granja estándar tiene mucho espacio abierto; la forestal favorece la recolección y Cuatro Esquinas separa bien las zonas de trabajo.",
        [
          "Pradera: comienza con gallinero y dos gallinas.",
          "Playa: la arena limita el uso de aspersores.",
          "Fluvial: mucha agua y menos terreno de cultivo.",
        ],
      ),
      section(
        "Consejo para empezar",
        "Escoge la estándar si quieres organizar cultivos con facilidad. El mapa queda fijado al crear la partida.",
      ),
    ],
    ["granja", "mapas", "principiante"],
  ),
  guide(
    "rutina-manana",
    "Tu rutina de la mañana",
    "inicio",
    "Cinco minutos de organización ahorran muchos paseos.",
    "Television",
    [
      section(
        "Antes de salir",
        "La televisión anuncia el tiempo de mañana y la fortuna de hoy. El programa de consejos se emite los lunes y jueves.",
        [
          "Mira la previsión antes de planear mejoras.",
          "Revisa cultivos, animales y máquinas.",
          "Lleva lo necesario para tu actividad principal.",
        ],
      ),
      section(
        "Un hábito útil",
        "Reserva un rincón junto a la puerta para preparar la siguiente excursión. Es una sugerencia de organización, no una obligación del juego.",
      ),
    ],
    ["televisión", "suerte", "rutina"],
  ),
  guide(
    "dormir",
    "La hora de volver a casa",
    "inicio",
    "Un día termina mejor cuando queda energía para mañana.",
    "Day_Cycle",
    [
      section(
        "El reloj del valle",
        "Te despiertas a las 6:00 y el día termina a las 2:00. Dormir después de medianoche puede reducir la energía recuperada; agotarte también influye.",
      ),
      section(
        "Guardar la partida",
        "El guardado habitual se completa al dormir y pasar al día siguiente. Calcula el camino de vuelta antes de comenzar otra actividad, especialmente en excursiones lejanas.",
      ),
    ],
    ["hora", "guardar", "energía"],
  ),
  guide(
    "regar",
    "Regar sin agobios",
    "inicio",
    "Una planta olvidada no significa perder toda la cosecha.",
    "Getting_Started",
    [
      section(
        "Lo esencial",
        "Los cultivos necesitan agua para crecer. Si no riegas un día, normalmente se retrasa su crecimiento; no mueren por ese olvido. Rellena la regadera en una masa de agua.",
      ),
      section(
        "Haz una parcela manejable",
        "Antes de comprar muchas semillas, piensa cuánto tiempo quieres dedicar al riego cada mañana. Amplía cuando puedas automatizarlo.",
      ),
    ],
    ["agua", "cultivos", "principiante"],
  ),
  guide(
    "habilidades",
    "Cómo subir tus habilidades",
    "inicio",
    "La experiencia llega al hacer las cosas que te gustan.",
    "Skills",
    [
      section(
        "Cinco caminos",
        "Agricultura, minería, recolección, pesca y combate tienen diez niveles cada una. Cosechar y cuidar animales mejora agricultura; extraer rocas mejora minería.",
      ),
      section(
        "Profesiones",
        "En los niveles 5 y 10 eliges una especialización. Las recetas y ventajas anunciadas al dormir estarán disponibles al día siguiente. La elección del nivel 5 condiciona las opciones del nivel 10.",
      ),
    ],
    ["experiencia", "profesiones", "nivel"],
  ),
  guide(
    "chirivias",
    "Chirivías: una primera cosecha sencilla",
    "cultivos",
    "Cuatro días para aprender el ritmo del huerto.",
    "Parsnip",
    [
      section(
        "Ficha rápida",
        "Cultivo de primavera. Tarda 4 días con riego y sin aceleradores. Su precio de venta base es 35 g.",
      ),
      section(
        "Plan pequeño",
        "Plantar el día 1 permite recoger el día 5 si no se interrumpe el crecimiento. Reserva parte de la cosecha antes de venderlo todo.",
      ),
    ],
    ["primavera", "4 días", "chirivía"],
  ),
  guide(
    "fresas",
    "Fresas que vuelven a dar fruto",
    "cultivos",
    "Una planta, varias cosechas durante la primavera.",
    "Strawberry",
    [
      section(
        "Crecimiento",
        "Las fresas tardan 8 días en madurar y después producen cada 4 días. El fruto de calidad normal tiene un precio base de 120 g.",
      ),
      section(
        "Planifica",
        "Cuanto antes plantes dentro de su temporada, más oportunidades tendrás de repetir cosecha. Mantén el riego después de recogerlas.",
      ),
    ],
    ["primavera", "fresa", "recolección múltiple"],
  ),
  guide(
    "arandanos-rojos",
    "Arándanos rojos para el otoño",
    "cultivos",
    "Una cosecha recurrente para llenar los cofres.",
    "Cranberries",
    [
      section(
        "Crecimiento",
        "Maduran en 7 días y vuelven a producir cada 5 días. Su temporada es otoño y cada fruto normal vale 75 g de base.",
      ),
      section(
        "Consejo de planificación",
        "Guarda presupuesto antes del cambio de estación. Plantar pronto permite aprovechar más rondas de cosecha.",
      ),
    ],
    ["otoño", "arándanos", "rentabilidad"],
  ),
  guide(
    "aspersores",
    "Qué aspersor necesitas",
    "cultivos",
    "Recupera tus mañanas para explorar el valle.",
    "Sprinkler",
    [
      section(
        "Cobertura",
        "Los aspersores riegan automáticamente cada mañana.",
        [
          "Básico: 4 casillas, agricultura 2.",
          "De calidad: 8 casillas alrededor, agricultura 6.",
          "De iridio: 24 casillas alrededor, agricultura 9.",
        ],
      ),
      section(
        "Colocación",
        "La casilla del propio aspersor no lleva cultivo. No riegan macetas ni el cuenco de la mascota y no funcionan sobre arena.",
      ),
    ],
    ["riego", "automatización", "iridio"],
  ),
  guide(
    "invernadero",
    "Tu huerto durante todo el año",
    "cultivos",
    "El invernadero libera tus cultivos del calendario exterior.",
    "Greenhouse",
    [
      section(
        "Desbloqueo",
        "Se restaura al completar la despensa del Centro Cívico, o mediante el proyecto correspondiente de Joja. Su interior tiene una parcela de 12 × 10.",
      ),
      section(
        "Cómo aprovecharlo",
        "Puedes cultivar semillas de cualquier estación durante todo el año. Organiza primero los aspersores y los pasillos; después elige tus plantas favoritas para no tener que rediseñar cada semana.",
      ),
    ],
    ["invernadero", "invierno", "centro cívico"],
  ),
  guide(
    "invierno-cultivos",
    "Sí hay cultivos de invierno",
    "cultivos",
    "El huerto descansa, pero no queda completamente cerrado.",
    "Winter",
    [
      section(
        "Opciones exteriores",
        "En la versión 1.6 puedes plantar melón de invierno, semillas invernales y semillas de fibra. La mayoría de cultivos habituales no sobreviven a esta estación.",
      ),
      section(
        "Cambio de ritmo",
        "Aprovecha el espacio libre para rediseñar caminos. Minería, pesca y mejoras de la granja son buenos proyectos para estas semanas.",
      ),
    ],
    ["invierno", "1.6", "melón de invierno"],
  ),
  guide(
    "cambio-estacion",
    "Antes de cambiar de estación",
    "cultivos",
    "Comprueba el calendario antes de comprar otra tanda de semillas.",
    "Summer",
    [
      section(
        "Lo que cambia",
        "Al comenzar el verano se marchitan los cultivos exclusivos de primavera. También cambian los peces y los objetos de recolección disponibles.",
      ),
      section(
        "Tu lista personal",
        "Compara el día actual con el tiempo de crecimiento, guarda dinero para semillas nuevas y recoge las cosechas listas. Una planta de varias estaciones puede tener reglas distintas: revisa su ficha antes de retirarla.",
      ),
    ],
    ["estaciones", "calendario", "semillas"],
  ),
  guide(
    "animales-rutina",
    "Cuida a tus animales cada día",
    "animales",
    "Comida, caricias y un lugar cómodo para dormir.",
    "Animals",
    [
      section(
        "Su bienestar",
        "Los animales de granero y gallinero necesitan alimento diario. Comen hierba cuando pueden salir o heno dentro. La amistad y el ánimo influyen en sus productos.",
      ),
      section("Checklist", "Revisa su estado al interactuar con ellos.", [
        "Acaricia a cada animal.",
        "Comprueba el comedero si llueve o no hay hierba.",
        "Recoge los productos.",
        "Evita dejarlos encerrados fuera por la noche.",
      ]),
    ],
    ["heno", "amistad", "rutina"],
  ),
  guide(
    "gallinas",
    "Tus primeras gallinas",
    "animales",
    "Huevos y compañía desde un pequeño gallinero.",
    "Chicken",
    [
      section(
        "Comprar y cuidar",
        "Marnie vende gallinas por 800 g. Necesitan un gallinero. Alimentadas cada día, maduran tras 3 noches y las adultas pueden producir un huevo diario.",
      ),
      section(
        "Colores y huevos",
        "Las blancas y azules dan huevos blancos; las marrones, huevos marrones. Con suficientes cuidados pueden dar huevos grandes. Piensa en conservar ambos colores para tus colecciones.",
      ),
    ],
    ["gallina", "huevo", "gallinero"],
  ),
  guide(
    "vacas-cabras",
    "Vacas y cabras",
    "animales",
    "Leche para vender, cocinar o convertir en queso.",
    "Marnie%27s_Ranch",
    [
      section(
        "Antes de comprar",
        "La vaca cuesta 1.500 g y necesita un granero. La cabra cuesta 4.000 g y requiere un granero grande.",
      ),
      section(
        "Recoger leche",
        "Necesitas una cubeta lechera. Las vacas adultas pueden dar leche a diario; las cabras, normalmente cada dos días. Organiza el cuidado antes de ampliar el rebaño.",
      ),
    ],
    ["vaca", "cabra", "leche"],
  ),
  guide(
    "cerdos",
    "Cerdos y trufas",
    "animales",
    "Un proyecto para cuando tu granero ya es grande.",
    "Pig",
    [
      section(
        "Requisitos",
        "Cada cerdo cuesta 16.000 g y necesita un granero de lujo. Bien alimentado, madura tras 10 noches.",
      ),
      section(
        "Encontrar trufas",
        "Las busca fuera del edificio. Deja espacio transitable y despejado alrededor del granero. No cuentes con esta producción en invierno ni en jornadas lluviosas; planifica otras fuentes de ingresos.",
      ),
    ],
    ["cerdo", "trufa", "granero"],
  ),
  guide(
    "silo",
    "Prepara el silo antes del invierno",
    "animales",
    "Una reserva de heno hace la rutina mucho más fácil.",
    "Silo",
    [
      section(
        "Capacidad",
        "Cada silo almacena 240 unidades de heno. Con un silo disponible, segar hierba puede añadir heno a la reserva.",
      ),
      section(
        "Planifica la comida",
        "Calcula aproximadamente un heno por animal y día que coma dentro. Comprueba el nivel del silo y conserva una reserva adicional si tienes muchos animales.",
      ),
    ],
    ["silo", "heno", "invierno"],
  ),
  guide(
    "animales-invierno",
    "Animales felices en invierno",
    "animales",
    "La estación fría cambia su alimentación y su rutina.",
    "Animals",
    [
      section(
        "Dentro de casa",
        "Los animales no salen a pastar en invierno. Asegura heno y coloca un calentador en cada edificio ocupado para ayudar a mantener su ánimo.",
      ),
      section(
        "Sin prisas",
        "Aunque un animal no muere por pasar hambre, pierde bienestar y deja de producir. Comprar comida antes de quedarte sin ella evita interrupciones.",
      ),
    ],
    ["invierno", "calentador", "bienestar"],
  ),
  guide(
    "pesca-primeros-pasos",
    "Aprende a pescar paso a paso",
    "pesca",
    "Pulsaciones pequeñas y un poco de paciencia.",
    "Fishing",
    [
      section(
        "Del lance al pez",
        "Mantén pulsado para preparar el lance y suelta para lanzar. Cuando aparezca la exclamación de picada, pulsa para empezar a recoger.",
      ),
      section(
        "El minijuego",
        "Mantén el pez dentro de la barra verde. Prueba pulsaciones cortas para corregir su altura sin pasarte. Prioriza aprender el movimiento antes de perseguir cofres de tesoro.",
      ),
    ],
    ["pesca", "principiante", "caña"],
  ),
  guide(
    "cana-entrenamiento",
    "La caña de entrenamiento",
    "pesca",
    "La ayuda más barata para perder el miedo a pescar.",
    "Training_Rod",
    [
      section(
        "Dónde comprarla",
        "Willy la vende por 25 g. Amplía la barra verde para principiantes y facilita mantener el progreso.",
      ),
      section(
        "Sus límites",
        "Captura peces básicos de calidad normal y no admite cebo ni aparejos. Aun así, las capturas dan experiencia y cuentan para la colección. Puedes practicar con ella hasta sentirte cómoda.",
      ),
    ],
    ["Willy", "caña", "principiante"],
  ),
  guide(
    "pez-gato",
    "Dónde pescar el pez gato",
    "pesca",
    "Guarda un día de lluvia para esta captura.",
    "Catfish",
    [
      section(
        "En el río",
        "Aparece en primavera y otoño cuando llueve, entre las 6:00 y las 00:00. También tiene ubicaciones especiales con otras temporadas.",
      ),
      section(
        "Prepara el intento",
        "Su dificultad es alta para una caña de entrenamiento, que no lo captura. Mejora tu nivel y ve con tiempo; no necesitas conseguirlo en la primera picada.",
      ),
    ],
    ["pez gato", "lluvia", "primavera", "otoño"],
  ),
  guide(
    "esturion",
    "Esturión: del lago al estanque",
    "pesca",
    "Una captura útil tanto para colecciones como para producción.",
    "Sturgeon",
    [
      section(
        "Lugar y temporada",
        "Se pesca en el lago de la montaña durante verano e invierno. Tiene mayor presencia en días lluviosos de verano.",
      ),
      section(
        "Un buen ejemplar para guardar",
        "Si planeas construir un estanque, reserva uno. Comprueba la ficha del pez y el calendario antes de dedicarle una jornada completa.",
      ),
    ],
    ["esturión", "verano", "invierno", "lago"],
  ),
  guide(
    "pez-globo",
    "La ventana del pez globo",
    "pesca",
    "Una captura de verano con un horario muy concreto.",
    "Pufferfish",
    [
      section(
        "Dónde y cuándo",
        "En el océano del valle: verano, sol y de 12:00 a 16:00. Isla Jengibre ofrece otras posibilidades más adelante.",
      ),
      section(
        "No es un tentempié",
        "Comerlo resta energía. Sepáralo de la comida que llevas en la mochila y no uses una caña de entrenamiento para buscarlo.",
      ),
    ],
    ["pez globo", "verano", "océano"],
  ),
  guide(
    "anguila",
    "Anguila en una tarde de lluvia",
    "pesca",
    "El mar también guarda peces para después del atardecer.",
    "Eel",
    [
      section(
        "Condiciones",
        "Se pesca en el océano durante primavera u otoño, con lluvia, entre las 16:00 y las 2:00.",
      ),
      section(
        "Consejo de ruta",
        "Haz tus tareas de granja por la mañana y reserva la tarde para la playa. La ventana llega hasta tarde, pero deja tiempo para volver a dormir.",
      ),
    ],
    ["anguila", "lluvia", "noche"],
  ),
  guide(
    "nasas",
    "Nasas: pesca a otro ritmo",
    "pesca",
    "Recoge pequeñas capturas sin el minijuego.",
    "Crab_Pot",
    [
      section(
        "Uso diario",
        "Coloca la nasa en el agua, añade cebo y recógela al día siguiente. Normalmente hay que reponer cebo cada día.",
      ),
      section(
        "Progreso constante",
        "Se desbloquean en pesca 3. Recogerlas aporta experiencia incluso si contienen basura. El agua dulce y el océano ofrecen capturas diferentes.",
      ),
    ],
    ["nasa", "cebo", "experiencia"],
  ),
  guide(
    "estanques",
    "Construye un estanque de peces",
    "pesca",
    "Una pequeña piscifactoría junto a tu huerto.",
    "Fish_Pond",
    [
      section(
        "Construcción",
        "Robin pide 5.000 g, 200 piedras, 5 algas marinas y 5 algas verdes. Ocupa 5 × 5 casillas.",
      ),
      section(
        "Funcionamiento",
        "Cada estanque alberga una sola especie. Los peces pueden pedir objetos para ampliar la población. La producción depende de la especie; recoge la cesta y revisa sus encargos.",
      ),
    ],
    ["estanque", "Robin", "huevas"],
  ),
  guide(
    "amistad",
    "Cómo ganar corazones",
    "habitantes",
    "Un saludo cotidiano también construye amistad.",
    "Friendship",
    [
      section(
        "Acércate a tu ritmo",
        "Cada corazón representa 250 puntos de amistad. Hablar a diario, completar entregas y elegir regalos que les gusten ayuda a conocer a los habitantes.",
      ),
      section(
        "Regalos con intención",
        "Como regla general puedes dar un regalo al día y dos por semana, con excepciones como los cumpleaños. Consulta sus preferencias antes de entregar un objeto valioso.",
      ),
    ],
    ["amistad", "regalos", "corazones"],
  ),
  guide(
    "leah",
    "Conoce a Leah",
    "habitantes",
    "Arte, naturaleza y un regalo fácil de recordar.",
    "Leah",
    [
      section(
        "Su rincón del valle",
        "Leah vive en una cabaña del bosque y cumple años el 23 de invierno. Es uno de los personajes con los que puedes casarte.",
      ),
      section(
        "Regalos que adora",
        "Entre sus favoritos están la ensalada, el queso de cabra, las trufas y el vino. La ensalada es una opción práctica para planificar tus visitas.",
      ),
    ],
    ["Leah", "ensalada", "cumpleaños"],
  ),
  guide(
    "sebastian-regalo",
    "Un regalo para Sebastian",
    "habitantes",
    "Una lágrima helada puede convertirse en amistad.",
    "Frozen_Tear",
    [
      section(
        "Un favorito",
        "Sebastian adora la lágrima helada. Su cumpleaños es el 10 de invierno.",
      ),
      section(
        "Organiza tus hallazgos",
        "Se puede obtener en geodas heladas y otras fuentes. Guarda una en tu reserva de regalos en vez de vender todos los minerales que encuentres.",
      ),
    ],
    ["Sebastian", "lágrima helada", "regalos"],
  ),
  guide(
    "matrimonio",
    "Del ramo a la boda",
    "habitantes",
    "Los pasos para compartir tu casa con un habitante.",
    "Marriage",
    [
      section(
        "Una relación que avanza",
        "Con un candidato disponible, entrega un ramo a los 8 corazones para poder llegar a 10. Para proponer matrimonio necesitas además mejorar la casa al menos una vez.",
      ),
      section(
        "El colgante",
        "El Viejo Marinero vende el colgante de sirena por 5.000 g cuando cumples las condiciones. Aparece en días lluviosos en la zona oriental de la playa. El matrimonio entre jugadores utiliza un sistema diferente.",
      ),
    ],
    ["boda", "ramo", "colgante", "amor"],
  ),
  guide(
    "agenda-social",
    "Una agenda social sencilla",
    "habitantes",
    "Elige a quién conocer sin convertirlo en una obligación.",
    "Friendship",
    [
      section(
        "Pequeños hábitos",
        "Revisa la pestaña social para ver corazones y regalos. Los personajes disponibles para romance se quedan en 8 corazones hasta recibir un ramo.",
      ),
      section(
        "Nuestro consejo",
        "Escoge dos o tres vecinos para empezar. Lleva sus regalos cuando tengas que pasar por su zona; así cada paseo tiene varias pequeñas recompensas.",
      ),
    ],
    ["habitantes", "amistad", "organización"],
  ),
  guide(
    "primeras-minas",
    "Tu primera visita a las minas",
    "minas",
    "Pico, comida y espacio libre en la mochila.",
    "The_Mines",
    [
      section(
        "Entrada",
        "Las minas de la montaña se abren el día 5 de primavera del primer año. Hay 120 plantas; se avanza encontrando escaleras al romper rocas o vencer enemigos.",
      ),
      section(
        "Prepara una excursión corta",
        "Lleva comida, un arma y el pico. Comprueba salud, energía y hora entre combates. Volver con pocos minerales es mejor que perder una mochila llena.",
      ),
    ],
    ["minas", "principiante", "combate"],
  ),
  guide(
    "fondo-minas",
    "Llegar al fondo de las minas",
    "minas",
    "Un objetivo de largo recorrido bajo la montaña.",
    "The_Mines",
    [
      section(
        "La planta 120",
        "Al llegar al fondo obtienes la llave calavera, necesaria para abrir la Caverna Calavera del desierto. También permite jugar a Junimo Kart en el salón.",
      ),
      section(
        "Plan personal",
        "Alterna jornadas de avance con otras para reunir recursos. No hace falta terminar las minas en una sola visita ni antes de una fecha concreta.",
      ),
    ],
    ["llave calavera", "120", "desierto"],
  ),
  guide(
    "caverna-calavera",
    "Prepárate para la Caverna Calavera",
    "minas",
    "Una expedición que empieza de nuevo en cada visita.",
    "Skull_Cavern",
    [
      section(
        "Qué cambia",
        "Está en el desierto y requiere la llave calavera. No tiene ascensor para conservar el progreso; cada visita comienza de nuevo.",
      ),
      section(
        "Equipaje recomendado",
        "Lleva curación suficiente, un arma adecuada y una forma de regresar. Los agujeros permiten saltar plantas, pero causan daño al caer. Revisa tu salud antes de saltar.",
      ),
    ],
    ["calavera", "combate", "desierto"],
  ),
  guide(
    "fundir-minerales",
    "Convierte mineral en lingotes",
    "minas",
    "El horno conecta tus excursiones con las mejoras de la granja.",
    "Furnace",
    [
      section(
        "Consigue la receta",
        "Tras obtener mineral de cobre, Clint puede visitarte por la mañana para enseñarte el horno. Fabricarlo cuesta 20 minerales de cobre y 25 piedras.",
      ),
      section(
        "Primera fundición",
        "Para un lingote de cobre, coloca 5 minerales con 1 carbón disponible. Guarda carbón: también lo necesitarás para más máquinas.",
      ),
    ],
    ["horno", "cobre", "lingotes", "Clint"],
  ),
  guide(
    "tesoros-museo",
    "Minerales para el museo",
    "minas",
    "Comprueba la descripción antes de vender un hallazgo nuevo.",
    "Museum",
    [
      section(
        "¿Ya está donado?",
        "Los objetos pendientes indican que Gunther puede contarte más si los llevas al museo. Solo se dona una copia de cada pieza.",
      ),
      section(
        "Una caja de descubrimientos",
        "Reserva un cofre para nuevos minerales y artefactos y organiza una visita cuando tengas varios. Puedes reorganizar la exposición después.",
      ),
    ],
    ["minerales", "artefactos", "Gunther"],
  ),
  guide(
    "conservas",
    "Mermeladas y encurtidos",
    "artesania",
    "Dale una segunda vida a tus cosechas.",
    "Preserves_Jar",
    [
      section(
        "La conservadora",
        "Se aprende en agricultura 4. Requiere 50 maderas, 40 piedras y 8 carbones. Convierte fruta en mermelada y verduras en encurtidos.",
      ),
      section(
        "Valor y calidad",
        "Para estas conservas el precio base es 2 × valor normal del ingrediente + 50 g. La estrella del ingrediente no aumenta el resultado; considera procesar primero los de calidad normal.",
      ),
    ],
    ["conservadora", "mermelada", "encurtidos"],
  ),
  guide(
    "barriles",
    "Barriles para vino y otras bebidas",
    "artesania",
    "Una buena razón para empezar a guardar resina de roble.",
    "Keg",
    [
      section(
        "Fabricación",
        "La receta se aprende en agricultura 8: 30 maderas, 1 lingote de cobre, 1 de hierro y 1 resina de roble.",
      ),
      section(
        "Producción",
        "La fruta produce vino y las verduras pueden producir zumo. El vino vale 3 veces el precio base de la fruta antes de bonificaciones. No confundas el barril de bebidas con el tonel del sótano para envejecer.",
      ),
    ],
    ["vino", "barril", "resina"],
  ),
  guide(
    "resineras",
    "Resineras y árboles",
    "artesania",
    "Tu pequeña reserva de jarabe, resina y alquitrán.",
    "Tapper",
    [
      section(
        "Fabricación",
        "En la versión 1.6 se aprende en recolección 4. Necesitas 40 maderas y 2 lingotes de cobre.",
      ),
      section(
        "Planifica un rincón de árboles",
        "Instálalas en árboles adultos apropiados y vuelve a recoger el producto cuando esté listo. Conserva distintos árboles para tener materiales diversos al fabricar.",
      ),
    ],
    ["resinera", "árbol", "roble", "arce"],
  ),
  guide(
    "colmenas",
    "Miel y flores",
    "artesania",
    "Un pequeño jardín puede mejorar tu producción de miel.",
    "Bee_House",
    [
      section(
        "Cómo funciona",
        "La colmena produce miel al aire libre tras 4 noches, excepto en invierno. No produce dentro del invernadero.",
      ),
      section(
        "Miel floral",
        "Una flor cultivada, madura y sin recoger dentro de su alcance puede cambiar la miel. Recoge primero la miel y conserva la flor si quieres seguir produciendo esa variedad.",
      ),
    ],
    ["miel", "flores", "colmena"],
  ),
  guide(
    "caviar",
    "Huevas, conservas y caviar",
    "artesania",
    "El estanque puede alimentar una cadena de producción.",
    "Preserves_Jar",
    [
      section(
        "Dos resultados",
        "La conservadora transforma las huevas de esturión en caviar. Las huevas de otros peces se convierten en huevas curadas.",
      ),
      section(
        "Consejo de organización",
        "Coloca las máquinas cerca del recorrido con el que recoges los estanques. Guarda antes los ejemplares que quieras utilizar para otros objetivos.",
      ),
    ],
    ["caviar", "huevas", "esturión"],
  ),
  guide(
    "cocinar",
    "Tu primera cocina",
    "cocina",
    "Una mejora de casa abre una colección entera de recetas.",
    "Cooking",
    [
      section(
        "Desbloqueo",
        "La primera ampliación de la casa añade cocina y nevera. También existe el kit de cocina, disponible mediante recolección 3.",
      ),
      section(
        "Ingredientes",
        "La cocina utiliza lo que llevas encima y lo guardado en nevera o minineveras. Separa los peces y productos que quieras conservar para no gastarlos en recetas genéricas.",
      ),
    ],
    ["cocina", "nevera", "casa"],
  ),
  guide(
    "aprender-recetas",
    "No te pierdas La reina de la salsa",
    "cocina",
    "Aprende recetas incluso antes de tener cocina.",
    "The_Queen_of_Sauce",
    [
      section(
        "La cita semanal",
        "Desde el 7 de primavera, los domingos se emiten recetas nuevas durante los dos primeros años. Los miércoles hay reposiciones que priorizan recetas desconocidas.",
      ),
      section(
        "Solo tienes que verla",
        "Ver el programa enseña la receta. El ciclo vuelve a repetirse, así que perder una emisión no cierra la colección para siempre.",
      ),
    ],
    ["recetas", "televisión", "domingo"],
  ),
  guide(
    "comida-excursiones",
    "Prepara comida para tus excursiones",
    "cocina",
    "Salud y energía son dos barras distintas.",
    "Cooking",
    [
      section(
        "Revisa cada plato",
        "Los platos pueden recuperar salud y energía y algunos añaden bonificaciones temporales. Mira su descripción antes de preparar una salida.",
      ),
      section(
        "Una mochila cómoda",
        "Lleva un alimento de recuperación que puedas identificar rápido y una pequeña reserva. El huevo frito es la receta que conoces desde el comienzo; las demás debes aprenderlas.",
      ),
    ],
    ["energía", "salud", "comida"],
  ),
  guide(
    "primavera-agenda",
    "Un paseo por la primavera",
    "mundo",
    "Flores, primeras amistades y bayas del bosque.",
    "Spring",
    [
      section(
        "Fechas para recordar",
        "El Festival del Huevo es el día 13 y la Danza Floral el 24. Las frambuesas de los arbustos aparecen del 15 al 18.",
      ),
      section(
        "Tu plan del mes",
        "Reserva días para explorar sin herramientas de trabajo. Un paseo de recolección permite conocer caminos y encontrar recursos para futuras salidas.",
      ),
    ],
    ["primavera", "festival", "bayas"],
  ),
  guide(
    "verano-agenda",
    "Verano entre playa y montaña",
    "mundo",
    "Una estación para ampliar tus excursiones.",
    "Summer",
    [
      section(
        "Fechas para recordar",
        "El Luau se celebra el día 11 y la Danza de las Medusas Lunares el 28. El 3 de verano del primer año se abre la zona del ferrocarril y el balneario.",
      ),
      section(
        "Tu plan del mes",
        "Combina nuevas semillas con jornadas de pesca. Antes de ir a la playa comprueba los horarios de los peces que te faltan.",
      ),
    ],
    ["verano", "Luau", "balneario"],
  ),
  guide(
    "otono-agenda",
    "Otoño de cosechas y preparativos",
    "mundo",
    "Colores cálidos y una despensa para el invierno.",
    "Fall",
    [
      section(
        "Fechas para recordar",
        "La Feria de Stardew Valley es el día 16 y la Víspera de los Espíritus el 27. La temporada de moras de los arbustos va del 8 al 11.",
      ),
      section(
        "Tu plan del mes",
        "Haz espacio para conservar cosechas y revisa el alimento de los animales. Decide qué mejoras te gustaría realizar cuando disminuya el trabajo del huerto.",
      ),
    ],
    ["otoño", "feria", "moras"],
  ),
  guide(
    "carro-ambulante",
    "Visita el carro ambulante",
    "mundo",
    "Una oportunidad para encontrar ese objeto que te falta.",
    "Shop_Schedules",
    [
      section(
        "Cuándo ir",
        "El carro aparece en el Bosque Tizón los viernes y domingos de 6:00 a 20:00. También participa en algunos eventos.",
      ),
      section(
        "Compra con una lista",
        "Antes de gastar, revisa tus lotes pendientes y tu presupuesto. Un objeto fuera de temporada puede ahorrar una espera, pero no todas las compras son necesarias.",
      ),
    ],
    ["carro", "viernes", "domingo", "tiendas"],
  ),
  guide(
    "isla-jengibre",
    "Tu primer viaje a Isla Jengibre",
    "mundo",
    "Un nuevo lugar que descubrir cuando el valle ya te resulte familiar.",
    "Ginger_Island",
    [
      section(
        "Cómo llegar",
        "Se accede reparando el barco de la trastienda de Willy. El billete cuesta 1.000 g e incluye el regreso.",
      ),
      section(
        "Primera visita",
        "Lleva herramientas, comida y huecos libres. Dedica la primera jornada a orientarte y anota lo que quede pendiente; la isla tiene sus propios lugares, personajes y descubrimientos.",
      ),
    ],
    ["isla", "Willy", "barco", "avanzado"],
  ),
  guide(
    "centro-civico",
    "Abre el Centro Cívico",
    "progreso",
    "Conoce a los Junimos y comienza a devolverle vida al pueblo.",
    "Community_Center",
    [
      section(
        "La primera escena",
        "Desde el día 5 de primavera, entra al pueblo desde la parada del autobús en un día sin lluvia, entre las 8:00 y las 13:00. En multijugador debe hacerlo quien hospeda la partida.",
      ),
      section(
        "Aprende su idioma",
        "Vuelve al edificio, examina el pergamino dorado de la sala inferior izquierda y espera la carta del Mago al día siguiente. Visítalo para poder leer los lotes.",
      ),
      section(
        "Organízalo a tu manera",
        "Crea un cofre reservado para donaciones. Guarda una unidad de los objetos nuevos hasta revisar qué necesitas. Puedes hacer de cada sala un proyecto independiente.",
      ),
    ],
    ["centro cívico", "centro comunitario", "Junimos", "Mago"],
  ),
  guide(
    "lotes-centro",
    "Mapa de los lotes del Centro Cívico",
    "progreso",
    "Qué guardar y qué desbloquea cada sala.",
    "Bundles",
    [
      section(
        "Lotes normales",
        "Esta orientación corresponde a los lotes normales; los remezclados cambian los requisitos.",
        [
          "Sala de manualidades → puente de la cantera.",
          "Despensa → invernadero.",
          "Pecera → retirada de la roca brillante.",
          "Sala de calderas → vagonetas.",
          "Tablón de anuncios → amistad.",
          "Caja fuerte → autobús; pagos de 2.500, 5.000, 10.000 y 25.000 g.",
        ],
      ),
      section(
        "Reserva de cultivos",
        "Primavera: chirivía, judía verde, coliflor y patata. Verano: tomate, guindilla, arándano y melón. Otoño: maíz, berenjena, calabaza y ñame.",
      ),
      section(
        "Calidad y paciencia",
        "El lote de cultivos de calidad pide tres grupos de cinco unidades de oro: chirivías, melones, calabazas o maíz. Algunos lotes permiten elegir entre más objetos que huecos: no necesitas entregarlos todos.",
      ),
      section(
        "Plan anual",
        "Prioriza objetos estacionales, animales y árboles que tardan en producir. Comprueba el pergamino antes de vender. La lombarda normalmente requiere semillas de Pierre del segundo año; el carro puede adelantarla.",
      ),
    ],
    ["lotes", "despensa", "autobús", "invernadero", "centro comunitario"],
  ),
  guide(
    "coleccion-museo",
    "Completa el museo poco a poco",
    "progreso",
    "Cada hallazgo tiene un lugar en tu colección.",
    "Museum",
    [
      section(
        "Recompensas",
        "La colección completa contiene 95 piezas. Con 60 donaciones obtienes la llave oxidada, que Gunther entrega al día siguiente.",
      ),
      section(
        "Tu propio catálogo",
        "Revisa qué has donado antes de vender objetos raros. Las recompensas llegan por distintos hitos: una colección pequeña ya puede ayudarte a avanzar.",
      ),
    ],
    ["museo", "colecciones", "llave oxidada"],
  ),
  guide(
    "maestria",
    "La cueva de la maestría",
    "progreso",
    "Un siguiente paso cuando ya dominas las cinco habilidades.",
    "Mastery_Cave",
    [
      section(
        "Requisito",
        "La cueva del Bosque Tizón se abre al alcanzar nivel 10 en agricultura, minería, recolección, pesca y combate. Puedes entrar en cuanto completes la quinta habilidad.",
      ),
      section(
        "Sin adelantar acontecimientos",
        "Dentro encontrarás nuevas metas relacionadas con las habilidades. Si estás empezando, déjala como una sorpresa futura y disfruta antes del camino.",
      ),
    ],
    ["maestría", "1.6", "avanzado", "habilidades"],
  ),
];
