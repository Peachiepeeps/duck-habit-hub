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

    for (const key of ["lukio", "shinobu", "cheryln", "hibiki", "devlin", "yuzuru", "westley", "circe", "quin"]) {
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
      .replace(/\*(?:happy|content|threaten|angry|smug|thinking)\*\s*/gi, "")
      .replace(/^\((?:winks?|smug)\)\s*/i, "")
      .replace(/\s+\*(?:happy|content|threaten|angry|smug|thinking)\*$/gi, "")
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

  function updateSceneSprites(state){
    if (!state?.el) return;
    const leftFrames = spriteFrames(state.scene.leftId, state.leftPose);
    const rightFrames = spriteFrames(state.scene.rightId, state.rightPose);
    if (leftFrames.length) state.left.src = leftFrames[sceneFrameIndex % leftFrames.length];
    if (rightFrames.length) state.right.src = rightFrames[sceneFrameIndex % rightFrames.length];
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

  function sceneRewardMessage(scene){
    if (scene.id.includes("-")) return "Both Trading Cards unlocked! ♡";
    if (scene.id === "lukio") return "Lukio Duck, Miko's Lukio outfit, and Lukio's card unlocked! ♡";
    return `${scene.title} Duck and Miko's ${scene.title} outfit unlocked! ♡`;
  }

  function markSceneUi(active){
    const selectors = [".peep-combatant", "#enemyCombatant", "#enemyCombatant2", "#buddyCombatant", "#chestLayer", "#commandGrid", "#postFloorActions"];
    selectors.forEach(selector => document.querySelector(selector)?.classList.toggle("love-interest-scene-hidden", active));
    document.querySelector("#battlefield")?.classList.toggle("love-interest-scene-active", active);
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
        state.heart.classList.remove("hidden");
        scene.reward();
        message.textContent = sceneRewardMessage(scene);
        setTimeout(() => {
          stopSceneAnimation();
          state.heart.classList.add("hidden");
          el.classList.add("hidden");
          el.setAttribute("aria-hidden", "true");
          actions.innerHTML = "";
          actions.classList.add("hidden");
          markSceneUi(false);
          open = false;
          if (typeof onFinished === "function") {
            bypassNextRoll = true;
            onFinished();
          }
        }, 1350);
      });
      row.append(next);
      actions.append(row);
      actions.classList.remove("hidden");
    };

    el.classList.remove("hidden");
    el.setAttribute("aria-hidden", "false");
    startSceneAnimation(state);
    render();
    return true;
  }

  function reconcileRecordedRewards(){
    const data = load();
    const root = ensureAll(data);
    let shouldSave = false;
    for (const key of ["lukio", "shinobu", "cheryln", "hibiki", "devlin", "yuzuru", "westley", "circe", "quin"]) {
      if (!root.loveInterests[key]?.encountered) continue;
      unlockCharacter(data, key, { grantCard: key === "lukio", grantDuck: true, grantOutfit: true });
      shouldSave = true;
    }
    const pairChecks = [
      ["shinobuCheryln", ["shinobu", "cheryln"]],
      ["devlinHibiki", ["hibiki", "devlin"]],
      ["westleyYuzuru", ["yuzuru", "westley"]],
      ["circeQuin", ["circe", "quin"]]
    ];
    for (const [pairKey, keys] of pairChecks) {
      if (!root.pairScenes[pairKey]?.cardsGranted) continue;
      unlockCardsOnly(data, keys);
      shouldSave = true;
    }
    if (shouldSave) save(data);
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

    if (root.loveInterests.shinobu.encountered && root.loveInterests.cheryln.encountered && !root.pairScenes.shinobuCheryln.cardsGranted) {
      ids.push("shinobu-cheryln");
    }
    if (root.loveInterests.hibiki.encountered && root.loveInterests.devlin.encountered && !root.pairScenes.devlinHibiki.cardsGranted) {
      ids.push("devlin-hibiki");
    }
    if (root.loveInterests.yuzuru.encountered && root.loveInterests.westley.encountered && !root.pairScenes.westleyYuzuru.cardsGranted) {
      ids.push("westley-yuzuru");
    }
    if (root.loveInterests.circe.encountered && root.loveInterests.quin.encountered && !root.pairScenes.circeQuin.cardsGranted) {
      ids.push("circe-quin");
    }
    return ids;
  }

  function chooseScene(ids){
    const pairScenes = ids.filter(id => id.includes("-"));
    if (pairScenes.length) return pairScenes[Math.floor(Math.random() * pairScenes.length)];
    return ids[Math.floor(Math.random() * ids.length)];
  }

  function maybeBeforeNextEncounter(continueFn){
    if (bypassNextRoll) {
      bypassNextRoll = false;
      return false;
    }
    if (open || !isMiko()) return false;

    const ids = eligibleScenes();
    if (!ids.length) return false;
    if (Math.random() >= SHARED_CHANCE) return false;

    return showScene(chooseScene(ids), continueFn);
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
  window.triggerShinobuCherylnCutscene = function(){ return showScene("shinobu-cheryln"); };
  window.triggerDevlinHibikiCutscene = function(){ return showScene("devlin-hibiki"); };
  window.triggerWestleyYuzuruCutscene = function(){ return showScene("westley-yuzuru"); };
  window.triggerCirceQuinCutscene = function(){ return showScene("circe-quin"); };
})();
