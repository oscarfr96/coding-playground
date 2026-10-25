import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Flower2,
  Heart,
  Home,
  Menu,
  Search,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Sun,
  X,
  ExternalLink,
  Map as MapIcon,
  Pickaxe,
  Fish,
  Users,
  NotebookPen,
  Calculator,
  Download,
} from "lucide-react";
import { guides, categories } from "./data/guides";
import { crops, fish, villagers } from "./data/catalog";
import {
  calculateHarvest,
  matches,
  normalize,
  readStorage,
  seasons,
  seasonNames,
  getRoute,
} from "./lib";

const icons = {
  inicio: "🌱",
  cultivos: "🍓",
  animales: "🐔",
  pesca: "🐟",
  habitantes: "🎁",
  minas: "💎",
  artesania: "⚒️",
  cocina: "🍳",
  mundo: "🌳",
  progreso: "⭐",
};
const nav = [
  { id: "inicio", label: "Nuestro rincón", icon: Home },
  { id: "guias", label: "Explorar la wiki", icon: BookOpen },
  { id: "cultivos", label: "Cultivos y cosechas", icon: Sprout },
  { id: "pesca", label: "Pesca", icon: Fish },
  { id: "habitantes", label: "Habitantes y regalos", icon: Users },
  { id: "minas", label: "Minas y aventuras", icon: Pickaxe },
  { id: "calendario", label: "Calendario del valle", icon: CalendarDays },
];
const tasks = [
  [
    "primeras-semillas",
    "Plantar mis primeras chirivías",
    "El primer paso de una gran aventura.",
  ],
  ["cofre", "Fabricar un cofre", "50 de madera para tenerlo todo en su sitio."],
  [
    "pueblo",
    "Presentarme a los vecinos",
    "Completa la misión de presentaciones.",
  ],
  [
    "pescar",
    "Pescar mi primer pez",
    "Willy te espera en la playa desde el día 2.",
  ],
  [
    "minas-5",
    "Llegar al piso 5 de las minas",
    "Las minas abren el día 5 de primavera.",
  ],
  ["lote", "Completar mi primer lote", "Una pequeña ayuda para los Junimos."],
  ["silo", "Construir un silo", "Guarda heno antes de comprar animales."],
  [
    "gallina",
    "Dar la bienvenida a una gallina",
    "Con gallinero, comida y mucho cariño.",
  ],
  [
    "aspersion",
    "Colocar un aspersor de calidad",
    "Más tiempo para explorar el valle.",
  ],
  [
    "invernadero",
    "Recuperar el invernadero",
    "Completa la despensa del Centro Cívico.",
  ],
  [
    "mina-120",
    "Llegar al fondo de las minas",
    "120 pisos, una aventura enorme.",
  ],
  ["centro", "Restaurar el Centro Cívico", "El pueblo vuelve a brillar."],
  [
    "isla",
    "Viajar a Isla Jengibre",
    "Una nueva aventura al otro lado del mar.",
  ],
];
const festivals = {
  primavera: { 13: "Festival del Huevo", 24: "Danza Floral" },
  verano: { 11: "Luau", 28: "Danza de las Medusas Lunares" },
  otono: { 16: "Feria de Stardew Valley", 27: "Víspera de los Espíritus" },
  invierno: {
    8: "Festival del Hielo",
    15: "Mercado Nocturno · 1/3",
    16: "Mercado Nocturno · 2/3",
    17: "Mercado Nocturno · 3/3",
    25: "Fiesta de la Estrella de Invierno",
  },
};
const specials = {
  primavera: {
    15: "Festival del Desierto · requiere autobús",
    16: "Festival del Desierto",
    17: "Festival del Desierto",
  },
  verano: { 20: "Derbi de la Trucha", 21: "Derbi de la Trucha" },
  otono: {},
  invierno: { 12: "Festival del Calamar", 13: "Festival del Calamar" },
};
const pretty = (value) =>
  typeof value === "number" ? value.toLocaleString("es-ES") : value;
const seasonText = (list) => list.map((s) => seasonNames[s] || s).join(", ");

