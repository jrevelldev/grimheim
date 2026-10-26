// Helper function to create rule reference links
const createRuleReference = (ruleName, displayText = ruleName) => {
    return `
        <span class="text-mordheim-gold hover:text-yellow-400 cursor-pointer inline-block" 
              onclick="window.showRuleModal('${ruleName}')"
              title="Haz clic para ver las reglas de ${displayText}"
              style="text-decoration: underline; text-underline-offset: 2px;">
            ${displayText}
        </span>
    `;
};

// Helper function to create special rule text with rule references
const createSpecialRuleText = (text, ruleReferences = []) => {
    let processedText = text;

    ruleReferences.forEach(ref => {
        const ruleName = typeof ref === 'object' ? ref.rule : ref;
        const searchPattern = typeof ref === 'object' ? ref.pattern : ref;
        const displayText = typeof ref === 'object' ? ref.text : ref;

        const referenceHtml = createRuleReference(ruleName, displayText);
        processedText = processedText.replace(
            new RegExp(`(?<![a-zA-ZáéíóúñÁÉÍÓÚÑ])${searchPattern}(?![a-zA-ZáéíóúñÁÉÍÓÚÑ])`, 'i'),
            referenceHtml
        );
    });

    return processedText;
};

// Helper function to create expandable table rows
const createRuleTable = (description, headers, rows, ruleReferences = []) => {
    const headerHtml = headers.map(header =>
        `<th class="text-left py-2 px-3 text-slate-300">${header}</th>`
    ).join('');

    const rowHtml = rows.map(row => {
        const expandableContent = row.expandableContent ? `
            <div onclick="this.nextElementSibling.classList.toggle('hidden')" class="cursor-pointer font-semibold text-mordheim-gold hover:text-yellow-400 transition-colors">
                &#9660; ${row.title}
            </div>
            <div class="hidden mt-2 p-3 bg-slate-700 rounded border-l-4 border-mordheim-gold text-slate-300">
                ${row.expandableContent}
            </div>
        ` : row.content || '';

        const borderClass = row.border !== false ? 'border-b border-slate-700' : '';

        // Create all cells except the last one normally
        const normalCells = row.cells.slice(0, -1).map(cell =>
            `<td class="py-2 px-4 text-slate-300 min-w-[60px]">${cell}</td>`
        ).join('');

        return `
            <tr class="${borderClass}">
                ${normalCells}
                <td class="py-2 px-3">
                    ${expandableContent}
                </td>
            </tr>
        `;
    }).join('');

    // Process description for rule references
    const processedDescription = createSpecialRuleText(description, ruleReferences);

    return `
        <div class="text-slate-300 mb-3">${processedDescription}</div>
        ${headers.length > 0 ? `
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-slate-600">
                        ${headerHtml}
                    </tr>
                </thead>
                <tbody>
                    ${rowHtml}
                </tbody>
            </table>
        </div>` : ''}
    `;
};

