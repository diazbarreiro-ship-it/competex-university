import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Code, Cpu, Database, Award, BookOpen, Users, Play, Target, Monitor, Wifi, ShieldAlert, Film, TrendingUp, Info, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ────────────── Image paths ────────────── */
const IMAGES = {
    heroRobot: '/images/hero-robot.png',
    heroBg: '/images/hero-bg.png',
    softwareDev: '/images/pillar-software.png',
    aiRobot: '/images/pillar-ai.png',
    dataAnalysis: '/images/pillar-data.png',
    cine: '/images/pillar-cine.png',
    vfx: '/images/pillar-vfx.png',
    narrativa: '/images/pillar-narrativa.png',
    mktContent: '/images/pillar-mkt-content.png',
    mktStrategy: '/images/pillar-mkt-strategy.png',
    mktGrowth: '/images/pillar-mkt-growth.png',
};

/* ────────────── Data ────────────── */
type Program = {
    id: string;
    path: string;
    name: string;
    icon: any;
    titleLine1: string;
    titleHighlight1: string;
    titleLine2: string;
    titleHighlight2: string;
    titleLine3: string;
    tagline: string;
    sub: string;
    heroImage: string;
    tuition: string;
    duration: string;
    semesters: string;
    practice: string;
    theory: string;
    description: string;
    pillars: { img: string; label: string }[];
    curriculum: { sem: string; title: string; desc: string; importance: string }[];
    scholarshipBonus: string;
};

