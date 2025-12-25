// ===================================
// AUTO GENERATE CROSSWORD - WITH DICTIONARY
// ===================================

// Dictionary with words and clues (will be populated)
let dictionary = [];

// Load dictionary with definitions
const dictionaryWithClues = [
    // 3 letters
    { word: "ACE", clue: "Top card" },
    { word: "AGE", clue: "How old you are" },
    { word: "AIR", clue: "What we breathe" },
    { word: "ANT", clue: "Small insect" },
    { word: "APE", clue: "Great primate" },
    { word: "ART", clue: "Creative expression" },
    { word: "BAD", clue: "Not good" },
    { word: "BAG", clue: "Carry items in it" },
    { word: "BAT", clue: "Flying mammal" },
    { word: "BED", clue: "Where you sleep" },
    { word: "BIG", clue: "Large" },
    { word: "BOX", clue: "Container" },
    { word: "BOY", clue: "Young male" },
    { word: "BUS", clue: "Public transport" },
    { word: "CAR", clue: "Four-wheeled vehicle" },
    { word: "CAT", clue: "Feline pet" },
    { word: "CUP", clue: "Drinking vessel" },
    { word: "DAY", clue: "24 hours" },
    { word: "DOG", clue: "Man's best friend" },
    { word: "EAR", clue: "Hearing organ" },
    { word: "EGG", clue: "Chicken product" },
    { word: "EYE", clue: "Vision organ" },
    { word: "FAN", clue: "Cooling device" },
    { word: "FAT", clue: "Not thin" },
    { word: "FLY", clue: "Buzzing insect" },
    { word: "FOX", clue: "Cunning animal" },
    { word: "GUN", clue: "Firearm" },
    { word: "HAT", clue: "Head covering" },
    { word: "HOT", clue: "High temperature" },
    { word: "ICE", clue: "Frozen water" },
    { word: "INK", clue: "Pen fluid" },
    { word: "JAM", clue: "Fruit spread" },
    { word: "JAR", clue: "Glass container" },
    { word: "JOB", clue: "Employment" },
    { word: "JOY", clue: "Happiness" },
    { word: "KEY", clue: "Opens locks" },
    { word: "KID", clue: "Young child" },
    { word: "LEG", clue: "Limb for walking" },
    { word: "LID", clue: "Container cover" },
    { word: "LOG", clue: "Tree trunk piece" },
    { word: "MAP", clue: "Geographic guide" },
    { word: "MAN", clue: "Adult male" },
    { word: "NET", clue: "For catching fish" },
    { word: "NUT", clue: "Hard-shelled seed" },
    { word: "OAK", clue: "Tree type" },
    { word: "OIL", clue: "Lubricant" },
    { word: "OLD", clue: "Not young" },
    { word: "OWL", clue: "Nocturnal bird" },
    { word: "PAN", clue: "Cooking utensil" },
    { word: "PEN", clue: "Writing tool" },
    { word: "PIG", clue: "Farm animal" },
    { word: "PIE", clue: "Baked dessert" },
    { word: "POT", clue: "Cooking vessel" },
    { word: "RAT", clue: "Rodent" },
    { word: "RED", clue: "Color of blood" },
    { word: "RUN", clue: "Fast movement" },
    { word: "SAD", clue: "Unhappy" },
    { word: "SEA", clue: "Ocean" },
    { word: "SIX", clue: "Number after five" },
    { word: "SKY", clue: "Above us" },
    { word: "SUN", clue: "Star of our system" },
    { word: "TEA", clue: "Hot beverage" },
    { word: "TEN", clue: "Decade" },
    { word: "TOP", clue: "Highest point" },
    { word: "TOY", clue: "Child's plaything" },
    { word: "VAN", clue: "Cargo vehicle" },
    { word: "WAR", clue: "Armed conflict" },
    { word: "WEB", clue: "Spider creation" },
    { word: "WET", clue: "Not dry" },
    { word: "WIN", clue: "Victory" },
    { word: "ZOO", clue: "Animal park" },

    // 4 letters
    { word: "BALL", clue: "Spherical toy" },
    { word: "BANK", clue: "Where money is kept" },
    { word: "BEAR", clue: "Large furry mammal" },
    { word: "BELL", clue: "Makes ringing sound" },
    { word: "BIKE", clue: "Two-wheeled vehicle" },
    { word: "BIRD", clue: "Feathered flyer" },
    { word: "BLUE", clue: "Color of the sky" },
    { word: "BOAT", clue: "Water vessel" },
    { word: "BODY", clue: "Physical form" },
    { word: "BOOK", clue: "Reading material" },
    { word: "BOSS", clue: "Work supervisor" },
    { word: "CAGE", clue: "Animal enclosure" },
    { word: "CAKE", clue: "Birthday dessert" },
    { word: "CARD", clue: "Paper rectangle" },
    { word: "CAVE", clue: "Underground space" },
    { word: "CITY", clue: "Urban area" },
    { word: "COAT", clue: "Outer garment" },
    { word: "COIN", clue: "Metal money" },
    { word: "COLD", clue: "Low temperature" },
    { word: "COOK", clue: "Prepare food" },
    { word: "CORN", clue: "Yellow vegetable" },
    { word: "DARK", clue: "Without light" },
    { word: "DEER", clue: "Forest animal" },
    { word: "DESK", clue: "Work surface" },
    { word: "DOOR", clue: "Room entrance" },
    { word: "DRUG", clue: "Medicine" },
    { word: "DUCK", clue: "Quacking bird" },
    { word: "DUST", clue: "Fine particles" },
    { word: "EAST", clue: "Sunrise direction" },
    { word: "EDGE", clue: "Border" },
    { word: "FACE", clue: "Front of head" },
    { word: "FACT", clue: "True statement" },
    { word: "FALL", clue: "Autumn" },
    { word: "FARM", clue: "Agricultural land" },
    { word: "FAST", clue: "Quick" },
    { word: "FEAR", clue: "Scary feeling" },
    { word: "FIRE", clue: "Flames" },
    { word: "FISH", clue: "Aquatic animal" },
    { word: "FIVE", clue: "Half of ten" },
    { word: "FLAG", clue: "National symbol" },
    { word: "FOOD", clue: "What we eat" },
    { word: "FOOT", clue: "End of leg" },
    { word: "FROG", clue: "Jumping amphibian" },
    { word: "GAME", clue: "What you play" },
    { word: "GIFT", clue: "Present" },
    { word: "GIRL", clue: "Young female" },
    { word: "GOAT", clue: "Bearded animal" },
    { word: "GOLD", clue: "Precious metal" },
    { word: "GOOD", clue: "Not bad" },
    { word: "HAIR", clue: "Head covering" },
    { word: "HAND", clue: "End of arm" },
    { word: "HEAD", clue: "Top of body" },
    { word: "HILL", clue: "Small mountain" },
    { word: "HOME", clue: "Where you live" },
    { word: "HOPE", clue: "Optimism" },
    { word: "HOUR", clue: "60 minutes" },
    { word: "IDEA", clue: "Thought" },
    { word: "IRON", clue: "Strong metal" },
    { word: "JAIL", clue: "Prison" },
    { word: "JOKE", clue: "Funny story" },
    { word: "JUMP", clue: "Leap" },
    { word: "JUNE", clue: "Summer month" },
    { word: "KING", clue: "Male monarch" },
    { word: "KITE", clue: "Flying toy" },
    { word: "KNEE", clue: "Leg joint" },
    { word: "LAKE", clue: "Body of water" },
    { word: "LAMP", clue: "Light source" },
    { word: "LAND", clue: "Terra firma" },
    { word: "LEAF", clue: "Tree part" },
    { word: "LEFT", clue: "Opposite of right" },
    { word: "LIFE", clue: "Existence" },
    { word: "LION", clue: "King of jungle" },
    { word: "LIST", clue: "Items in order" },
    { word: "LOCK", clue: "Security device" },
    { word: "LONG", clue: "Not short" },
    { word: "LOVE", clue: "Deep affection" },
    { word: "LUCK", clue: "Fortune" },
    { word: "MAIL", clue: "Postal delivery" },
    { word: "MEAL", clue: "Food serving" },
    { word: "MEAT", clue: "Animal flesh" },
    { word: "MILK", clue: "White drink" },
    { word: "MIND", clue: "Brain function" },
    { word: "MOON", clue: "Night light" },
    { word: "NAIL", clue: "Finger tip" },
    { word: "NAME", clue: "What you're called" },
    { word: "NECK", clue: "Body part" },
    { word: "NEWS", clue: "Current events" },
    { word: "NOSE", clue: "Smell organ" },
    { word: "PARK", clue: "Green space" },
    { word: "PATH", clue: "Walking route" },
    { word: "RAIN", clue: "Water from sky" },
    { word: "RING", clue: "Finger jewelry" },
    { word: "ROAD", clue: "Driving path" },
    { word: "ROCK", clue: "Stone" },
    { word: "ROOF", clue: "House top" },
    { word: "ROOM", clue: "House space" },
    { word: "ROPE", clue: "Thick cord" },
    { word: "ROSE", clue: "Red flower" },
    { word: "SALT", clue: "Table seasoning" },
    { word: "SAND", clue: "Beach material" },
    { word: "SHIP", clue: "Large boat" },
    { word: "SHOE", clue: "Foot wear" },
    { word: "SHOP", clue: "Store" },
    { word: "SHOW", clue: "Display" },
    { word: "SIGN", clue: "Indication" },
    { word: "SKIN", clue: "Body covering" },
    { word: "SNOW", clue: "Winter precipitation" },
    { word: "SOAP", clue: "Cleaning agent" },
    { word: "SONG", clue: "Music piece" },
    { word: "STAR", clue: "Night sky light" },
    { word: "STOP", clue: "Cease movement" },
    { word: "SWIM", clue: "Water activity" },
    { word: "TAIL", clue: "Animal appendage" },
    { word: "TALK", clue: "Speak" },
    { word: "TALL", clue: "Not short" },
    { word: "TEAM", clue: "Group of players" },
    { word: "TIME", clue: "Clock measure" },
    { word: "TOWN", clue: "Small city" },
    { word: "TREE", clue: "Tall plant" },
    { word: "TRIP", clue: "Journey" },
    { word: "WALL", clue: "Room divider" },
    { word: "WARM", clue: "Slightly hot" },
    { word: "WAVE", clue: "Ocean motion" },
    { word: "WEEK", clue: "Seven days" },
    { word: "WEST", clue: "Sunset direction" },
    { word: "WIFE", clue: "Married woman" },
    { word: "WILD", clue: "Not tame" },
    { word: "WIND", clue: "Moving air" },
    { word: "WINE", clue: "Grape drink" },
    { word: "WING", clue: "Bird part" },
    { word: "WOLF", clue: "Wild canine" },
    { word: "WOOD", clue: "Tree material" },
    { word: "WORD", clue: "Language unit" },
    { word: "WORK", clue: "Job activity" },
    { word: "WORM", clue: "Garden creature" },
    { word: "YEAR", clue: "365 days" },
    { word: "ZERO", clue: "Nothing" },

    // 5 letters
    { word: "ABOUT", clue: "Concerning" },
    { word: "AFTER", clue: "Following" },
    { word: "AGAIN", clue: "Once more" },
    { word: "AGENT", clue: "Representative" },
    { word: "ALARM", clue: "Warning sound" },
    { word: "ALPHA", clue: "First Greek letter" },
    { word: "ANGEL", clue: "Heavenly being" },
    { word: "ANGRY", clue: "Mad" },
    { word: "APPLE", clue: "Red or green fruit" },
    { word: "BEACH", clue: "Sandy shore" },
    { word: "BLACK", clue: "Darkest color" },
    { word: "BLANK", clue: "Empty" },
    { word: "BLOOD", clue: "Red fluid" },
    { word: "BOARD", clue: "Flat piece of wood" },
    { word: "BRAIN", clue: "Thinking organ" },
    { word: "BREAD", clue: "Baked staple" },
    { word: "BREAK", clue: "Shatter" },
    { word: "BRIEF", clue: "Short" },
    { word: "BRUSH", clue: "Hair tool" },
    { word: "CABLE", clue: "Thick wire" },
    { word: "CANDY", clue: "Sweet treat" },
    { word: "CARRY", clue: "Transport" },
    { word: "CHAIN", clue: "Linked metal" },
    { word: "CHAIR", clue: "Seat with back" },
    { word: "CHART", clue: "Visual data" },
    { word: "CHEAP", clue: "Low cost" },
    { word: "CHECK", clue: "Verify" },
    { word: "CHESS", clue: "Board game" },
    { word: "CHILD", clue: "Young person" },
    { word: "CHINA", clue: "Asian country" },
    { word: "CLEAN", clue: "Not dirty" },
    { word: "CLEAR", clue: "Transparent" },
    { word: "CLIMB", clue: "Go up" },
    { word: "CLOCK", clue: "Time keeper" },
    { word: "CLOSE", clue: "Shut" },
    { word: "CLOUD", clue: "Sky formation" },
    { word: "COAST", clue: "Shore" },
    { word: "COLOR", clue: "Hue" },
    { word: "CORAL", clue: "Ocean reef" },
    { word: "COUCH", clue: "Living room seat" },
    { word: "COUNT", clue: "Number things" },
    { word: "COURT", clue: "Legal place" },
    { word: "COVER", clue: "Hide" },
    { word: "CREAM", clue: "Dairy product" },
    { word: "DANCE", clue: "Move to music" },
    { word: "DEATH", clue: "End of life" },
    { word: "DELTA", clue: "River mouth" },
    { word: "DEPTH", clue: "How deep" },
    { word: "DOORS", clue: "Room entries" },
    { word: "DRAFT", clue: "First version" },
    { word: "DRAMA", clue: "Theater art" },
    { word: "DREAM", clue: "Sleep vision" },
    { word: "DRESS", clue: "Woman's garment" },
    { word: "DRINK", clue: "Beverage" },
    { word: "DRIVE", clue: "Operate a car" },
    { word: "EARTH", clue: "Our planet" },
    { word: "EMPTY", clue: "Nothing inside" },
    { word: "ENEMY", clue: "Foe" },
    { word: "ENJOY", clue: "Take pleasure" },
    { word: "ENTER", clue: "Go in" },
    { word: "ERROR", clue: "Mistake" },
    { word: "EVENT", clue: "Happening" },
    { word: "EVERY", clue: "All" },
    { word: "EXIST", clue: "Be present" },
    { word: "EXTRA", clue: "Additional" },
    { word: "FACTS", clue: "True things" },
    { word: "FAIRY", clue: "Magical being" },
    { word: "FAITH", clue: "Belief" },
    { word: "FALSE", clue: "Not true" },
    { word: "FAMILY", clue: "Relatives" },
    { word: "FEAST", clue: "Big meal" },
    { word: "FIELD", clue: "Open land" },
    { word: "FIGHT", clue: "Combat" },
    { word: "FINAL", clue: "Last" },
    { word: "FLAME", clue: "Fire part" },
    { word: "FLASH", clue: "Quick light" },
    { word: "FLOOR", clue: "Room bottom" },
    { word: "FLOUR", clue: "Baking powder" },
    { word: "FOCUS", clue: "Concentrate" },
    { word: "FORCE", clue: "Power" },
    { word: "FRAME", clue: "Picture border" },
    { word: "FRESH", clue: "New" },
    { word: "FRONT", clue: "Opposite of back" },
    { word: "FRUIT", clue: "Sweet produce" },
    { word: "GHOST", clue: "Spirit" },
    { word: "GIANT", clue: "Very large" },
    { word: "GLASS", clue: "Transparent material" },
    { word: "GLOBE", clue: "World model" },
    { word: "GOALS", clue: "Objectives" },
    { word: "GRACE", clue: "Elegance" },
    { word: "GRAIN", clue: "Cereal seed" },
    { word: "GRAPE", clue: "Wine fruit" },
    { word: "GRASS", clue: "Lawn cover" },
    { word: "GRAVE", clue: "Burial place" },
    { word: "GREEN", clue: "Color of leaves" },
    { word: "GROUP", clue: "Collection" },
    { word: "GUARD", clue: "Protector" },
    { word: "GUESS", clue: "Estimate" },
    { word: "GUIDE", clue: "Leader" },
    { word: "HAPPY", clue: "Joyful" },
    { word: "HEART", clue: "Pumping organ" },
    { word: "HEAVY", clue: "Weighs a lot" },
    { word: "HELLO", clue: "Greeting" },
    { word: "HONEY", clue: "Bee product" },
    { word: "HORSE", clue: "Riding animal" },
    { word: "HOTEL", clue: "Place to stay" },
    { word: "HOUSE", clue: "Living place" },
    { word: "HUMAN", clue: "Person" },
    { word: "IMAGE", clue: "Picture" },
    { word: "INDEX", clue: "Book guide" },
    { word: "INNER", clue: "Inside" },
    { word: "INPUT", clue: "Data entry" },
    { word: "JAPAN", clue: "Island nation" },
    { word: "JOINT", clue: "Body connection" },
    { word: "JUDGE", clue: "Court official" },
    { word: "JUICE", clue: "Fruit drink" },
    { word: "KNIFE", clue: "Cutting tool" },
    { word: "LARGE", clue: "Big" },
    { word: "LASER", clue: "Light beam" },
    { word: "LATER", clue: "Afterwards" },
    { word: "LAUGH", clue: "Show amusement" },
    { word: "LAYER", clue: "Level" },
    { word: "LEARN", clue: "Gain knowledge" },
    { word: "LEAST", clue: "Minimum" },
    { word: "LEAVE", clue: "Depart" },
    { word: "LEGAL", clue: "Lawful" },
    { word: "LEMON", clue: "Sour fruit" },
    { word: "LEVEL", clue: "Flat" },
    { word: "LIGHT", clue: "Illumination" },
    { word: "LIMIT", clue: "Maximum" },
    { word: "LINUX", clue: "Computer OS" },
    { word: "LUNCH", clue: "Midday meal" },
    { word: "MAGIC", clue: "Illusion art" },
    { word: "MAJOR", clue: "Important" },
    { word: "MARCH", clue: "Third month" },
    { word: "MATCH", clue: "Fire starter" },
    { word: "MAYOR", clue: "City leader" },
    { word: "MEDIA", clue: "News sources" },
    { word: "METAL", clue: "Iron or steel" },
    { word: "MICRO", clue: "Very small" },
    { word: "MIGHT", clue: "Power" },
    { word: "MINOR", clue: "Small" },
    { word: "MIXED", clue: "Combined" },
    { word: "MODEL", clue: "Example" },
    { word: "MONEY", clue: "Currency" },
    { word: "MONTH", clue: "30 days" },
    { word: "MOTOR", clue: "Engine" },
    { word: "MOUSE", clue: "Small rodent" },
    { word: "MOUTH", clue: "Face opening" },
    { word: "MOVIE", clue: "Film" },
    { word: "MUSIC", clue: "Melodic art" },
    { word: "NIGHT", clue: "Dark time" },
    { word: "NORTH", clue: "Compass direction" },
    { word: "NOVEL", clue: "Long book" },
    { word: "NURSE", clue: "Medical helper" },
    { word: "OCEAN", clue: "Vast water body" },
    { word: "OFFER", clue: "Proposal" },
    { word: "OFTEN", clue: "Frequently" },
    { word: "ORDER", clue: "Arrangement" },
    { word: "OTHER", clue: "Different" },
    { word: "OUTER", clue: "External" },
    { word: "OWNER", clue: "Possessor" },
    { word: "PAINT", clue: "Color liquid" },
    { word: "PANEL", clue: "Flat section" },
    { word: "PAPER", clue: "Writing material" },
    { word: "PARTY", clue: "Celebration" },
    { word: "PEACE", clue: "No war" },
    { word: "PHONE", clue: "Communication device" },
    { word: "PHOTO", clue: "Picture" },
    { word: "PIANO", clue: "Keyboard instrument" },
    { word: "PIECE", clue: "Part" },
    { word: "PILOT", clue: "Plane driver" },
    { word: "PIZZA", clue: "Italian food" },
    { word: "PLACE", clue: "Location" },
    { word: "PLAIN", clue: "Simple" },
    { word: "PLANE", clue: "Aircraft" },
    { word: "PLANT", clue: "Green organism" },
    { word: "PLATE", clue: "Dish" },
    { word: "POINT", clue: "Sharp end" },
    { word: "POLAR", clue: "Arctic region" },
    { word: "POUND", clue: "Weight unit" },
    { word: "POWER", clue: "Strength" },
    { word: "PRESS", clue: "Push down" },
    { word: "PRICE", clue: "Cost" },
    { word: "PRIDE", clue: "Self-respect" },
    { word: "PRIME", clue: "First" },
    { word: "PRINT", clue: "Text output" },
    { word: "PRIOR", clue: "Before" },
    { word: "PRIZE", clue: "Award" },
    { word: "PROOF", clue: "Evidence" },
    { word: "PROUD", clue: "Self-satisfied" },
    { word: "QUEEN", clue: "Female monarch" },
    { word: "QUICK", clue: "Fast" },
    { word: "QUIET", clue: "Silent" },
    { word: "QUITE", clue: "Rather" },
    { word: "QUOTE", clue: "Citation" },
    { word: "RADAR", clue: "Detection system" },
    { word: "RADIO", clue: "Audio broadcast" },
    { word: "RAISE", clue: "Lift up" },
    { word: "RANCH", clue: "Farm" },
    { word: "RANGE", clue: "Extent" },
    { word: "RAPID", clue: "Fast" },
    { word: "REACH", clue: "Extend to" },
    { word: "REACT", clue: "Respond" },
    { word: "READY", clue: "Prepared" },
    { word: "REALM", clue: "Kingdom" },
    { word: "REPLY", clue: "Answer" },
    { word: "RIDER", clue: "Horse person" },
    { word: "RIDGE", clue: "Mountain top" },
    { word: "RIGHT", clue: "Correct" },
    { word: "RIVER", clue: "Flowing water" },
    { word: "ROBOT", clue: "Mechanical being" },
    { word: "ROMAN", clue: "Ancient empire" },
    { word: "ROYAL", clue: "Kingly" },
    { word: "RUGBY", clue: "Ball sport" },
    { word: "RURAL", clue: "Country area" },
    { word: "SAFER", clue: "More secure" },
    { word: "SAINT", clue: "Holy person" },
    { word: "SALAD", clue: "Vegetable dish" },
    { word: "SALES", clue: "Selling" },
    { word: "SCALE", clue: "Weighing device" },
    { word: "SCENE", clue: "View" },
    { word: "SCORE", clue: "Points" },
    { word: "SENSE", clue: "Feeling" },
    { word: "SERVE", clue: "Help" },
    { word: "SEVEN", clue: "Lucky number" },
    { word: "SHADE", clue: "Shadow" },
    { word: "SHAKE", clue: "Tremble" },
    { word: "SHALL", clue: "Will" },
    { word: "SHAPE", clue: "Form" },
    { word: "SHARE", clue: "Divide" },
    { word: "SHARP", clue: "Pointed" },
    { word: "SHEEP", clue: "Wool animal" },
    { word: "SHEET", clue: "Bed linen" },
    { word: "SHELF", clue: "Storage board" },
    { word: "SHELL", clue: "Outer cover" },
    { word: "SHIFT", clue: "Move" },
    { word: "SHINE", clue: "Glow" },
    { word: "SHIRT", clue: "Upper garment" },
    { word: "SHOCK", clue: "Surprise" },
    { word: "SHOES", clue: "Footwear" },
    { word: "SHOOT", clue: "Fire a gun" },
    { word: "SHORT", clue: "Not tall" },
    { word: "SIGHT", clue: "Vision" },
    { word: "SILLY", clue: "Foolish" },
    { word: "SINCE", clue: "From then" },
    { word: "SKILL", clue: "Ability" },
    { word: "SLEEP", clue: "Rest" },
    { word: "SLICE", clue: "Thin piece" },
    { word: "SLIDE", clue: "Glide" },
    { word: "SMALL", clue: "Little" },
    { word: "SMART", clue: "Intelligent" },
    { word: "SMELL", clue: "Nose sense" },
    { word: "SMILE", clue: "Happy face" },
    { word: "SMOKE", clue: "Fire product" },
    { word: "SNAKE", clue: "Slithering reptile" },
    { word: "SOLAR", clue: "Sun related" },
    { word: "SOLID", clue: "Not liquid" },
    { word: "SOLVE", clue: "Find answer" },
    { word: "SORRY", clue: "Apologetic" },
    { word: "SOUND", clue: "Audio" },
    { word: "SOUTH", clue: "Opposite of north" },
    { word: "SPACE", clue: "Universe" },
    { word: "SPARE", clue: "Extra" },
    { word: "SPEAK", clue: "Talk" },
    { word: "SPEED", clue: "Velocity" },
    { word: "SPEND", clue: "Use money" },
    { word: "SPICE", clue: "Food flavoring" },
    { word: "SPINE", clue: "Backbone" },
    { word: "SPORT", clue: "Athletic activity" },
    { word: "STAGE", clue: "Theater platform" },
    { word: "STAMP", clue: "Mail marker" },
    { word: "STAND", clue: "Be upright" },
    { word: "START", clue: "Begin" },
    { word: "STATE", clue: "Country region" },
    { word: "STEAL", clue: "Take without permission" },
    { word: "STEAM", clue: "Water vapor" },
    { word: "STEEL", clue: "Strong metal" },
    { word: "STEEP", clue: "Sharp incline" },
    { word: "STICK", clue: "Thin branch" },
    { word: "STILL", clue: "Not moving" },
    { word: "STOCK", clue: "Inventory" },
    { word: "STONE", clue: "Rock" },
    { word: "STORE", clue: "Shop" },
    { word: "STORM", clue: "Bad weather" },
    { word: "STORY", clue: "Tale" },
    { word: "STOVE", clue: "Cooking appliance" },
    { word: "STUDY", clue: "Learn" },
    { word: "STYLE", clue: "Fashion" },
    { word: "SUGAR", clue: "Sweet substance" },
    { word: "SUITE", clue: "Hotel room" },
    { word: "SWEET", clue: "Not bitter" },
    { word: "TABLE", clue: "Furniture piece" },
    { word: "TASTE", clue: "Flavor sense" },
    { word: "TEACH", clue: "Educate" },
    { word: "TEETH", clue: "Mouth bones" },
    { word: "THANK", clue: "Show gratitude" },
    { word: "THEME", clue: "Main idea" },
    { word: "THINK", clue: "Use brain" },
    { word: "THIRD", clue: "After second" },
    { word: "THOSE", clue: "Plural of that" },
    { word: "THREE", clue: "Number after two" },
    { word: "THROW", clue: "Toss" },
    { word: "THUMB", clue: "Short finger" },
    { word: "TIGER", clue: "Striped cat" },
    { word: "TIGHT", clue: "Not loose" },
    { word: "TIMER", clue: "Countdown device" },
    { word: "TIRED", clue: "Sleepy" },
    { word: "TITLE", clue: "Name" },
    { word: "TODAY", clue: "This day" },
    { word: "TOOTH", clue: "Mouth bone" },
    { word: "TOPIC", clue: "Subject" },
    { word: "TOTAL", clue: "Sum" },
    { word: "TOUCH", clue: "Feel" },
    { word: "TOUGH", clue: "Hard" },
    { word: "TOWER", clue: "Tall building" },
    { word: "TRACE", clue: "Small amount" },
    { word: "TRACK", clue: "Path" },
    { word: "TRADE", clue: "Exchange" },
    { word: "TRAIL", clue: "Path" },
    { word: "TRAIN", clue: "Rail transport" },
    { word: "TRASH", clue: "Garbage" },
    { word: "TREAT", clue: "Special food" },
    { word: "TREND", clue: "Popular direction" },
    { word: "TRIAL", clue: "Court case" },
    { word: "TRIBE", clue: "Group of people" },
    { word: "TRICK", clue: "Deception" },
    { word: "TRIED", clue: "Attempted" },
    { word: "TRUCK", clue: "Large vehicle" },
    { word: "TRULY", clue: "Really" },
    { word: "TRUTH", clue: "Fact" },
    { word: "ULTRA", clue: "Extreme" },
    { word: "UNCLE", clue: "Parent's brother" },
    { word: "UNDER", clue: "Below" },
    { word: "UNION", clue: "Workers group" },
    { word: "UNITY", clue: "Togetherness" },
    { word: "UNTIL", clue: "Up to" },
    { word: "UPPER", clue: "Higher" },
    { word: "URBAN", clue: "City area" },
    { word: "USUAL", clue: "Normal" },
    { word: "VALID", clue: "Correct" },
    { word: "VALUE", clue: "Worth" },
    { word: "VIDEO", clue: "Moving picture" },
    { word: "VIRUS", clue: "Illness agent" },
    { word: "VISIT", clue: "Go see" },
    { word: "VITAL", clue: "Essential" },
    { word: "VOCAL", clue: "Voice related" },
    { word: "VOICE", clue: "Spoken sound" },
    { word: "WASTE", clue: "Garbage" },
    { word: "WATCH", clue: "Time piece" },
    { word: "WATER", clue: "H2O" },
    { word: "WHEEL", clue: "Round object" },
    { word: "WHERE", clue: "Location question" },
    { word: "WHICH", clue: "What one" },
    { word: "WHITE", clue: "Snow color" },
    { word: "WHOLE", clue: "Complete" },
    { word: "WHOSE", clue: "Belonging to whom" },
    { word: "WHILE", clue: "During" },
    { word: "WIDTH", clue: "How wide" },
    { word: "WOMAN", clue: "Adult female" },
    { word: "WORLD", clue: "Earth" },
    { word: "WORRY", clue: "Anxiety" },
    { word: "WORSE", clue: "More bad" },
    { word: "WORST", clue: "Most bad" },
    { word: "WORTH", clue: "Value" },
    { word: "WOULD", clue: "Conditional verb" },
    { word: "WRITE", clue: "Put on paper" },
    { word: "WRONG", clue: "Incorrect" },
    { word: "YOUNG", clue: "Not old" },
    { word: "YOUTH", clue: "Young age" },
    { word: "ZEBRA", clue: "Striped animal" }
];

