// Contenido inicial: los 11 artículos originales, cargados como borradores
// la primera vez que se usa el almacenamiento (ver lib/blobStore.js).
export const SEED_POSTS = [
  {
    title: "Nadie estudió 10 años para hacer clic",
    news_headline:
      "El burnout médico por fin baja… pero el tiempo de documentación fuera de horario («pajama time») no se mueve.",
    news_summary:
      "Los datos de la AMA (encuesta a 12.400+ médicos) muestran mejora en burnout, pero el tiempo nocturno en la historia clínica electrónica sigue intacto. Análisis de 2026 confirman la magnitud del problema.",
    category: "Punto de dolor",
    series: "medicina",
    facts: [
      "Casi 2 horas administrativas por cada hora de atención directa al paciente.",
      "En promedio 4,5 horas al día dentro de la historia clínica electrónica (revisión de 10 estudios).",
      "1 de cada 5 médicos (20,9%) pasa más de 8 horas semanales en el EHR fuera de horario laboral.",
      "El burnout baja, el «pajama time» no cambia: se tolera mejor el problema, no se elimina.",
    ],
    sources: [
      { label: "AMA", url: "https://www.ama-assn.org/practice-management/physician-health/burnout-way-down-pajama-time-stands-still" },
      { label: "Análisis 2026", url: "https://www.bartonassociates.com/blog/physician-burnout-remains-high-in-2026-see-latest-rates-top-causes-and-how-staffing-shortages-and-schedule-control-impact-clinicians/" },
      { label: "Medical Economics", url: "https://www.medicaleconomics.com/view/physicians-spend-4-5-hours-a-day-on-electronic-health-records" },
    ],
    angle:
      "Abrir la serie con el dolor más universal de la audiencia. Post diseñado para que el médico se sienta visto y comente. Máximo potencial de alcance.",
    content: `Nadie estudia medicina durante 10 años para pasar el día haciendo clic.

Pero los datos dicen otra cosa:

→ Por cada hora con un paciente, un médico dedica casi 2 horas a tareas administrativas y de registro.
→ En promedio, 4,5 horas al día dentro de la historia clínica electrónica.
→ 1 de cada 5 médicos pasa más de 8 horas SEMANALES documentando fuera de su horario: de noche, en la casa, los domingos. Los investigadores le pusieron nombre: "pajama time".

Y aquí viene lo que más me inquieta.

El burnout médico ha empezado a bajar en los últimos dos años. El tiempo de documentación fuera de horario no se ha movido ni un milímetro.

Traducción: estamos aprendiendo a soportar mejor el problema, no a eliminarlo.

Cuando un médico pasa la consulta mirando la pantalla en vez de mirar al paciente, no es un problema de vocación. Es un problema de diseño. El software hospitalario se diseñó para registrar y facturar, no para cuidar.

Los pacientes lo sienten. Los médicos lo cargan. Y los sistemas de salud lo pagan: consultas más lentas, más errores, más renuncias.

La tecnología creó este problema. Y le va a tocar resolverlo: la próxima generación de herramientas clínicas no puede pedirle al médico que escriba más. Tiene que escribir por él. Y después, ejecutar por él.

Pregunta para los médicos que me leen: de su última semana, ¿cuántas horas se fueron en documentar y no en atender?

#BurnoutMédico #SaludDigital #IAenSalud #HistoriaClínica`,
    status: "draft",
    position: 1,
  },
  {
    title: "Su próximo paciente ya consultó con una IA",
    news_headline:
      "Google publica resultados de SymptomAI: su asistente de síntomas sobre Gemini, probado con casi 14.000 personas reales en la app de Fitbit.",
    news_summary:
      "Preprint publicado en mayo de 2026 y cubierto por prensa tecnológica en julio. Es uno de los despliegues reales (no simulados) más grandes de IA conversacional de síntomas hasta la fecha.",
    category: "Curiosidad / tendencia",
    series: "medicina",
    facts: [
      "13.917 participantes reales describieron sus síntomas con sus propias palabras (jun 2025 – abr 2026).",
      "La IA incluyó el diagnóstico correcto en su top-5 el 73% de las veces; médicos revisando las mismas transcripciones: 60%.",
      "Hacer preguntas activas mejoró la precisión un 27% frente a solo escuchar.",
      "Es un prototipo de investigación: sin aprobación regulatoria, no apto para diagnóstico.",
    ],
    sources: [
      { label: "TechTimes (jul 2026)", url: "https://www.techtimes.com/articles/321455/20260724/google-ai-outdiagnoses-doctors-study-nearly-14000-real-patients.htm" },
    ],
    angle:
      "Curiosidad + espejo incómodo. El giro final (pacientes con IA de punta vs. médicos con software de hace 20 años) siembra la tesis de Miracle sin venderla.",
    content: `Su próximo paciente ya consultó con una IA antes de entrar al consultorio.

Google acaba de publicar los resultados de SymptomAI, un asistente de síntomas construido sobre Gemini y probado dentro de la app de Fitbit.

No fue una simulación: 13.917 personas reales describieron sus síntomas con sus propias palabras, entre junio de 2025 y abril de 2026.

Los números:

→ La IA incluyó el diagnóstico correcto entre sus 5 primeras opciones en el 73% de los casos.
→ Médicos revisando exactamente las mismas conversaciones: 60%.
→ El factor que más mejoró la precisión (+27%): hacer preguntas activas en lugar de solo escuchar.

Me quedo con dos reflexiones.

La primera es casi poética: lo que hizo mejor a la IA fue lo que la buena medicina ha hecho siempre. Preguntar bien. La anamnesis sigue siendo la reina, incluso para las máquinas.

La segunda es incómoda: el paciente llega hoy al consultorio con una IA de última generación en el bolsillo… y el médico lo recibe con un software diseñado hace 20 años, lleno de campos, clics y pantallas que no conversan entre sí.

Esa asimetría no es sostenible. Si los pacientes tienen IA, los médicos necesitan una mejor.

(Aclaración importante: SymptomAI es un prototipo de investigación, sin aprobación regulatoria. Nadie debería usarlo para autodiagnosticarse. Pero la dirección es clarísima.)

¿Ya les pasa? ¿Pacientes que llegan con su "prediagnóstico" hecho por IA? ¿Cómo lo están manejando?

#SaludDigital #IAenSalud #RelaciónMédicoPaciente #InnovaciónEnSalud`,
    status: "draft",
    position: 2,
  },
  {
    title: "2025: el año en que los escribas de IA se volvieron evidencia",
    news_headline:
      "Tres estudios (JAMA Network Open, UChicago Medicine y Kaiser Permanente) confirman que la IA ambiental reduce burnout y tiempo de documentación a gran escala.",
    news_summary:
      "Entre octubre de 2025 y febrero de 2026 se consolidó el cuerpo de evidencia más sólido hasta ahora sobre escribas de IA ambiental en la práctica real.",
    category: "Análisis con evidencia",
    series: "medicina",
    facts: [
      "JAMA Network Open (oct 2025): 250+ clínicos en 6 sistemas de salud → menos burnout, menor carga cognitiva, menos documentación fuera de horario.",
      "UChicago Medicine: −8,5% de tiempo total en el EHR y −15% en escritura de notas.",
      "Kaiser Permanente (TPMG): 7.260 médicos, 2,5 millones de consultas → ~15.791 horas de documentación ahorradas (~1.800 jornadas laborales).",
      "Otro estudio: burnout de clínicos ambulatorios cayó de 51,9% a 38,8% tras 30 días de documentación asistida por IA.",
    ],
    sources: [
      { label: "Advisory Board (feb 2026)", url: "https://www.advisory.com/daily-briefing/2026/02/04/ambient-ai-oi-ec" },
      { label: "JAMA Netw Open", url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2839542" },
      { label: "Datos 2026", url: "https://www.bartonassociates.com/blog/physician-burnout-remains-high-in-2026-see-latest-rates-top-causes-and-how-staffing-shortages-and-schedule-control-impact-clinicians/" },
    ],
    angle:
      "El post de autoridad técnica. Demuestra que dominas la literatura y posiciona tu tesis diferenciadora: documentar es el capítulo 1, operar es el capítulo 2 (= Miracle Operations, sin nombrarlo).",
    content: `Durante años, los "escribas de IA" fueron una promesa. Desde finales de 2025, son evidencia publicada.

Tres datos que todo médico y todo directivo de salud debería conocer:

1. JAMA Network Open (octubre 2025): más de 250 clínicos en 6 sistemas de salud reportaron menos burnout, menor carga cognitiva y menos documentación fuera de horario usando IA ambiental.

2. University of Chicago Medicine: la IA ambiental redujo 8,5% el tiempo total en la historia clínica y más de 15% el tiempo escribiendo notas. Suena poco: son 2-3 minutos por paciente. Multiplíquelos por 25 pacientes al día, por 20 días al mes.

3. Kaiser Permanente: 7.260 médicos, 2,5 millones de consultas. Resultado: cerca de 15.791 horas de documentación ahorradas. Casi 1.800 jornadas laborales completas devueltas a los médicos. Y en otro estudio, el burnout ambulatorio cayó de 51,9% a 38,8% en apenas 30 días de uso.

La discusión de "¿funcionará?" se acabó. Ahora viene la pregunta importante.

La nota clínica era solo la parte visible del iceberg. Debajo está todo lo que viene DESPUÉS de la consulta: órdenes, formularios, registros en el sistema hospitalario, autorizaciones, la misma información digitada tres veces en tres pantallas distintas.

La IA ambiental convirtió al médico de autor en editor. Excelente. Pero el siguiente salto es más grande: sistemas que no solo escriben lo que pasó en la consulta, sino que ejecutan lo que sigue.

Documentar era el capítulo 1. Operar es el capítulo 2. Y ahí es donde se va a definir la próxima década del software en salud.

¿En su institución ya evaluaron IA ambiental o siguen esperando "a que madure"? La evidencia dice que ya maduró.

#IAenSalud #BurnoutMédico #GestiónClínica #InnovaciónEnSalud`,
    status: "draft",
    position: 3,
  },
  {
    title: "Una IA superó a los médicos en urgencias (y no es lo que parece)",
    news_headline:
      "Science publica un estudio de Harvard y Beth Israel Deaconess: un modelo de razonamiento de OpenAI superó a médicos experimentados en precisión diagnóstica con casos reales de urgencias.",
    news_summary:
      "Abril de 2026. A diferencia de estudios anteriores con viñetas de examen, este usó historias clínicas reales y desordenadas de un servicio de urgencias, evaluando a la IA en tres momentos de la atención.",
    category: "Debate / futuro",
    series: "medicina",
    facts: [
      "Casos reales de urgencias del Beth Israel Deaconess + casos del NEJM, no viñetas académicas.",
      "La IA fue más precisa que los médicos del estudio en tres momentos: triage, evaluación y admisión.",
      "Usó solo el texto de la historia disponible en cada momento: sin examen físico, sin señales no verbales.",
      "Los propios autores: es precisión diagnóstica en retrospectiva, no práctica clínica real.",
    ],
    sources: [
      { label: "NPR (abr 2026)", url: "https://www.npr.org/2026/04/30/nx-s1-5804474/ai-doctors-openai-patient-care-diagnosis" },
    ],
    angle:
      "Tomar la noticia más \"amenazante\" del año y convertirla en un mensaje pro-médico. La analogía del estetoscopio da un frame memorable. Posiciona criterio, no miedo ni hype.",
    content: `Una IA superó a médicos experimentados diagnosticando en urgencias. Mi conclusión no es la que esperan.

Science publicó en abril un estudio que hace cinco años habría sonado a ciencia ficción.

Investigadores de Harvard y Beth Israel Deaconess probaron un modelo de razonamiento de OpenAI con casos reales de urgencias. No viñetas perfectas de examen: historias clínicas reales, con datos desordenados, incompletos, contradictorios. La medicina como es.

El resultado: el modelo fue más preciso que los médicos del estudio en tres momentos de la atención — desde el triage hasta la admisión — usando exactamente la misma información disponible en cada punto.

¿Significa que la IA va a reemplazar a los médicos? No.

El estudio tiene letra pequeña importante: la IA solo leyó texto. No examinó al paciente. No escuchó su tono de voz. No vio su cara de dolor. No tomó decisiones bajo presión con la familia al lado. Y acertar un diagnóstico en retrospectiva no es lo mismo que ejercer la medicina.

Pero descartar el hallazgo sería igual de equivocado.

Cuando apareció el estetoscopio, hubo médicos que lo consideraron un insulto al oído clínico. Hoy nadie ausculta sin él.

La pregunta correcta no es "¿me va a reemplazar la IA?"

Es: "¿quién va a atender mejor — el médico que la usa con criterio o el que la ignora por principio?"

El juicio clínico no está en riesgo. Lo que está cambiando es la caja de herramientas. Y la brecha entre quienes la adopten y quienes no va a ser cada vez más difícil de cerrar.

¿Ya usan IA en su práctica diaria, o todavía le tienen distancia? Me interesa leer ambos lados.

#InteligenciaArtificial #Diagnóstico #FuturoDeLaMedicina #IAenSalud`,
    status: "draft",
    position: 4,
  },
  {
    title: "Colombia encendió la historia clínica interoperable",
    news_headline:
      "Desde el 15 de abril de 2026 opera la interoperabilidad de historia clínica en Colombia: 7,7 millones de resúmenes intercambiados. Y en julio, Minsalud publicó el borrador que moderniza las reglas vigentes desde 1999.",
    news_summary:
      "Dos movimientos regulatorios simultáneos que redefinen la documentación clínica en el país — con plazos concretos para IPS y profesionales.",
    category: "Colombia / local",
    series: "medicina",
    facts: [
      "Mecanismo operativo desde el 15 de abril de 2026; ya van 7,7 millones de Resúmenes Digitales de Atención de 2,7 millones de pacientes.",
      "744 prestadores conectados (2.456 sedes) y 1.087 IPS más en proceso de incorporación.",
      "Borrador de Minsalud (jul 2026): deroga la Resolución 1995 de 1999 y da 18 meses para implementar sistemas electrónicos con firma digital y trazabilidad.",
      "Más estandarización = más campos estructurados que alguien tendrá que llenar.",
    ],
    sources: [
      { label: "ConsultorSalud (jun 2026)", url: "https://consultorsalud.com/historia-clinica-electronica-registros-interop/" },
      { label: "ConsultorSalud (jul 2026)", url: "https://consultorsalud.com/minsalud-reglas-historia-clinica-electronica/" },
    ],
    angle:
      "El post que nadie más en tu red está escribiendo. Autoridad local + advertencia con datos de EE. UU. Posiciona la tesis \"interoperabilidad + automatización\" que es exactamente el terreno de Miracle.",
    content: `Colombia encendió la historia clínica interoperable. Ahora viene la parte difícil.

Silenciosamente, el país está viviendo uno de los cambios más importantes de su sistema de salud en décadas:

→ Desde el 15 de abril de 2026 opera el mecanismo de interoperabilidad de historia clínica electrónica.
→ Ya se intercambiaron 7,7 millones de resúmenes digitales de atención, de 2,7 millones de pacientes.
→ 744 prestadores conectados y más de 1.000 IPS adicionales en proceso.
→ Y en julio, Minsalud publicó el borrador que moderniza de raíz las reglas de historia clínica (la norma vigente es de 1999), con 18 meses de plazo para implementar sistemas electrónicos con firma digital y trazabilidad completa.

Como colombiano construyendo tecnología para salud, esto me entusiasma. Y también me preocupa.

Porque interoperabilidad significa más datos estructurados, más campos estandarizados, más trazabilidad. Todo necesario. Pero hay una pregunta que casi nadie está haciendo:

¿Quién va a digitar todo eso?

Si la respuesta es "el médico, a mano, en cada consulta", habremos construido una autopista de datos pagada con horas de teclado del personal clínico.

Estados Unidos ya cometió ese error: logró historia clínica electrónica casi universal… y hoy sus médicos pasan más de 4 horas diarias frente a la pantalla, con el trabajo administrativo como primera causa de burnout.

Colombia tiene la oportunidad de saltarse esa generación de errores: combinar interoperabilidad con captura automática. Que la información nazca de la conversación clínica, y la IA la estructure y la registre — en lugar de sumarle clics al médico.

La autopista ya está construida. La pregunta es si la vamos a llenar con dedos o con inteligencia.

¿Cómo lo están viviendo en sus instituciones? ¿La interoperabilidad les ha quitado trabajo o les ha sumado?

#SaludColombia #Interoperabilidad #HistoriaClínicaElectrónica #SaludDigital`,
    status: "draft",
    position: 5,
  },
  {
    title: "El burnout no se cura con yoga",
    news_headline:
      "El burnout médico baja a 41,9% según la AMA — pero 1 de cada 4 médicos considera dejar la práctica clínica por carga administrativa, mientras la OMS proyecta un déficit de 11,1 millones de trabajadores de salud para 2030.",
    news_summary:
      "Los reportes de 2026 muestran una paradoja: mejora el indicador, pero la causa raíz (burocracia) sigue intacta y la fuga de talento continúa en un mundo con escasez estructural de personal sanitario.",
    category: "Humano / reflexivo",
    series: "medicina",
    facts: [
      "Burnout: 41,9% en 2025 (vs. 43,2% en 2024 y 53% en 2022) — dos años seguidos de mejora.",
      "1 de cada 4 médicos planea dejar la medicina clínica; la causa n.º 1 reportada: el trabajo burocrático.",
      "Intención de irse en los próximos 2 años: 31,1%.",
      "OMS: déficit proyectado de 11,1 millones de trabajadores de salud para 2030.",
    ],
    sources: [
      { label: "Barton (may 2026)", url: "https://www.bartonassociates.com/blog/physician-burnout-remains-high-in-2026-see-latest-rates-top-causes-and-how-staffing-shortages-and-schedule-control-impact-clinicians/" },
      { label: "OMS", url: "https://www.who.int/teams/health-workforce/3" },
      { label: "AMA", url: "https://www.ama-assn.org/practice-management/physician-health/burnout-way-down-pajama-time-stands-still" },
    ],
    angle:
      "Cierre de la serie con el post más humano y citable. La frase \"el burnout es una falla de diseño, no de resiliencia\" es la que quieres que asocien contigo. Termina en esperanza, no en queja.",
    content: `El burnout médico está bajando. Igual, nadie debería celebrar todavía.

Primero la buena noticia: según la AMA, el burnout médico bajó a 41,9% en 2025. Dos años seguidos de mejora, la cifra más baja en años.

Ahora la parte que no se cuenta tanto:

→ 1 de cada 4 médicos está considerando dejar la práctica clínica. ¿La causa número uno? No es el salario. Es la carga administrativa.
→ La principal causa reportada de burnout sigue siendo la misma, década tras década: "demasiado trabajo burocrático".
→ Y mientras tanto, la OMS proyecta un déficit de 11,1 millones de trabajadores de salud para 2030.

Piensen en esa combinación un segundo.

El mundo no tiene médicos de sobra. Y estamos usando a los que tenemos para llenar formularios.

Durante años, la respuesta institucional al burnout fue tratar el síntoma en el individuo: talleres de resiliencia, pausas activas, yoga. Como si el problema fuera que al médico le falta actitud — y no que le sobran dos horas de pantalla por cada hora de paciente.

Digámoslo claro: el burnout no es una falla de resiliencia. Es una falla de diseño de sistemas.

Y justamente por eso soy optimista. Porque por primera vez, el rediseño es técnicamente posible. La IA ya demostró que puede absorber gran parte del trabajo de documentación. El siguiente paso es que absorba lo que viene después de cada consulta: los registros, las órdenes, los formularios, los sistemas.

Cada hora administrativa que le devolvemos a un médico es una consulta más para un paciente que la necesita. O una pausa real. O simplemente una cena a tiempo con su familia.

No conozco mejor caso de uso para la inteligencia artificial que ese.

Médicos: ¿qué harían con 10 horas menos de papeleo a la semana?

#BurnoutMédico #SistemasDeSalud #IAenSalud #TalentoHumanoEnSalud`,
    status: "draft",
    position: 6,
  },
  {
    title: "Hoy cambia el gobierno: lo que viene para los médicos",
    news_headline:
      "Abelardo de la Espriella se posesiona hoy como presidente de Colombia con un plan de choque de $10 billones para la salud, ejecutable en los primeros 90 días.",
    news_summary:
      "Ganó la segunda vuelta del 21 de junio frente a Iván Cepeda. Su ministra de Salud, Ana María Vesga (expresidenta de Acemi), declaró como prioridad \"garantizar medicamentos, estabilidad operativa y pagos al personal\".",
    category: "Política · coyuntura",
    series: "politica",
    facts: [
      "Plan de choque de $10 billones anunciado el 6 de julio; ejecución en los primeros 90 días.",
      "Ministra Ana María Vesga: abogada, maestría en economía de la salud, expresidenta de Acemi — conoce la tubería financiera del sistema.",
      "Prioridades declaradas: medicamentos, estabilidad operativa, pagos al personal de salud, auditorías trimestrales a la UPC y \"dignificar el talento humano\".",
      "Lo que recibe: 18 millones de afiliados en EPS intervenidas y faltante acumulado de $34,2 billones en UPC (2021-2025).",
    ],
    sources: [
      { label: "Valora Analitik", url: "https://www.valoraanalitik.com/gobierno-de-la-espriella-entrego-detalles-del-ambicioso-plan-para-la-salud-y-las-eps-en-colombia/" },
      { label: "El Universal", url: "https://www.eluniversal.com.co/colombia/2026/07/30/quien-es-la-ministra-de-salud-del-gobierno-de-abelardo-este-es-el-perfil-de-ana-maria-vesga/" },
      { label: "Bloomberg Línea", url: "https://www.bloomberglinea.com/latinoamerica/colombia/este-es-el-tamano-del-problema-que-recibira-el-ministro-de-salud-que-nombre-de-la-espriella/" },
    ],
    angle:
      "Newsjacking del día de posesión. Optimismo con datos + posición de veedor (\"le haré seguimiento con datos\"). Eso te da credibilidad ante cualquier lector, comparta o no tu entusiasmo.",
    content: `Hoy se posesiona un nuevo gobierno. Y esta vez, los médicos aparecen en el primer párrafo del plan — no en la letra pequeña.

Como alguien que trabaja todos los días con médicos, leí el plan de salud del gobierno De la Espriella con una sola pregunta: ¿qué cambia para el que está en el consultorio?

Esto es lo que está sobre la mesa:

→ Plan de choque de $10 billones para restablecer el flujo de recursos, con ejecución anunciada para los primeros 90 días.
→ Pagos al personal de salud como prioridad explícita: la nueva ministra, Ana María Vesga, habla de "garantizar medicamentos, estabilidad operativa y pagos al personal".
→ Auditorías trimestrales al uso de la UPC por parte de las EPS.
→ "Dignificar el talento humano en salud" como línea del plan de gobierno.
→ Tecnología para controlar los tiempos de asignación de citas y hacerles seguimiento.

¿El contexto que recibe? Difícil como pocas veces: 18 millones de colombianos en EPS intervenidas y un faltante acumulado de $34 billones asociado a la UPC entre 2021 y 2025.

Mi lectura honesta: hay razones para el optimismo.

Primero, porque el diagnóstico es el correcto. Sin flujo de recursos no hay sistema. Y sin pagos dignos y a tiempo, no hay talento humano que aguante.

Segundo, porque la ministra conoce el sistema por dentro. Pocas personas en el país entienden mejor la tubería financiera de la salud colombiana.

Y tercero, porque por primera vez la tecnología aparece como herramienta de gestión del sistema — no como adorno de presentación.

¿Mi papel desde este espacio? Hacerle seguimiento a esas promesas con datos, no con emociones. Los médicos no necesitan más discursos: necesitan que el pago llegue, que la cita fluya y que el sistema deje de robarles horas.

El reloj de los 90 días empezó hoy. Aquí estaremos contando.

Médicos: ¿qué es lo PRIMERO que este gobierno debería arreglarles?

📎 Fuentes:
https://www.valoraanalitik.com/gobierno-de-la-espriella-entrego-detalles-del-ambicioso-plan-para-la-salud-y-las-eps-en-colombia/
https://www.eluniversal.com.co/colombia/2026/07/30/quien-es-la-ministra-de-salud-del-gobierno-de-abelardo-este-es-el-perfil-de-ana-maria-vesga/

#SaludColombia #TalentoHumanoEnSalud #PolíticaPública #SistemaDeSalud`,
    status: "draft",
    position: 7,
  },
  {
    title: "La oportunidad que ningún gobierno tuvo: digitalizar la salud",
    news_headline:
      "El nuevo gobierno declara \"desarrollar tecnología sanitaria\" como prioridad, justo cuando la interoperabilidad ya opera y la brecha de talento humano hace imposible resolver el sistema solo con más contrataciones.",
    news_summary:
      "Cruce de tres hechos verificados: las prioridades tecnológicas anunciadas por el gobierno entrante, las brechas de personal documentadas por la Academia Nacional de Medicina y la infraestructura digital que ya está en marcha.",
    category: "Política · visión",
    series: "politica",
    facts: [
      "Colombia tiene 2,5 médicos y 1,6 enfermeras por 1.000 habitantes; la OCDE promedia 3,9 y 9,2 (Academia Nacional de Medicina).",
      "El sistema mueve $150-160 billones al año y pierde ~25% en ineficiencia.",
      "Prioridades de la ministra Vesga: \"desarrollar tecnología sanitaria\" y política industrial de seguridad sanitaria.",
      "La historia clínica interoperable ya opera: 7,7 millones de resúmenes intercambiados desde abril.",
    ],
    sources: [
      { label: "Infobae · Academia", url: "https://www.infobae.com/colombia/2026/07/08/academia-nacional-de-medicina-entrego-al-gobierno-entrante-de-abelardo-de-la-espriella-una-hoja-de-ruta-para-reformar-el-sistema-de-salud-en-que-consiste/" },
      { label: "ConsultorSalud", url: "https://consultorsalud.com/propuestas-de-salud-de-abelardo-de-la-espriella/" },
      { label: "Interoperabilidad", url: "https://consultorsalud.com/historia-clinica-electronica-registros-interop/" },
    ],
    angle:
      "El post donde tu tesis de empresa y la coyuntura política se encuentran. Argumento matemático (no se puede formar médicos en un cuatrienio → hay que multiplicar el tiempo de los que hay). Es el político que más autoridad te construye como fundador.",
    content: `Hay una frase del nuevo plan de salud que pasó casi desapercibida. Para mí, es la más importante de todas:

"Desarrollar tecnología sanitaria" como prioridad del Ministerio de Salud.

Déjenme explicar por qué importa más de lo que parece.

Colombia tiene 2,5 médicos por cada 1.000 habitantes. El promedio OCDE es 3,9. En enfermería la brecha es peor: 1,6 contra 9,2.

Formar un médico toma más de una década. Traducción: no existe forma de cerrar esa brecha "contratando más gente" en un cuatrienio. Ningún gobierno puede, del color que sea.

Lo que SÍ se puede hacer en cuatro años: multiplicar el tiempo útil de los que ya tenemos.

Hoy una parte enorme de la hora médica se pierde en tareas que no requieren un médico: digitar, transcribir, repetir la misma información en tres sistemas, llenar formatos. Cada hora administrativa que se elimina equivale a "contratar" capacidad clínica sin esperar diez años de formación.

Y las piezas están alineadas como nunca antes:

→ La historia clínica interoperable ya opera: 7,7 millones de resúmenes intercambiados desde abril.
→ La IA clínica dejó de ser promesa: la evidencia de 2025-2026 muestra reducciones reales de burnout y de tiempo de documentación.
→ Y ahora hay un gobierno que declara la tecnología sanitaria como prioridad, con una ministra que conoce la operación del sistema por dentro.

A los gobiernos anteriores les tocó poner los cimientos regulatorios. A este le puede tocar algo más grande: que el médico colombiano deje de ser el digitador mejor formado del país.

Si los $10 billones del plan de choque arreglan el flujo de caja, la tecnología puede arreglar el flujo de tiempo. Y el tiempo médico es el recurso más escaso de todo el sistema — más escaso que la plata.

Optimista, sí. Ingenuo, no: esto hay que ejecutarlo, y desde aquí le haremos seguimiento. Pero la ventana existe, y hoy está abierta.

¿Qué proceso de su día a día debería ser el primero en automatizarse? Propongo empezar la lista en los comentarios.

📎 Fuente: https://www.infobae.com/colombia/2026/07/08/academia-nacional-de-medicina-entrego-al-gobierno-entrante-de-abelardo-de-la-espriella-una-hoja-de-ruta-para-reformar-el-sistema-de-salud-en-que-consiste/

#SaludDigital #IAenSalud #SaludColombia #TransformaciónDigital`,
    status: "draft",
    position: 8,
  },
  {
    title: "¿Derecha o izquierda? La respuesta incomoda a ambos",
    news_headline:
      "¿A la medicina le va mejor con gobiernos de derecha o de izquierda? La historia de los mejores sistemas del mundo da una respuesta que ningún bando quiere escuchar.",
    news_summary:
      "Post evergreen de análisis histórico. Casos: NHS británico (laborista, 1948), SUS brasileño (constituyente de 1988), seguro único de Taiwán (gobierno de centroderecha, 1995) y Costa Rica (construcción continua desde los años 40).",
    category: "Debate · evergreen",
    series: "politica",
    facts: [
      "El NHS nació de un gobierno laborista (1948); el SUS, de la constituyente progresista de 1988.",
      "El seguro universal de pagador único de Taiwán — hoy #1 del mundo — lo implementó un gobierno de centroderecha en 1995.",
      "Costa Rica: seguro universal desde 1941-43, fortalecido por gobiernos de todos los colores → esperanza de vida mayor que la de EE. UU. con una fracción del gasto.",
      "Patrón común: política de Estado sostenida por décadas, no refundaciones cada cuatrienio.",
    ],
    sources: [
      { label: "Ranking 2026", url: "https://www.visualcapitalist.com/ranked-the-countries-with-the-best-and-worst-health-care-in-2026/" },
      { label: "Costa Rica · Gawande", url: "https://www.lanacion.com.ar/el-mundo/un-profesor-de-harvard-y-su-vision-sobre-el-sistema-de-salud-de-costa-rica-que-puede-aprender-nid10122021/" },
    ],
    angle:
      "El post más compartible de la serie política. Al no militar, te posiciona por encima del barro: la gente de ambos lados lo comparte para \"darle lecciones\" al otro. La paradoja de Taiwán es el gancho intelectual.",
    content: `¿A la medicina le va mejor con gobiernos de derecha o de izquierda?

Es la pelea más repetida de las redes. Así que fui a buscar qué dice la historia de los mejores sistemas de salud del mundo. La respuesta incomoda a ambos bandos.

Lo que históricamente ha aportado la izquierda:

→ Expansión de cobertura y de gasto público en salud.
→ Prioridad en atención primaria y equidad territorial.
→ El NHS británico nació de un gobierno laborista en 1948. El SUS brasileño — el sistema público más grande del mundo — salió de la constituyente de 1988.

Lo que históricamente ha aportado la derecha:

→ Disciplina fiscal y sostenibilidad del financiamiento.
→ Gestión, medición y alianzas público-privadas.
→ Y aquí viene la paradoja favorita de los que estudiamos esto: el seguro universal de Taiwán — hoy el sistema mejor evaluado del mundo — lo implementó un gobierno de centroderecha en 1995. Y es de pagador único estatal.

Léanlo otra vez: un gobierno de derecha construyó el sistema "estatista" más exitoso del planeta. Porque no gobernó con ideología. Gobernó con evidencia.

Los sistemas que hoy admiramos — Taiwán, Costa Rica, Japón, Países Bajos — no comparten ideología. Comparten otra cosa: son políticas de Estado sostenidas durante décadas, por gobiernos de todos los colores, con ajustes técnicos en lugar de refundaciones cada cuatro años.

Costa Rica lo resume perfecto: su seguro universal nació en los años 40, y cada gobierno — de izquierda o de derecha — lo fortaleció en vez de demolerlo. Resultado: más esperanza de vida que Estados Unidos, gastando una fracción.

Mientras tanto, en el consultorio: el burnout no pregunta por quién votó el médico. La historia clínica mal diseñada tampoco. Y el paciente que lleva cuatro meses esperando una cita, menos.

Mi conclusión: la medicina no necesita que gane un bando. Necesita que ambos la saquen del campo de batalla y la traten como lo que es — infraestructura crítica de la nación.

¿Conocen algún gran sistema de salud construido por un solo partido? Yo no encontré ninguno. Los leo.

📎 Fuentes:
https://www.visualcapitalist.com/ranked-the-countries-with-the-best-and-worst-health-care-in-2026/
https://www.lanacion.com.ar/el-mundo/un-profesor-de-harvard-y-su-vision-sobre-el-sistema-de-salud-de-costa-rica-que-puede-aprender-nid10122021/

#SistemasDeSalud #PolíticaPública #SaludColombia #Medicina`,
    status: "draft",
    position: 9,
  },
  {
    title: "El mejor sistema del mundo (y por qué Colombia sí puede)",
    news_headline:
      "Taiwán vuelve a encabezar el índice mundial de salud 2026 (87,1 puntos), gastando ~US$2.400 por persona al año. Colombia tiene más argumentos de los que cree para aspirar a ese club.",
    news_summary:
      "Índice Numbeo 2026: Taiwán #1, Corea del Sur #2, Países Bajos #3. La historia de Taiwán: de 40% sin seguro a finales de los 80 a cobertura de 99,9% — un sistema diseñado copiando deliberadamente lo mejor del mundo.",
    category: "Sistemas · evergreen",
    series: "politica",
    facts: [
      "Taiwán #1 mundial (87,1) gastando ~US$2.400 per cápita — EE. UU. gasta casi 5 veces más y no aparece en el top.",
      "Su seguro único (1995) fue diseñado por un equipo liderado por el economista de Harvard William Hsiao tras estudiar los sistemas de varios países.",
      "Colombia: #22 del mundo en la histórica clasificación OMS 2000 y #1 en equidad financiera; cobertura ~99%.",
      "4 de los 10 mejores hospitales de América Latina son colombianos: Santa Fe (3.º), Valle del Lili (5.º), Cardioinfantil (7.º), Imbanaco (9.º).",
    ],
    sources: [
      { label: "Ranking 2026", url: "https://www.visualcapitalist.com/ranked-the-countries-with-the-best-and-worst-health-care-in-2026/" },
      { label: "Hospitales LatAm", url: "https://www.semana.com/salud/articulo/el-ranking-completo-de-los-mejores-hospitales-y-clinicas-de-america-latina-en-2025-hay-cuatro-de-colombia-en-el-top-10/202533/" },
      { label: "Interoperabilidad", url: "https://consultorsalud.com/historia-clinica-electronica-registros-interop/" },
    ],
    angle:
      "Historia + esperanza con datos. La tesis \"los grandes sistemas no nacen de la riqueza sino de decisiones bien copiadas\" desarma el pesimismo colombiano y deja tu marca de optimismo argumentado.",
    content: `El mejor sistema de salud del mundo no es el de una potencia europea ni el de un país petrolero. Es el de una isla que hace 35 años tenía al 40% de su gente sin seguro.

En el índice global de 2026, el primer lugar lo ocupa Taiwán (87,1 puntos). Segundo, Corea del Sur. Estados Unidos, el país que más gasta en salud del planeta, no aparece ni cerca del top.

La historia de cómo Taiwán llegó ahí es una clase magistral:

A finales de los 80, casi la mitad de su población no tenía seguro. ¿Qué hizo el gobierno? Algo insólitamente humilde: no inventar. Convocó un equipo liderado por William Hsiao, economista de Harvard, y estudió a fondo los sistemas de media docena de países. Copió lo mejor de cada uno. Descartó sus errores.

En 1995 lanzó su seguro nacional único. La cobertura pasó de poco más de la mitad a más del 90% en su primer año. Hoy: 99,9%, con costos administrativos mínimos y una tarjeta inteligente que carga tu historia clínica desde 2004 — hace 22 años.

¿El gasto? Unos US$2.400 por persona al año. Una fracción de lo que gastan los países que están por debajo en la lista.

La lección incomoda al pesimismo: los grandes sistemas no nacen de la riqueza. Nacen de decisiones bien copiadas, datos bien usados y continuidad de décadas.

¿Y Colombia? Voy a decir algo impopular: Colombia puede estar entre los mejores del mundo.

No es patriotería. Son datos:

→ La OMS, en su histórica clasificación mundial del año 2000, nos ubicó #22 entre 191 países — y #1 del mundo en equidad de la contribución financiera.
→ Cobertura de aseguramiento cercana al 99%, con uno de los gastos de bolsillo más bajos del continente.
→ 4 de los 10 mejores hospitales de América Latina son colombianos: Santa Fe, Valle del Lili, Cardioinfantil, Imbanaco.
→ Y desde abril, historia clínica interoperable operando: la columna digital que Taiwán construyó hace décadas, por fin en marcha.

Lo que nos falta es exactamente lo que a Taiwán le sobró: estabilidad financiera y continuidad más allá de los ciclos políticos. El talento ya está — lo confirma cada ranking y cada médico colombiano brillando en el exterior.

Taiwán tardó una década entre la decisión y el sistema modelo. Nosotros ya tenemos 30 años de aprendizajes acumulados y la infraestructura digital corriendo.

La pregunta no es si Colombia puede. Es si vamos a decidirlo.

¿Qué cree usted que le falta a Colombia para estar en ese top 10 mundial?

📎 Fuentes:
https://www.visualcapitalist.com/ranked-the-countries-with-the-best-and-worst-health-care-in-2026/
https://www.semana.com/salud/articulo/el-ranking-completo-de-los-mejores-hospitales-y-clinicas-de-america-latina-en-2025-hay-cuatro-de-colombia-en-el-top-10/202533/

#SistemasDeSalud #SaludColombia #Taiwán #FuturoDeLaSalud`,
    status: "draft",
    position: 10,
  },
  {
    title: "Talento de primer mundo, herramientas de hace 20 años",
    news_headline:
      "Ecuador aparece #6 del mundo en el índice de salud 2026 — por encima de Finlandia y Dinamarca. Costa Rica supera a EE. UU. en esperanza de vida gastando ~US$900 per cápita. El patrón latinoamericano existe.",
    news_summary:
      "Datos regionales que sostienen la tesis: la medicina latinoamericana compite en talento y calidez, y pierde en herramientas. Con el modelo EBAIS de Costa Rica (elogiado por Atul Gawande, Harvard) como prueba de que la cercanía escala.",
    category: "LatAm · evergreen",
    series: "politica",
    facts: [
      "Ecuador #6 mundial en el índice Numbeo 2026 (77,7), por encima de Finlandia y Dinamarca.",
      "Costa Rica: esperanza de vida ~81 años vs. 79 de EE. UU., gastando US$909 per cápita (vs. 17,7% del PIB estadounidense).",
      "Modelo EBAIS: 1.045 equipos de atención primaria que visitan casa por casa — el caso que Gawande puso de ejemplo para EE. UU.",
      "La brecha real: 1,6 enfermeras por 1.000 habitantes vs. 9,2 en la OCDE; menos equipos, sistemas fragmentados.",
    ],
    sources: [
      { label: "Ranking 2026", url: "https://www.visualcapitalist.com/ranked-the-countries-with-the-best-and-worst-health-care-in-2026/" },
      { label: "Costa Rica · Gawande", url: "https://www.lanacion.com.ar/el-mundo/un-profesor-de-harvard-y-su-vision-sobre-el-sistema-de-salud-de-costa-rica-que-puede-aprender-nid10122021/" },
      { label: "Hospitales LatAm", url: "https://www.semana.com/salud/articulo/el-ranking-completo-de-los-mejores-hospitales-y-clinicas-de-america-latina-en-2025-hay-cuatro-de-colombia-en-el-top-10/202533/" },
    ],
    angle:
      "El post de orgullo médico latinoamericano — el más emocional de las dos series. Homenaje sin condescendencia + tesis del leapfrog (saltar del papel a la IA como se saltó del efectivo a la banca digital). El cierre conecta directo con tu misión.",
    content: `En el ranking mundial de salud de 2026 hay un país latinoamericano por encima de Finlandia y de Dinamarca. No es el que están pensando.

Es Ecuador: #6 del mundo en el índice Numbeo 2026.

¿Sesgos del índice? Seguramente los hay. Pero el patrón regional se repite demasiado como para ignorarlo:

→ Costa Rica tiene mayor esperanza de vida que Estados Unidos (~81 vs 79 años)… gastando US$909 por persona al año. Estados Unidos gasta más de diez veces eso.
→ Brasil opera el SUS, el sistema público universal más grande del planeta.
→ Y en el top 10 de hospitales de América Latina, Brasil y Colombia se reparten casi toda la lista, con instituciones que ya compiten en rankings mundiales.

¿Cómo lo logra una región con una fracción de los recursos?

Tengo una hipótesis, y la veo confirmada en cada consulta: el médico latinoamericano.

Formado para diagnosticar con las manos, el oído y la pregunta — porque no siempre hubo resonador disponible. Entrenado en la escasez, que es la escuela más dura (y más efectiva) de criterio clínico. Y con algo que los sistemas del primer mundo hoy intentan recuperar a punta de cursos de "humanización": la cercanía. El médico que conoce a la familia completa. El que examina mirando a los ojos y no a la pantalla.

Costa Rica demostró que esa cercanía escala: su modelo EBAIS manda equipos de salud casa por casa, comunidad por comunidad. Atul Gawande, profesor de Harvard, lo puso de ejemplo de lo que Estados Unidos debería aprender. La tecnología del modelo es la visita. La innovación es la relación.

Ahora, la otra mitad de la historia, porque el homenaje sin honestidad es propaganda:

Ese mismo médico trabaja con menos herramientas que sus colegas del norte. Menos equipos. Una fracción del personal de apoyo (1,6 enfermeras por 1.000 habitantes contra 9,2 de la OCDE). Sistemas de información fragmentados. Software que le roba horas que el paciente necesita.

Talento de primer mundo, operando con herramientas de hace 20 años. Esa es la brecha real de la medicina latinoamericana.

Y por eso soy optimista: porque la brecha de herramientas es hoy la más barata de cerrar de la historia. El software y la IA viajan a costo casi cero. Así como la región saltó del efectivo a la banca digital sin pasar por décadas de cheques, la salud latinoamericana puede saltar del papel a la inteligencia artificial sin repetir los errores del norte.

Si le damos a nuestros médicos las herramientas que ya existen, el resultado no es "alcanzar" al primer mundo.

Es otra cosa: la mejor tecnología del planeta en manos de los médicos más humanos del planeta.

Yo a eso le apuesto mi carrera.

¿Exagerado o posible? Me interesa especialmente la opinión de quienes han ejercido dentro y fuera de la región.

📎 Fuentes:
https://www.visualcapitalist.com/ranked-the-countries-with-the-best-and-worst-health-care-in-2026/
https://www.lanacion.com.ar/el-mundo/un-profesor-de-harvard-y-su-vision-sobre-el-sistema-de-salud-de-costa-rica-que-puede-aprender-nid10122021/

#MedicinaLatinoamericana #SaludDigital #IAenSalud #OrgulloMédico`,
    status: "draft",
    position: 11,
  },
];
