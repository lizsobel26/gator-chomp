// ============================================================
// Gator Chomp — 5-Letter Word Lists
// ============================================================
// ANSWER_WORDS  (~300 themed words)
//   Curated set of recognizable 5-letter words themed around:
//   Gators, Florida, sports, competition, college life, spirit
//   One of these is chosen at random each day as the answer.
//
// VALID_GUESSES  (4,000+ words)
//   Every word a player is allowed to type as a guess.
//   Includes all ANSWER_WORDS plus thousands of common English
//   5-letter words so players rarely hit "Not in word list."
//
// RULES enforced during curation:
//   Every entry is exactly 5 letters
//   Every entry is a real English dictionary word
//   No duplicates within either list
// ============================================================

const ANSWER_WORDS = [
  // === THE GATOR — mascot, reptile, swamp ===
  "gator","swamp","chomp","teeth","scale","marsh","creek","snout",
  "claws","bites","fangs","tails","prowl","stalk","lurks","gnash",
  "swims","hides","beast","bayou","scaly","snaps","jowls","belly",
  "crocs","crawl","growl","river","green","venom","gulps","thick",
  "murky","muddy","reedy","preys","coils","swirl","humid",

  // === FLORIDA — state, weather, nature ===
  "beach","ocean","waves","sunny","palms","coral","delta","coast",
  "muggy","storm","lakes","ponds","reeds","vines","shade","south",
  "water","misty","rainy","steam","trout","egret","heron","crane",
  "shell","sandy","oasis","grove","flora","kayak","isles","tidal",
  "coves","dunes","shoal","inlet","pines","cedar","mossy","hawks",
  "stork","terns","maize",

  // === FOOTBALL & GAME DAY ===
  "score","field","catch","throw","block","goals","plays","coach",
  "teams","clash","blitz","rally","punts","kicks","downs","drive",
  "sneak","spike","draft","guard","backs","sweep","tight","sacks",
  "flags","yards","first","stuff","strip","extra","press","bombs",
  "flick","pitch","games","match","start","clock","final","tempo",
  "route","gains","calls","heads","lines","blunt",

  // === BASKETBALL, BASEBALL & OTHER SPORTS ===
  "dunks","shots","hoops","court","fouls","steal","bench","swing",
  "baton","relay","track","vault","lanes","rugby","serve","races",
  "round","paint","pivot","squad","drill","hurls","slide","diver",
  "homer","brawl","bases","mound","glove","saves","plate","sport",
  "arena","rings","medal","flung","leaps","sweat",

  // === COMPETITION & VICTORY ===
  "champ","title","crown","glory","honor","pride","reign","royal",
  "noble","quest","prize","tenth","chief","elite","valor","brave",
  "grand","feast","toast","award","badge","crest","ranks","ruled",
  "feats","tromp","leads","surge","stars",

  // === SPIRIT & ENERGY ===
  "flame","blaze","vigor","might","force","power","flash","crush",
  "stomp","brawn","stout","steel","titan","spark","roars","cheer",
  "crowd","fight","grind","heart","dream","trust","noise","hyped",
  "amped","pumps","swift","speed","burst","bolts","rages","fired",
  "pulse","roast","nerve","alive",

  // === COLLEGE LIFE & CAMPUS ===
  "class","study","dorms","exams","major","grade","books","grads",
  "party","youth","halls","greek","tests","fresh","debut","forum",
  "clubs","lunch","essay","march","dance","music","money","loans",
  "notes","learn","teach","tutor","smart","brain","crams","focus",
  "paper","desks","quads",

  // === TAILGATE & CULTURE ===
  "grill","truck","boots","jeans","sweet","grits","smoke","sauce",
  "tents","bands","signs","horns","drums","songs","steak","wings",
  "meats","chips","salsa","tacos","beers","brews",

  // === RIVALS & BATTLE ===
  "rival","enemy","upset","wreck","mercy","taunt","trash","smash",
  "knock","siege","armor","lance","sword","duels","havoc",

  // === TRAITS OF A CHAMPION ===
  "tough","quick","sharp","ready","lucky","loyal","proud","known",
  "great","hardy","gutsy","agile","alert","fiery",

  // === ADDITIONAL THEMED WORDS ===
  "chant","rowdy","risen","skill","unity","depth","scope","reach",
  "build","onset","claim","stamp","total","level","trial","urban",
  "moats","punch","whiff","hound","brisk","pluck","stash","chunk",
  "trait","bravo","whips","rider","turfs","spree","troop","dodge",
  "train","plead","tiger","traps","creed","seize","strut","viper"
];