// Group dictionary by length
const dictByLength = {};
dictionaryWithClues.forEach(item => {
    const len = item.word.length;
    if (!dictByLength[len]) dictByLength[len] = [];
    dictByLength[len].push(item);
});

console.log('Dictionary loaded:', dictionaryWithClues.length, 'words');

// Show slider dialog to choose number of words
window.autoGenerateCrossword = function () {
    Swal.fire({
        title: '⚡ Generate Crossword',
        html: `
            <div style="padding: 20px;">
                <p style="margin-bottom: 15px; font-size: 14px;">Choose the number of words:</p>
                <input type="range" id="wordCountSlider" min="5" max="50" value="15" 
                    style="width: 100%; cursor: pointer;" 
                    oninput="document.getElementById('wordCountValue').textContent = this.value">
                <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                    <span style="color: #666;">5</span>
                    <span id="wordCountValue" style="font-size: 24px; font-weight: bold; color: #667eea;">15</span>
                    <span style="color: #666;">50</span>
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #999;">
                    More words = larger, more complex puzzle
                </p>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: '⚡ Generate!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#667eea',
        preConfirm: () => {
            return document.getElementById('wordCountSlider').value;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const wordCount = parseInt(result.value);
            generateCrosswordWithWords(wordCount);
        }
    });
};

function getRandomWord(length, usedWords) {
    const words = dictByLength[length];
    if (!words || words.length === 0) return null;

    // Filter out already used words
    const available = words.filter(w => !usedWords.has(w.word));
    if (available.length === 0) return null;

    return available[Math.floor(Math.random() * available.length)];
}

function getRandomWordAny(minLen, maxLen, usedWords) {
    const lengths = [];
    for (let l = minLen; l <= maxLen; l++) {
        if (dictByLength[l]) lengths.push(l);
    }
    if (lengths.length === 0) return null;

    // Shuffle lengths
    lengths.sort(() => Math.random() - 0.5);

    for (const len of lengths) {
        const word = getRandomWord(len, usedWords);
        if (word) return word;
    }
    return null;
}

function generateCrosswordWithWords(targetWordCount) {
    const totCols = $(".box[row=0]").length;
    const totRows = $(".box[col=0]").length;

    console.log('Generating crossword with', targetWordCount, 'words');
    console.log('Grid size:', totRows, 'x', totCols);

    if (totCols < 7 || totRows < 7) {
        Swal.fire({
            icon: 'error',
            title: 'Grid too small',
            text: 'Need at least 7x7 grid'
        });
        return;
    }

    // Show loading
    Swal.fire({
        title: 'Generating...',
        html: `Creating crossword with <b>${targetWordCount}</b> words`,
        timer: 500,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Set ALL cells as disabled (black)
    $(".box").addClass("disabled").val("").attr("data-correct", "");

    const usedWords = new Set();
    const placements = [];

    // Calculate spacing based on target words
    const rowSpacing = Math.max(2, Math.floor(totRows / Math.ceil(targetWordCount / 3)));
    const colSpacing = Math.max(2, Math.floor(totCols / Math.ceil(targetWordCount / 4)));

    // Generate horizontal words at regular intervals
    let wordIndex = 0;
    for (let row = 0; row < totRows && wordIndex < targetWordCount; row += rowSpacing) {
        // Get max word length for this row
        const maxLen = Math.min(totCols - 1, 5);
        const word = getRandomWordAny(3, maxLen, usedWords);

        if (word) {
            usedWords.add(word.word);
            placements.push({
                row: row,
                col: 0,
                direction: 'h',
                wordObj: word
            });
            wordIndex++;
        }
    }

    // Generate vertical words at regular intervals
    for (let col = 0; col < totCols && wordIndex < targetWordCount; col += colSpacing) {
        const maxLen = Math.min(totRows - 1, 5);
        const word = getRandomWordAny(3, maxLen, usedWords);

        if (word) {
            usedWords.add(word.word);
            placements.push({
                row: 0,
                col: col,
                direction: 'v',
                wordObj: word
            });
            wordIndex++;
        }
    }

    // Fill remaining words in alternating pattern
    let alternateRow = rowSpacing;
    let alternateCol = colSpacing;
    let isHorizontal = true;

    while (wordIndex < targetWordCount) {
        const word = getRandomWordAny(3, 5, usedWords);
        if (!word) break;

        usedWords.add(word.word);

        if (isHorizontal) {
            if (alternateRow < totRows) {
                placements.push({
                    row: alternateRow,
                    col: Math.min(alternateCol, totCols - word.word.length),
                    direction: 'h',
                    wordObj: word
                });
                alternateRow += 2;
            }
        } else {
            if (alternateCol < totCols) {
                placements.push({
                    row: Math.min(alternateRow, totRows - word.word.length),
                    col: alternateCol,
                    direction: 'v',
                    wordObj: word
                });
                alternateCol += 2;
            }
        }

        isHorizontal = !isHorizontal;
        wordIndex++;

        // Reset if we've gone too far
        if (alternateRow >= totRows) alternateRow = 1;
        if (alternateCol >= totCols) alternateCol = 1;
    }

    // Place all words on the grid
    placements.forEach(placement => {
        const word = placement.wordObj.word;

        for (let i = 0; i < word.length; i++) {
            let row, col;

            if (placement.direction === 'h') {
                row = placement.row;
                col = placement.col + i;
            } else {
                row = placement.row + i;
                col = placement.col;
            }

            if (row >= 0 && row < totRows && col >= 0 && col < totCols) {
                const cell = $(`.box[row="${row}"][col="${col}"]`);
                cell.removeClass("disabled");
                cell.attr("data-correct", word[i]);
            }
        }
    });

    // Re-numberize
    $("body").hide();
    numberize();
    $("body").show();

    // Fill clues after delay
    setTimeout(() => {
        const hPlacements = placements.filter(p => p.direction === 'h');
        const vPlacements = placements.filter(p => p.direction === 'v');

        $('#fdef input').each(function (index) {
            const dataNumber = $(this).attr('data-number');
            if (hPlacements[index]) {
                $(this).val(`${dataNumber}. ${hPlacements[index].wordObj.clue}`);
            }
        });

        $('#vfdef input').each(function (index) {
            const dataNumber = $(this).attr('data-number');
            if (vPlacements[index]) {
                $(this).val(`${dataNumber}. ${vPlacements[index].wordObj.clue}`);
            }
        });

        Swal.fire({
            icon: 'success',
            title: '🎉 Crossword Generated!',
            html: `
                <div style="text-align: left; padding: 10px;">
                    <p><strong>📊 Statistics:</strong></p>
                    <ul style="list-style: none; padding: 0;">
                        <li>✅ Total words: <strong>${placements.length}</strong></li>
                        <li>→ Across: <strong>${hPlacements.length}</strong></li>
                        <li>↓ Down: <strong>${vPlacements.length}</strong></li>
                    </ul>
                </div>
            `,
            timer: 4000,
            showConfirmButton: true,
            confirmButtonText: 'Great!'
        });
    }, 300);
}