const catalogArticles = [
  ...crops.map((c) => ({
    id: `cultivo-${c.id}`,
    title: c.name,
    category: "cultivos",
    summary: `${seasonText(c.season)} · ${c.days} días hasta la primera cosecha.`,
    source: c.source,
    tags: [c.name, ...c.season, ...(c.tags || [])],
    sections: [
      {
        title: "De la semilla a la cosecha",
        text: `Crece en ${seasonText(c.season).toLowerCase()}. Necesita ${c.days} días de crecimiento con riego diario. ${c.regrow ? `Después vuelve a producir cada ${c.regrow} días.` : "Debes volver a plantar después de cosechar."}`,
      },
      {
        title: "Precios de referencia",
        text: `Venta base por unidad: ${pretty(c.sell)} g. ${c.seed === null ? "Sin un precio de compra de semilla fijo en este catálogo." : `Semilla: ${pretty(c.seed)} g (precio de referencia; puede variar según la tienda).`} Sin calidad, profesiones ni procesado artesanal.`,
      },
      {
        title: "Particularidades",
        text: "Ten en cuenta estas características al planificar.",
        items: c.tags?.length
          ? c.tags
          : ["Sin particularidades destacadas en esta selección."],
      },
      {
        title: "Un consejo para tu granja",
        text: "El día de plantación no cuenta como día de crecimiento. Comprueba que la cosecha llegue antes del cambio de estación; el invernadero y la granja de Isla Jengibre tienen reglas diferentes.",
      },
    ],
  })),
  ...fish.map((f) => ({
    id: `pez-${f.id}`,
    title: f.name,
    category: "pesca",
    summary: `${f.location} · ${seasonText(f.season)}`,
    source: f.source,
    tags: [...f.season, f.location, f.weather],
    sections: [
      {
        title: "Dónde y cuándo buscarlo",
        text: `Lugar: ${f.location}. Estaciones: ${seasonText(f.season)}. Horario: ${f.time}. Clima: ${f.weather}.`,
      },
      {
        title: "Precio y preparación",
        text: `Venta base: ${pretty(f.price)} g, sin calidad ni profesiones. Lleva espacio en la mochila y revisa que tu caña admita el cebo o aparejo que quieres utilizar.`,
      },
      {
        title: "Antes de vender",
        text: "Revisa los lotes del Centro Cívico y las recetas. Guardar un ejemplar puede ahorrarte esperar otra estación. El cebo mágico permite ignorar estación, hora y clima, pero requiere una caña compatible.",
      },
    ],
  })),
  ...villagers.map((v) => ({
    id: `vecino-${v.id}`,
    title: v.name,
    category: "habitantes",
    summary: `Cumpleaños: ${v.birthday.day} de ${seasonNames[v.birthday.season]?.toLowerCase()}. ${v.location}`,
    source: v.source,
    tags: v.loves,
    sections: [
      {
        title: "Conoce a tu vecino",
        text: `${v.location}. Su horario cambia con el día, la lluvia, los eventos y tu progreso. ${v.marriage ? "Es uno de los personajes con los que puedes casarte." : "No es un candidato al matrimonio."}`,
      },
      {
        title: "Regalos que le encantan",
        text: "Estas son algunas opciones de regalos amados (no una lista exhaustiva).",
        items: v.loves,
      },
      {
        title: "Una fecha especial",
        text: `Su cumpleaños es el ${v.birthday.day} de ${seasonNames[v.birthday.season]?.toLowerCase()}. Los regalos de cumpleaños multiplican por 8 los puntos de amistad del regalo. Normalmente puedes dar un regalo al día y dos a la semana; el regalo de cumpleaños es una excepción al límite semanal.`,
      },
    ],
  })),
];
const articles = [...guides, ...catalogArticles];
const articleMap = new Map(articles.map((a) => [a.id, a]));