const PROGRAMS: Record<string, Program> = {
    software: {
        id: 'software',
        path: '/software-datos',
        name: 'Software y Datos',
        icon: <Cpu size={24} />,
        titleLine1: 'Especialista en',
        titleHighlight1: 'Desarrollo de Software',
        titleLine2: 'y',
        titleHighlight2: 'Ciencias de Datos',
        titleLine3: 'con Inteligencia Artificial',
        tagline: 'Aprende Creando Tecnología de Punta',
        sub: 'Entrena para el Futuro en 2 Años',
        heroImage: IMAGES.heroRobot,
        tuition: '$4,500',
        duration: '2 AÑOS',
        semesters: '4 Semestres',
        practice: '80% PRÁCTICA',
        theory: '20% Teoría',
        description: 'Programa líder en formación de ingenieros de software y científicos de datos con enfoque en IA generativa.',
        scholarshipBonus: 'Participa en proyectos tecnológicos globales del laboratorio.',
        pillars: [
            { img: IMAGES.softwareDev, label: 'Desarrollo de Software' },
            { img: IMAGES.aiRobot, label: 'Inteligencia Artificial' },
            { img: IMAGES.dataAnalysis, label: 'Análisis de Datos' },
        ],
        curriculum: [
            {
                sem: 'Semestre 1',
                title: 'Fundamentos de Programación',
                desc: 'Dominio de Python desde cero, control de versiones con Git, estructuras de bases de datos SQL/NoSQL y automatización de tareas básicas.',
                importance: 'Python es el lenguaje universal de la Inteligencia Artificial. Sin una base sólida en lógica y algoritmos, es imposible construir sistemas inteligentes robustos.'
            },
            {
                sem: 'Semestre 2',
                title: 'Aplicaciones Inteligentes',
                desc: 'Entrenamiento en Prompt Engineering avanzado, integración de modelos de lenguaje (LLMs) vía API y desarrollo de interfaces con herramientas de IA.',
                importance: 'La IA no es solo magia; es una herramienta que requiere integración técnica. Aprender a conectar modelos como GPT o Claude con software real es la habilidad más demandada hoy.'
            },
            {
                sem: 'Semestre 3',
                title: 'Ciencia de Datos Aplicada',
                desc: 'Análisis exploratorio de datos, implementación de Machine Learning, sistemas RAG (Retrieval-Augmented Generation) y creación de Agentes Autónomos.',
                importance: 'Los datos son el combustible de la IA. Entender cómo limpiar, procesar y utilizar información de negocio permite crear sistemas que realmente resuelven problemas específicos.'
            },
            {
                sem: 'Semestre 4',
                title: 'Arquitectura y Productos',
                desc: 'Despliegue en la nube (Cloud), metodologías DevOps, seguridad informática y el lanzamiento de un Producto SaaS comercial completo.',
                importance: 'Un código brillante es inútil si no vive en un servidor seguro y escalable. Este semestre cierra el ciclo convirtiendo tus scripts en aplicaciones que miles de personas pueden usar.'
            },
        ]
    },
    audiovisual: {
        id: 'audiovisual',
        path: '/creacion-audiovisual',
        name: 'Creación Audiovisual',
        icon: <Film size={24} />,
        titleLine1: 'Especialista en',
        titleHighlight1: 'Creación Audiovisual',
        titleLine2: 'Desde',
        titleHighlight2: 'Cortos hasta Cine',
        titleLine3: 'con Inteligencia Artificial',
        tagline: 'Nueva Era de la Cinematografía Digital',
        sub: 'Produce Contenido Profesional en 2 Años',
        heroImage: IMAGES.cine,
        tuition: '$4,500',
        duration: '2 AÑOS',
        semesters: '4 Semestres',
        practice: '80% PRÁCTICA',
        theory: '20% Teoría',
        description: 'Formamos Especialistas en Creación Audiovisual capaces de producir contenido profesional combinando cine tradicional con IA.',
        scholarshipBonus: 'Recibe beca del 100% participando en producciones audiovisuales del laboratorio.',
        pillars: [
            { img: IMAGES.narrativa, label: 'Narrativa Cinematográfica' },
            { img: IMAGES.cine, label: 'Cine Generativo con IA' },
            { img: IMAGES.vfx, label: 'Efectos Visuales (VFX)' },
        ],
        curriculum: [
            {
                sem: 'Semestre 1',
                title: 'Fundamentos Audiovisuales',
                desc: 'Narrativa cinematográfica clásica, lenguaje visual, composición de encuadres, teoría del color, iluminación y edición cinematográfica básica.',
                importance: 'La tecnología cambia, pero la narrativa es eterna. Antes de usar IA, debes entender cómo se cuenta una historia visual que conecte emocionalmente con la audiencia.'
            },
            {
                sem: 'Semestre 2',
                title: 'Producción con IA',
                desc: 'Generación cinematográfica de imágenes, creación de personajes digitales con consistencia, guionismo asistido por IA y animación generativa avanzada.',
                importance: 'La IA permite escalas de producción antes imposibles para creadores independientes. Aquí aprendes a crear mundos y personajes complejos sin presupuestos millonarios.'
            },
            {
                sem: 'Semestre 3',
                title: 'VFX y Cine Digital',
                desc: 'Composición digital, efectos visuales avanzados (VFX), integración de entornos virtuales y dirección de fotografía para flujos de trabajo híbridos.',
                importance: 'La magia ocurre en la mezcla. Saber integrar filmación real con elementos generados por IA es lo que diferencia a un aficionado de un profesional de la industria.'
            },
            {
                sem: 'Semestre 4',
                title: 'Producción Completa',
                desc: 'Desarrollo integral de un cortometraje cinematográfico, diseño sonoro profesional, estrategias de distribución digital y modelos de monetización.',
                importance: 'Este semestre finaliza con tu pieza maestra. No solo produces cine; aprendes a lanzarlo, distribuirlo y convertir tu talento en una carrera profesional sostenible.'
            },
        ]
    },
    marketing: {
        id: 'marketing',
        path: '/marketing-digital',
        name: 'Marketing Digital',
        icon: <TrendingUp size={24} />,
        titleLine1: 'Especialista en',
        titleHighlight1: 'Marketing Digital',
        titleLine2: 'y',
        titleHighlight2: 'Creación de Contenido',
        titleLine3: 'Estratégico con IA',
        tagline: 'Domina el Algoritmo y Crea Tendencias',
        sub: 'Escala Marcas y Negocios en 2 Años',
        heroImage: IMAGES.mktContent,
        tuition: '$4,500',
        duration: '2 AÑOS',
        semesters: '4 Semestres',
        practice: '80% PRÁCTICA',
        theory: '20% Teoría',
        description: 'Diseña campañas reales, construye audiencias masivas y genera crecimiento exponencial utilizando herramientas de IA.',
        scholarshipBonus: 'Gestiona redes y campañas reales para marcas internacionales en nuestro laboratorio.',
        pillars: [
            { img: IMAGES.mktContent, label: 'Creación de Contenido' },
            { img: IMAGES.mktStrategy, label: 'Estrategia Digital' },
            { img: IMAGES.mktGrowth, label: 'Growth & Ads con IA' },
        ],
        curriculum: [
            {
                sem: 'Semestre 1',
                title: 'Fundamentos y RRSS',
                desc: 'Psicología del consumidor digital, storytelling para marcas, creación intensiva de video corto (Vertical Video) y gestión de algoritmos.',
                importance: 'Capturar la atención en menos de 3 segundos es una ciencia. Entender cómo funcionan plataformas como TikTok e Instagram es la base de todo negocio moderno.'
            },
            {
                sem: 'Semestre 2',
                title: 'Estrategia y Embudos',
                desc: 'Diseño de Funnels (embudos de venta), Copywriting persuasivo asistido por IA, Email Marketing avanzado y automatización de flujos de trabajo.',
                importance: 'El contenido sin estrategia es solo ruido. Aprenderás a convertir seguidores en clientes de manera sistemática y predecible usando herramientas inteligentes.'
            },
            {
                sem: 'Semestre 3',
                title: 'Publicidad y Growth',
                desc: 'Gestión profesional de Meta Ads, Google Ads y TikTok Ads, análisis profundo de métricas (Data Analytics) y estrategias de Growth Hacking.',
                importance: 'Para escalar rápido necesitas dominar la pauta pagada. Usar IA para optimizar campañas publicitarias permite maximizar cada peso invertido por tus clientes o tu marca.'
            },
            {
                sem: 'Semestre 4',
                title: 'Negocios Digitales',
                desc: 'Creación de Marcas Personales de alto impacto, lanzamiento de productos digitales (Infoproductos), marketing de comunidades y monetización directa.',
                importance: 'Este semestre te enseña a ser dueño de tus activos. Construirás una marca que sea capaz de generar ingresos recurrentes y perdurar más allá de los cambios de plataforma.'
            },
        ]
    }
};