export const RULES = [
    {
        name: "Estupidez",
        englishName: "Stupidity",
        aliases: ["Stupidity", "Estupidez"],
        rules: createRuleTable(
            "Las miniaturas estúpidas deben efectuar un chequeo al inicio de su turno para ver si superan su estupidez. Tienes que efectuar un chequeo por cada una de las miniaturas afectadas por la estupidez. Si supera el chequeo obteniendo su valor de Liderazgo o menos en 2D6, todo va bien: la criatura se comporta de forma razonablemente inteligente y el jugador puede moverla y combatir con ella de la forma habitual.<br><br>Si no se supera el chequeo, las cosas no van bien. Hasta el inicio de su siguiente turno (cuando efectúe un nuevo chequeo de Estupidez), la miniatura no puede lanzar hechizos ni combatir en combate cuerpo a cuerpo (aunque sus oponentes deberán tirar para impactarle de la forma habitual).<br><br>Si una miniatura que no supera el chequeo de estupidez no está trabada en combate cuerpo a cuerpo, tira 1D6:",
            ["D6", "Resultado"],
            [
                {
                    cells: ["1-3", ""],
                    content: ["El guerrero avanza en línea recta a mitad de su capacidad de movimiento con un paso vacilante. No puede cargar contra ningún enemigo (detén su movimiento a 2,5 cm (1\") de cualquier enemigo con el que hubiera entrado en contacto). Puede caerse por el borde de un precipicio (consulta la regla sobre Caídas) o golpearse contra un obstáculo, en cuyo caso se detiene. La miniatura no puede disparar durante este turno."],
                    border: true
                },
                {
                    cells: ["4-6", ""],
                    content: ["El guerrero se queda quieto y babea un poco durante este turno. No puede hacer nada más, ya que babear requiere de toda su atención."],
                    border: false
                }
            ],
            [{ rule: "Caídas", pattern: "Caídas", text: "Caídas" }]
        )
    },
    {
        name: "Animosidad",
        englishName: "Animosity",
        aliases: ["Animosity", "Animosidad"],
        rules: createRuleTable(
            "A los Orcos y a los Goblins nada les gusta más que una buena pelea; por desgracia, ¡no siempre eligen bien contra quién se pelean! Para representar esto, al inicio del turno del jugador Orco, tira 1D6 por cada Secuaz que sea Orco o Goblin. Un resultado de 1 significa que el guerrero se ha ofendido por algo que uno de sus compañeros ha dicho o hecho. No tires por miniaturas que ya estén trabadas en combate cuerpo a cuerpo (¡ya están peleando!). Para averiguar cómo de ofendido está el guerrero, tira otro 1D6 y consulta la siguiente tabla:",
            ["D6", "Resultado"],
            [
                {
                    cells: ["1", ""],
                    title: "¡He Oído Eso!",
                    expandableContent: createSpecialRuleText("Si hay un Secuaz o Espada de Alquiler Orco o Goblin amigo a distancia de Carga (si hay varios objetivos al alcance, elige el más cercano), el guerrero ofendido cargará inmediatamente y luchará una ronda de combate cuerpo a cuerpo contra el origen de su ira. Al final de esta ronda de combate, las miniaturas se separarán inmediatamente 2,5 cm (1\") y ya no contarán como trabadas en combate cuerpo a cuerpo (a menos que una de ellas falle otro chequeo de Animosidad y obtenga este resultado de nuevo).<br><br>Si no hay Secuaces o Espadas de Alquiler Orcos o Goblins amigos al alcance de carga, y el guerrero está equipado con un arma de proyectiles, disparará inmediatamente contra el Secuaz o Espada de Alquiler Orco o Goblin amigo más cercano. Si nada de lo anterior es aplicable, o si la miniatura amiga más cercana es un Héroe Orco, el guerrero actuará como si hubiera obtenido un 2-5 en esta tabla. En cualquier caso, el guerrero en cuestión no podrá realizar ninguna otra acción este turno, aunque podrá defenderse si es atacado en combate cuerpo a cuerpo.", ["Cargas"]),
                    border: true
                },
                {
                    cells: ["2-5", ""],
                    title: "¿Qué Has Dicho?",
                    expandableContent: "No puede hacer nada más durante este turno, aunque puede defenderse si es atacado en combate cuerpo a cuerpo.",
                    border: true
                },
                {
                    cells: ["6", ""],
                    title: "¡Ahora Verás!",
                    expandableContent: createSpecialRuleText("Esta miniatura debe moverse lo más rápido posible hacia la miniatura enemiga más cercana, cargando en combate cuerpo a cuerpo si es posible. Si no hay miniaturas enemigas a la vista, el guerrero Orco o Goblin puede realizar un movimiento normal inmediatamente. Este movimiento es adicional a su movimiento normal en la fase de Movimiento, por lo que podrá moverse dos veces en un solo turno si lo deseas.<br><br>Si el movimiento adicional sitúa al guerrero a distancia de Carga de una miniatura enemiga, deberá cargar en combate cuerpo a cuerpo durante su fase de movimiento normal.", ["Cargas"]),
                    border: false
                }
            ]
        )
    },
    {
        name: "Odio",
        englishName: "Hatred",
        aliases: ["Hatred", "Odio"],
        rules: createRuleTable(
            "Los guerreros que combaten contra enemigos a los que odian en combate cuerpo a cuerpo pueden repetir cualquier tirada para impactar fallida durante el primer turno de cada combate cuerpo a cuerpo.<br><br>Este modificador sólo se aplica en el primer turno de cada combate, y representa al guerrero desahogando su odio acumulado contra su enemigo.<br><br>Tras la ronda inicial de combate cuerpo a cuerpo, pierde algo de ímpetu y a partir de ese momento combate de la forma habitual durante el resto del combate.",
            [],
            []
        )
    },
    {
        name: "Cobertura",
        englishName: "Cover",
        aliases: ["Cover", "Cobertura"],
        rules: createRuleTable(
            "Las numerosas ruinas, muros derruidos y demás edificios de Mordheim ofrecen multitud de coberturas. Si cualquier parte del objetivo está oculta por un elemento de escenografía o por otra miniatura, el guerrero que dispara sufrirá una penalización como se explica a continuación.<br><br>A veces resulta evidente si un objetivo puede verse o no; otras veces resulta más difícil, ya que los edificios y otros elementos de escenografía se interponen en la línea de visión. Si el tirador sólo puede ver parte del cuerpo del objetivo, éste se encuentra a cubierto y el tirador sufrirá un penalizador de -1 a su tirada Para Impactar.<br><br>Si un disparo falla su objetivo por 1 punto, y dicho objetivo se beneficiaba del modificador de -1 por cobertura, el disparo impactará en la cobertura. Normalmente esto no tendrá trascendencia alguna, pero en el caso de que una miniatura se halle oculta tras otro guerrero, o cuando la cobertura sea un barril de pólvora, ¡puede llegar a ser sumamente importante!",
            [],
            []
        )
    },
    {
        name: "Furia Asesina",
        englishName: "Frenzy",
        aliases: ["Frenzy", "Furia Asesina"],
        rules: createRuleTable(
            createSpecialRuleText("Las miniaturas presas de la furia asesina deben siempre Cargar si hay algún enemigo a distancia de carga (compruébalo una vez se hayan declarado las cargas). El jugador no tiene opción en este aspecto: el guerrero declarará automáticamente una carga.<br><br>Los guerreros en estado de furia asesina luchan con el doble de sus atributos de Ataques en combate cuerpo a cuerpo. Por tanto, los guerreros con 1 Ataque tienen 2 Ataques, los guerreros con 2 Ataques tienen 4, etc. Si un guerrero lleva un arma en cada mano, recibe el modificador de +1 Ataque de la forma habitual. Este Ataque adicional no se multiplica por dos.<br><br>Una vez que están a distancia de carga, los guerreros en estado de furia asesina son inmunes a todos los demás efectos psicológicos, como el Miedo y similares, y no deben efectuar estos chequeos mientras permanezcan a distancia de carga.<br><br>Si una miniatura en estado de furia asesina es Derribada o Aturdida, pierde la furia asesina. Continuará luchando de la forma habitual durante el resto de la batalla.",
                [
                    { rule: "Miedo", pattern: "Miedo", text: "Miedo" },
                    { rule: "Derribado", pattern: "Derribada", text: "Derribada" },
                    { rule: "Aturdido", pattern: "Aturdida", text: "Aturdida" },
                    { rule: "Cargas", pattern: "Cargar", text: "Cargar" }
                ]
            ),
            [],
            []
        )
    },
    {
        name: "Hostigar a las Bestias",
        englishName: "Goading",
        aliases: ["Goading", "Hostigar a las Bestias", "Hostigar"],
        rules: createRuleTable(
            "Hostigar a las bestias guarda ciertas similitudes con el Lanzamiento de Hechizos, pero funciona de forma distinta. Los intentos de hostigar se realizan al principio del turno del Clan Moulder, antes de realizar cualquier movimiento. El Señor de las Bestias y sus Aprendices pueden intentar hostigar a cualquier miniatura individual o grupo de secuaces de bestias (Ratas Gigantes, Ratas Lobo o Ratas Ogro) de su propia banda que se encuentren a 15 cm (6\") o menos al empezar el turno. Para hostigar a un grupo de secuaces, al menos la mitad de sus miembros deben estar a 15 cm.<br><br>Para lograrlo, deben superar un chequeo de dificultad del mismo modo que si lanzaran un hechizo o plegaria (obtener un resultado igual o superior a la Dificultad en 2D6), dependiendo la dificultad del tipo de criatura:<br>Rata Gigante – Dificultad 6<br>Rata Lobo – Dificultad 8<br>Rata Ogro – Dificultad 10<br><br>Si se supera el chequeo, tira 1D6 en la tabla inferior (si se obtiene un doble 6, puedes elegir el efecto en lugar de tirar). Si se falla el chequeo, la bestia o grupo se confunde y debe efectuar inmediatamente un chequeo de Estupidez según las reglas normales; si se falla con un doble 1, las bestias se enfurecen y se vuelven contra su amo: muévelas de inmediato a contacto peana con peana con el personaje y resuelve un ataque contra él por cada bestia objetivo (volverán al control del jugador al inicio de su siguiente turno).",
            ["D6", "Resultado"],
            [
                {
                    cells: ["1-2", ""],
                    title: "Aullido",
                    expandableContent: "La bestia o grupo debe correr durante la fase de Movimiento, pudiendo moverse hasta el triple de su movimiento normal en vez del doble, e ignorando si hay enemigos a 20 cm (8\") al iniciar el movimiento.",
                    border: true
                },
                {
                    cells: ["3-4", ""],
                    title: "Gruñido",
                    expandableContent: createSpecialRuleText("Si hay un enemigo en la Línea de Visión de la bestia o grupo, deben intentar Cargar contra él (si hay varios enemigos, el jugador elige el objetivo) moviéndose al triple de su movimiento en vez del doble. Se aplican las reglas normales de carga, excepto que se mueven tan rápido que no pueden ser Interceptadas.", [
                        { rule: "Cargas", pattern: "Cargar", text: "Cargar" },
                        { rule: "Interceptar", pattern: "Interceptadas", text: "Interceptadas" }
                    ]),
                    border: true
                },
                {
                    cells: ["5-6", ""],
                    title: "¡Rugido!",
                    expandableContent: createSpecialRuleText("La bestia o grupo queda sujeta a Furia Asesina y Odio (hacia todas las miniaturas de la banda rival) hasta el inicio del siguiente turno del jugador Moulder.", ["Furia Asesina", "Odio"]),
                    border: false
                }
            ],
            [{ rule: "Estupidez", pattern: "Estupidez", text: "Estupidez" }]
        )
    },
    {
        name: "Miedo",
        englishName: "Fear",
        aliases: ["Fear", "Miedo"],
        rules: createRuleTable(
            createSpecialRuleText("El miedo es una reacción natural ante las criaturas enormes o de aspecto inquietante. Debe efectuarse un chequeo de miedo (o sea, un chequeo de Liderazgo) en las siguientes situaciones. Ten en cuenta que las criaturas que causan miedo ignoran estos chequeos.<br><br><b>Si la miniatura es cargada por un guerrero o una criatura que causa miedo:</b><br><br>Si un guerrero es cargado por un enemigo al que tiene miedo, debe efectuar un chequeo para superar ese miedo. Efectúa el chequeo cuando se declare la Carga y se determine que está dentro del alcance. Si la miniatura supera el chequeo, puede combatir de forma normal. Si no lo supera, el guerrero necesitará resultados de 6 para lograr impactos en esa ronda de combate.<br><br><b>Si la miniatura desea cargar contra un enemigo que causa miedo:</b><br><br>Si un guerrero desea cargar contra un enemigo al que tiene miedo, debe efectuar un chequeo para superarlo. Si no lo supera, la miniatura no puede cargar y debe permanecer inmóvil durante ese turno. Considera esta situación como una carga fallida.",
                [
                    { rule: "Liderazgo", pattern: "Liderazgo", text: "Liderazgo" },
                    { rule: "Cargas", pattern: "Carga", text: "Carga" }
                ]
            ),
            [],
            []
        )
    },
    {
        name: "Solo ante el Peligro",
        englishName: "All-Alone",
        aliases: ["All-Alone", "All Alone", "Solo ante el peligro", "Solo ante el Peligro"],
        rules: createRuleTable(
            createSpecialRuleText("Estar solo y superado en número es una situación un tanto desesperante para cualquier guerrero.<br><br>Si tu guerrero está combatiendo él solo contra dos o más enemigos y no hay ninguna miniatura amiga a 15 cm (6\") o menos (las miniaturas amigas Derribadas, Aturdidas o huyendo no cuentan), debes efectuar un chequeo al finalizar su fase de combate. El chequeo se realiza contra el atributo de Liderazgo del guerrero en 2D6. Si el resultado de la tirada de dados es igual o inferior a su Liderazgo, aguanta el tipo. Si el resultado es superior a su Liderazgo, el guerrero se retira del combate y huye. Cada uno de sus oponentes logra un impacto automático contra él cuando se da la vuelta para huir. Si la miniatura sobrevive, corre 5D6 cm (2D6\") en dirección contraria, alejándose directamente de sus enemigos.<br><br>Al inicio de cada uno de sus turnos, el guerrero debe efectuar otro chequeo de Liderazgo. Si lo supera, se detiene pero no puede hacer nada más durante ese turno, excepto lanzar hechizos. Si no lo supera o cargan contra él (Carga), corre otros 5D6 cm (2D6\") hacia el borde de la mesa más cercano, esquivando a cualquier miniatura enemiga. Si llega al borde de la mesa antes de que recupere los nervios, es retirado del combate.<br><br>Si un guerrero es cargado mientras huye, el guerrero que carga se pone en contacto peana con peana de la forma habitual, pero el guerrero que huye corre otros 5D6 cm (2D6\") hacia el borde de la mesa antes de que se pueda lanzar ningún golpe.",
                [
                    { rule: "Derribado", pattern: "Derribadas", text: "Derribadas" },
                    { rule: "Aturdido", pattern: "Aturdidas", text: "Aturdidas" },
                    { rule: "Liderazgo", pattern: "Liderazgo", text: "Liderazgo" },
                    { rule: "Cargas", pattern: "Carga", text: "Carga" }
                ]
            ),
            [],
            []
        )
    },
    {
        name: "El Chequeo de Retirada",
        englishName: "Rout",
        aliases: ["Rout", "Rout Test", "Retirada", "Chequeo de Retirada", "El Chequeo de Retirada"],
        rules: createRuleTable(
            "Un jugador debe efectuar un chequeo de retirada al inicio de su turno si una cuarta parte (25%) o más de su banda está fuera de combate. Por ejemplo, en una banda compuesta por doce guerreros, será necesario efectuar un chequeo de retirada si tres o más de sus guerreros están fuera de combate. Incluso las bandas que normalmente son inmunes a psicología (como por ejemplo los No Muertos) deben efectuar chequeos de retirada.<br><br>Si no se supera el chequeo de retirada, la banda pierde automáticamente la batalla. La partida finaliza inmediatamente, y los guerreros supervivientes se retiran de la zona. Un chequeo de retirada no superado es la causa más común de que un combate finalice.<br><br>Para efectuar un chequeo de retirada tira 2D6. Si el resultado es igual o menor que el atributo de Liderazgo del jefe de la banda, el jugador ha superado el chequeo y puede continuar luchando.<br><br>Si el jefe de la banda está fuera de combate o aturdido, entonces el jugador no puede utilizar su Liderazgo para efectuar el chequeo de retirada. En vez de ello, debes utilizar el atributo de Liderazgo más elevado de entre los restantes guerreros que no estén aturdidos o fuera de combate.<br><br><b>Retirada Voluntaria:</b><br><br>Un jugador puede retirarse voluntariamente de la batalla al inicio de cualquiera de sus turnos si lo desea, pero únicamente si ya estaba obligado a efectuar un chequeo de retirada o si una cuarta parte (25%) o más de su banda está fuera de combate.",
            [],
            [],
            [
                { rule: "Liderazgo", pattern: "Liderazgo", text: "Liderazgo" },
                { rule: "Aturdido", pattern: "aturdido", text: "aturdido" }
            ]
        )
    },
    {
        name: "Lanzamiento de Hechizos",
        englishName: "Casting Spells",
        aliases: ["Casting Spells", "Lanzamiento de Hechizos", "Lanzar Hechizos", "Hechizos"],
        rules: createRuleTable(
            "Los hechizos se lanzan durante la fase de disparo, y pueden utilizarse incluso si el lanzador se encuentra trabado en combate cuerpo a cuerpo. Para utilizar un hechizo, el hechicero debe obtener un resultado igual o mayor que la Dificultad del hechizo en 2D6. Si no lo supera, no podrá lanzar ningún hechizo durante ese turno. Si supera el chequeo, el hechizo surte efecto tal y como se describe en sus reglas.<br><br>Un hechicero puede lanzar un único hechizo por turno y no puede utilizar armas de proyectiles si desea lanzar un hechizo. ¡Sin embargo, sí que puede correr!<br><br>Un hechicero no puede utilizar magia si lleva cualquier tipo de armadura o si porta un escudo o una rodela. La única excepción a esta regla son las Plegarias de Sigmar: las Hermanas de Sigmar y los Sacerdotes Guerreros pueden llevar armaduras y escudos y continuar usando sus plegarias normalmente.",
            [],
            []
        )
    },
    {
        name: "Líder",
        englishName: "Leader",
        aliases: ["Leader", "Líder", "Jefe"],
        rules: createRuleTable(
            "Un guerrero a 15 cm (6\") o menos del jefe de la banda puede utilizar el Liderazgo del jefe cuando deba efectuar un chequeo de Liderazgo. Esto representa la habilidad del jefe de animar a sus guerreros y llevarlos más allá de sus límites normales.<br><br>Un jefe no puede otorgar este modificador si está Derribado, Aturdido, fuera de combate o si él mismo está huyendo. Desde luego, ¡la visión de tu jefe corriendo a esconderse no es precisamente inspiradora!",
            [],
            [],
            [
                { rule: "Liderazgo", pattern: "Liderazgo", text: "Liderazgo" },
                { rule: "Derribado", pattern: "Derribado", text: "Derribado" },
                { rule: "Aturdido", pattern: "Aturdido", text: "Aturdido" }
            ]
        )
    },
    {
        name: "Liderazgo",
        englishName: "Leadership",
        aliases: ["Leadership", "Liderazgo"],
        rules: createRuleTable(
            "Los chequeos basados en el atributo de Liderazgo se efectúan de forma ligeramente distinta a otros atributos. Para realizar un chequeo de Liderazgo, debes tirar dos dados (2D6) y sumar sus resultados. Si la suma total es igual o inferior al atributo de Liderazgo de la miniatura, el chequeo se ha superado con éxito.",
            [],
            []
        )
    },
    {
        name: "Caídas",
        englishName: "Falling",
        aliases: ["Falling", "Caídas", "Caída"],
        rules: createRuleTable(
            "Una miniatura que se cae sufre 1D3 impactos de una Fuerza igual a la distancia en pulgadas (o dividida por 2,5 en cm) desde la que haya caído (por ejemplo, si cae desde 10 cm / 4\", sufrirá 1D3 impactos de Fuerza 4). No se puede aplicar ninguna tirada de salvación por armadura. Las caídas no causan impactos críticos.<br><br>Una miniatura que se cae no puede seguir moviéndose ni puede ocultarse durante ese turno, incluso si no ha sufrido ninguna herida.",
            [],
            []
        )
    },
    {
        name: "Cargar de un Salto",
        englishName: "Diving Charge",
        aliases: ["Diving Charge", "Cargar de un Salto"],
        rules: createRuleTable(
            createSpecialRuleText("Un guerrero puede cargar de un salto contra cualquier miniatura enemiga que esté en un nivel más bajo que donde él se halla (por ejemplo, desde un balcón o tejado) y a 5 cm (2\") o menos del punto donde aterriza.<br><br>Efectúa un Chequeo de Iniciativa por cada 5 cm (2\") de altura completos que el guerrero baje de un salto, hasta una altura máxima de 15 cm (6\"), igual que en un salto normal. Si falla cualquiera de los chequeos, la miniatura se cae y sufre daño por Caídas, no puede mover más durante esa fase de movimiento y no puede cargar contra el enemigo.<br><br>Si supera todos los chequeos, la miniatura recibe un modificador de +1 a la Fuerza y de +1 a la tirada para impactar durante la primera fase de combate cuerpo a cuerpo siguiente.",
                [
                    { rule: "Caídas", pattern: "Caídas", text: "Caídas" },
                    { rule: "Chequeo de Iniciativa", pattern: "Chequeo de Iniciativa", text: "Chequeo de Iniciativa" },
                    { rule: "Cargas", pattern: "cargar", text: "cargar" }
                ]
            ),
            [],
            []
        )
    },
    {
        name: "Saltar por Encima de Huecos",
        englishName: "Jump Over Gaps",
        aliases: ["Jump Over Gaps", "Saltar por Encima de Huecos", "Saltar Huecos", "Saltar Obstáculos"],
        rules: createRuleTable(
            createSpecialRuleText("Las miniaturas pueden pasar de un salto los huecos entre edificios y pasarelas hasta una distancia máxima de 8 cm (3\"). Deduce la distancia saltada del movimiento de la miniatura, pero recuerda que no puedes medir la distancia de antemano.<br><br>Si a tu miniatura no le queda movimiento suficiente para cubrir la distancia, caerá automáticamente. Si la miniatura puede cubrir la distancia, debe superar un Chequeo de Iniciativa o se caerá (consulta la regla sobre Caídas).<br><br>Una miniatura puede saltar por encima de un hueco y disparar un arma de proyectiles si no está corriendo. También puede saltar como parte de su movimiento de Carga o de carrera.",
                [
                    { rule: "Caídas", pattern: "Caídas", text: "Caídas" },
                    { rule: "Chequeo de Iniciativa", pattern: "Chequeo de Iniciativa", text: "Chequeo de Iniciativa" },
                    { rule: "Cargas", pattern: "Carga", text: "Carga" }
                ]
            ),
            [],
            []
        )
    },
    {
        name: "Cargas",
        englishName: "Charge",
        aliases: ["Charge", "Cargas", "Carga"],
        rules: createRuleTable(
            createSpecialRuleText("Si deseas que una miniatura trabe combate cuerpo a cuerpo con el enemigo, debes realizar un movimiento especial denominado carga. Sin medir la distancia que las separa, declara la miniatura que va a cargar y a qué miniatura enemiga va a atacar.<br><br>Puedes cargar contra cualquier miniatura enemiga hacia la que puedas trazar una línea recta sin obstáculos desde tu guerrero. Si tu guerrero desea cargar contra un enemigo a 10 cm (4\") o menos al que no puede ver (por ejemplo, tras una esquina) pero que no ha sido declarado como oculto, debe superar un Chequeo de Iniciativa para detectarlo; si falla, no podrá cargar ese turno, pero podrá mover su distancia normal, disparar y lanzar hechizos.<br><br>Una carga se realiza al doble del atributo de Movimiento, finalizando con el atacante moviéndose por la ruta más directa hasta ponerse en contacto peana con peana con la miniatura enemiga. Una vez las peanas están en contacto, se consideran trabadas en combate cuerpo a cuerpo. También se consideran trabadas si están separadas por un muro bajo o una barandilla donde resulte imposible tocarse físicamente.<br><br>Si una miniatura enemiga libre (no trabada en combate) se encuentra a 5 cm (2\") o menos de la ruta de carga, puede decidir Interceptar al que carga si lo desea.<br><br>Si has calculado mal la distancia y el guerrero no llega a alcanzar a su objetivo, mueve a tu guerrero su distancia de movimiento normal hacia el enemigo: esto se considera una carga fallida. La miniatura no puede disparar en ese turno, pero puede lanzar hechizos normalmente.<br><br>Las miniaturas sólo pueden trabarse en combate cuerpo a cuerpo mediante una carga: cualquier movimiento que ponga a un guerrero en combate es por definición una carga. Una miniatura que carga Ataca Primero en la primera ronda del combate subsiguiente.",
                [
                    { rule: "Interceptar", pattern: "Interceptar", text: "Interceptar" },
                    { rule: "Chequeo de Iniciativa", pattern: "Chequeo de Iniciativa", text: "Chequeo de Iniciativa" },
                    { rule: "Atacar Primero", pattern: "Ataca Primero", text: "Ataca Primero" }
                ]
            ),
            [],
            []
        )
    },
    {
        name: "Interceptar",
        englishName: "Intercept",
        aliases: ["Intercept", "Interceptar", "Intercepción"],
        rules: createRuleTable(
            createSpecialRuleText("Sólo una miniatura enemiga puede intentar interceptar a cada guerrero que cargue.<br><br>Si el guerrero que intercepta normalmente requeriría un chequeo de Miedo para trabarse con el atacante, debe superarlo para que se le permita interceptar; si falla, no se moverá. Si el guerrero que intercepta es quien causa miedo, mueve las miniaturas a contacto peana con peana y efectúa un chequeo de Miedo para el que cargaba originalmente, como si fuese él quien estuviese siendo cargado. Independientemente del resultado de este chequeo, el que cuenta como que ha cargado en la siguiente ronda de combate sigue siendo el atacante original, no el guerrero interceptor.",
                [{ rule: "Miedo", pattern: "Miedo", text: "Miedo" }]
            ),
            [],
            []
        )
    },
    {
        name: "Chequeo de Iniciativa",
        englishName: "Initiative Test",
        aliases: ["Initiative Test", "Chequeo de Iniciativa", "Chequeos de Atributos", "Chequeo de Atributo"],
        rules: createRuleTable(
            "A menudo durante una partida se requerirá que una miniatura efectúe un chequeo basado en uno de sus propios atributos (como la Iniciativa). Para superar dicho chequeo, el jugador debe tirar 1D6 y obtener un resultado igual o menor al valor del atributo en cuestión.<br><br>Ten en cuenta que si obtienes un resultado de 6 en el dado, fallas automáticamente el chequeo con independencia de cuál sea el valor del atributo de la miniatura.",
            [],
            []
        )
    },
    {
        name: "Ocultación",
        englishName: "Hiding",
        aliases: ["Hiding", "Ocultación", "Esconderse", "Ocultarse", "Oculto"],
        rules: createRuleTable(
            createSpecialRuleText("La regla de Ocultación representa a los guerreros agazapándose y aprovechando el terreno de una forma que las miniaturas rígidas no pueden mostrar. Un guerrero oculto permanece lo más quieto posible, echando sólo un vistazo por encima de su cobertura.<br><br>Una miniatura puede esconderse si finaliza su movimiento tras un muro bajo, una columna o en una posición similar donde pueda cubrirse razonablemente. El jugador debe declarar que el guerrero se está escondiendo y colocar un marcador de Oculto junto a la miniatura para que cuente como escondida.<br><br>Una miniatura que corre, huye, está Aturdida o realiza una Carga no puede esconderse en ese turno: su velocidad repentina no le da tiempo a ocultarse.<br><br>Una miniatura puede permanecer escondida a lo largo de varios turnos mientras permanezca tras una cobertura. Incluso puede moverse despacio siempre que se mantenga oculta mientras lo hace. Si un enemigo se desplaza hasta una posición desde la que pueda ver al guerrero, la miniatura deja de estar oculta y se retira el marcador.<br><br>Mientras está oculta, una miniatura no puede ser vista, ni ser blanco de disparos ni ser cargada.<br><br>Mientras se esconde, la miniatura no puede disparar ni lanzar hechizos sin delatar su posición. Si dispara o se mueve hacia donde pueda ser vista, deja de estar oculta.<br><br>Una miniatura no puede ocultarse si está demasiado cerca de un enemigo: será vista u oída sin importar lo bien oculta que esté. Los guerreros enemigos siempre detectarán a enemigos ocultos a una distancia en pulgadas igual a su valor de Iniciativa (o multiplicada por 2,5 en centímetros). Así, un guerrero con Iniciativa 3 detectará automáticamente a todos los enemigos ocultos a 7,5 cm (3\") o menos.",
                [
                    { rule: "Aturdido", pattern: "Aturdida", text: "Aturdida" },
                    { rule: "Cargas", pattern: "Carga", text: "Carga" },
                    { rule: "Cobertura", pattern: "cobertura", text: "cobertura" }
                ]
            ),
            [],
            []
        )
    },
    {
        name: "Atacar Primero",
        englishName: "Strike First",
        aliases: ["Strike First", "Atacar Primero"],
        rules: createRuleTable(
            createSpecialRuleText("En ocasiones, a una miniatura se le permite 'atacar primero' por algún motivo especial. El caso más habitual es que haya realizado una Carga en ese turno, pero ciertas armas (como las lanzas), habilidades o hechizos producen este mismo efecto.<br><br>Si sólo una miniatura tiene derecho a atacar primero, atacará antes que nadie y el resto de contendientes lucharán en orden descendente de Iniciativa.<br><br>Si hay varias miniaturas que tienen derecho a atacar primero, el orden de combate entre ellas se determina por su atributo de Iniciativa. Una vez que todas las miniaturas con derecho a atacar primero hayan combatido, los demás guerreros trabados combatirán en orden normal de Iniciativa.",
                [{ rule: "Cargas", pattern: "Carga", text: "Carga" }]
            ),
            [],
            []
        )
    },
    {
        name: "Parada",
        englishName: "Parry",
        aliases: ["Parry", "Parada"],
        rules: createRuleTable(
            "Las rodelas son escudos pequeños que no mejoran la tirada de salvación por armadura, pero permiten parar ataques. Las espadas también se utilizan para parar ataques enemigos.<br><br>Cuando un oponente logra un impacto, los guerreros equipados con rodelas o espadas pueden intentar parar el golpe.<br><br>Tira 1D6. Si el resultado es superior al resultado que tu oponente obtuvo en su tirada para impactar, la rodela o espada ha parado el ataque. Por tanto, ten en cuenta que es imposible parar un golpe que haya obtenido un 6 en la tirada para impactar.<br><br>Una rodela o espada sólo puede detener un ataque por fase de combate cuerpo a cuerpo. Un golpe que ha sido parado no tiene efecto alguno y es ignorado. Si tu oponente logra varios impactos, tienes que intentar superar el resultado más alto (si el resultado más alto es un 6, pierdes automáticamente la oportunidad de parar los ataques de ese oponente). Si una miniatura está combatiendo contra varios oponentes, sólo puede parar los ataques del enemigo que logre el primer impacto (o sea, el atacante con la Iniciativa más alta). En caso de empate en Iniciativa, tira un dado para decidir quién ataca primero.<br><br>Si tu miniatura está armada con una rodela y una espada, puedes repetir una vez cualquier tirada de parada fallida. Una miniatura armada con dos espadas sólo puede tirar una vez.<br><br>Una miniatura no puede parar ataques realizados por criaturas con una Fuerza igual o superior al doble de su propia Fuerza básica: son simplemente demasiado poderosos para ser detenidos.",
            [],
            []
        )
    },
    {
        name: "Derribado",
        englishName: "Knocked Down",
        aliases: ["Knocked Down", "Derribado", "Derribada"],
        rules: createRuleTable(
            "Las miniaturas derribadas pueden arrastrarse hasta 5 cm (2\") durante su fase de movimiento, pero no pueden combatir en combate cuerpo a cuerpo, disparar ni lanzar hechizos. Si está en contacto peana con peana con un enemigo, una miniatura derribada sólo puede arrastrarse si dicho enemigo está trabado en combate con otro oponente; de lo contrario, debe permanecer donde está. En combate cuerpo a cuerpo no puede responder a los ataques y el enemigo tendrá muchas posibilidades de dejarla fuera de combate.<br><br>Un guerrero que ha sido derribado puede ponerse en pie al inicio de su siguiente turno. En ese turno puede mover a la mitad de su velocidad normal, disparar y lanzar hechizos; no puede Cargar ni correr. Si está trabado en combate cuerpo a cuerpo, no puede alejarse y atacará automáticamente en último lugar, independientemente de sus armas o su Iniciativa.<br><br>Si un guerrero enemigo ataca a una miniatura que está derribada, puede intentar rematarla: todos los ataques contra un guerrero derribado impactan automáticamente. Si cualquiera de los ataques hiere al guerrero derribado y éste falla su tirada de salvación por armadura, queda automáticamente Fuera de Combate. Una miniatura derribada no puede parar ataques.",
            [],
            [],
            [
                { rule: "Cargas", pattern: "Cargar", text: "Cargar" },
                { rule: "Parada", pattern: "parar", text: "parar" }
            ]
        )
    },
    {
        name: "Aturdido",
        englishName: "Stunned",
        aliases: ["Stunned", "Aturdido", "Aturdida"],
        rules: createRuleTable(
            createSpecialRuleText("Un combatiente que está aturdido no puede hacer absolutamente nada. El jugador puede colocar la miniatura boca arriba en su siguiente fase de recuperación, pasando a considerarse Derribado a partir de ese momento.<br><br>Un guerrero aturdido está completamente a merced de sus enemigos. Una miniatura aturdida queda Fuera de Combate automáticamente si un enemigo puede atacarla en combate cuerpo a cuerpo.",
                [{ rule: "Derribado", pattern: "Derribado", text: "Derribado" }]
            ),
            [],
            []
        )
    },
    {
        name: "Fuera de Control",
        englishName: "Out of Control",
        aliases: ["Out of Control", "Fuera de Control"],
        rules: createRuleTable(
            "Para carros y carromatos que deban tirar en la tabla de Fuera de Control:",
            ["D6", "Resultado"],
            [
                {
                    cells: ["1-3", ""],
                    title: "Bandazo",
                    expandableContent: "El conductor pierde temporalmente el control y el carromato se desvía bruscamente. Tira 1D6:<br><br>1-3: Se desvía 45 grados hacia la izquierda.<br>4-6: Se desvía 45 grados hacia la derecha.<br><br>El vehículo se mueve otros 15 cm (6\") en esa dirección.",
                    border: true
                },
                {
                    cells: ["4-5", ""],
                    title: "Desbocado",
                    expandableContent: createSpecialRuleText("Los tiros se desbocan y el conductor pierde el control. En cada turno, determina al azar la dirección hacia la que avanza. Tira 1D6:<br><br>1-2: Se desvía 45 grados a la izquierda.<br>3-4: Se desvía 45 grados a la derecha.<br>5-6: Avanza en línea recta.<br><br>El vehículo se moverá siempre a toda velocidad aplicando el látigo e ignorando los resultados de 1 mientras esté desbocado. En cada turno, el conductor puede intentar superar un chequeo de Liderazgo para recuperar el control de las bestias. Los ocupantes no pueden disparar armas de proyectiles mientras el carromato esté desbocado, ya que deben agarrarse para no caer.", ["Liderazgo"]),
                    border: true
                },
                {
                    cells: ["6", ""],
                    title: "Pérdida de Control Total",
                    expandableContent: "El carromato se descontrola de forma catastrófica. Tira 1D6:<br><br>1: Gira 45 grados a la derecha.<br>2: Gira 45 grados a la izquierda.<br>3-4: Se detiene en seco inmediatamente.<br>5: El enganche se rompe y los animales salen huyendo. El vehículo avanza 15 cm (6\") en línea recta y se detiene definitivamente sin poder volver a mover.<br>6: ¡El carromato vuelca o choca contra una roca! Se desplaza 1D6\" en una dirección aleatoria (determinada con el dado de dispersión). Cualquier miniatura con la que colisione sufre daño de colisión habitual. Todos los tripulantes y bestias de tiro sufren 1D3 impactos de Fuerza 4. El vehículo queda destruido.",
                    border: false
                }
            ]
        )
    },
    {
        name: "¡Sooo, Chico!",
        englishName: "Whoa Boy",
        aliases: ["Whoa Boy", "Whoa Boy!", "¡Sooo, Chico!", "Sooo Chico"],
        rules: createRuleTable(
            "Si un guerrero montado pierde su última herida, el jugador debe tirar en la tabla de ¡Sooo, Chico! en sustitución de la tabla habitual de Heridas. Si se sufren impactos críticos, tira tantas veces como sea necesario aplicando el resultado más grave:",
            ["D6", "Resultado"],
            [
                {
                    cells: ["1-2", ""],
                    content: ["El jinete queda desorientado temporalmente y su montura se encabrita. El jinete logra mantenerse en la silla pero debe pasar su siguiente turno inmóvil recuperando el control, sin poder mover ni disparar. Si es atacado, trátalo como derribado."],
                    border: true
                },
                {
                    cells: ["3-4", ""],
                    content: ["El jinete cae de la montura y queda Aturdido, sufriendo un impacto adicional de F2 sin salvación por armadura. Además, tira 1D6: con 1-3, la montura huye inmediatamente 3D6\" (7,5D6 cm) en una dirección aleatoria hasta abandonar la mesa (podrá recuperarse tras la batalla); con 4-6, la montura permanece inmóvil y el guerrero podrá volver a montar en cuanto se recupere."],
                    border: true
                },
                {
                    cells: ["5-6", ""],
                    content: ["El jinete y su montura se estrellan contra el suelo. Ambos quedan automáticamente Fuera de Combate. Además, tira 1D6: con 1-2, la montura cae sobre el jinete aplastándolo; el guerrero deberá tirar dos veces en la tabla de Heridas Graves tras la batalla. Asimismo, tras la batalla tira 1D6: con 1-2 la montura queda tullida o muerta por la caída y se retira de la lista de la banda."],
                    border: false
                }
            ],
            [
                { rule: "Aturdido", pattern: "Aturdido", text: "Aturdido" },
                { rule: "Derribado", pattern: "derribado", text: "derribado" }
            ]
        )
    },
    {
        name: "Modificadores a la Salvación por Armadura",
        englishName: "Armour Save Modifiers",
        aliases: ["Armour Save Modifiers", "Modificadores a la Salvación por Armadura", "Modificadores a la Tirada de Salvación por Armadura"],
        rules: createRuleTable(
            "Algunas miniaturas son tan poderosas que las armaduras proporcionan una menor protección contra ellas.<br><br>Cuanto mayor sea la Fuerza de una criatura, con mayor facilidad podrá atravesar una armadura. La siguiente tabla te muestra la reducción que sufre la tirada de salvación por armadura del enemigo según la Fuerza del atacante.",
            ["Fuerza", "Modificador a la Salvación"],
            [
                {
                    cells: ["1-3", ""],
                    content: ["Ninguno"],
                    border: true
                },
                {
                    cells: ["4", ""],
                    content: ["-1"],
                    border: true
                },
                {
                    cells: ["5", ""],
                    content: ["-2"],
                    border: true
                },
                {
                    cells: ["6", ""],
                    content: ["-3"],
                    border: true
                },
                {
                    cells: ["7", ""],
                    content: ["-4"],
                    border: true
                },
                {
                    cells: ["8", ""],
                    content: ["-5"],
                    border: true
                },
                {
                    cells: ["9+", ""],
                    content: ["-6"],
                    border: false
                }
            ]
        )
    },
    {
        name: "Sin Dolor",
        englishName: "No Pain",
        aliases: ["No Pain", "Sin Dolor", "Inmune al dolor", "Immune to pain", "Sin dolor", "Dolor"],
        rules: createRuleTable(
            "Los guerreros con la regla <b>Sin Dolor</b> no sienten el dolor físico de la forma en que lo hacen los seres vivos comunes (como los No Muertos, autómatas o berserkers consagrados).<br><br>Cualquier resultado de <i>Aturdido</i> en la tabla de heridas se trata inmediatamente como un resultado de <i>Derribado</i>. Esto significa que el guerrero nunca queda aturdido ni pierde sus siguientes acciones de combate: en su siguiente fase de recuperación simplemente se pone en pie y puede actuar de forma completamente normal.",
            [],
            []
        )
    },
    {
        name: "Inmune a la Psicología",
        englishName: "Immune to Psychology",
        aliases: ["Immune to Psychology", "Inmune a la Psicología", "Inmune a la Psicologia", "Inmune a Psicología", "Immune", "Inmune", "Psicología", "Psicologia"],
        rules: createRuleTable(
            "Los guerreros inmunes a la psicología son completamente imperturbables ante los horrores que pueblan las ruinas de Mordheim.<br><br>No se ven afectados por las reglas de <b>Miedo</b>, <b>Terror</b>, <b>Pánico</b> ni las pruebas de <b>Solo ante el Peligro</b>. Además, no pueden entrar voluntariamente ni involuntariamente en <b>Furia Asesina</b> ni verse beneficiados por la regla <b>Odio</b>.",
            [],
            []
        )
    },
    {
        name: "Inmune al Veneno",
        englishName: "Immune to Poison",
        aliases: ["Immune to Poison", "Inmune al Veneno", "Inmune al veneno", "Inmune a los Venenos", "Veneno", "Venenos"],
        rules: createRuleTable(
            "El guerrero no se ve afectado por ningún tipo de veneno, toxina o ataque venenoso (como Loto Negro, Raíz de Mandrágora, ataques venenosos de Skavens o armas emponzoñadas). Cualquier ataque con veneno se resuelve contra él como un ataque normal sin reglas especiales de veneno.",
            [],
            []
        )
    },
    {
        name: "Inmune al Miedo",
        englishName: "Immune to Fear",
        aliases: ["Immune to Fear", "Inmune al Miedo", "Inmune al miedo", "Miedo"],
        rules: createRuleTable(
            "El guerrero supera automáticamente cualquier chequeo de Miedo que se le requiera realizar (por ejemplo al cargar contra una criatura que cause Miedo o al ser cargado por ella).",
            [],
            []
        )
    },
    {
        name: "Difícil de Matar",
        englishName: "Hard to Kill",
        aliases: ["Hard to Kill", "Difícil de Matar", "Dificil de Matar", "Heridas Graves"],
        rules: createRuleTable(
            "El guerrero es extraordinariamente resistente y aferrado a la vida. Cuando quede Fuera de Combate y su jugador deba tirar en la tabla de <b>Heridas Graves</b> tras la batalla, resta 1 al resultado obtenido en 1D66 (o en el dado de decenas según la tabla). Un resultado de 61-66 (Muerto) pasa a ser 51-56, salvando al héroe de una muerte inevitable.",
            [],
            []
        )
    },
    {
        name: "Cabeza Dura",
        englishName: "Hard Head",
        aliases: ["Hard Head", "Cabeza Dura", "Conmoción", "Conmocion"],
        rules: createRuleTable(
            "El guerrero tiene un cráneo especialmente grueso (o un entrenamiento férreo). Ignora la regla especial <b>Conmoción</b> causada por mazas, martillos u otras armas contundentes; por tanto, una tirada para herir de 2-4 se trata según las reglas normales de herida en lugar de causar automáticamente un resultado de Aturdido.",
            [],
            []
        )
    },
    {
        name: "Piel Escamosa",
        englishName: "Scaly Skin",
        aliases: ["Scaly Skin", "Piel Escamosa", "Armadura natural"],
        rules: createRuleTable(
            "El guerrero posee una gruesa capa de escamas, quitina o piel callosa que le otorga una tirada de salvación natural por armadura (generalmente especificada en su perfil, como 5+ o 6+). Esta salvación se puede combinar con escudos u otras protecciones de la forma habitual.",
            [],
            []
        )
    },
    {
        name: "Regeneración",
        englishName: "Regeneration",
        aliases: ["Regeneration", "Regeneración", "Regeneracion"],
        rules: createRuleTable(
            "Cada vez que el guerrero sufra una herida con éxito (antes de comprobar en la tabla de heridas), tira 1D6. Con un resultado de 4+, el tejido se regenera al instante y la herida es anulada por completo. Los ataques causados por fuego impiden la regeneración durante ese turno.",
            [],
            []
        )
    },
    {
        name: "Volar",
        englishName: "Fly",
        aliases: ["Fly", "Volar", "Vuelo", "Flight"],
        rules: createRuleTable(
            "La criatura se desplaza por los aires. Puede mover hasta 30 cm (12\") por turno ignorando cualquier elemento de escenografía, muros, edificios o miniaturas intermedias. Sin embargo, debe aterrizar al final de su movimiento sobre una superficie plana adecuada.",
            [],
            []
        )
    },
    {
        name: "Trepar",
        englishName: "Climb",
        aliases: ["Climb", "Trepar", "Escalar"],
        rules: createRuleTable(
            "El guerrero es un trepador nato. Puede ascender o descender por cualquier superficie vertical sin necesidad de realizar chequeos de Iniciativa para evitar caídas.",
            [],
            []
        )
    },
    {
        name: "No Puede Correr",
        englishName: "May not run",
        aliases: ["May not run", "Cannot run", "No puede correr", "Movimiento"],
        rules: createRuleTable(
            "El guerrero tiene un movimiento torpe o pesado (como los Zombis). No puede duplicar su atributo de Movimiento para correr, aunque sí puede declarar Cargas de forma normal.",
            [],
            []
        )
    },
    {
        name: "No Gana Experiencia",
        englishName: "Do not gain experience",
        aliases: ["Do not gain experience", "No gana experiencia", "Experiencia", "PX"],
        rules: createRuleTable(
            "Esta criatura o guerrero (como animales, bestias o constructos) nunca gana puntos de experiencia ni tira en la tabla de avances tras las batallas.",
            [],
            []
        )
    },
    {
        name: "Objetivo Grande",
        englishName: "Large Target",
        aliases: ["Large Target", "Objetivo Grande", "Blanco Grande"],
        rules: createRuleTable(
            "Cualquier miniatura que dispare con un arma de proyectiles contra un <b>Objetivo Grande</b> (como un Troll, Engendro del Caos o Rata Ogro) recibe un modificador de +1 a su tirada para impactar. Además, los Objetivos Grandes siempre pueden ser vistos por encima de miniaturas de tamaño humano estándar.",
            [],
            []
        )
    },
    {
        name: "Inflamable",
        englishName: "Flammable",
        aliases: ["Flammable", "Inflamable", "Vulnerable al Fuego", "Fuego"],
        rules: createRuleTable(
            "La criatura arde con gran facilidad (como momias o espantapájaros). Cualquier herida causada por fuego, llamas o hechizos ígneos se duplica automáticamente a 2 heridas en lugar de 1.",
            [],
            []
        )
    }
];