function useSaved(key, initial) {
  const [value, setValue] = useState(() => readStorage(key, initial));
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(`ligia-v1-${key}`, JSON.stringify(value));
      setError(false);
    } catch {
      setError(true);
    }
  }, [key, value]);
  return [value, setValue, error];
}
function Badge({ children }) {
  return <span className="badge">{children}</span>;
}
function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
function ArticleCard({ article, saved, toggle, go }) {
  return (
    <div className="article-card">
      <button
        className="article-main"
        onClick={() => go(`articulo/${article.id}`)}
      >
        <span className={`item-emoji ${article.category}`} aria-hidden="true">
          {icons[article.category] || "📖"}
        </span>
        <div>
          <span className="tiny-label">
            {categories.find((c) => c.id === article.category)?.name ||
              article.category}
          </span>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
        </div>
      </button>
      <button
        className={`save-icon ${saved ? "is-saved" : ""}`}
        onClick={() => toggle(article.id)}
        aria-label={`${saved ? "Quitar de" : "Guardar en"} favoritos: ${article.title}`}
        aria-pressed={saved}
      >
        <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
      </button>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => getRoute(location.hash));
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const [favorites, setFavorites, favoritesError] = useSaved("favorites", []);
  const [done, setDone, doneError] = useSaved("progress", []);
  const [note, setNote, noteError] = useSaved("note", "");
  const [season, setSeason] = useSaved("season", "primavera");
  const [day, setDay] = useSaved("day", 1);
  const searchRef = useRef(null);
  const contentRef = useRef(null);
  const safeSeason = seasons.includes(season) ? season : "primavera";
  const safeDay = Number.isInteger(day) && day >= 1 && day <= 28 ? day : 1;
  useEffect(() => {
    const change = () => {
      setRoute(getRoute(location.hash));
      setQuery("");
      setMenu(false);
      window.scrollTo({ top: 0 });
      contentRef.current?.focus({ preventScroll: true });
    };
    const shortcut = (e) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          document.activeElement.tagName,
        )
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("hashchange", change);
    window.addEventListener("keydown", shortcut);
    return () => {
      window.removeEventListener("hashchange", change);
      window.removeEventListener("keydown", shortcut);
    };
  }, []);
  useEffect(() => {
    document.title = `${route.startsWith("articulo/") ? articleMap.get(route.slice(9))?.title || "Artículo" : nav.find((n) => n.id === route)?.label || "Mi wiki"} · Stardew Valley Wiki para Ligia`;
  }, [route]);
  const go = (target) => {
    setQuery("");
    setMenu(false);
    location.hash = target;
  };
  const toggle = (id) =>
    setFavorites((old) =>
      old.includes(id) ? old.filter((v) => v !== id) : [...old, id],
    );
  const card = (article) => (
    <ArticleCard
      key={article.id}
      article={article}
      saved={favorites.includes(article.id)}
      toggle={toggle}
      go={go}
    />
  );
  const activeArticle = route.startsWith("articulo/")
    ? articleMap.get(route.slice(9))
    : null;
  const isHome = route === "inicio" && !query;

  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          contentRef.current?.focus();
        }}
      >
        Saltar al contenido
      </a>
      {menu && (
        <button
          className="menu-backdrop"
          aria-label="Cerrar navegación"
          onClick={() => setMenu(false)}
        />
      )}
      <aside
        className={`sidebar ${menu ? "open" : ""}`}
        aria-label="Navegación principal"
      >
        <button className="brand" onClick={() => go("inicio")}>
          <span className="brand-flower">🌻</span>
          <span className="brand-title">
            Stardew Valley
            <span>
              Wiki para Ligia <Heart size={12} fill="currentColor" />
            </span>
          </span>
        </button>
        <div className="sidebar-divider" />
        <p className="nav-label">UN VALLE POR DESCUBRIR</p>
        <nav>
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`nav-item ${route === id && !query ? "active" : ""}`}
              aria-current={route === id && !query ? "page" : undefined}
            >
              <Icon size={18} />
              <span>{label}</span>
              {id === "inicio" && <span className="nav-heart">♥</span>}
            </button>
          ))}
        </nav>
        <p className="nav-label personal-label">TU PEQUEÑA AVENTURA</p>
        <nav>
          {[
            { id: "favoritos", label: "Mis favoritos", icon: Bookmark },
            { id: "progreso", label: "Mi cuaderno", icon: NotebookPen },
            {
              id: "calculadora",
              label: "Planificar cosechas",
              icon: Calculator,
            },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${route === id && !query ? "active" : ""}`}
              aria-current={route === id ? "page" : undefined}
              onClick={() => go(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
              {id === "favoritos" && favorites.length > 0 && (
                <span className="nav-count">{favorites.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-love">
          <span className="love-stamp">HECHO CON MUCHO ♡</span>
          <img
            src="./assets/ligia-oscar.png"
            alt="Ligia y Oscar como personajes de Stardew Valley, cogidos de la mano"
          />
          <div className="couple-names">
            Ligia <span>♥</span> Oscar
          </div>
          <p>
            Mi aventura favorita
            <br />
            es la que comparto contigo.
          </p>
        </div>
        <button className="sidebar-bottom" onClick={() => go("acerca")}>
          Un regalo de Oscar para ti <Heart size={12} />
        </button>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button
            className="mobile-menu icon-button"
            onClick={() => setMenu(!menu)}
            aria-label="Abrir navegación"
            aria-expanded={menu}
          >
            <Menu size={22} />
          </button>
          <div className="breadcrumbs">
            <span>La wiki de Ligia</span>
            <ChevronRight size={14} />
            <strong>
              {query
                ? "Buscar"
                : activeArticle?.title ||
                  nav.find((n) => n.id === route)?.label ||
                  {
                    favoritos: "Mis favoritos",
                    progreso: "Mi cuaderno",
                    calculadora: "Planificar cosechas",
                    acerca: "Sobre esta wiki",
                  }[route] ||
                  "Explorar"}
            </strong>
          </div>
          <div className="topbar-right">
            <span className="little-heart">♥</span>
            <span>Un día más en el valle</span>
            <div className="avatar">L</div>
          </div>
        </header>
        <main id="main-content" ref={contentRef} tabIndex={-1}>
          <div className="search-row">
            <label className="searchbox">
              <Search size={19} />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué quieres descubrir hoy, Ligia?"
                aria-label="Buscar en toda la wiki"
              />
              <kbd>/</kbd>
            </label>
            <button className="season-button" onClick={() => go("calendario")}>
              <Sun size={18} />
              <span>
                {safeDay} de {seasonNames[safeSeason].toLowerCase()}
              </span>
              <ChevronRight size={14} />
            </button>
          </div>
          {(favoritesError || doneError || noteError) && (
            <p role="alert" className="notice">
              Tu navegador no permite guardar los cambios. Puedes seguir
              consultando la wiki, pero tus notas y favoritos podrían perderse
              al cerrar.
            </p>
          )}
          {query ? (
            <>
              <SectionTitle
                eyebrow="BUSCA, ENCUENTRA, EXPLORA"
                title={`Resultados para «${query}»`}
              />
              <p className="page-description" aria-live="polite">
                {articles.filter((a) => matches(a, query)).length} resultados en
                las guías y los catálogos locales.
              </p>
              <div className="article-grid">
                {articles.filter((a) => matches(a, query)).map(card)}
              </div>
              {!articles.some((a) => matches(a, query)) && (
                <Empty
                  icon="🔍"
                  title="Por aquí no lo encontramos"
                  text="Prueba con un nombre, un regalo, una estación o una palabra más corta."
                />
              )}
            </>
          ) : isHome ? (
            <>
              <section className="hero">
                <img
                  className="hero-image"
                  src="./assets/farm-hero.png"
                  alt="Ligia y Oscar disfrutando juntos de una tarde en su granja del valle"
                />
                <div className="hero-wash" />
                <div className="hero-copy">
                  <span className="hero-pill">
                    <span /> TU WIKI, TU AVENTURA
                  </span>
                  <h1>
                    El valle es más bonito
                    <br />
                    contigo, <span>Ligia.</span>{" "}
                    <span className="pixel-heart">♥</span>
                  </h1>
                  <p>
                    Un rinconcito hecho para ti. Cultiva, explora y descubre
                    <br className="desktop-break" /> todos los secretos de
                    Stardew Valley, a tu ritmo.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => go("guias")}
                  >
                    <BookOpen size={17} /> Vamos a explorar{" "}
                    <ArrowRight size={17} />
                  </button>
                  <span className="hero-footnote">
                    De Oscar, con todo el amor del mundo.
                  </span>
                </div>
                <span className="hero-location">
                  <MapIcon size={13} /> Nuestra pequeña granja
                </span>
              </section>
              <div className="home-columns">
                <div className="home-main">
                  <SectionTitle
                    eyebrow="CADA DÍA, UN NUEVO DESCUBRIMIENTO"
                    title="¿Qué aventura te espera hoy?"
                  >
                    <button className="text-button" onClick={() => go("guias")}>
                      Ver todo <ArrowRight size={15} />
                    </button>
                  </SectionTitle>
                  <div className="category-grid">
                    {[
                      ["cultivos", "Cultivos", "De semilla a cosecha", "🍓"],
                      ["animales", "Animales", "Cuida de tus compañeros", "🐔"],
                      ["pesca", "Pesca", "Un pez, mil posibilidades", "🐟"],
                      [
                        "habitantes",
                        "Habitantes",
                        "Regalos que enamoran",
                        "🎁",
                      ],
                      ["minas", "Minas", "Tesoros bajo tus pies", "💎"],
                      [
                        "artesania",
                        "Artesanía",
                        "Crea algo extraordinario",
                        "⚒️",
                      ],
                      ["cocina", "Cocina", "Un poquito de sabor", "🍳"],
                      ["mundo", "El valle", "Lugares por descubrir", "🌳"],
                    ].map(([id, name, desc, emoji]) => (
                      <button
                        className={`category-card ${id}`}
                        key={id}
                        onClick={() => go(id)}
                      >
                        <span className="category-emoji">{emoji}</span>
                        <h3>{name}</h3>
                        <p>{desc}</p>
                        <ChevronRight size={15} />
                      </button>
                    ))}
                  </div>
                  <div className="beginner-banner">
                    <div className="seedling">🌱</div>
                    <div>
                      <Badge>PARA TUS PRIMEROS DÍAS</Badge>
                      <h3>Toda gran granja empieza con una semilla</h3>
                      <p>
                        Sin prisas, sin perderte. Te acompañamos desde el primer
                        día.
                      </p>
                    </div>
                    <button
                      className="outline-button"
                      onClick={() => go("primeros-pasos")}
                    >
                      Guía de inicio <ArrowRight size={15} />
                    </button>
                  </div>
                  <SectionTitle title="Un poquito de inspiración">
                    <span className="subtle-caption">
                      Siempre hay algo nuevo que aprender
                    </span>
                  </SectionTitle>
                  <div className="article-grid home-articles">
                    {guides.slice(0, 4).map(card)}
                  </div>
                </div>
                <aside className="home-aside">
                  <SeasonCard season={safeSeason} day={safeDay} go={go} />
                  <div className="tip-card">
                    <span className="tip-icon">✦</span>
                    <p className="eyebrow">UN CONSEJITO PARA TI</p>
                    <h3>
                      Guarda un poquito
                      <br />
                      de cada cosa.
                    </h3>
                    <p>
                      Ese pez, esa flor o esa verdura pueden hacerte falta para
                      un lote del Centro Cívico. ¡Tu yo del futuro te lo
                      agradecerá!
                    </p>
                    <button
                      className="text-button"
                      onClick={() => go("progreso")}
                    >
                      Abrir mi cuaderno <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="local-note">
                    <span className="online-dot" />
                    <span>
                      {articles.length} fichas guardadas aquí
                      <br />
                      <small>Sin depender de otras wikis</small>
                    </span>
                    <BookOpen size={20} />
                  </div>
                </aside>
              </div>
            </>
          ) : activeArticle ? (
            <Article
              article={activeArticle}
              favorite={favorites.includes(activeArticle.id)}
              toggle={toggle}
              go={go}
            />
          ) : route.startsWith("articulo/") ? (
            <Empty
              icon="📖"
              title="No encontramos esta página"
              text="Vuelve a explorar la wiki para encontrar otra guía."
              action={() => go("guias")}
            />
          ) : ["cultivos", "pesca", "habitantes"].includes(route) ? (
            <Catalog key={route} type={route} go={go} card={card} />
          ) : route === "calendario" ? (
            <Calendar
              season={safeSeason}
              day={safeDay}
              setSeason={setSeason}
              setDay={setDay}
              go={go}
            />
          ) : route === "calculadora" ? (
            <CalculatorPage />
          ) : route === "progreso" ? (
            <Progress
              done={done}
              setDone={setDone}
              note={note}
              setNote={setNote}
              storageError={doneError || noteError}
            />
          ) : route === "favoritos" ? (
            <>
              <PageIntro
                eyebrow="TUS PEQUEÑOS TESOROS"
                title="Mis favoritos"
                description="Todo lo que quieres tener cerquita, guardado en este navegador."
              />
              <div className="article-grid">
                {articles.filter((a) => favorites.includes(a.id)).map(card)}
              </div>
              {!favorites.length && (
                <Empty
                  icon="💛"
                  title="Aquí empieza tu colección"
                  text="Pulsa el marcador de cualquier ficha para encontrarla aquí cuando la necesites."
                  action={() => go("guias")}
                />
              )}
            </>
          ) : route === "acerca" ? (
            <About />
          ) : (
            <Library route={route} card={card} go={go} />
          )}
          <footer>
            <span>Stardew Valley Wiki para Ligia</span>
            <span>
              Hecho con <Heart size={12} fill="currentColor" /> por Oscar
            </span>
            <button onClick={() => go("acerca")}>
              Fuentes y créditos <ExternalLink size={12} />
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

function Empty({ icon, title, text, action }) {
  return (
    <div className="empty-state">
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && (
        <button className="primary-button" onClick={action}>
          Explorar la wiki <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
function PageIntro({ eyebrow, title, description }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
function SeasonCard({ season, day, go }) {
  const birthday = villagers
    .filter((v) => v.birthday.season === season && v.birthday.day >= day)
    .sort((a, b) => a.birthday.day - b.birthday.day)[0];
  return (
    <section className="season-card">
      <div className="season-card-head">
        <Flower2 size={21} />
        <h3>{seasonNames[season]} en el valle</h3>
        <span>{["🌸", "☀️", "🍂", "❄️"][seasons.indexOf(season)]}</span>
      </div>
      <p className="season-description">
        {
          {
            primavera: "El comienzo de algo bonito.",
            verano: "Días largos, grandes cosechas.",
            otono: "Un valle teñido de dorado.",
            invierno: "Tiempo de explorar y hacer planes.",
          }[season]
        }
      </p>
      <div className="season-crops">
        {crops
          .filter((c) => c.season.includes(season))
          .slice(0, 3)
          .map((c, i) => (
            <button key={c.id} onClick={() => go(`articulo/cultivo-${c.id}`)}>
              <span>{["🌱", "🥔", "🌷"][i]}</span>
              {c.name}
            </button>
          ))}
      </div>
      <div className="upcoming">
        <span className="tiny-label">PRÓXIMO CUMPLEAÑOS</span>
        {birthday ? (
          <button onClick={() => go(`articulo/vecino-${birthday.id}`)}>
            <div className="birthday-avatar">🎂</div>
            <div>
              <strong>{birthday.name}</strong>
              <span>
                {birthday.birthday.day} de {seasonNames[season].toLowerCase()}
              </span>
            </div>
            <GiftHeart />
          </button>
        ) : (
          <p>¡Ya has celebrado todos los de esta estación!</p>
        )}
      </div>
      <button className="season-calendar" onClick={() => go("calendario")}>
        Ver calendario <ArrowRight size={14} />
      </button>
    </section>
  );
}
function GiftHeart() {
  return <Heart size={16} className="gift-heart" />;
}
function Library({ route, card, go }) {
  const [filter, setFilter] = useState("todas");
  const category = categories.find((c) => c.id === route);
  const selected =
    route === "primeros-pasos" ? "inicio" : category?.id || filter;
  const list = guides.filter(
    (a) => selected === "todas" || a.category === selected,
  );
  return (
    <>
      <PageIntro
        eyebrow="LA BIBLIOTECA DEL VALLE"
        title={
          route === "primeros-pasos"
            ? "Tus primeros pasos"
            : category?.name || "Un valle por descubrir"
        }
        description={
          category?.description ||
          "Guías en español para aprender a tu ritmo. Desde tu primera semilla hasta las aventuras de Isla Jengibre."
        }
      />
      {!category && route !== "primeros-pasos" && (
        <div className="filter-chips">
          <button
            className={filter === "todas" ? "selected" : ""}
            onClick={() => setFilter("todas")}
          >
            Todas las guías
          </button>
          {categories.map((c) => (
            <button
              className={filter === c.id ? "selected" : ""}
              key={c.id}
              onClick={() => setFilter(c.id)}
            >
              {icons[c.id]} {c.name}
            </button>
          ))}
        </div>
      )}
      <p className="results-count">{list.length} guías para acompañarte</p>
      <div className="article-grid">{list.map(card)}</div>
      <div className="library-more">
        <h3>También tienes catálogos para consultar</h3>
        <div className="flex flex-wrap gap-3">
          {["cultivos", "pesca", "habitantes"].map((id) => (
            <button className="outline-button" key={id} onClick={() => go(id)}>
              {icons[id]}{" "}
              {id === "habitantes"
                ? "Habitantes y regalos"
                : id === "pesca"
                  ? "Todos los peces"
                  : "Todos los cultivos"}{" "}
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
function Article({ article, favorite, toggle, go }) {
  return (
    <article className="reading-page">
      <button
        className="text-button back-button"
        onClick={() =>
          go(article.category === "inicio" ? "guias" : article.category)
        }
      >
        <ArrowLeft size={16} /> Volver a{" "}
        {article.category === "inicio" ? "las guías" : article.category}
      </button>
      <div className="article-heading">
        <div>
          <span className="large-emoji">{icons[article.category] || "📖"}</span>
          <p className="eyebrow">TU GUÍA DEL VALLE</p>
          <h1>{article.title}</h1>
        </div>
        <button
          className={`outline-button ${favorite ? "is-saved" : ""}`}
          onClick={() => toggle(article.id)}
          aria-pressed={favorite}
        >
          <Bookmark size={17} fill={favorite ? "currentColor" : "none"} />
          {favorite ? "Guardado" : "Guardar"}
        </button>
      </div>
      <p className="article-lead">{article.summary}</p>
      <div className="article-sections">
        {article.sections.map((section, index) => (
          <section key={`${section.title}-${index}`}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
            {section.items && (
              <ul>
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      <div className="source-note">
        <BookOpen size={20} />
        <div>
          <strong>Para seguir investigando</strong>
          <p>
            Resumen local redactado en español. Los detalles pueden variar según
            la versión y los mods.
          </p>
          <a href={article.source} target="_blank" rel="noreferrer">
            Consultar la fuente en Stardew Valley Wiki{" "}
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}
function Catalog({ type, go, card }) {
  const [season, setSeason] = useState("todas");
  const [search, setSearch] = useState("");
  const [rain, setRain] = useState("todos");
  const [marriage, setMarriage] = useState(false);
  const isCrops = type === "cultivos",
    isFish = type === "pesca";
  const title = isCrops
    ? "De semilla a cosecha"
    : isFish
      ? "Hay un pez para cada aventura"
      : "Un pueblo lleno de historias";
  const data = isCrops ? crops : isFish ? fish : villagers;
  const visible = data.filter(
    (item) =>
      (season === "todas" ||
        (item.season || [item.birthday?.season]).includes(season)) &&
      normalize(
        [item.name, ...(item.loves || []), item.location || ""].join(" "),
      ).includes(normalize(search)) &&
      (!marriage || item.marriage) &&
      (rain === "todos" || normalize(item.weather || "").includes(rain)),
  );
  return (
    <>
      <PageIntro
        eyebrow={
          isCrops
            ? "EL CORAZÓN DE TU GRANJA"
            : isFish
              ? "CAÑA, PACIENCIA Y UN POQUITO DE SUERTE"
              : "AMISTAD, REGALOS Y MOMENTOS BONITOS"
        }
        title={title}
        description={
          isCrops
            ? "Encuentra qué plantar, cuánto tarda y cuándo recoger tu recompensa. Precios base, sin calidad ni profesiones."
            : isFish
              ? "Consulta estaciones, horarios, lugares y clima antes de lanzar la caña. Precios de calidad normal."
              : "Recuerda sus cumpleaños y encuentra un regalo que les encante. Los regalos mostrados son una selección."
        }
      />
      <div className="catalog-toolbar">
        <label className="small-search">
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={
              isCrops
                ? "Filtrar cultivos"
                : isFish
                  ? "Filtrar peces"
                  : "Buscar habitante o regalo"
            }
            placeholder={
              isCrops
                ? "Buscar un cultivo…"
                : isFish
                  ? "Buscar pez o lugar…"
                  : "Nombre o regalo favorito…"
            }
          />
        </label>
        <label className="select-wrap">
          <SlidersHorizontal size={16} />
          <select
            aria-label="Filtrar por estación"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="todas">Todas las estaciones</option>
            {seasons.map((s) => (
              <option key={s} value={s}>
                {seasonNames[s]}
              </option>
            ))}
          </select>
        </label>
        {isFish && (
          <select
            aria-label="Filtrar por clima"
            value={rain}
            onChange={(e) => setRain(e.target.value)}
          >
            <option value="todos">Cualquier clima</option>
            <option value="lluvia">Lluvia</option>
            <option value="sol">Sol</option>
          </select>
        )}
        {!isCrops && !isFish && (
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={marriage}
              onChange={(e) => setMarriage(e.target.checked)}
            />{" "}
            Candidatos al matrimonio
          </label>
        )}
      </div>
      <p className="results-count" aria-live="polite">
        {visible.length}{" "}
        {isCrops ? "cultivos" : isFish ? "peces" : "habitantes"} en tu catálogo
      </p>
      {!visible.length ? (
        <Empty
          icon="🌱"
          title="No hay coincidencias"
          text="Cambia la estación o prueba con otra búsqueda."
        />
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{isCrops ? "Cultivo" : isFish ? "Pez" : "Habitante"}</th>
                <th>
                  {isCrops
                    ? "Estación"
                    : isFish
                      ? "Dónde encontrarlo"
                      : "Cumpleaños"}
                </th>
                <th>
                  {isCrops ? "Crecimiento" : isFish ? "Cuándo" : "Le encanta"}
                </th>
                <th>
                  {isCrops
                    ? "Venta base"
                    : isFish
                      ? "Clima / precio"
                      : "Amistad"}
                </th>
                <th>
                  <span className="sr-only">Ver ficha</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((item, i) => (
                <tr key={item.id}>
                  <td>
                    <button
                      className="table-name"
                      onClick={() =>
                        go(
                          `articulo/${isCrops ? "cultivo" : isFish ? "pez" : "vecino"}-${item.id}`,
                        )
                      }
                    >
                      <span className={`table-emoji ${type}`}>
                        {isCrops
                          ? ["🌱", "🍓", "🌽", "🥕", "🌷"][i % 5]
                          : isFish
                            ? "🐟"
                            : "🎁"}
                      </span>
                      {item.name}
                    </button>
                  </td>
                  <td>
                    {isCrops
                      ? seasonText(item.season)
                      : isFish
                        ? item.location
                        : `${item.birthday.day} de ${seasonNames[item.birthday.season]?.toLowerCase()}`}
                  </td>
                  <td>
                    {isCrops ? (
                      <>
                        {item.days} días
                        <small>
                          {item.regrow
                            ? `Repite cada ${item.regrow} días`
                            : "Una cosecha"}
                        </small>
                      </>
                    ) : isFish ? (
                      <>
                        {item.time}
                        <small>{seasonText(item.season)}</small>
                      </>
                    ) : (
                      item.loves.slice(0, 3).join(" · ")
                    )}
                  </td>
                  <td>
                    {isCrops ? (
                      <span className="gold">{pretty(item.sell)} g</span>
                    ) : isFish ? (
                      <>
                        {item.weather}
                        <small className="gold">{pretty(item.price)} g</small>
                      </>
                    ) : item.marriage ? (
                      <span className="pink-text">♡ Romance</span>
                    ) : (
                      "Amistad"
                    )}
                  </td>
                  <td>
                    <button
                      className="icon-button"
                      aria-label={`Ver ficha de ${item.name}`}
                      onClick={() =>
                        go(
                          `articulo/${isCrops ? "cultivo" : isFish ? "pez" : "vecino"}-${item.id}`,
                        )
                      }
                    >
                      <ChevronRight size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <SectionTitle title="Un poco más sobre el tema" />
      <div className="article-grid">
        {guides.filter((g) => g.category === type).map(card)}
      </div>
    </>
  );
}
function Calendar({ season, day, setSeason, setDay, go }) {
  const birthdays = villagers.filter(
    (v) => v.birthday.season === season && v.birthday.day === day,
  );
  const event = festivals[season][day] || specials[season][day];
  return (
    <>
      <PageIntro
        eyebrow="QUE NO SE TE ESCAPE NINGÚN MOMENTO"
        title="El calendario del valle"
        description="Elige la estación y el día de tu partida. No es la fecha real: es tu pequeño reloj del valle, que queda guardado aquí."
      />
      <div className="filter-chips">
        {seasons.map((s, i) => (
          <button
            key={s}
            className={season === s ? "selected" : ""}
            onClick={() => setSeason(s)}
          >
            {["🌸", "☀️", "🍂", "❄️"][i]} {seasonNames[s]}
          </button>
        ))}
      </div>
      <div className="calendar-layout">
        <div className="calendar-board">
          <div className="calendar-title">
            <Flower2 size={23} />
            <h2>{seasonNames[season]}</h2>
            <span>28 días para disfrutar</span>
          </div>
          <div className="calendar-grid">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
              <div className="weekday" key={d}>
                {d}
              </div>
            ))}
            {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => {
              const people = villagers.filter(
                (v) => v.birthday.season === season && v.birthday.day === d,
              );
              const ev = festivals[season][d] || specials[season][d];
              return (
                <button
                  key={d}
                  className={`calendar-day ${day === d ? "selected" : ""} ${ev ? "event-day" : ""}`}
                  aria-label={`${d} de ${seasonNames[season]}${people.length ? `, cumpleaños de ${people.map((p) => p.name).join(", ")}` : ""}${ev ? `, ${ev}` : ""}`}
                  aria-pressed={day === d}
                  onClick={() => setDay(d)}
                >
                  <strong>{d}</strong>
                  {people.map((p) => (
                    <span key={p.id} className="calendar-person">
                      🎂 <span>{p.name}</span>
                    </span>
                  ))}
                  {ev && (
                    <span className="calendar-event">
                      🎪<span>{ev}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <aside className="day-detail">
          <span className="big-date">{day}</span>
          <h2>de {seasonNames[season].toLowerCase()}</h2>
          {birthdays.map((v) => (
            <div className="day-birthday" key={v.id}>
              <h3>🎂 ¡Feliz cumpleaños, {v.name}!</h3>
              <p>Un regalo amado vale mucho más en su día.</p>
              <ul>
                {v.loves.slice(0, 3).map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <button
                className="text-button"
                onClick={() => go(`articulo/vecino-${v.id}`)}
              >
                Ver su ficha <ArrowRight size={15} />
              </button>
            </div>
          ))}
          {event && (
            <div className="event-detail">
              <h3>🎪 {event}</h3>
              <p>
                Consulta el horario y la ubicación del evento antes de preparar
                el día.
              </p>
              <a
                href="https://es.stardewvalleywiki.com/Festivales"
                target="_blank"
                rel="noreferrer"
              >
                Detalles de los festivales ↗
              </a>
            </div>
          )}
          {!birthdays.length && !event && (
            <p>
              Hoy no hay cumpleaños ni festivales fijos. Un buen día para cuidar
              la granja… o perderse un ratito por el valle.
            </p>
          )}
          <small>No incluye eventos aleatorios ni el calendario de mods.</small>
        </aside>
      </div>
    </>
  );
}
function CalculatorPage() {
  const [season, setSeason] = useState("primavera");
  const [cropId, setCropId] = useState(
    crops.find((c) => c.season.includes("primavera"))?.id || crops[0].id,
  );
  const [day, setDay] = useState(1);
  const [plots, setPlots] = useState(20);
  const crop = crops.find((c) => c.id === cropId) || crops[0];
  const result = calculateHarvest(crop, day, plots);
  return (
    <>
      <PageIntro
        eyebrow="UN PLAN PARA HACER CRECER TU GRANJA"
        title="¿Qué plantamos hoy?"
        description="Calcula las cosechas que caben hasta el día 28. Una estimación sencilla para tomar decisiones con calma."
      />
      <div className="calculator-layout">
        <section className="paper-panel">
          <h2>Tu próxima siembra</h2>
          <label>
            Estación
            <select
              value={season}
              onChange={(e) => {
                setSeason(e.target.value);
                setCropId(
                  crops.find((c) => c.season.includes(e.target.value))?.id ||
                    crops[0].id,
                );
              }}
            >
              {seasons.map((s) => (
                <option key={s} value={s}>
                  {seasonNames[s]}
                </option>
              ))}
            </select>
          </label>
          <label>
            Cultivo
            <select value={cropId} onChange={(e) => setCropId(e.target.value)}>
              {crops
                .filter((c) => c.season.includes(season))
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </label>
          <div className="form-columns">
            <label>
              Día de plantación
              <input
                type="number"
                min="1"
                max="28"
                value={day}
                onChange={(e) =>
                  setDay(Math.max(1, Math.min(28, Number(e.target.value) || 1)))
                }
              />
            </label>
            <label>
              Casillas de cultivo
              <input
                type="number"
                min="1"
                max="9999"
                value={plots}
                onChange={(e) =>
                  setPlots(
                    Math.max(1, Math.min(9999, Number(e.target.value) || 1)),
                  )
                }
              />
            </label>
          </div>
          <p className="fine-print">
            Riego diario, rendimiento mínimo garantizado por cosecha, calidad
            normal, sin fertilizantes ni profesiones. Cuenta 3 arándanos, 2
            arándanos rojos y 4 granos de café por cosecha. No incluye frutos
            extra aleatorios, semillas obtenidas gratis, cultivos que continúan
            en la siguiente estación ni reglas del invernadero.
          </p>
        </section>
        <section className="harvest-result" aria-live="polite">
          <span className="result-sprout">🌱</span>
          <p className="eyebrow">TU COSECHA DE {crop.name.toUpperCase()}</p>
          <h2>
            {result.harvests}{" "}
            <span>{result.harvests === 1 ? "cosecha" : "cosechas"}</span>
          </h2>
          {!result.harvests && (
            <p className="notice">
              No llega a madurar antes de terminar la estación. Prueba un
              cultivo más rápido o siembra antes.
            </p>
          )}
          <dl>
            <div>
              <dt>Ingresos base</dt>
              <dd>{pretty(result.revenue)} g</dd>
            </div>
            <div>
              <dt>Coste de las semillas</dt>
              <dd>
                {result.cost === null
                  ? "No disponible"
                  : `${pretty(result.cost)} g`}
              </dd>
            </div>
            <div className="profit">
              <dt>Beneficio estimado</dt>
              <dd>
                {result.profit === null
                  ? "Sin estimación"
                  : `${pretty(result.profit)} g`}
              </dd>
            </div>
          </dl>
          <p>
            {crop.regrow
              ? `Produce de nuevo cada ${crop.regrow} días sin replantar.`
              : "La estimación incluye replantar tras cada cosecha."}
          </p>
        </section>
      </div>
    </>
  );
}
function Progress({ done, setDone, note, setNote, storageError }) {
  const completed = tasks.filter(([id]) => done.includes(id)).length;
  function exportNotes() {
    const blob = new Blob(
      [
        `El cuaderno de Ligia\n\n${tasks.map(([id, title]) => `${done.includes(id) ? "[x]" : "[ ]"} ${title}`).join("\n")}\n\nMis notas\n${note}`,
      ],
      { type: "text/plain;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "el-cuaderno-de-ligia.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }
  return (
    <>
      <PageIntro
        eyebrow="PASITO A PASITO, A TU RITMO"
        title="Mi cuaderno de aventuras"
        description="No hay una forma correcta de disfrutar del valle. Aquí puedes guardar tus pequeños logros y lo que no quieres olvidar."
      />
      <div className="progress-layout">
        <section className="paper-panel">
          <div className="section-heading">
            <h2>Mis pequeñas metas</h2>
            <Badge>
              {completed} / {tasks.length}
            </Badge>
          </div>
          <progress
            value={completed}
            max={tasks.length}
            aria-label="Metas completadas"
          />
          {tasks.map(([id, title, description]) => (
            <label
              className={`task-item ${done.includes(id) ? "complete" : ""}`}
              key={id}
            >
              <input
                type="checkbox"
                checked={done.includes(id)}
                onChange={() =>
                  setDone((old) =>
                    old.includes(id)
                      ? old.filter((v) => v !== id)
                      : [...old, id],
                  )
                }
              />
              <div>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            </label>
          ))}
        </section>
        <section className="notes-panel">
          <NotebookPen size={26} />
          <h2>Para acordarme luego…</h2>
          <p>Mi próximo regalo, un pez pendiente, una idea para la granja.</p>
          <label className="sr-only" htmlFor="personal-note">
            Mis notas personales
          </label>
          <textarea
            id="personal-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Querido diario del valle…"
          />
          <span className="save-status">
            <Check size={13} />{" "}
            {storageError
              ? "No se ha podido guardar; descarga una copia"
              : "Guardado en este navegador"}
          </span>
          <button className="outline-button" onClick={exportNotes}>
            <Download size={15} /> Descargar mi cuaderno
          </button>
          <small>
            Las notas y las metas son locales a este navegador. Descarga una
            copia antes de cambiar de dispositivo o borrar sus datos.
          </small>
        </section>
      </div>
    </>
  );
}
function About() {
  return (
    <article className="reading-page">
      <PageIntro
        eyebrow="UN PEQUEÑO PROYECTO CON MUCHO CARIÑO"
        title="Para Ligia, de Oscar ♡"
        description="Porque tu próxima aventura no debería quedarse esperando a que vuelva a funcionar una wiki."
      />
      <img
        className="about-couple"
        src="./assets/ligia-oscar.png"
        alt="Ligia y Oscar, juntos en versión pixel art"
      />
      <h2>Una wiki para acompañarte</h2>
      <p>
        Este proyecto independiente reúne {guides.length} guías, {crops.length}{" "}
        cultivos, {fish.length} peces y {villagers.length} habitantes, con
        herramientas para planificar tu partida. Todo el contenido de consulta
        se distribuye con la web; no se solicita a la wiki original al abrir las
        fichas.
      </p>
      <h2>Alcance y fuentes</h2>
      <p>
        Es una selección amplia para Stardew Valley 1.6, no una copia completa
        de los más de 1.800 artículos de la wiki oficial. Los resúmenes están
        redactados para este proyecto. Cada ficha enlaza la fuente de sus datos;
        esos enlaces externos sí requieren conexión. No incluye todos los
        objetos, horarios individuales, recetas, diálogos ni variantes de los
        lotes remezclados.
      </p>
      <p>
        Referencia de contenido:{" "}
        <a
          href="https://es.stardewvalleywiki.com/Stardew_Valley_Wiki"
          target="_blank"
          rel="noreferrer"
        >
          Stardew Valley Wiki en español
        </a>{" "}
        y{" "}
        <a
          href="https://stardewvalleywiki.com/Stardew_Valley_Wiki"
          target="_blank"
          rel="noreferrer"
        >
          Stardew Valley Wiki en inglés
        </a>
        . Consulta editorial: 25 de octubre de 2026. La disponibilidad y algunos
        datos pueden variar según la versión del juego.
      </p>
      <h2>Créditos y privacidad</h2>
      <p>
        Stardew Valley y sus personajes pertenecen a ConcernedApe. Esta es una
        web de fans no oficial, sin afiliación. Las ilustraciones de Ligia y
        Oscar se generaron a partir de sus fotografías para este regalo; las
        fotografías originales no se incluyen en el repositorio. Tipografías
        Nunito y Pixelify Sans (SIL Open Font License), e iconos Lucide (ISC).
      </p>
      <p>
        Sin cuentas, anuncios ni analítica. Tus favoritos, día de juego, notas y
        progreso se guardan mediante localStorage en tu dispositivo. No se
        sincronizan entre navegadores.
      </p>
    </article>
  );
}