/* ────────────── Shared Components ────────────── */
const Navbar = () => (
    <nav className="nav">
        <div className="nav__inner container">
            <Link to="/" className="nav__brand">
                <div className="nav__logo">
                    <Cpu size={22} color="#0A2540" />
                </div>
                <div className="nav__info">
                    <span className="nav__name">Aprin / Competex</span>
                    <span className="nav__univ">International University</span>
                </div>
            </Link>

            <div className="nav__links">
                <Link to="/">Inicio</Link>
                <div className="nav__dropdown">
                    <span className="nav__dropdown-toggle">Programas <ChevronRight size={14} style={{ rotate: 90 }} /></span>
                    <div className="nav__dropdown-content glass-panel">
                        {Object.values(PROGRAMS).map(p => (
                            <Link key={p.id} to={p.path}>{p.name}</Link>
                        ))}
                    </div>
                </div>
                <a href="#contacto">Admisiones</a>
            </div>

            <div className="nav__actions">
                <a href="#contacto" className="btn btn-primary btn--nav">
                    Aplicar
                </a>
            </div>
        </div>
    </nav>
);

const Footer = () => (
    <footer id="contacto" className="footer">
        <div className="container">
            <div className="footer__top">
                <div className="footer__brand">
                    <div className="nav__brand">
                        <div className="nav__logo">
                            <Cpu size={22} color="#0A2540" />
                        </div>
                        <div className="nav__info">
                            <span className="nav__name">Aprin / Competex</span>
                            <p>Formación de alto impacto en tecnologías disruptivas.</p>
                        </div>
                    </div>
                </div>
                <div className="footer__links">
                    <div>
                        <h4>Programas</h4>
                        <ul>
                            {Object.values(PROGRAMS).map(p => (
                                <li key={p.id}><Link to={p.path}>{p.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Universidad</h4>
                        <ul>
                            <li><Link to="/">Sobre Nosotros</Link></li>
                            <li><a href="#becas">Financiamiento</a></li>
                            <li><a href="#requisitos">Equipamiento</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                © 2026 Aprin / Competex International. Todos los derechos reservados.
            </div>
        </div>
    </footer>
);

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

/* ────────────── Main Logic Components ────────────── */

const AccordionItem = ({ item, index, isOpen, onToggle }: { item: any, index: number, isOpen: boolean, onToggle: (i: number) => void }) => {
    return (
        <div
            className={`accordion glass-panel ${isOpen ? 'accordion--active' : ''}`}
            onClick={() => onToggle(index)}
        >
            <div className="accordion__header">
                <div className="accordion__title-wrap">
                    <span className="accordion__sem">{item.sem}</span>
                    <h3>{item.title}</h3>
                </div>
                <div className="curriculum__arrow grad-electric" style={{ rotate: isOpen ? '90deg' : '0deg' }}>
                    <ChevronRight size={20} color="#0A2540" />
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="accordion__content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="accordion__body">
                            <div className="accordion__desc">
                                <p>{item.desc}</p>
                            </div>
                            <div className="accordion__importance">
                                <h4>¿Por qué es importante?</h4>
                                <p>{item.importance}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ────────────── Page: Home (About + Menu) ────────────── */
const HomePage = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7 },
    };

    return (
        <main className="page">
            <section className="about container">
                <div className="about__hero">
                    <motion.div className="about__text" {...fadeIn}>
                        <h1>Futuro Digital con <span className="text-electric">Propósito</span></h1>
                        <p>Aprin / Competex International University es una institución diseñada para las profesiones del mañana. Combinamos la excelencia técnica con la innovación de la Inteligencia Artificial.</p>
                        <div className="hero__actions">
                            <a href="#programas" className="btn btn-primary">Ver Programas</a>
                            <button className="btn btn-outline">Filosofía Aprin</button>
                        </div>
                    </motion.div>
                    <motion.div className="about__image" {...fadeIn} transition={{ delay: 0.2 }}>
                        <img src={IMAGES.heroBg} alt="University Lab" />
                        <div className="hero__overlay" />
                    </motion.div>
                </div>
            </section>

            <section id="programas" className="menu">
                <div className="container">
                    <motion.div className="section-header" {...fadeIn}>
                        <h2>Nuestras Especialidades</h2>
                        <p>Elige tu camino hacia la maestría tecnológica</p>
                    </motion.div>

                    <div className="menu__grid">
                        {Object.values(PROGRAMS).map((p, i) => (
                            <motion.div key={p.id} className="menu__item" {...fadeIn} transition={{ delay: i * 0.15 }}>
                                <div className="menu__bg">
                                    <img src={p.heroImage} alt={p.name} />
                                </div>
                                <div className="menu__overlay" />
                                <div className="menu__content">
                                    <div className="menu__icon">
                                        {p.icon}
                                    </div>
                                    <h3>{p.name}</h3>
                                    <p>{p.tagline}</p>
                                    <Link to={p.path} className="btn btn-outline btn--nav" style={{ width: '100%', justifyContent: 'center' }}>
                                        Ver Detalles
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="disclaimer">
                <div className="container">
                    <div className="disclaimer__box">
                        <ShieldAlert className="text-orange" size={24} />
                        <p><strong>Aviso:</strong> Nuestros programas son de especialización profesional práctica. <strong>No requieren ni cuentan con validez oficial (RVOE)</strong>, priorizando certificaciones de la industria y competencias reales.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

/* ────────────── Page: Program Detail ────────────── */
const ProgramPage = ({ programId }: { programId: string }) => {
    const program = PROGRAMS[programId];
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleIndex = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    if (!program) return <div>Program not found</div>;

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7 },
    };

    return (
        <div className="page">
            <header className="hero">
                <div className="hero__bg">
                    <img src={IMAGES.heroBg} alt="" aria-hidden="true" />
                    <div className="hero__overlay" />
                </div>
                <div className="hero__content container">
                    <div className="hero__text">
                        <motion.div {...fadeIn} key={program.id}>
                            <h1 className="hero__title">
                                <span className="hero__title-small">{program.titleLine1} <small className="text-electric">{program.titleLine2}</small></span>
                                <br />
                                <span className="hero__highlight">{program.titleHighlight1}</span>
                                {program.titleHighlight2 && (<> <br /> <span className="hero__title-small"><small className="text-electric">{program.titleLine2 || 'y'}</small></span> <span className="hero__highlight">{program.titleHighlight2}</span></>)}
                                <br />
                                <span className="hero__title-small">{program.titleLine3}</span>
                            </h1>
                            <p className="hero__tagline">
                                <span className="text-electric">Aprende Creando</span> <strong>{program.tagline}</strong>
                            </p>
                            <p className="hero__sub">{program.sub}</p>
                            <div className="hero__actions">
                                <button className="btn btn-primary btn--hero">Aplicar Ahora</button>
                                <a href="#plan" className="btn btn-outline btn--hero">Ver Materias</a>
                            </div>
                        </motion.div>
                    </div>
                    <div className="hero__image">
                        <motion.img
                            key={program.id}
                            src={program.heroImage}
                            alt={program.name}
                            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 0.6 }}
                        />
                        <motion.div className="hero__badge glass-panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
                            <span className="hero__badge-label">Becas del <strong>100%</strong></span>
                            <span className="hero__badge-status">DISPONIBLES</span>
                        </motion.div>
                    </div>
                </div>
            </header>

            <section className="stats">
                <div className="stats__inner container">
                    <div className="stats__item">
                        <span className="stats__label">Duración</span>
                        <span className="stats__value">{program.duration}</span>
                        <span className="stats__detail">{program.semesters}</span>
                    </div>
                    <div className="stats__divider" />
                    <div className="stats__item">
                        <span className="stats__label">Metodología</span>
                        <span className="stats__value">{program.practice}</span>
                        <span className="stats__detail">{program.theory}</span>
                    </div>
                    <div className="stats__divider" />
                    <div className="stats__item">
                        <span className="stats__label">Colegiatura</span>
                        <span className="stats__value">{program.tuition} <small>MXN/</small></span>
                        <span className="stats__detail">Mensual</span>
                    </div>
                </div>
            </section>

            <section id="plan" className="curriculum">
                <div className="container">
                    <motion.div className="section-header" {...fadeIn}>
                        <h2>Plan de Estudios Detallado</h2>
                        <p>Haz clic en cada semestre para entender su importancia estratégica</p>
                    </motion.div>

                    <div className="curriculum__list">
                        {program.curriculum.map((s, i) => (
                            <AccordionItem
                                key={i}
                                item={s}
                                index={i}
                                isOpen={openIndex === i}
                                onToggle={toggleIndex}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section id="requisitos" className="requisitos">
                <div className="container">
                    <motion.div className="section-header" {...fadeIn}>
                        <h2>Requisitos Técnicos</h2>
                    </motion.div>
                    <div className="req__grid">
                        {[
                            { icon: <Monitor />, label: 'Memoria RAM', val: '32 GB de RAM', sub: 'Mínimo para procesos de IA' },
                            { icon: <Cpu />, label: 'Procesador', val: 'Intel i5 o superior', sub: 'Equivalentes: AMD Ryzen 5 o Apple Silicon' },
                            { icon: <Wifi />, label: 'Conexión', val: 'Internet Estable', sub: 'Mínimo 20 Mbps' },
                        ].map((req, i) => (
                            <motion.div key={i} className="req__card glass-panel" {...fadeIn} transition={{ delay: i * 0.1 }}>
                                <div className="req__icon">{req.icon}</div>
                                <h3>{req.label}</h3>
                                <span className="req__val">{req.val}</span>
                                <span className="req__sub">{req.sub}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="becas" className="becas">
                <div className="container">
                    <div className="becas__card glass-panel">
                        <div className="becas__content">
                            <h2>Beca de Creación al <span className="text-electric">100%</span></h2>
                            <p className="becas__sub"><strong>Compromiso:</strong> {program.scholarshipBonus}</p>
                            <ul className="becas__list">
                                {['Cero costo', 'Experiencia real', 'Herramientas IA', 'Mentoría'].map((item, i) => (
                                    <li key={i}><CheckCircle2 color="var(--primary-electric)" size={18} /><span>{item}</span></li>
                                ))}
                            </ul>
                            <button className="btn btn-accent btn--big">Solicitar Beca</button>
                        </div>
                        <div className="becas__stats">
                            <div className="becas__stat glass-panel">5h<span className="becas__stat-label">Teoría</span></div>
                            <div className="becas__stat glass-panel becas__stat--accent">+5h<span className="becas__stat-label">Práctica Lab</span></div>
                            <div className="becas__stat glass-panel becas__stat--wide">10 HORAS<span className="becas__stat-label">Dedicación Total</span></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

/* ────────────── Main App Router ────────────── */
const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/software-datos" element={<ProgramPage programId="software" />} />
                <Route path="/creacion-audiovisual" element={<ProgramPage programId="audiovisual" />} />
                <Route path="/marketing-digital" element={<ProgramPage programId="marketing" />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