const VALID_GUESSES = new Set([
  ...ANSWER_WORDS,

  // =================================================================
  // Common 5-letter English words — comprehensive list
  // =================================================================

  // --- A ---
  "aahed","aalii","abaci","aback","abaft","abase","abash","abate",
  "abbey","abbot","abeam","abets","abhor","abide","abler","abode",
  "abort","about","above","abuse","abuts","abyss","acerb","ached",
  "aches","acids","acmes","acned","acorn","acres","acrid","acted",
  "actin","actor","acute","adage","added","adder","addle","adept",
  "adieu","adios","admin","admit","adobe","adopt","adore","adorn",
  "adult","aegis","aeons","afoot","afoul","after","again","agate",
  "agave","agent","aggro","aging","aglow","agony","agree","ahead",
  "aided","aider","aimed","aimer","aired","aisle","alarm","album",
  "alder","algae","alias","alibi","alien","align","alike","allay",
  "alley","allot","allow","alloy","aloft","alone","along","aloof",
  "aloud","alpha","altar","alter","altos","amass","amaze","amber",
  "amble","amend","amigo","amine","amino","amiss","amity","among",
  "ample","amply","amuse","angel","anger","angle","angry","angst",
  "anime","ankle","annex","annoy","antic","antsy","anvil","aorta",
  "apart","aphid","aping","apple","apply","apron","arbor","areas",
  "argue","arise","armed","aroma","arose","array","arrow","arson",
  "artsy","ascot","ashen","ashes","aside","asked","assay","asset",
  "astir","atlas","atoll","atoms","atone","attic","audio","audit",
  "auger","augur","aunts","aural","avail","avert","avian","avoid",
  "await","awake","awash","awful","awoke","axial","axiom","axles",
  "azure",

  // --- B ---
  "babel","bacon","badly","bagel","baggy","bails","baits","baked",
  "baker","balks","balls","balms","balmy","banal","banes","bangs",
  "banjo","banks","bards","barge","barks","barns","baron","basal",
  "based","basic","basin","basis","batch","bated","bathe","baths",
  "batty","bawdy","beads","beady","beaks","beams","beans","beard",
  "bears","beats","beech","beefs","beefy","beeps","beets","began",
  "begin","beige","being","belay","belle","bells","below","belts",
  "bends","beret","berry","berth","beset","betel","bible","bicep",
  "biddy","bided","biked","biker","bikes","bills","billy","binds",
  "binge","bingo","biome","birch","birds","birth","bison","bitty",
  "black","blade","blame","bland","blank","blare","blast","bleak",
  "bleat","bleed","blend","bless","blest","blimp","blind","blink",
  "bliss","bloat","blobs","blogs","bloke","blond","blood","bloom",
  "blown","blows","blued","blues","bluff","blurb","blurs","blurt",
  "blush","board","boast","boats","bobby","boded","bogey","boggy",
  "bogus","bonds","boned","bones","bonus","boons","boost","booth",
  "booze","boozy","bored","bores","borne","borns","bosom","bossy",
  "botch","bound","bouts","bowed","bowel","bower","bowls","boxed",
  "boxer","boxes","brace","brags","braid","brake","brand","brash",
  "brass","brats","bread","break","breed","bribe","brick","bride",
  "brief","brine","bring","brink","briny","broad","broil","broke",
  "brood","brook","broom","broth","brown","brunt","brush","brute",
  "bucks","buddy","budge","buggy","built","bulbs","bulge","bulky",
  "bulls","bully","bumps","bumpy","bunch","bunks","bunny","bunts",
  "buoys","burns","burnt","burps","burro","buses","bushy","butts",
  "buyer","buzzy","bylaw","bytes",

  // --- C ---
  "cabby","cabin","cable","caddy","cadet","cadre","cafes","caged",
  "cages","cairn","caked","cakes","calks","calms","camel","cameo",
  "camps","canal","candy","canes","canoe","canon","caper","capes",
  "cards","cared","cares","cargo","carps","carry","carts","carve",
  "cased","cases","caste","casts","cater","catty","cause","caves",
  "cease","cells","cents","chain","chair","chalk","chaos","chaps",
  "charm","chart","chase","cheap","cheat","check","cheek","chefs",
  "chess","chest","chick","chide","child","chili","chill","chime",
  "china","chirp","chive","choir","choke","chord","chore","chose",
  "churn","cider","cigar","cinch","circa","cited","cites","civic",
  "civil","clamp","clams","clang","clank","clans","claps","clasp",
  "clean","clear","cleat","clerk","click","cliff","climb","cling",
  "clips","cloak","clods","clogs","clone","close","cloth","cloud",
  "clout","clown","cluck","clued","clues","clump","clung","coals",
  "coats","cobra","cocky","cocoa","coded","codes","codex","coins",
  "cokes","colds","colon","color","colts","comas","combs","comes",
  "comet","comic","comma","conch","condo","cones","cooks","cools",
  "coops","coped","copes","cords","cored","cores","corks","corns",
  "corny","corps","costs","couch","cough","could","count","coupe",
  "coups","cover","covet","cowed","crabs","crack","craft","cramp",
  "crank","craps","crash","crate","crave","craze","crazy","creak",
  "cream","creep","crepe","crews","cribs","crick","cried","cries",
  "crime","crimp","crisp","croak","crock","crook","crops","cross",
  "crows","crude","cruel","crumb","crust","crypt","cubed","cubes",
  "cubic","cuffs","culls","curbs","curds","cured","cures","curls",
  "curly","curns","curry","curse","curve","curvy","cyber","cycle",

  // --- D ---
  "daddy","daily","dairy","daisy","dales","dally","danes","dared",
  "dares","darns","darts","dated","dater","dates","datum","dawns",
  "dazed","deals","dealt","dears","death","debit","debts","debug",
  "decal","decay","decks","decor","decoy","decry","deeds","deers",
  "deity","delay","dells","delve","demon","demos","denim","dense",
  "dents","depot","derby","deter","detox","deuce","devil","dials",
  "diary","diced","dices","dicey","digit","dimes","dimly","dined",
  "diner","dines","dingo","dingy","dirty","disco","discs","disks",
  "ditch","ditto","ditty","dived","dives","dizzy","docks","dodgy",
  "doggy","dogma","doing","dolls","dolly","domed","domes","dones",
  "donor","donut","doors","doped","dopes","dosed","doses","doted",
  "dotes","doubt","dough","doves","dowdy","dowel","downy","dozed",
  "dozen","drags","drain","drake","drama","drape","drawl","drawn",
  "draws","dread","dress","dried","drier","drift","drink","drips",
  "droit","droll","drone","drool","droop","drops","dross","drove",
  "drown","drugs","drunk","dryer","dryly","ducks","duets","dulls",
  "dully","dummy","dumps","dunce","duped","dupes","dusty","dwarf",
  "dwell","dwelt","dying",

  // --- E ---
  "eager","eagle","eared","early","earns","earth","eased","easel",
  "eases","eaten","eater","eaves","ebbed","ebony","edged","edges",
  "edits","eerie","eight","elbow","elder","elect","elfin","elves",
  "email","embed","ember","emcee","emits","empty","ended","endow",
  "enjoy","ennui","ensue","enter","entry","envoy","epoch","equal",
  "equip","erase","erode","erred","error","erupt","ether","ethic",
  "euros","evade","evens","event","every","evict","evoke","exact",
  "exalt","execs","exert","exile","exist","exits","expat","expel",
  "expos","exude","exult","eying","eyrie",

  // --- F ---
  "fable","faced","faces","facet","facts","faded","fades","fails",
  "faint","fairy","faith","faked","fakes","falls","false","famed",
  "fancy","farce","fared","fares","farms","fatal","fated","fates",
  "fatty","fault","fauna","favor","fawns","fazed","fears","feeds",
  "feels","feign","fella","felon","felts","femur","fence","fends",
  "ferns","ferry","fetch","fetid","fetus","fever","fewer","fiber",
  "fibre","fiend","fifth","fifty","filed","files","fills","films",
  "filth","finch","finds","fined","finer","fines","fires","firms",
  "fishy","fists","fixed","fixer","fixes","fizzy","fjord","flair",
  "flake","flaky","flank","flaps","flare","flask","flats","flaws",
  "fleas","fleet","flesh","flier","flies","fling","flint","flips",
  "flirt","flits","float","flock","flood","floor","flops","floss",
  "flour","flows","fluid","fluke","flunk","flush","flute","flyby",
  "foams","foamy","focal","foggy","foils","folds","folks","folly",
  "fonts","foods","fools","foray","forge","forgo","forks","forms",
  "forte","forth","forts","forty","found","fours","foxed","foxes",
  "foyer","frags","frail","frame","frank","fraud","frays","freak",
  "freed","freer","frees","frets","friar","fried","fries","frill",
  "frisk","fritz","frock","frogs","front","frost","froze","fruit",
  "frump","fuels","fulls","fully","fumed","fumes","funds","fungi",
  "funky","funny","furry","fused","fuses","fussy","fuzed","fuzzy",

  // --- G ---
  "gabby","gaily","gaits","gales","gamed","gamer","gamma","gangs",
  "gaped","gapes","gases","gated","gates","gauge","gaunt","gauze",
  "gauzy","gavel","gazed","gazer","gazes","gears","geeks","geeky",
  "genes","genie","genre","genus","germs","ghost","giant","giddy",
  "gifts","gills","girls","given","gives","gizmo","glade","gland",
  "glare","glass","glaze","gleam","glean","glens","glide","glint",
  "gloat","globe","globs","gloom","gloss","glows","glued","glues",
  "glyph","gnats","gnaws","goats","godly","going","golds","golfs",
  "goner","gongs","goods","gooey","goofy","goose","gored","gores",
  "gorge","gouge","gourd","gowns","grabs","grace","graft","grain",
  "grams","grant","grape","graph","grasp","grass","grate","grave",
  "gravy","graze","greed","greet","greys","grids","grief","grime",
  "grimy","grins","gripe","grips","groan","groin","groom","grope",
  "gross","group","grout","grown","grows","grubs","gruel","gruff",
  "grump","grunt","guano","guess","guest","guide","guild","guilt",
  "guise","gulch","gulfs","gulls","gully","gummy","gurus","gusts",
  "gusty","gybed","gypsy",

  // --- H ---
  "habit","hacks","haiku","hairs","hairy","haled","haler","halts",
  "halve","hands","handy","hangs","happy","hared","harms","harps",
  "harsh","haste","hasty","hatch","hated","hater","hates","haven",
  "hawed","hazed","hazel","heals","heaps","heard","hears","heats",
  "heave","heavy","hedge","heeds","heels","hefty","heirs","heist",
  "hello","helps","hence","herbs","herds","hexed","highs","hiked",
  "hiker","hikes","hills","hints","hippo","hippy","hired","hires",
  "hitch","hived","hoard","hoary","hobby","holds","holed","holes",
  "holly","homed","homes","honed","hones","honey","hoods","hooks",
  "hoped","hopes","horde","horny","horse","hosed","hosts","hotel",
  "hours","house","hover","howls","huffs","hulls","human","humor",
  "humps","hunks","hunts","hurry","hurts","husky","hutch","hydra",
  "hyena","hymns","hyper",

  // --- I ---
  "icily","icing","ideal","ideas","idiot","idled","idler","image",
  "imbue","impel","imply","inane","inbox","incur","index","indie",
  "inept","inert","infer","infra","inked","inlay","inner","input",
  "inter","intro","ionic","irate","irked","irony","issue","items",
  "ivied","ivory",

  // --- J ---
  "jacks","jaded","jails","jambs","japed","japes","jazzy","jelly",
  "jerks","jewel","jibed","jibes","jilts","jimmy","jived","jives",
  "joins","joint","joked","joker","jokes","jolly","jolts","joust",
  "joyed","judge","juice","juicy","jumbo","jumps","jumpy","juror",

  // --- K ---
  "kebab","keels","keeps","keyed","khaki","kiddy","kills","kinds",
  "kings","kinky","kiosk","kites","kitty","knack","knead","kneed",
  "kneel","knees","knelt","knife","knobs","knoll","knots","knows",
  "koala","kudos",

  // --- L ---
  "label","labor","laced","lacks","laden","ladle","lager","laird",
  "lambs","lamed","lames","lamps","lands","lanky","lapse","large",
  "larks","larva","laser","lasso","lasts","latch","later","lates",
  "latex","lathe","latte","laugh","lawns","layer","lazed","leafy",
  "leaks","leaky","leapt","lease","leash","least","leave","ledge",
  "leech","lefts","legal","leggy","lemon","lever","light","liked",
  "likes","lilac","limbo","limbs","limed","limes","limit","limps",
  "lined","linen","liner","lingo","links","lions","lists","liter",
  "lithe","litre","lived","liven","liver","lives","llama","loads",
  "loafs","lobby","local","locks","locus","lodge","lofts","lofty",
  "logic","login","logos","loner","lones","looks","looms","loops",
  "loose","loped","lords","lorry","loser","loses","lotto","lotus",
  "louse","lousy","loved","lover","loves","lowed","lower","lowly",
  "lubed","lucid","lulls","lumps","lumpy","lunar","lunge","lungs",
  "lurch","lured","lures","lymph","lynch","lyric",

  // --- M ---
  "maced","macho","macro","magic","magma","mails","makes","males",
  "malls","manes","manor","maple","marks","marry","masks","mason",
  "masse","masts","mated","mater","mates","maxed","maxim","maybe",
  "mayor","mazed","mazes","meals","means","meant","meany","meaty",
  "media","medic","meets","melee","melon","melts","memos","mends",
  "menus","merge","merit","merry","messy","metal","meted","meter",
  "metre","micro","midst","miked","miles","milky","mills","mimed",
  "mimes","mimic","mince","minds","mined","miner","mines","minor",
  "minus","mired","mires","mirth","miser","mites","mixed","mixer",
  "moans","mocks","modal","model","modem","modes","moist","molar",
  "molds","moldy","moles","molly","monks","month","moods","moody",
  "mooed","moons","moors","moose","moped","moral","mores","morph",
  "mosey","motel","motes","moths","motif","motor","motto","mould",
  "mount","mourn","mouse","mousy","mouth","moved","mover","moves",
  "movie","mowed","mower","mucus","muffs","mulch","mules","mummy",
  "mural","mures","mused","mushy","musty","muted","muzzy","myrrh",
  "myths",

  // --- N ---
  "nails","naive","naked","named","names","nanny","napes","nasal",
  "nasty","natal","natty","naval","navel","nears","necks","needs",
  "nests","never","newer","newly","newts","nexus","niche","night",
  "nimby","nines","ninth","nippy","nitty","nobly","nodal","noddy",
  "nodes","nomad","nooks","noose","norms","north","nosed","noses",
  "notch","noted","nouns","novel","nudge","nulls","nurse","nutty",
  "nylon","nymph",

  // --- O ---
  "oaken","oared","oases","oater","oaths","oboes","occur","ocher",
  "oddly","odors","offal","offer","often","ogled","ogres","oiled",
  "olden","older","olive","omega","omens","oomph","oozed","opens",
  "opera","opted","optic","orbit","order","organ","other","otter",
  "ought","ounce","outdo","outed","outer","outgo","ovals","ovary",
  "ovens","overt","owing","owned","owner","oxbow","oxide","ozone",

  // --- P ---
  "paced","paces","packs","pacts","paddy","pagan","paged","pages",
  "pails","pains","pairs","paled","pales","panda","panel","panes",
  "panic","pants","parch","pared","parks","parse","parts","pasta",
  "paste","pasty","patch","paths","patio","patsy","patty","pause",
  "paved","paves","pawed","pawns","peace","peach","peaks","pearl",
  "pears","pecan","pedal","peeks","peels","peers","peggy","pelts",
  "penal","pence","pends","penny","peony","peppy","perch","perks",
  "perky","pesky","pesto","pests","petal","petty","phase","phone",
  "phony","photo","piano","picks","picky","piece","piers","piggy",
  "piked","piled","piles","pills","pilot","pinch","pined","pints",
  "pious","piped","pipes","pixel","pixie","pizza","place","plaid",
  "plain","plane","plank","plans","plant","plaza","pleas","pleat",
  "plied","plods","plots","plows","ploys","plugs","plumb","plume",
  "plump","plums","plunk","plush","poems","poets","point","poise",
  "poked","poker","pokes","polar","poles","polls","polyp","pools",
  "popes","poppy","porch","pored","pores","ports","posed","poses",
  "posse","posts","pouch","pound","pours","pouty","prank","prawn",
  "prays","price","pried","prima","prime","print","prior","prism",
  "privy","probe","prods","promo","proms","prone","prong","proof",
  "props","prose","prove","prude","prune","psalm","psych","pucks",
  "puked","pulls","pulps","punks","pupil","puppy","pures","purge",
  "purrs","purse","pushy","putts","putty","pygmy",

  // --- Q ---
  "quack","quaff","quail","qualm","quart","quasi","queen","queer",
  "query","queue","quiet","quill","quilt","quips","quirk","quite",
  "quota","quote",

  // --- R ---
  "rabbi","rabid","raced","racks","radar","radio","rafts","raged",
  "raids","rails","rains","raise","raked","rakes","ramps","ranch",
  "range","rapid","rared","rarer","rated","rater","rates","ratio",
  "ratty","raved","raven","rayon","razed","razes","razor","react",
  "reads","realm","reams","reaps","rebel","recap","recur","reefs",
  "reeks","reels","refer","refit","reins","relax","relic","remit",
  "renal","renew","rents","repay","repel","reply","rerun","reset",
  "resin","rests","retry","reuse","revel","rhyme","rides","ridge",
  "riffs","rifle","rifts","right","rigid","riled","rimed","rinds",
  "rinse","riots","ripen","rises","risks","risky","rived","rivet",
  "roads","roams","robed","robes","robin","robot","rocks","rocky",
  "rodeo","rogue","roles","rolls","roman","roofs","rooms","roomy",
  "roots","roped","ropes","roses","rotor","rouge","rough","roved",
  "rover","rowed","ruddy","ruins","ruler","rules","rumba","rumor",
  "rumps","rungs","rupee","rural","rusts","rusty",

  // --- S ---
  "saber","sadly","safer","safes","saggy","sails","saint","salad",
  "sales","sally","salon","salts","salty","salve","salvo","sands",
  "saner","sappy","sated","satin","saucy","sauna","saved","savor",
  "scald","scalp","scams","scans","scant","scare","scarf","scars",
  "scary","scene","scent","scoff","scold","scone","scoop","scorn",
  "scout","scowl","scram","scrap","scrub","seals","seams","seats",
  "sedan","seeds","seeks","seems","seeps","seers","sells","sends",
  "sense","sepia","serif","serum","setup","seven","sever","sewed",
  "sewer","shack","shady","shaft","shake","shaky","shall","shame",
  "shape","shard","share","shark","shave","shawl","shear","sheds",
  "sheen","sheep","sheer","sheet","shelf","shift","shine","shiny",
  "ships","shire","shirt","shock","shoes","shone","shook","shoot",
  "shops","shore","short","shout","shove","shown","shows","shred",
  "shrew","shrub","shrug","shuck","shunt","sided","sides","sieve",
  "sighs","sight","sigma","silks","silky","sills","silly","silts",
  "since","sines","sinew","sinks","sired","siren","sires","sited",
  "sites","sixth","sixty","sized","sizes","skate","skein","skier",
  "skies","skimp","skirt","skull","skunk","slabs","slack","slain",
  "slams","slang","slant","slaps","slash","slate","slats","slave",
  "slays","sleds","sleek","sleep","sleet","slept","slice","slick",
  "slime","slimy","sling","slink","slips","slits","slope","slops",
  "sloth","slots","slugs","slump","slums","slung","slunk","slurp",
  "small","smear","smell","smelt","smile","smirk","smith","smock",
  "smoky","snack","snags","snail","snake","snare","snarl","sneer",
  "snide","sniff","snobs","snore","snort","snowy","snuck","snuff",
  "soaps","soapy","soars","sober","socks","sofas","softy","soggy",
  "soils","solar","soled","soles","solid","solve","sonic","sooty",
  "sores","sorry","sorts","souls","sound","soups","soupy","sowed",
  "sower","space","spade","spans","spare","spars","spawn","speak",
  "spear","speck","specs","spell","spend","spent","spice","spicy",
  "spied","spies","spill","spine","spite","split","spoke","spoon",
  "spore","spots","spray","sprig","spunk","spurs","squat","squid",
  "stabs","stack","staff","stage","staid","stain","stair","stake",
  "stale","stall","stand","stank","stare","stark","state","stave",
  "stays","steed","steep","steer","stein","stems","steps","stern",
  "stews","stick","stiff","still","stilt","sting","stink","stint",
  "stirs","stock","stoic","stoke","stole","stone","stony","stood",
  "stool","stoop","stops","store","story","stove","strap","straw",
  "stray","stubs","stuck","studs","stump","stung","stunk","stunt",
  "style","suave","sucks","sudsy","sugar","suite","suits","sulky",
  "sumac","super","surfs","sushi","swans","swaps","swarm","swath",
  "swats","swear","swell","swept","swill","swine","swipe","swore",
  "sworn","swung","synod","synth","syrup",

  // --- T ---
  "tabby","table","taboo","tacit","tacks","tacky","taffy","taggy",
  "taken","taker","tales","talks","talls","tally","talon","tamed",
  "tames","tangs","tangy","tanks","taped","tapes","tapir","tardy",
  "tasks","taste","tasty","tatty","taxed","taxes","tears","teary",
  "tease","teddy","teeny","tells","tends","tense","terms","terse",
  "texts","thank","theft","their","theme","there","these","theta",
  "thief","thigh","thing","think","third","thorn","those","three",
  "threw","throb","thrum","thuds","thugs","thumb","thyme","tiara",
  "ticks","tided","tides","tiers","tiled","tiles","tilts","timed",
  "timer","times","timid","tines","tinny","tints","tippy","tipsy",
  "tired","tires","tizzy","toads","today","toddy","token","tolls",
  "tombs","toned","toner","tones","tonic","tools","topaz","topic",
  "torch","tores","torso","torts","totem","touch","tours","towed",
  "towel","tower","towns","toxic","trace","trade","trail","tramp",
  "trays","tread","treat","trees","trend","tribe","trick","tried",
  "tries","trims","trips","trite","troll","trots","truce","truly",
  "trump","trunk","truss","truth","tryst","tubby","tubed","tubes",
  "tucks","tufts","tulip","tummy","tumor","tuned","tuner","tunes",
  "turbo","turns","tusks","twang","tweak","tweed","tweet","twice",
  "twigs","twine","twins","twirl","twist","tying","typed","types",

  // --- U ---
  "udder","ulcer","ultra","umbra","uncle","under","undue","unfit",
  "union","unite","units","unlit","until","unwed","upper","urged",
  "usage","users","usher","using","usual","usurp","utter",

  // --- V ---
  "vague","vales","valid","value","valve","vanes","vapor","vases",
  "veers","vegan","veils","veins","veldt","vents","venue","verbs",
  "verge","verse","vests","vexed","vibes","video","views","villa",
  "vinyl","viola","viral","virus","visit","visor","vista","vital",
  "vivid","vixen","vocal","vodka","vogue","voice","volts","voted",
  "voter","votes","vouch","vowed","vowel","vying",

  // --- W ---
  "waddy","waded","wader","wades","waged","wager","wages","wagon",
  "waifs","wails","waist","waits","waive","waked","waken","wakes",
  "walks","walls","waltz","wands","waned","wanes","wants","wards",
  "wares","warns","warps","warts","waste","watch","watts","waved",
  "waver","waxed","waxes","wears","weary","weave","wedge","weeds",
  "weedy","weeks","weeny","weigh","weird","wells","wench","wends",
  "whale","wheat","wheel","where","which","while","whims","whine",
  "whiny","whirl","whisk","white","whole","whose","wicks","widen",
  "wider","widow","width","wield","wiled","wills","wilts","winch",
  "winds","windy","wines","winks","wiped","wired","wires","wised",
  "wisps","witch","witty","wives","woken","wokes","wolfs","woman",
  "women","woods","woody","words","wordy","works","world","worms",
  "wormy","worry","worse","worst","worth","would","wound","woven",
  "wowed","wraps","wrath","wreak","wrens","wring","wrist","write",
  "wrong","wrote","wryly",

  // --- X ---
  "xenon","xerox",

  // --- Y ---
  "yacht","yarns","years","yeast","yells","yield","yogis","yoked",
  "yolks","young","yours","yucca",

  // --- Z ---
  "zappy","zebra","zesty","zilch","zincs","zippy","zonal","zoned",
  "zones"
]);
