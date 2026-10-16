(function(){
  "use strict";

  const SAVE_KEY = "duckHabitHubSave_v1";
  const SHARED_CHANCE = 0.02;
  const HEART_SRC = "assets/love-interests/lukio/Pixel-heart.png";
  const MIKO_IDLE_1 = "assets/characters/miko/base/idle-1.webp";
  const MIKO_IDLE_2 = "assets/characters/miko/base/idle-2.webp";
  const MIKO_SMUG = "assets/characters/miko/base/smug.webp";

  const CHARACTERS = {
    miko: {
      name: "Miko",
      sprites: { idle1: MIKO_IDLE_1, idle2: MIKO_IDLE_2, smug: MIKO_SMUG }
    },
    lukio: {
      name: "Lukio",
      duckId: "lukio-duck",
      cardId: "r-love-lukio",
      sprites: {
        idle1: "assets/love-interests/lukio/Lukio-idle-1.png",
        idle2: "assets/love-interests/lukio/Lukio-idle-2.png",
        wink: "assets/love-interests/lukio/Lukio-wink.png"
      },
      outfitIds: ["lukio-hair-streak", "lukio-hoodie", "lukio-shorts", "lukio-socks", "lukio-booties"]
    },
    shinobu: {
      name: "Shinobu",
      duckId: "shinobu-duck",
      cardId: "r-love-shinobu",
      sprites: {
        idle1: "assets/love-interests/shinobu/Shinobu-idle-1.png",
        idle2: "assets/love-interests/shinobu/Shinobu-idle-2.png",
        happy: "assets/love-interests/shinobu/Shinobu-happy.png"
      },
      outfitIds: ["shino-beret", "shino-sweater", "shino-jeans", "shino-boots", "shino-sleeve"]
    },
    cheryln: {
      name: "Cheryln",
      duckId: "cheryln-duck",
      cardId: "r-love-cheryln",
      sprites: {
        idle1: "assets/love-interests/cheryln/Cheryln-idle-1.png",
        idle2: "assets/love-interests/cheryln/Cheryln-idle-2.png",
        happy: "assets/love-interests/cheryln/Cheryln-happy.png"
      },
      outfitIds: ["cheryln-hairpin", "cheryln-sweater", "cheryln-shorts", "cheryln-tights", "cheryln-boots"]
    },
    hibiki: {
      name: "Hibiki",
      duckId: "hibiki-duck",
      cardId: "r-love-hibiki",
      sprites: {
        idle1: "assets/love-interests/hibiki/Hibiki-idle-1.png",
        idle2: "assets/love-interests/hibiki/Hibiki-idle-2.png",
        happy: "assets/love-interests/hibiki/Hibiki-happy.png"
      },
      outfitIds: ["hibiki-ribbon", "hibiki-shirt", "hibiki-coat", "hibiki-back-coat", "hibiki-coat-sleeve", "hibiki-shorts", "hibiki-stockings", "hibiki-boots"]
    },
    devlin: {
      name: "Devlin",
      duckId: "devlin-duck",
      cardId: "r-love-devlin",
      sprites: {
        idle1: "assets/love-interests/devlin/Devlin-idle-1.png",
        idle2: "assets/love-interests/devlin/Devlin-idle-2.png",
        angry: "assets/love-interests/devlin/Devlin-angry.png"
      },
      outfitIds: ["devlin-shirt", "devlin-vest", "devlin-tie", "devlin-pants", "devlin-belt", "devlin-loafers", "devlin-bangs-pinned"]
    },
    yuzuru: {
      name: "Yuzuru",
      duckId: "yuzuru-duck",
      cardId: "r-love-yuzuru",
      sprites: {
        idle1: "assets/love-interests/yuzuru/Yuzuru-idle-1.png",
        idle2: "assets/love-interests/yuzuru/Yuzuru-idle-2.png",
        content: "assets/love-interests/yuzuru/Yuzuru-content.png"
      },
      outfitIds: ["yuzuru-shirt", "yuzuru-shorts", "yuzuru-socks", "yuzuru-shoes", "yuzuru-bracelet"]
    },
    westley: {
      name: "Westley",
      duckId: "westley-duck",
      cardId: "r-love-westley",
      sprites: {
        idle1: "assets/love-interests/westley/Westley-idle-1.png",
        idle2: "assets/love-interests/westley/Westley-idle-2.png",
        happy: "assets/love-interests/westley/Westley-happy.png"
      },
      outfitIds: ["westley-top", "westley-jacket", "westley-sleeve", "westley-pants", "westley-boots", "westley-face-makeup"]
    },
    circe: {
      name: "Circe",
      duckId: "circe-duck",
      cardId: "r-love-circe",
      sprites: {
        idle1: "assets/love-interests/circe/Circe-idle-1.png",
        idle2: "assets/love-interests/circe/Circe-idle-2.png",
        happy: "assets/love-interests/circe/Circe-happy.png"
      },
      outfitIds: ["circe-tank-top", "circe-sweater", "circe-sleeve", "circe-shorts", "circe-stockings", "circe-shoes", "circe-choker"]
    },
    quin: {
      name: "Quin",
      duckId: "quin-duck",
      cardId: "r-love-quin",
      sprites: {
        idle1: "assets/love-interests/quin/Quin-idle-1.png",
        idle2: "assets/love-interests/quin/Quin-idle-2.png",
        threaten: "assets/love-interests/quin/Quin-threaten.png"
      },
      outfitIds: ["quin-shirt", "quin-jacket", "quin-back-jacket", "quin-sleeve", "quin-shorts", "quin-boots", "quin-hairpins"]
    },
kiri: {
      name: "Kiri",
      duckId: "kiri-duck",
      cardId: "r-love-kiri",
      sprites: {
        idle1: "assets/love-interests/kiri/Kiri-idle-1.png",
        idle2: "assets/love-interests/kiri/Kiri-idle-2.png",
        worried: "assets/love-interests/kiri/Kiri-worried.png"
      },
      outfitIds: ["kiri-top", "kiri-sleeve", "kiri-capris", "kiri-socks", "kiri-shoes", "kiri-hairpiece"]
    },
    midori: {
      name: "Midori",
      duckId: "midori-duck",
      cardId: "r-love-midori",
      sprites: {
        idle1: "assets/love-interests/midori/Midori-opened.png",
        idle2: "assets/love-interests/midori/Midori-closed.png",
        smug: "assets/love-interests/midori/Midori-opened-smug.png"
      },
      outfitIds: ["midori-suit", "midori-sleeve", "midori-shorts", "midori-stockings", "midori-boots", "midori-scarf", "midori-low-ponytail"]
    },
    luka: {
      name: "Luka",
      duckId: "luka-duck",
      cardId: "r-love-luka",
      sprites: {
        idle1: "assets/love-interests/luka/Luka-idle-1.png",
        idle2: "assets/love-interests/luka/Luka-idle-2.png",
        calm: "assets/love-interests/luka/Luka-calm.png"
      },
      outfitIds: ["luka-shirt", "luka-jacket", "luka-jeans", "luka-sneakers", "luka-back-hair", "luka-bangs"]
    },
    cybil: {
      name: "Cybil",
      duckId: "cybil-duck",
      cardId: "r-love-cybil",
      sprites: {
        idle1: "assets/love-interests/cybil/Cybil-idle-1.png",
        idle2: "assets/love-interests/cybil/Cybil-idle-2.png",
        worried: "assets/love-interests/cybil/Cybil-worried.png"
      },
      outfitIds: ["cybil-shirt", "cybil-vest", "cybil-sleeve", "cybil-shorts", "cybil-stockings", "cybil-boots", "cybil-ponytail"]
    },
    nico: {
      name: "Nico",
      duckId: "nico-duck",
      cardId: "r-love-nico",
      sprites: {
        idle1: "assets/love-interests/nico/Nico-idle-1.png",
        idle2: "assets/love-interests/nico/Nico-idle-2.png",
        happy: "assets/love-interests/nico/Nico-happy.png"
      },
      outfitIds: ["nico-shirt", "nico-jacket", "nico-sleeve", "nico-shorts", "nico-socks", "nico-shoes", "nico-hat", "nico-back-bow"]
    },
    nene: {
      name: "Nene",
      duckId: "nene-duck",
      cardId: "r-love-nene",
      sprites: {
        idle1: "assets/love-interests/nene/Nene-idle-1.png",
        idle2: "assets/love-interests/nene/Nene-idle-2.png",
        happy: "assets/love-interests/nene/Nene-happy.png"
      },
      outfitIds: ["nene-shirt", "nene-shirt-sleeve", "nene-sweater", "nene-sweater-sleeve", "nene-pants", "nene-shoes", "nene-glasses"]
    },
    moriko: {
      name: "Moriko",
      duckId: "moriko-duck",
      cardId: "r-love-moriko",
      sprites: {
        idle1: "assets/love-interests/moriko/Moriko-idle-1.png",
        idle2: "assets/love-interests/moriko/Moriko-idle-2.png",
        chill: "assets/love-interests/moriko/Moriko-chill.png"
      },
      outfitIds: ["moriko-hoodie", "moriko-sleeve", "moriko-pants", "moriko-shoes", "moriko-necklace", "moriko-hair", "moriko-bangs"]
    },
    jenson: {
      name: "Jenson",
      duckId: "jenson-duck",
      cardId: "r-love-jenson",
      sprites: {
        idle1: "assets/love-interests/jenson/Jenson-Sprite-idle-1.png",
        idle2: "assets/love-interests/jenson/Jenson-Sprite-idle-2.png",
        happy: "assets/love-interests/jenson/Jenson-Sprite-happy.png"
      },
      outfitIds: ["jenson-top", "jenson-pants", "jenson-shoes", "jenson-glasses"]
    }
  };

  const SCENES = {
    lukio: {
      id: "lukio",
      title: "Lukio",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "lukio",
      dialogue: [
        { speaker: "Miko", text: "Lukio! There you are!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Lukio", text: "Hey babe! What are you doing here?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Just finding cute buddies and exploring. Have you seen the others?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Lukio", text: "Hmm, I’ve seen some here or there. I bet most are home. Wanna head back with me?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Yeah! Let’s hold hands!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Lukio", text: "(Winks) Alright. Then here, I found these.", leftPose: "idle", rightPose: "wink" },
        { speaker: "Miko", text: "(smug) A gift? For me? You’re too sweet!", leftPose: "smug", rightPose: "idle1" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "lukio", { grantCard: true, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("lukio");
      }
    },
    shinobu: {
      id: "shinobu",
      title: "Shinobu",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "shinobu",
      dialogue: [
        { speaker: "Miko", text: "Shinobu! What are you doing here?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Oh, Hello, Miko. I’m just coming back from work. Are you heading home as well?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Yeah! Wanna walk together?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Yes. I’d like that.", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Hey, have you seen Midori?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Oh. Yeah, Lukio threw him into a dumpster for tampering with his hair dye. He’s been gone ever since.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Ehhhhh?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Oh, right. I found this. You can have it, I suppose.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Oh! Thanks, Shino!", leftPose: "smug", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "shinobu", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("shinobu");
      }
    },
    cheryln: {
      id: "cheryln",
      title: "Cheryln",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "cheryln",
      dialogue: [
        { speaker: "Miko", text: "Oh, hey Chery! Looking for Shinobu?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Cheryln", text: "Yup! They wandered away from me again.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "I can help you find them! I wouldn’t mind some Shino and Chery time!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Cheryln", text: "That’d be sweet! Thank you! Think maybe Midori kidnapped them?", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Hmm, I don’t think so, but it’s possible.", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Cheryln", text: "*happy* It’s cool, Shino can handle themselves if need be. Nee, I found this! You can have it!", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Ohhh, thank you, Chery!!!", leftPose: "smug", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "cheryln", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("cheryln");
      }
    },
    hibiki: {
      id: "hibiki",
      title: "Hibiki",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "hibiki",
      dialogue: [
        { speaker: "Miko", text: "Hey Biki! What cha doing out here?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Hibiki", text: "Eek… You scared me. I was looking for herbs to use for my experiments…", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Oops, sorry, Sweetie. You want some help?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Hibiki", text: "*happy* Oh, would you? I’d love some help. I’m looking for this flower. It’s orange.", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Hmm.. Okay, let’s look around!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Hibiki", text: "*Happy* Yeah! Thanks, Miko!", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "No problem. Wait, does Devlin know where you went?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Hibiki", text: "Oh I…Oh no. I forgot. I got so excited that I just went out. He’s probably worried.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Let’s grab that flower and head back, mmkay?", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Hibiki", text: "Yes please!!", leftPose: "smug", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "hibiki", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("hibiki");
      }
    },
    devlin: {
      id: "devlin",
      title: "Devlin",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "devlin",
      dialogue: [
        { speaker: "Miko", text: "Devlin! Whats up?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Devlin", text: "*Angry* …Where is he?", leftPose: "idle", rightPose: "angry" },
        { speaker: "Miko", text: "Just gonna assume you mean your wifey. Biki’s in the backyard now. I brought him home.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Devlin", text: "Oh… Thank god. I thought he may fall off a cliff or something looking for materials.", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Miko", text: "*smug* Ehehe… Yeah, that sounds like him. Common, let’s head back. I know you get grumpy without your wifey.", leftPose: "smug", rightPose: "idle2" },
        { speaker: "Devlin", text: "*angry* Shut it…", leftPose: "smug", rightPose: "angry" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "devlin", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("devlin");
      }
    },
    yuzuru: {
      id: "yuzuru",
      title: "Yuzuru",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "yuzuru",
      dialogue: [
        { speaker: "Miko", text: "Yuzu! Yo! What are you doing here?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Yuzuru", text: "Cybil sent me to find Westley. He got distracted and wandered away and she finished his new coat.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "That so? I’ll help you find him then!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Yuzuru", text: "Thanks. I don’t mind the company. I’m kinda sleepy. Can I hold your arm?", leftPose: "idle", rightPose: "content" },
        { speaker: "Miko", text: "Of course, love.", leftPose: "smug", rightPose: "content" },
        { speaker: "Yuzuru", text: "*content* Thanks… Oh, uh, here. I found this and I don’t need it.", leftPose: "smug", rightPose: "content" },
        { speaker: "Miko", text: "Aww, thanks!", leftPose: "smug", rightPose: "idle1" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "yuzuru", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("yuzuru");
      }
    },
    westley: {
      id: "westley",
      title: "Westley",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "westley",
      dialogue: [
        { speaker: "Miko", text: "There you are! Yuzu’s looking for you, silly!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Westley", text: "Oh, oops! I better go find her! I think I am lost though. Hehe.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "*smug* Silly boy. Alright, alright, I’ll take care of ya.", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Westley", text: "Thanks! Oh, I gotta practice later! Wanna come listen?", leftPose: "smug", rightPose: "happy" },
        { speaker: "Miko", text: "Oh, sounds fun! I’ll cheer ya on!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Westley", text: "*Happy* Thanks! Oh oh oh, Here! A gift for you!!", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Thank you, Wes! This is so cute!", leftPose: "smug", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "westley", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("westley");
      }
    },
    circe: {
      id: "circe",
      title: "Circe",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "circe",
      dialogue: [
        { speaker: "Miko", text: "Circe! What’s up?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Circe", text: "Hey Meeks! What’s up?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Just wandering around, having fun!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Circe", text: "*Happy* Same here! Wanna go cause trouble together?", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "*smug* Hell yea! Who are we gonna mess with?", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Circe", text: "I dunno, let’s see where the day takes us!", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Woooo!", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Circe", text: "Oh, and here! It’s so cute, I thought of you! Take it!", leftPose: "smug", rightPose: "happy" },
        { speaker: "Miko", text: "Thanks, Circ! This is great!", leftPose: "smug", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "circe", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("circe");
      }
    },
    quin: {
      id: "quin",
      title: "Quin",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "quin",
      dialogue: [
        { speaker: "Miko", text: "Oh, Quin! Hey there, handsome. You…doing something I shouldn’t see orrr…?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Quin", text: "Hm? Oh, no. The girls wanted some sweets. I was going to go get some for them.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Oh! That’s so sweet, papa bear. Can I come?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Quin", text: "Is that so you can get something sweet?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Hehehe… guilty.", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Narrator", text: "*Loud crash*", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Quin", text: "*threaten* This better not be a threat.", leftPose: "idle", rightPose: "threaten" },
        { speaker: "Miko", text: "Eh?! It was just a random enemy! Nothing too scary!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Quin", text: "Oh. Alright then. Maybe I could tame one for my girls.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Uh, yeah, good idea.", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Miko", text: "*Thinking* Scary…", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Quin", text: "Also, I found this. I figured I’d give it to you so the girls don’t bicker over it. Here you go!", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Thanks! This is cute!", leftPose: "smug", rightPose: "idle1" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "quin", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("quin");
      }
    },
kiri: {
      id: "kiri",
      title: "Kiri",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "kiri",
      dialogue: [
        { speaker: "Miko", text: "Kiri! Hi!!!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Kiri", text: "Oh um, hey Miko. Have you seen Midori…? Anytime he’s gone for more than an hour I worry.", leftPose: "idle", rightPose: "worried" },
        { speaker: "Miko", text: "Oh, yeah! Lukio threw him in the dumpster.", leftPose: "idle", rightPose: "worried" },
        { speaker: "Kiri", text: "A-Again?!", leftPose: "idle", rightPose: "worried" },
        { speaker: "Miko", text: "This happened before?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Kiri", text: "Unfortunately… I should go find him. Thank you for letting me know, Miko!", leftPose: "idle", rightPose: "worried" },
        { speaker: "Miko", text: "No problem, Kiri!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Kiri", text: "Here, I found this. I think you should have it. It’ll just get messy when I get him out of there anyways.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Hehe, thanks. I appreciate it!", leftPose: "smug", rightPose: "idle1" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "kiri", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("kiri");
      }
    },
    midori: {
      id: "midori",
      title: "Midori",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "midori",
      dialogue: [
        { speaker: "Miko", text: "Lalalalala…", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Midori", text: "Hello, Miko!", leftPose: "idle", rightPose: "smug" },
        { speaker: "Miko", text: "EEK! Midori!!! Don’t scare me!!", leftPose: "idle", rightPose: "smug" },
        { speaker: "Midori", text: "Apologies, I couldn’t help it.", leftPose: "idle", rightPose: "smug" },
        { speaker: "Miko", text: "What happened? Why are you in there?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Midori", text: "Oh, I tested Lukio. He was not happy.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "He… oh??", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Midori", text: "Here you go! I found this!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Miko", text: "In the trash…?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Midori", text: "No, silly. I was thrown in here with it.", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Miko", text: "Oh, in that case, thanks! Need help out of there?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Midori", text: "No thank you, I’ll wait for Kiri. I like watching her reactions.", leftPose: "idle", rightPose: "smug" },
        { speaker: "Miko", text: "Oh… Have fun?", leftPose: "idle", rightPose: "smug" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "midori", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("midori");
      }
    },
    luka: {
      id: "luka",
      title: "Luka",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "luka",
      dialogue: [
        { speaker: "Miko", text: "Lukkkaaa… Hi there, handsome.", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Luka", text: "Oh, hello, Miko. You’re so sweet. What brings you here?", leftPose: "smug", rightPose: "calm" },
        { speaker: "Miko", text: "Just wandering around! What about you?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Luka", text: "Just finding inspiration for a new song. This area is such a lovely muse.", leftPose: "idle", rightPose: "calm" },
        { speaker: "Miko", text: "Ohh, I can’t wait to hear. I love hearing your songs.", leftPose: "smug", rightPose: "calm" },
        { speaker: "Luka", text: "And you, too, are a muse to me. Such lively and playful music I think of when I see you.", leftPose: "smug", rightPose: "calm" },
        { speaker: "Miko", text: "Ahhhhhhh, so cute…", leftPose: "smug", rightPose: "calm" },
        { speaker: "Luka", text: "Thank you. Also, I found these. Please accept them.", leftPose: "smug", rightPose: "idle2" },
        { speaker: "Miko", text: "Ohhh, thank you!!!", leftPose: "smug", rightPose: "calm" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "luka", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("luka");
      }
    },
    cybil: {
      id: "cybil",
      title: "Cybil",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "cybil",
      dialogue: [
        { speaker: "Miko", text: "Hey, Cyb. What cha doing out here?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Cybil", text: "Oh, I was looking for some of my siblings. My father sent me to go give them some new clothing pieces.", leftPose: "idle", rightPose: "worried" },
        { speaker: "Miko", text: "Oohhh, let me help you with those.", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Cybil", text: "Thank you, Miko. I appreciate it.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Anytime, my love.", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Cybil", text: "My father is working on some jackets for you and Lukio.", leftPose: "smug", rightPose: "idle2" },
        { speaker: "Miko", text: "Awww, really?! That’s so nice of papa bear!", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Cybil", text: "I suppose it is… I’m glad he accepts my lifestyle.", leftPose: "idle", rightPose: "worried" },
        { speaker: "Miko", text: "Same here!", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Cybil", text: "Oh, you can take this, by the way. I have no need for it.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Ohhh, thank you!", leftPose: "smug", rightPose: "idle1" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "cybil", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("cybil");
      }
    },
    nico: {
      id: "nico",
      title: "Nico",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "nico",
      dialogue: [
        { speaker: "Miko", text: "Nicooo! Hows it going?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Nico", text: "Hello, Miko! Going well, just going on a walk before we set up the carnival.", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Ooohhh, mind if I join ya?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Nico", text: "Please do, I’d love some company.", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Yayyy! Nee, I saw Annika doing stretches earlier. Does one have to be born that flexible, or can one learn it?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Nico", text: "Are you wanting to become more flexible?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Miko", text: "Hehe, it’d be useful.", leftPose: "smug", rightPose: "idle2" },
        { speaker: "Nico", text: "I can train you, but you may regret it.", leftPose: "smug", rightPose: "happy" },
        { speaker: "Miko", text: "…I’m more interested.", leftPose: "smug", rightPose: "happy" },
        { speaker: "Nico", text: "How cute. Oh, here you go. I found this.", leftPose: "smug", rightPose: "happy" },
        { speaker: "Miko", text: "Ohhh, thank you!!", leftPose: "smug", rightPose: "happy" },
        { speaker: "Nico", text: "You’re very welcome. Shall we?", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "We shall!", leftPose: "idle", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "nico", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("nico");
      }
    },
    nene: {
      id: "nene",
      title: "Nene",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "nene",
      dialogue: [
        { speaker: "Miko", text: "Nene! Are you okay?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Nene", text: "Hm? Miko? Oh, yeah! I’m just lost in thought. I have a few more tickets for the carnival to sell. But I’m not sure where I should go to sell them.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Oh, need help? I’ll be happy to work for you and Nico!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Nene", text: "You will? Oh. Thank you, Darlin’! You’re so sweet!", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Hehehe, Anytime!", leftPose: "smug", rightPose: "happy" },
        { speaker: "Nene", text: "I have 10 more tickets… Think we can sell them? I’d love to tell Nico I sold out the show.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Of course! You got a super cute guy with you! I’ll be eye candy! People will be begging for tickets!", leftPose: "smug", rightPose: "idle1" },
        { speaker: "Nene", text: "Hehe, you’re right. Oh, here’s some payment for the help! Ain’t it cute?", leftPose: "smug", rightPose: "happy" },
        { speaker: "Miko", text: "Ohhh, thanks, Nene!", leftPose: "smug", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "nene", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("nene");
      }
    },
    moriko: {
      id: "moriko",
      title: "Moriko",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "moriko",
      dialogue: [
        { speaker: "Miko", text: "Morriiii!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Moriko", text: "Oh, hey Miko. Sup?", leftPose: "idle", rightPose: "chill" },
        { speaker: "Miko", text: "Not much! Just wandering around! What about you?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Moriko", text: "I visited some of my family, now I figured I’d head home and relax.", leftPose: "idle", rightPose: "chill" },
        { speaker: "Miko", text: "Oh, I adore your family! They’re all so fun!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Moriko", text: "Yeah, they like you as well.", leftPose: "idle", rightPose: "chill" },
        { speaker: "Miko", text: "I like hearing that! We should visit your parents soon too.", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Moriko", text: "I’d like that. I’m sure dad is missing us.", leftPose: "idle", rightPose: "chill" },
        { speaker: "Miko", text: "Your dad is so much better than mine… Sighhh.", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Moriko", text: "*thinking* They’re like, literally the exact same personality but okayyy…", leftPose: "idle", rightPose: "chill" },
        { speaker: "Moriko", text: "Oh, right. Found this. Here ya go~", leftPose: "idle", rightPose: "chill" },
        { speaker: "Miko", text: "Yayyy gifts!!! Thank you!", leftPose: "smug", rightPose: "chill" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "moriko", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("moriko");
      }
    },
    jenson: {
      id: "jenson",
      title: "Jenson",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "jenson",
      dialogue: [
        { speaker: "Miko", text: "Jenson? What are you doing here?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Jenson", text: "Oh, hey Miko. I’m playing hide and seek with the kids.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Ohhh, can I help?!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Jenson", text: "Yeah, I’m sure they’ll love that. Help me find them, they’re really good.", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Will do! Come here, my babbiess!!!", leftPose: "idle", rightPose: "happy" },
        { speaker: "Jenson", text: "*chuckles*", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Let’s see… Can I get a reward?", leftPose: "smug", rightPose: "happy" },
        { speaker: "Jenson", text: "Sure! You can have this!", leftPose: "smug", rightPose: "happy" },
        { speaker: "Miko", text: "*Thinking* I was thinking a kiss, but that’s damn cute.", leftPose: "smug", rightPose: "happy" },
        { speaker: "Miko", text: "Thanks! I love it!", leftPose: "smug", rightPose: "happy" },
        { speaker: "Jenson", text: "Now common, let’s find them.", leftPose: "idle", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "jenson", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        notifyUnlock("jenson");
      }
    },
    "kiri-midori": {
      id: "kiri-midori",
      title: "Kiri + Midori",
      kicker: "LOVERS REUNITE",
      leftId: "kiri",
      rightId: "midori",
      dialogue: [
        { speaker: "Kiri", text: "W…which dumpster…?", leftPose: "worried", rightPose: "idle1" },
        { speaker: "Midori", text: "*pops out* Hello!", leftPose: "worried", rightPose: "smug" },
        { speaker: "Kiri", text: "AHHHH!!! MIDORI!", leftPose: "worried", rightPose: "smug" },
        { speaker: "Midori", text: "Hehe.. I’m here.", leftPose: "worried", rightPose: "smug" },
        { speaker: "Kiri", text: "Don’t scare me!", leftPose: "worried", rightPose: "idle1" },
        { speaker: "Midori", text: "I thought you liked horror.", leftPose: "worried", rightPose: "smug" },
        { speaker: "Kiri", text: "Shock is not horror, dummy!!", leftPose: "worried", rightPose: "smug" },
        { speaker: "Midori", text: "Either way.", leftPose: "idle2", rightPose: "idle2" },
        { speaker: "Kiri", text: "Ughhhhh, just… let me help you get out of there.", leftPose: "worried", rightPose: "idle1" },
        { speaker: "Midori", text: "Ahh, thank you!", leftPose: "idle2", rightPose: "smug" },
        { speaker: "Kiri", text: "W..whatever…", leftPose: "worried", rightPose: "smug" }
      ],
      reward() {
        const data = load();
        const root = ensureAll(data);
        unlockCardsOnly(data, ["kiri", "midori"]);
        root.pairScenes.kiriMidori = root.pairScenes.kiriMidori || {};
        root.pairScenes.kiriMidori.seen = true;
        root.pairScenes.kiriMidori.cardsGranted = true;
        save(data);
        notifyUnlock("kiri-midori");
      }
    },
    "luka-cybil": {
      id: "luka-cybil",
      title: "Luka + Cybil",
      kicker: "LOVERS REUNITE",
      leftId: "cybil",
      rightId: "luka",
      dialogue: [
        { speaker: "Cybil", text: "Oh, Luka… Hello.", leftPose: "idle1", rightPose: "idle1" },
        { speaker: "Luka", text: "I can see that you look stressed. Would you like to take a walk with me?", leftPose: "worried", rightPose: "calm" },
        { speaker: "Cybil", text: "Oh, how can you tell?", leftPose: "worried", rightPose: "calm" },
        { speaker: "Luka", text: "I just can. Your inner song isn’t in harmony.", leftPose: "worried", rightPose: "calm" },
        { speaker: "Cybil", text: "I see… I suppose, a walk would help.", leftPose: "worried", rightPose: "calm" },
        { speaker: "Luka", text: "I’d be happy to listen if you need.", leftPose: "worried", rightPose: "calm" },
        { speaker: "Cybil", text: "I…suppose I am just worried. My sister keeps running off, and I worry she could get hurt.", leftPose: "worried", rightPose: "calm" },
        { speaker: "Luka", text: "That’s very sweet to worry. But I think you should give her some trust. She’s a tough little girl. But it’s understandable why you’d be concerned.", leftPose: "worried", rightPose: "calm" }
      ],
      reward() {
        const data = load();
        const root = ensureAll(data);
        unlockCardsOnly(data, ["luka", "cybil"]);
        root.pairScenes.lukaCybil = root.pairScenes.lukaCybil || {};
        root.pairScenes.lukaCybil.seen = true;
        root.pairScenes.lukaCybil.cardsGranted = true;
        save(data);
        notifyUnlock("luka-cybil");
      }
    },
    "nico-nene": {
      id: "nico-nene",
      title: "Nico + Nene",
      kicker: "LOVERS REUNITE",
      leftId: "nico",
      rightId: "nene",
      dialogue: [
        { speaker: "Nico", text: "Oh, Nene, there you are, dear.", leftPose: "happy", rightPose: "idle1" },
        { speaker: "Nene", text: "Sorry, it took me a bit long, but I sold all the tickets for Tonight’s show with Miko!", leftPose: "happy", rightPose: "happy" },
        { speaker: "Nico", text: "Is that so? Thank you so much. I’ll thank Miko later as well. I appreciate how you’re always helping the carnival.", leftPose: "happy", rightPose: "happy" },
        { speaker: "Nene", text: "Of course! It’s my baby just as much as yours at this point. Hehe!", leftPose: "happy", rightPose: "happy" },
        { speaker: "Nico", text: "That’s true. My siblings appreciate it as well. Annika said she was going to bring some cookies.", leftPose: "happy", rightPose: "happy" },
        { speaker: "Nene", text: "Yayyy! That’s wonderful. She’s such a sweetie.", leftPose: "happy", rightPose: "happy" },
        { speaker: "Nico", text: "Shall we head home?", leftPose: "happy", rightPose: "happy" },
        { speaker: "Nene", text: "Yes, let’s go!", leftPose: "happy", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        const root = ensureAll(data);
        unlockCardsOnly(data, ["nico", "nene"]);
        root.pairScenes.nicoNene = root.pairScenes.nicoNene || {};
        root.pairScenes.nicoNene.seen = true;
        root.pairScenes.nicoNene.cardsGranted = true;
        save(data);
        notifyUnlock("nico-nene");
      }
    },
    "moriko-jenson": {
      id: "moriko-jenson",
      title: "Moriko + Jenson",
      kicker: "LOVERS REUNITE",
      leftId: "moriko",
      rightId: "jenson",
      dialogue: [
        { speaker: "Moriko", text: "Jenson, there you are. What’s up?", leftPose: "chill", rightPose: "idle1" },
        { speaker: "Jenson", text: "Oh, I just got done playing with Miko and the kids.", leftPose: "chill", rightPose: "happy" },
        { speaker: "Moriko", text: "Oh, sounds fun. Probably gotta get some rest after all that.", leftPose: "chill", rightPose: "happy" },
        { speaker: "Jenson", text: "That does sound nice, but I should grade some paperwork..", leftPose: "chill", rightPose: "idle2" },
        { speaker: "Moriko", text: "Hmm, I’ll make some tea. I’ll help ya so you can rest up sooner.", leftPose: "chill", rightPose: "idle2" },
        { speaker: "Jenson", text: "That is so sweet of you. Thank you, I will accept your help.", leftPose: "chill", rightPose: "happy" },
        { speaker: "Moriko", text: "I appreciate your dedication to teaching the kids. There’s no harm in taking pride in your work. Just make sure you rest as well.", leftPose: "chill", rightPose: "happy" },
        { speaker: "Jenson", text: "I will. Thank you, I don’t know where I’d be without you.", leftPose: "chill", rightPose: "happy" },
        { speaker: "Moriko", text: "Common, let’s go.", leftPose: "chill", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        const root = ensureAll(data);
        unlockCardsOnly(data, ["moriko", "jenson"]);
        root.pairScenes.morikoJenson = root.pairScenes.morikoJenson || {};
        root.pairScenes.morikoJenson.seen = true;
        root.pairScenes.morikoJenson.cardsGranted = true;
        save(data);
        notifyUnlock("moriko-jenson");
      }
    },
    "circe-quin": {
      id: "circe-quin",
      title: "Circe + Quin",
      kicker: "LOVERS REUNITE",
      leftId: "quin",
      rightId: "circe",
      dialogue: [
        { speaker: "Quin", text: "*threaten* That should take care of that….", leftPose: "threaten", rightPose: "idle1" },
        { speaker: "Circe", text: "Quin! There you are! Oh, you busy?", leftPose: "idle1", rightPose: "idle2" },
        { speaker: "Quin", text: "Not anymore. What’s up?", leftPose: "idle2", rightPose: "idle1" },
        { speaker: "Circe", text: "*happy* I was bored. Awww, you got some blood on your cheek! Let me get that for ya.", leftPose: "idle1", rightPose: "happy" },
        { speaker: "Quin", text: "Thank you, Circe.", leftPose: "idle2", rightPose: "idle1" },
        { speaker: "Circe", text: "No problem at all! Can’t have ya scaring the girlies. Speaking of which, they begged me to make them that soup I made the other day. Wanna come with me to get the ingredients?", leftPose: "idle1", rightPose: "happy" },
        { speaker: "Quin", text: "Of course. Thanks for indulging them.", leftPose: "idle2", rightPose: "idle1" },
        { speaker: "Circe", text: "*Happy* No problem! They’re my daughters too now.", leftPose: "idle1", rightPose: "happy" },
        { speaker: "Quin", text: "Yeah, you’re right. I’m glad.", leftPose: "idle2", rightPose: "idle1" }
      ],
      reward() {
        const data = load();
        const root = ensureAll(data);
        unlockCardsOnly(data, ["circe", "quin"]);
        root.pairScenes.circeQuin = root.pairScenes.circeQuin || {};
        root.pairScenes.circeQuin.seen = true;
        root.pairScenes.circeQuin.cardsGranted = true;
        save(data);
        notifyUnlock("circe-quin");
      }
    },
    "shinobu-cheryln": {
      id: "shinobu-cheryln",
      title: "Shinobu + Cheryln",
      kicker: "LOVERS REUNITE",
      leftId: "cheryln",
      rightId: "shinobu",
      dialogue: [
        { speaker: "Cheryln", text: "*Happy* There you are!", leftPose: "happy", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Oh, sorry, were you looking for me?", leftPose: "happy", rightPose: "idle2" },
        { speaker: "Cheryln", text: "Yeah, but it’s cool! Miko helped me!", leftPose: "happy", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Ahhh, I saw Miko too. But it’s okay, I was just working.", leftPose: "happy", rightPose: "idle2" },
        { speaker: "Cheryln", text: "Oh, I forgot you covered a shift! Oops!", leftPose: "happy", rightPose: "idle1" },
        { speaker: "Shinobu", text: "It’s okay… I appreciate you coming to find me. *Happy*", leftPose: "happy", rightPose: "happy" },
        { speaker: "Cheryln", text: "*Happy* Anytime, my love! Now, let’s go back to the others!", leftPose: "happy", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        const root = ensureAll(data);
        unlockCardsOnly(data, ["shinobu", "cheryln"]);
        root.pairScenes.shinobuCheryln = root.pairScenes.shinobuCheryln || {};
        root.pairScenes.shinobuCheryln.seen = true;
        root.pairScenes.shinobuCheryln.cardsGranted = true;
        save(data);
        notifyUnlock("shinobu-cheryln");
      }
    },
    "devlin-hibiki": {
      id: "devlin-hibiki",
      title: "Devlin + Hibiki",
      kicker: "LOVERS REUNITE",
      leftId: "devlin",
      rightId: "hibiki",
      dialogue: [
        { speaker: "Devlin", text: "There you are! Stop running off on me.", leftPose: "angry", rightPose: "idle1" },
        { speaker: "Hibiki", text: "Oh, sorry, hon… I just got so excited…", leftPose: "idle1", rightPose: "idle2" },
        { speaker: "Devlin", text: "Ugh… It’s fine. I was just worried. Did you find good stuff?", leftPose: "idle2", rightPose: "idle1" },
        { speaker: "Hibiki", text: "*happy* Yeah! This flower Miko helped me find is a super great find! It creates a calming smell.", leftPose: "idle1", rightPose: "happy" },
        { speaker: "Hibiki", text: "*Happy* I thought I could make it into an oil to blend into your embalming stuff so you’ll be nice and calm during work.", leftPose: "idle1", rightPose: "happy" },
        { speaker: "Devlin", text: "Is that so…? Thank you, Hibiki. Let’s go back to work, okay? Take my hand.", leftPose: "idle2", rightPose: "idle1" },
        { speaker: "Hibiki", text: "Okay! Hehe…", leftPose: "idle2", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        const root = ensureAll(data);
        unlockCardsOnly(data, ["hibiki", "devlin"]);
        root.pairScenes.devlinHibiki = root.pairScenes.devlinHibiki || {};
        root.pairScenes.devlinHibiki.seen = true;
        root.pairScenes.devlinHibiki.cardsGranted = true;
        save(data);
        notifyUnlock("devlin-hibiki");
      }
    },
    "westley-yuzuru": {
      id: "westley-yuzuru",
      title: "Westley + Yuzuru",
      kicker: "LOVERS REUNITE",
      leftId: "westley",
      rightId: "yuzuru",
      dialogue: [
        { speaker: "Westley", text: "*Happy* Yuzuruuuuu!!!", leftPose: "happy", rightPose: "idle1" },
        { speaker: "Yuzuru", text: "Oh. There you are. Cybil wants ya. And I’m sleepy. You should carry me home.", leftPose: "idle1", rightPose: "idle2" },
        { speaker: "Westley", text: "Sure, love love!", leftPose: "happy", rightPose: "content" },
        { speaker: "Yuzuru", text: "*content* I would like to listen to you practice today… It’s comforting… I can nap to that.", leftPose: "idle2", rightPose: "content" },
        { speaker: "Westley", text: "Heck yeah! I should invite everyone! Cuddle pile after practice!", leftPose: "happy", rightPose: "idle1" },
        { speaker: "Yuzuru", text: "*content* Cuddle pile…sounds nice…", leftPose: "idle1", rightPose: "content" }
      ],
      reward() {
        const data = load();
        const root = ensureAll(data);
        unlockCardsOnly(data, ["yuzuru", "westley"]);
        root.pairScenes.westleyYuzuru = root.pairScenes.westleyYuzuru || {};
        root.pairScenes.westleyYuzuru.seen = true;
        root.pairScenes.westleyYuzuru.cardsGranted = true;
        save(data);
        notifyUnlock("westley-yuzuru");
      }
    }
  };

  let open = false;
  let bypassNextRoll = false;

  function load(){
    try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "{}"); }
    catch (_) { return {}; }
  }

  function save(data){
    if (typeof window.DuckieQuestLoveRewardSync === "function") {
      try {
        if (window.DuckieQuestLoveRewardSync(data)) return;
      } catch (_) {}
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  }

  function ensureAll(data){
    data.loveInterests = data.loveInterests && typeof data.loveInterests === "object" ? data.loveInterests : {};
    data.characterUnlockedItems = data.characterUnlockedItems && typeof data.characterUnlockedItems === "object" ? data.characterUnlockedItems : {};
    if (!Array.isArray(data.characterUnlockedItems.miko)) data.characterUnlockedItems.miko = [];
    if (!Array.isArray(data.unlockedDucks)) data.unlockedDucks = [];
    data.duckCollectionCounts = data.duckCollectionCounts && typeof data.duckCollectionCounts === "object" ? data.duckCollectionCounts : {};
    data.tradingCards = data.tradingCards && typeof data.tradingCards === "object" ? data.tradingCards : {};
    data.tradingCards.owned = data.tradingCards.owned && typeof data.tradingCards.owned === "object" ? data.tradingCards.owned : {};
    data.tradingCards.unseen = Array.isArray(data.tradingCards.unseen) ? data.tradingCards.unseen : [];
    data.loveInterestPairs = data.loveInterestPairs && typeof data.loveInterestPairs === "object" ? data.loveInterestPairs : {};
    data.loveInterestPairs.shinobuCheryln = data.loveInterestPairs.shinobuCheryln && typeof data.loveInterestPairs.shinobuCheryln === "object" ? data.loveInterestPairs.shinobuCheryln : {};
    data.loveInterestPairs.devlinHibiki = data.loveInterestPairs.devlinHibiki && typeof data.loveInterestPairs.devlinHibiki === "object" ? data.loveInterestPairs.devlinHibiki : {};
    data.loveInterestPairs.westleyYuzuru = data.loveInterestPairs.westleyYuzuru && typeof data.loveInterestPairs.westleyYuzuru === "object" ? data.loveInterestPairs.westleyYuzuru : {};
    data.loveInterestPairs.circeQuin = data.loveInterestPairs.circeQuin && typeof data.loveInterestPairs.circeQuin === "object" ? data.loveInterestPairs.circeQuin : {};
    data.loveInterestPairs.kiriMidori = data.loveInterestPairs.kiriMidori && typeof data.loveInterestPairs.kiriMidori === "object" ? data.loveInterestPairs.kiriMidori : {};
    data.loveInterestPairs.lukaCybil = data.loveInterestPairs.lukaCybil && typeof data.loveInterestPairs.lukaCybil === "object" ? data.loveInterestPairs.lukaCybil : {};
    data.loveInterestPairs.nicoNene = data.loveInterestPairs.nicoNene && typeof data.loveInterestPairs.nicoNene === "object" ? data.loveInterestPairs.nicoNene : {};
    data.loveInterestPairs.morikoJenson = data.loveInterestPairs.morikoJenson && typeof data.loveInterestPairs.morikoJenson === "object" ? data.loveInterestPairs.morikoJenson : {};

    for (const key of ["lukio", "shinobu", "cheryln", "hibiki", "devlin", "yuzuru", "westley", "circe", "quin", "kiri", "midori", "luka", "cybil", "nico", "nene", "moriko", "jenson"]) {
      data.loveInterests[key] = data.loveInterests[key] && typeof data.loveInterests[key] === "object" ? data.loveInterests[key] : {};
    }
    return {
      loveInterests: data.loveInterests,
      pairScenes: data.loveInterestPairs
    };
  }

  function activeCharacterId(){
    const data = load();
    return String(data?.duckQuest?.activeCharacter || data?.selectedCharacter || "").trim().toLowerCase();
  }

  function isMiko(){
    return activeCharacterId() === "miko";
  }

  function notifyUnlock(id){
    window.dispatchEvent(new CustomEvent("duckie-love-interest-unlocked", { detail: { id } }));
  }

  function grantCard(data, cardId, amount){
    if (window.DuckieTradingCards?.grantCard) {
      window.DuckieTradingCards.grantCard(data, cardId, amount || 1);
      return;
    }
    data.tradingCards = data.tradingCards && typeof data.tradingCards === "object" ? data.tradingCards : {};
    data.tradingCards.owned = data.tradingCards.owned && typeof data.tradingCards.owned === "object" ? data.tradingCards.owned : {};
    data.tradingCards.unseen = Array.isArray(data.tradingCards.unseen) ? data.tradingCards.unseen : [];
    const before = Math.max(0, Number(data.tradingCards.owned[cardId] || 0));
    data.tradingCards.owned[cardId] = before + (amount || 1);
    if (before === 0 && !data.tradingCards.unseen.includes(cardId)) {
      data.tradingCards.unseen.push(cardId);
    }
  }

  function unlockCharacter(data, key, options){
    const cfg = CHARACTERS[key];
    const state = ensureAll(data).loveInterests[key];
    state.encountered = true;
    state.spritesUnlocked = true;
    if (options.grantDuck) {
      state.duckUnlocked = true;
      if (!data.unlockedDucks.includes(cfg.duckId)) data.unlockedDucks.push(cfg.duckId);
      data.duckCollectionCounts[cfg.duckId] = Math.max(1, Number(data.duckCollectionCounts[cfg.duckId] || 0));
    }
    if (options.grantOutfit) {
      state.outfitUnlocked = true;
      for (const piece of cfg.outfitIds) {
        if (!data.characterUnlockedItems.miko.includes(piece)) data.characterUnlockedItems.miko.push(piece);
      }
    }
    if (options.grantCard) {
      state.cardUnlocked = true;
      const owned = Math.max(0, Number(data.tradingCards?.owned?.[cfg.cardId] || 0));
      if (owned < 1) grantCard(data, cfg.cardId, 1);
    }
    if (!state.unlockedAt) state.unlockedAt = Date.now();
  }

  function unlockCardsOnly(data, keys){
    const root = ensureAll(data);
    for (const key of keys) {
      const cfg = CHARACTERS[key];
      const state = root.loveInterests[key];
      state.cardUnlocked = true;
      const owned = Math.max(0, Number(data.tradingCards?.owned?.[cfg.cardId] || 0));
      if (owned < 1) grantCard(data, cfg.cardId, 1);
    }
  }

  let sceneFrameTimer = null;
  let sceneFrameIndex = 0;

  function cleanDialogueText(value){
    return String(value || "")
      .replace(/\*(?:happy|content|threaten|angry|smug|thinking|worried|calm|chill)\*\s*/gi, "")
      .replace(/^\((?:winks?|smug)\)\s*/i, "")
      .replace(/\s+\*(?:happy|content|threaten|angry|smug|thinking|worried|calm|chill)\*$/gi, "")
      .trim();
  }

  function spriteFrames(charId, pose){
    const cfg = CHARACTERS[charId];
    if (!cfg) return [];
    const p = String(pose || (charId === "miko" ? "idle" : "idle1")).toLowerCase();
    const idle = [cfg.sprites.idle1, cfg.sprites.idle2].filter(Boolean);
    if (p === "idle" || p === "idle1" || p === "idle2" || p === "neutral") {
      return idle.length ? idle : Object.values(cfg.sprites).filter(Boolean).slice(0, 1);
    }
    const special = cfg.sprites[p] || cfg.sprites[pose];
    return special ? [special] : (idle.length ? idle : []);
  }

  function stopSceneAnimation(){
    if (sceneFrameTimer) clearInterval(sceneFrameTimer);
    sceneFrameTimer = null;
  }

  function sceneLayer(){
    const battlefield = document.querySelector("#battlefield");
    if (!battlefield) return null;
    let el = battlefield.querySelector(".love-interest-battle-scene");
    if (el) return el;
    el = document.createElement("div");
    el.className = "love-interest-battle-scene hidden";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `
      <img class="love-interest-battle-sprite love-interest-battle-left" src="" alt="">
      <span class="love-interest-battle-heart hidden"><img src="${HEART_SRC}" alt=""></span>
      <img class="love-interest-battle-sprite love-interest-battle-right" src="" alt="">`;
    battlefield.append(el);
    return el;
  }

  function sizeSceneSprite(img){
    const battlefield = document.querySelector("#battlefield");
    if (!img || !battlefield || !img.naturalWidth || !img.naturalHeight) return;
    // All battle portraits were drawn pixel-for-pixel against Miko's source
    // sprite. Scale one source pixel by the same amount for every character so
    // taller/shorter source canvases keep their intended height differences.
    const referenceHeight = 96;
    const referenceDisplayHeight = Math.max(120, battlefield.clientHeight * 0.76);
    const sourcePixelScale = referenceDisplayHeight / referenceHeight;
    img.style.width = `${Math.round(img.naturalWidth * sourcePixelScale)}px`;
    img.style.height = `${Math.round(img.naturalHeight * sourcePixelScale)}px`;
  }

  function setSceneSpriteSource(img, src){
    if (!img || !src) return;
    if (img.getAttribute("src") === src) {
      if (img.complete) sizeSceneSprite(img);
      return;
    }
    img.src = src;
    if (img.complete) sizeSceneSprite(img);
  }

  function updateSceneSprites(state){
    if (!state?.el) return;
    const leftFrames = spriteFrames(state.scene.leftId, state.leftPose);
    const rightFrames = spriteFrames(state.scene.rightId, state.rightPose);
    if (leftFrames.length) setSceneSpriteSource(state.left, leftFrames[sceneFrameIndex % leftFrames.length]);
    if (rightFrames.length) setSceneSpriteSource(state.right, rightFrames[sceneFrameIndex % rightFrames.length]);
  }

  function startSceneAnimation(state){
    stopSceneAnimation();
    sceneFrameIndex = 0;
    updateSceneSprites(state);
    sceneFrameTimer = setInterval(() => {
      sceneFrameIndex = (sceneFrameIndex + 1) % 2;
      updateSceneSprites(state);
    }, 520);
  }

  function sceneRewardItems(scene){
    if (scene.id.includes("-")) {
      return scene.title.split(" + ").map(name => `${name} Trading Card`);
    }
    const items=[`${scene.title} Duck`, `Miko's ${scene.title} Outfit`];
    if(scene.id==="lukio") items.push("Lukio Trading Card");
    return items;
  }

  function buildSceneRewardPopup(scene,onContinue){
    const popup=document.createElement("div");
    popup.className="love-interest-reward-popup-v290";
    const label=document.createElement("span");
    label.className="mini-label";
    label.textContent="OBTAINED!";
    const title=document.createElement("h3");
    title.textContent=scene.id.includes("-")?"Reunion Rewards!":`${scene.title} Rewards!`;
    const list=document.createElement("div");
    list.className="love-interest-reward-list-v290";
    sceneRewardItems(scene).forEach(item=>{
      const row=document.createElement("div");
      row.className="love-interest-reward-item-v290";
      row.textContent=item;
      list.append(row);
    });
    const button=document.createElement("button");
    button.type="button";
    button.className="pixel-button primary";
    button.textContent="Continue";
    button.addEventListener("click",onContinue,{once:true});
    popup.append(label,title,list,button);
    return popup;
  }

  function markSceneUi(active){
    // Hide the entire normal battle layer while the scene portraits are on the
    // battlefield. In particular, hiding the whole commandStage removes the
    // giant empty mobile command area and guarantees there is only ONE Miko.
    const selectors = ["#battlefield > .peep-combatant", "#enemyCombatant", "#enemyCombatant2", "#buddyCombatant", "#chestLayer", "#commandStage", "#postFloorActions"];
    selectors.forEach(selector => {
      const node = document.querySelector(selector);
      if (!node) return;
      node.classList.toggle("love-interest-scene-hidden", active);
      if (active) {
        if (!node.dataset.loveInterestPreviousDisplay) node.dataset.loveInterestPreviousDisplay = node.style.display || "__empty__";
        node.style.setProperty("display", "none", "important");
      } else {
        const previous = node.dataset.loveInterestPreviousDisplay;
        node.style.removeProperty("display");
        if (previous && previous !== "__empty__") node.style.display = previous;
        delete node.dataset.loveInterestPreviousDisplay;
      }
    });
    document.querySelector("#battlefield")?.classList.toggle("love-interest-scene-active", active);
    document.querySelector("#battleScreen .battle-ui")?.classList.toggle("love-interest-dialogue-active", active);
  }

  function showScene(sceneId, onFinished){
    const scene = SCENES[sceneId];
    if (!scene || open) return false;
    const el = sceneLayer();
    const message = document.querySelector("#battleMessage");
    const actions = document.querySelector("#eventChoiceActions");
    if (!el || !message || !actions) return false;

    open = true;
    markSceneUi(true);
    const encounterLabel = document.querySelector("#encounterLabel");
    if (encounterLabel) encounterLabel.textContent = `${scene.kicker || "LOVE INTEREST"} · ${scene.title}`;

    const state = {
      scene,
      el,
      left: el.querySelector(".love-interest-battle-left"),
      right: el.querySelector(".love-interest-battle-right"),
      heart: el.querySelector(".love-interest-battle-heart"),
      leftPose: scene.leftId === "miko" ? "idle" : "idle1",
      rightPose: scene.rightId === "miko" ? "idle" : "idle1"
    };
    state.left.alt = CHARACTERS[scene.leftId]?.name || scene.leftId;
    state.right.alt = CHARACTERS[scene.rightId]?.name || scene.rightId;
    state.left.onload = () => sizeSceneSprite(state.left);
    state.right.onload = () => sizeSceneSprite(state.right);

    let index = 0;
    const render = () => {
      const step = scene.dialogue[index];
      state.leftPose = step.leftPose || state.leftPose;
      state.rightPose = step.rightPose || state.rightPose;
      updateSceneSprites(state);
      const clean = cleanDialogueText(step.text);
      message.textContent = step.speaker === "Narrator" ? clean : `${step.speaker}: ${clean}`;
      actions.innerHTML = "";
      const row = document.createElement("div");
      row.className = "love-interest-dialogue-actions";
      const next = document.createElement("button");
      next.type = "button";
      next.className = "pixel-button primary";
      const last = index >= scene.dialogue.length - 1;
      next.textContent = last ? "Finish" : "Next";
      next.addEventListener("click", () => {
        if (!last) {
          index += 1;
          render();
          return;
        }
        next.disabled = true;
        stopSceneAnimation();
        state.heart.classList.remove("hidden");
        scene.reward();
        message.classList.add("love-interest-reward-message-hidden-v290");
        actions.innerHTML = "";

        const closeScene = () => {
          if (state.resizeHandler) window.removeEventListener("resize", state.resizeHandler);
          state.left.onload = null;
          state.right.onload = null;
          state.heart.classList.add("hidden");
          el.classList.add("hidden");
          el.setAttribute("aria-hidden", "true");
          actions.innerHTML = "";
          actions.classList.add("hidden");
          message.classList.remove("love-interest-reward-message-hidden-v290");
          markSceneUi(false);
          open = false;
          if (typeof onFinished === "function") {
            bypassNextRoll = true;
            onFinished();
          }
        };

        actions.append(buildSceneRewardPopup(scene,closeScene));
        actions.classList.remove("hidden");
      });
      row.append(next);
      actions.append(row);
      actions.classList.remove("hidden");
    };

    el.classList.remove("hidden");
    el.setAttribute("aria-hidden", "false");
    state.resizeHandler = () => { sizeSceneSprite(state.left); sizeSceneSprite(state.right); };
    window.addEventListener("resize", state.resizeHandler);
    startSceneAnimation(state);
    render();
    return true;
  }

  function reconcileRecordedRewards(){
    const data = load();
    const root = ensureAll(data);
    let shouldSave = false;
    for (const key of ["lukio", "shinobu", "cheryln", "hibiki", "devlin", "yuzuru", "westley", "circe", "quin", "kiri", "midori", "luka", "cybil", "nico", "nene", "moriko", "jenson"]) {
      if (!root.loveInterests[key]?.encountered) continue;
      unlockCharacter(data, key, { grantCard: key === "lukio", grantDuck: true, grantOutfit: true });
      shouldSave = true;
    }
    const pairChecks = [
      ["shinobuCheryln", ["shinobu", "cheryln"]],
      ["devlinHibiki", ["hibiki", "devlin"]],
      ["westleyYuzuru", ["yuzuru", "westley"]],
      ["circeQuin", ["circe", "quin"]],
      ["kiriMidori", ["kiri", "midori"]],
      ["lukaCybil", ["luka", "cybil"]],
      ["nicoNene", ["nico", "nene"]],
      ["morikoJenson", ["moriko", "jenson"]]
    ];
    for (const [pairKey, keys] of pairChecks) {
      if (!root.pairScenes[pairKey]?.cardsGranted) continue;
      unlockCardsOnly(data, keys);
      shouldSave = true;
    }
    if (shouldSave) save(data);
  }

  // LUV_BIRDIE_FOCUS_V262: Luv & Birdie can temporarily weight one Miko love interest.
  function luvBirdieFocus(data){
    const focus=data?.luvBirdieFocusV262;
    if(!focus || !focus.characterId || Number(focus.rollsRemaining)<=0) return null;
    return focus;
  }

  function eligibleScenes(){
    const data = load();
    const root = ensureAll(data);
    const ids = [];

    if (!root.loveInterests.lukio.encountered) ids.push("lukio");
    if (!root.loveInterests.shinobu.encountered) ids.push("shinobu");
    if (!root.loveInterests.cheryln.encountered) ids.push("cheryln");
    if (!root.loveInterests.hibiki.encountered) ids.push("hibiki");
    if (!root.loveInterests.devlin.encountered) ids.push("devlin");
    if (!root.loveInterests.yuzuru.encountered) ids.push("yuzuru");
    if (!root.loveInterests.westley.encountered) ids.push("westley");
    if (!root.loveInterests.circe.encountered) ids.push("circe");
    if (!root.loveInterests.quin.encountered) ids.push("quin");
    if (!root.loveInterests.kiri.encountered) ids.push("kiri");
    if (!root.loveInterests.midori.encountered) ids.push("midori");
    if (!root.loveInterests.luka.encountered) ids.push("luka");
    if (!root.loveInterests.cybil.encountered) ids.push("cybil");
    if (!root.loveInterests.nico.encountered) ids.push("nico");
    if (!root.loveInterests.nene.encountered) ids.push("nene");
    if (!root.loveInterests.moriko.encountered) ids.push("moriko");
    if (!root.loveInterests.jenson.encountered) ids.push("jenson");

    const focus=luvBirdieFocus(data);
    if(focus && CHARACTERS[focus.characterId] && !ids.includes(focus.characterId)) ids.push(focus.characterId);

    if (root.loveInterests.shinobu.encountered && root.loveInterests.cheryln.encountered && !root.pairScenes.shinobuCheryln.cardsGranted) ids.push("shinobu-cheryln");
    if (root.loveInterests.hibiki.encountered && root.loveInterests.devlin.encountered && !root.pairScenes.devlinHibiki.cardsGranted) ids.push("devlin-hibiki");
    if (root.loveInterests.yuzuru.encountered && root.loveInterests.westley.encountered && !root.pairScenes.westleyYuzuru.cardsGranted) ids.push("westley-yuzuru");
    if (root.loveInterests.circe.encountered && root.loveInterests.quin.encountered && !root.pairScenes.circeQuin.cardsGranted) ids.push("circe-quin");
    if (root.loveInterests.kiri.encountered && root.loveInterests.midori.encountered && !root.pairScenes.kiriMidori.cardsGranted) ids.push("kiri-midori");
    if (root.loveInterests.luka.encountered && root.loveInterests.cybil.encountered && !root.pairScenes.lukaCybil.cardsGranted) ids.push("luka-cybil");
    if (root.loveInterests.nico.encountered && root.loveInterests.nene.encountered && !root.pairScenes.nicoNene.cardsGranted) ids.push("nico-nene");
    if (root.loveInterests.moriko.encountered && root.loveInterests.jenson.encountered && !root.pairScenes.morikoJenson.cardsGranted) ids.push("moriko-jenson");
    return ids;
  }

  function chooseScene(ids, data){
    const focus=luvBirdieFocus(data);
    if(focus && ids.includes(focus.characterId)){
      const weighted=[];
      ids.forEach(id=>{const weight=id===focus.characterId?Math.max(1,Number(focus.weight)||3):1;for(let i=0;i<weight;i++)weighted.push(id);});
      return weighted[Math.floor(Math.random()*weighted.length)];
    }
    const pairScenes = ids.filter(id => id.includes("-"));
    if (pairScenes.length) return pairScenes[Math.floor(Math.random() * pairScenes.length)];
    return ids[Math.floor(Math.random() * ids.length)];
  }

  function maybeBeforeNextEncounter(continueFn){
    if (bypassNextRoll) { bypassNextRoll = false; return false; }
    if (open || !isMiko()) return false;

    const data=load();
    const ids = eligibleScenes();
    if (!ids.length) return false;
    if (Math.random() >= SHARED_CHANCE) return false;

    const chosen=chooseScene(ids,data);
    const focus=luvBirdieFocus(data);
    if(focus){
      focus.rollsRemaining=Math.max(0,Number(focus.rollsRemaining)-1);
      if(chosen===focus.characterId || focus.rollsRemaining<=0) delete data.luvBirdieFocusV262;
      save(data);
    }
    return showScene(chosen, continueFn);
  }

  reconcileRecordedRewards();

  window.DuckieLoveInterests = window.DuckieLoveInterests || {};
  window.DuckieLoveInterests.activeCharacterId = activeCharacterId;
  window.DuckieLoveInterests.chance = SHARED_CHANCE;
  window.DuckieLoveInterests.maybeBeforeNextEncounter = maybeBeforeNextEncounter;
  window.DuckieLoveInterests.trigger = showScene;
  window.triggerLukioEncounter = function(){ return showScene("lukio"); };
  window.triggerShinobuEncounter = function(){ return showScene("shinobu"); };
  window.triggerCherylnEncounter = function(){ return showScene("cheryln"); };
  window.triggerHibikiEncounter = function(){ return showScene("hibiki"); };
  window.triggerDevlinEncounter = function(){ return showScene("devlin"); };
  window.triggerYuzuruEncounter = function(){ return showScene("yuzuru"); };
  window.triggerWestleyEncounter = function(){ return showScene("westley"); };
  window.triggerCirceEncounter = function(){ return showScene("circe"); };
  window.triggerQuinEncounter = function(){ return showScene("quin"); };
  window.triggerKiriEncounter = function(){ return showScene("kiri"); };
  window.triggerMidoriEncounter = function(){ return showScene("midori"); };
  window.triggerLukaEncounter = function(){ return showScene("luka"); };
  window.triggerCybilEncounter = function(){ return showScene("cybil"); };
  window.triggerNicoEncounter = function(){ return showScene("nico"); };
  window.triggerNeneEncounter = function(){ return showScene("nene"); };
  window.triggerMorikoEncounter = function(){ return showScene("moriko"); };
  window.triggerJensonEncounter = function(){ return showScene("jenson"); };
  window.triggerShinobuCherylnCutscene = function(){ return showScene("shinobu-cheryln"); };
  window.triggerDevlinHibikiCutscene = function(){ return showScene("devlin-hibiki"); };
  window.triggerWestleyYuzuruCutscene = function(){ return showScene("westley-yuzuru"); };
  window.triggerCirceQuinCutscene = function(){ return showScene("circe-quin"); };
  window.triggerKiriMidoriCutscene = function(){ return showScene("kiri-midori"); };
  window.triggerLukaCybilCutscene = function(){ return showScene("luka-cybil"); };
  window.triggerNicoNeneCutscene = function(){ return showScene("nico-nene"); };
  window.triggerMorikoJensonCutscene = function(){ return showScene("moriko-jenson"); };
})();
