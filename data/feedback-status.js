// Feedback status data for tracking submitted feedback entries
export const FEEDBACK_ENTRIES = [
    {
        id: 'feedback_1775287989398_vtnnqbszu',
        subject: 'Squires are considered heroes',
        dateSubmitted: '2026-04-04',
        message: 'Hi. Im trying to make a bretonnian chapel guard (1c) list, but the program considers squires to be heroes, when theyre henchmen. This makes me unable to buy more than 1, when in fact I can have 5. This makes the army pretty much unusable on this website. Please change squires to henchmen.',
        status: 'completed',
        notes: 'Accidentally added Hero state to squires instead of henchmen in json.'
    },
    {
        id: 'feedback_1775301213679_yklmn5iuo',
        subject: 'Dwarf Treasure Hunters cant add equiptment',
        dateSubmitted: '2026-04-04',
        message: 'Dwarf treasure hunters cant add equipment',
        status: 'completed',
        notes: 'Bug impacted all Dwarf Warbands and Hochland Bandits.'
    },
    {
        id: 'feedback_1776084846730_8jdfpliyc',
        subject: 'Duelling Pistols - Brace',
        dateSubmitted: '2026-04-13',
        message: 'Hi. I tried to add a brace of dueling pistols to my Witch Hunter Captain. The item it actually adds is Shield, Pavaise.',
        status: 'completed',
        notes: 'Pavaise and Brace of Duelling Pistols had the same ID. Provided updated ID for Brace of Duelling Pistols and updated all warbands.'
    },
    {
        id: 'feedback_1776452641528_fdc24uudg',
        subject: 'Campaign Manager?',
        dateSubmitted: '2026-04-13',
        message: 'Just found this, great looking site so far. Just tested my fave marauders and seems to work out ok. Im curious how to add mounts and if theres any future Campaign Manager Planned. Just an ability to link warbands, record wins/losses, notes. maybe even assign rewards and trade at real wishful thinking? Thanks for your time and effort on a great product!',
        status: 'completed',
        notes: 'Im looking into the mount question, Im seeing that mounts are avaialble to purchase when editing an existing fighter using the select equpment option in the fighter screen. When adding a new fighter the application limits equipment to that of the starting table for the warband. Ive never played Mauraders so Im looking into if I need to add mounts as starting equipment option for them. I also checked the Hung, they do get Warhorses at 40 gold but that is again in the edit fighter screen not the add fighter. Regarding the campaign manager question, yes I do eventually intend to implement one (I have to keep telling myself to not bite off more than I can chew). I want to get this roster builder out of Alpha first and at least into a Beta state.\n\n--4/19/2026--\n\nFrom what Im seeing in the rules a fighter at creation can only select items that are listed in the warbands tables. I did implement a bug fix though that is a workaround. The Override Equipment Restrictions in the add fighter screen will now enable all item categories. This maintains the structure of adding a new fighter and limits the addition to only items listed in the waband table, but also allows you to bypass that and select the horse.'
    },
    {
        id: 'feedback_1777103742842_k7c2uu4rg',
        subject: 'Import New Recruit txt export',
        dateSubmitted: '2026-04-25',
        message: 'Have the ability to copy and paste the New Recruit txt export into a zone and it would convert it directly into the application format',
        status: 'on-hold',
        notes: '--4/27/2026--\nI will look into implementing this after I get my own json formatting cleaned up.'
    },
    {
        id: 'feedback_1777127354925_9z6r1zjh7',
        subject: 'Copy Warband option',
        dateSubmitted: '2026-04-25',
        message: 'Hello. I think it would be a good feature to be able to copy a warband on the homepage. Just a third button next to View Roster that would duplicate a warband list as a new entry.',
        status: 'completed',
        notes: '--4/27/2026--\nI will add this feature in a future update.\n\n--5/4/2026--\nImplemented a copy warband feature along side the new V2 save structure. The copy warband feature will copy the waband and if it is not a V2 save structure will update the copy to be V2.'
    },
    {
        id: 'feedback_1777313055152_xyyrqf6yr',
        subject: 'Add Equipment expenditure missing in ledger',
        dateSubmitted: '2026-04-27',
        message: 'When adding equipment to the Warband Storage, the correct amount of gc gets subtracted from the treasury, but the transaction doesnt show up in the Warband Ledger. Thanks for creating this awesome app!',
        status: 'completed',
        notes: '--4/27/2026--\nThank you for pointing that out I will fix this bug in a near future update.\n\n--5/6/2026--\nStorage additions and removals should now show up in the ledger.'
    },
    {
        id: 'feedback_1777313794645_igl8bs2sf',
        subject: 'Custom cost when adding equipment to warrior',
        dateSubmitted: '2026-04-27',
        message: 'An option to add equipment directly to warriors at a custom cost would be very nice.',
        status: 'completed',
        notes: '--4/27/2026--\nGood idea, I will add this feature in a near future update.\n\n--5/15/2026--\nFeature implemented'
    },
    {
        id: 'feedback_1778084908797_zdqt0uk55',
        subject: 'Mazzalupo 2a',
        dateSubmitted: '2026-05-06',
        message: 'Mazzalupo arent included in the grade 2a rosters list"',
        status: 'completed',
        notes: '--5/6/2026--\nI will start adding this warband\n\n--5/8/2026--\nWarband added'
    },
    {
        id: 'feedback_1778084908797_zdqt0uk55',
        subject: 'Naming hired swords breaks their warband rating',
        dateSubmitted: '2026-05-19',
        message: 'A hired sword that has had their name changed no longer gives their starting warband rating score. As in when I added a warlock it gives 16 warband rating, but when I changed its name my warband rating looses that 16. The rating does increase with experience still. I tested around for a couple minutes and this issue happened with the 2 other hired swords I randomly picked. Seems to only happen with hired swords and not henchmen or heroes.',
        status: 'completed',
        notes: '--5/20/2026--\nFound root cause and implemented a fix. The hired sword may need to be removed and readded. Also warband save file will need to be File Version 2, which is the newest version automatically used when creating a warband. (visible in warband card under Your Warbands screen.). Fix pushed, leaving this open as I do a bit more testing for edge cases.\n\n--5/22/2026--\nNot seeing this behaviour occuuring anymore.'
    },
    {
        id: 'feedback_1779546218124_bh34m6kvh',
        subject: 'Some buttons are hard to see',
        dateSubmitted: '2026-05-23',
        message: 'Some buttons are hard to see. Took me about 5 minutes, not hyperbole, to find the create warband button. The button is the same color as the background and the text is also a dark blue that makes it blend into the background. it turns a mustard yellow when highlighted which is nice. Heck even the Submit feedback button has a similar version of this problem, though to be fair the text color does allow it to be more visible. Thank you for the wonderfully helpful site',
        status: 'completed',
        notes: '--5/23/2026--\nAgreed! Going to update the dark blue fonts to white.\n\n--5/26/2026--\nUpdated all the buttons to get rid of the dark blue text on blue background.'
    },
    {
        id: 'feedback_1779610042046_7hdxuy619',
        subject: 'Mounts not adding to warband score correctly',
        dateSubmitted: '2026-05-24',
        message: 'Hi There, Ive created a couple of warbands lately that have a Warhorse in them, and its not adding the required 5 warband score to the total value. Is this an error? Can this be changed manually some how? THanks.',
        status: 'completed',
        notes: '--5/24/2026--\nThank you for pointing this out. A fix is in work.\n\n--5/29/2026--\nWarhorses and Horses now add to the warband rating. Selecting Warband Rating will give a breakdown for each type of fighter and thier contributions to the rating.'
    },
    {
        id: 'feedback_1779664438270_7xqzx38pf',
        subject: 'Tried to select undead as warband',
        dateSubmitted: '2026-05-24',
        message: 'Thanks for starting this! I am very excited to see how this comes along. I am an iPhone user and I am trying to make an undead warband but when I select undead nothing seems to happen. I will check back soon to see how things are going.',
        status: 'completed',
        notes: '--5/24/2026--\nI need to find someone with an iPhone and test this. If you are on the Mordheim Discord there is a section for grimheim under List Builders. If you drop a screenshot there that would be helpful.\n\n--6/8/2026--\nI have been unable to reproduce this.'
    },
    {
        id: 'feedback_1779755835884_tvcgwn478',
        subject: 'Warband Rating appears off',
        dateSubmitted: '2026-05-25',
        message: 'I like the app, and hope to use it in a campaign. I was manually calculating my warband rating and came up with something completely different than the app did. The App has it at 81, while I calculated out 93. 9 warriors with a total of 36 exp plus 1 elf ranger. (9x5)+36+12=93 Thanks Russell',
        status: 'completed',
        notes: '--5/25/2026--\nIt appears a fix for one issue regarding ratings introduced another. Working on a fix.\n\n--5/29/2026--\nThe fix has been implemented. If the rating does not update then the hired sword will need to be removed and readded. Selecting Warband Rating will give a breakdown for each type of fighter and thier contributions to the rating.'
    },
    {
        id: 'feedback_1779766006240_0pe8rkaoj',
        subject: 'lizardmen missing javelins',
        dateSubmitted: '2026-05-25',
        message: 'Hi, I noticed javelins are not available for skinks in character creation, and even in post-initial creation, they can not be added. Skinks deserve their javelins.',
        status: 'completed',
        notes: '--5/25/2026--\nThey most certainly do, update has been made.'
    },
    {
        id: 'feedback_1780201051129_uey258gxq',
        subject: 'Ability to manually edit members',
        dateSubmitted: '2026-05-31',
        message: 'The ability to manually change stats or skills. Ive noticed minor glitches where one of my heroes randomly lost an advancement. My only fix seems to be delete the hero and give myself the gold to buy him back. Instead it would be convenient to just manually give myself a stat increase',
        status: 'completed',
        notes: '--5/31/2026--\nWorking on getting the ability to manually change stat numbers added back into the app. Skills can already be manually added via the skill override in the edit fighter screen. \n\n--6/01/2026--\nFun fact, the ability to change characteristic scores was still present, however the visual indicator had been removed. I updated the edit fighter screen so that now there is an "Override" button like with the rest of the sections. I made some additional changes to how the code manages stat increases and injuries. If the numbers are not adding up removing and readding the fighter should help. I also included a breakout in the characteristic override section that shows what is being applied to the fighter.'
    },
    {
        id: 'feedback_1780339919102_6hzdvucki',
        subject: 'Special rules split is not a function',
        dateSubmitted: '2026-06-01',
        message: 'When finishing up Post-Battle for my warband, it gave the following error in a pop-up message: Uncaught TypeError: special_rules.split is not a function Upon exiting the roster, and trying to open it again, it now refuses to load, and repeats this error everytime. The button does not seemingly do anything but bring up the error. There was no other change to the roster when I had it open.',
        status: 'completed',
        notes: '--6/01/2026--\nWow that was a crazy one. Fix has been implemented ctrl+f5 will force the browser to pull down the latest code. I included a function that will fix the warband that was damaged by this bug and implemented a fix for the bug. Thank you for submitting this one as feedback.'
    },
    {
        id: 'feedback_1780496529421_2506n8sdn',
        subject: 'Night Goblins web implementation missing',
        dateSubmitted: '2026-06-03',
        message: 'Heya, the Night Goblins (web) warband seems to be missing from the 1c warbands? Night Goblins regular is there, but theres a different version of them that (imo) has more interesting and complex rules, up on Mordheimer and Broheim at https://broheim.net/downloads/warbands/web/Night%20Goblins%20TBMF.pdf and https://mordheimer.net/docs/warbands/grade-1c-warbands/night-goblins-web . If these could be added that would be awesome thank you, but no worries if not/if it conflicts with the other warband of the same name.',
        status: 'completed',
        notes: '--6/03/2026--\nI will add them\n\n--6/04/2026--\nNight Goblins Web version has been added'
    },
    {
        id: 'feedback_1780644568563_s3estt22s',
        subject: 'Nurgles blessing bug with tainted ones in carnival of chaos',
        dateSubmitted: '2026-06-05',
        message: 'I cant select nurgles blessing for my tainted ones when i create my warband of carnival of chaos, i tried searching in stats, equipment, advancements and skills, but i didnt found It, please, idk if i am Blind but i think theres a bug there',
        status: 'completed',
        notes: '--6/05/2026--\nTwo things\n1. When adding a new fighter and selecting Tainted Ones the Blessings can be found under Select Equipment at the very bottom. You need to change the dropdown from Close Combat to Blessing of Nurgle\n 2. Yes there was a bug, if you closed the add fighter screen and then went back in via the edit fighter the Blessing of Nurgle were no longer visible. This is because they are supposed to be added on recruitment. HOWEVER there is the Override Equipment Restrictions checkbox at the top and selecting it should enable everything for selection and that was not happening for the Blessings. I have fixed that bug. When Override is selected the Blessings show up about halfway down the list under Mutations.'
    },
    {
        id: 'feedback_1780893796488_t7ipet397',
        subject: 'Hired Sword Race - Elf Ranger',
        dateSubmitted: '2026-06-08',
        message: 'I am playing as protectorate of sigmar and hired an elf ranger. When I go to edit, it gives me a warning that the elf ranger is exceeding racial maximum since it is hired as a human and not an elf and there is no way to edit the race.',
        status: 'completed',
        notes: '--6/08/2026--\nThe race can not be changed once the fighter has been added to the roster. However it does make sense for an "Elf" ranger to default to the Elf race at creation instead of human. I have fixed this for the Elf Ranger and will be going through the rest of the hired sword and dramatis personae to add the appropriate default race.'
    },
    {
        id: 'feedback_1780909905152_r8heob0j9',
        subject: 'Custom warrior names not showing up in roster or print view',
        dateSubmitted: '2026-06-08',
        message: 'Hello! Stumbled upon your app, as I had a similar idea to build something useful for a campaign. While at warband creation I can enter in a custom name for a warrior, this does not show up on the roster or print view.',
        status: 'completed',
        notes: '--6/08/2026--\nI have not been able to reproduce this yet. However I did notice that if you change the name before selecting a warrior choice, hired sword or dramatis personae that the name gets changed back to the default. I will update the code to change this behaviour.\n\n06/15/2026\nI have fixed the issue where a custom name is overwritten anytime the type of hero or henchmen group is changed when adding them to the roster.'
    },
    {
        id: 'feedback_1780962328785_n53gmm8et',
        subject: 'List randomly will change order',
        dateSubmitted: '2026-06-08',
        message: 'Not sure what causes it, but every once and a while when I make a change to a member, the entire list will automatically organize itself by alphabetical order. As in I keep my list in order of most important heroes, then henchmen and then finally hired swords. After updating the list after a game I&#x27;ll notice that my captain whos name is Wilhelm will be at the bottom while my wolf priest named Arnulf will move to the top etc.',
        status: 'completed',
        notes: '--6/09/2026--\nI previously sent in a feedback about my list randomly changing to alphabetical order. I think the issue has to do with equipment. I just equipped my captain with heavy armor and thats what caused my list to change its order.\n\nThank you for the additional context. I was looking at the code that supported the change order feature. This little bit of info helped point me at a helper function that was doing more than it was supposed to. I was able to reproduce the issue and pushed a fix.'
    },
    {
        id: 'feedback_1781011815484_4siazhx26',
        subject: 'Selling equipment in henchmen group',
        dateSubmitted: '2026-06-09',
        message: 'I have a henchmen group of 2, when I sell an item i receive the value of 1 item sold not both.',
        status: 'completed',
        notes: '--6/09/2026--\nFound the issue, a fix will be released shortly.\n--6/10/2026--\nThe fix has been applied. The amount received from selling items has been updated to take into account the number of models in the group.'
    },
    {
        id: 'feedback_1781343136420_19gn9mn9t',
        subject: 'All Equipment when in pregame building',
        dateSubmitted: '2026-06-13',
        message: 'When building a warband, once Ive saved a hero and then go back into it I gain acess to all Equipment not just the starting equipment',
        status: 'completed',
        notes: '--6/13/2026--\nGood feedback, the Pre-Game mode was a later addition which meant that originally once added the warriors would need to have access to everything in the edit view. But now with pre-game it makes sense to limit access to equipment while in that mode.\n--7/1/2026--\nStill working on this implementation.\n--7/7/2026--\nThere is now a toggle that will default to starting equipment only if the warband is still in pregame mode. Otherwise it will default to all to show all equipment that can be purchased. Override button still works by showing everything regardless of restrictions.'
    },
    {
        id: 'feedback_1781598297895_w5yauaykq',
        subject: 'Necromancer advancement doesnt include learning spells',
        dateSubmitted: '2026-06-16',
        message: 'Necromancer has advanced but I took an extra spell instead. There does not appear to be an option outside of skills or characteristic advances.',
        status: 'completed',
        notes: '--6/16/2026--\nYou are correct the spell advacement option is not showing up for the Necromancer. I have fixed the issue. Thank you for submitting the feedback.'
    },
    {
        id: 'feedback_1782099353471_nw39933jz',
        subject: 'Warband creation - equipment asking for trading post GC rolls',
        dateSubmitted: '2026-06-21',
        message: 'Hello, I have created a new warband of Wood Elves of Athel Loren found here: https://www.broheim.net/downloads/warbands/web/Wood%20Elves%20of%20Athel%20Loren.pdf When I create a new hero (the huntmaster: leader box selected), and I try to give the hero an elven bow, I get teh prompt to put in a GC cost rolled for the store cost ... When you are starting a warband, the GC cost is fixed and does not require the trading post additional cost. I tried to put in a cost of zero - but this didnt bypass this. Ty',
        status: 'completed',
        notes: '--6/22/2026--\nThank you for pointing this out. I have updated the logic so that the elves do not need to enter a variable cost. I have also made the update to allow for 0 to be entered as a variable cost'
    },
    {
        id: 'feedback_1782214509981_18cedt17s',
        subject: 'UI locks sometimes',
        dateSubmitted: '2026-06-23',
        message: 'When creating a Skaven (default) warband, and when selecting equipment, the pop-up screen can spill over the screen. I cannot scroll down enough to hit cancel or see the end of the popup. I can get out of this by selecting an item (eg a club) and then deleting this item before i click save..I dont think this flows on to a cost for the item as I dont click save.',
        status: 'completed',
        notes: '--6/23/2026--\nThank you for pointing this out, I have updated the code so that we can now scroll down on the select equipment screen. I also found a few others that are doing the same thing on mobile and have fixed them as well.'
    },
    {
        id: 'feedback_1782214883457_gtrpdhfv3',
        subject: 'Adding in a Notes against heros and henchmen',
        dateSubmitted: '2026-06-23',
        message: 'Playing a Mordheim campaign with some custom rules. Namely, that any hero can take any weapon they purchase (they automatically have the skill)... It would be nice to have a notes section against a hero, so that I can add in the notes of what the hero/henchmen has (so that a work around for house rules can be utilized), without breaking the nice game rules which help guide character creation)',
        status: 'completed',
        notes: '--6/23/2026--\nThank you for the feedback, I will add a notes section for each fighter / henchmen group. Just as a heads up incase you werent aware, there is an override toggle in the select equipment menu that will enable all equipment in the application for purchase for that fighter.'
    },
    {
        id: 'feedback_1782216180084_56tiug7xd',
        subject: 'Advancement Stat is greyed out',
        dateSubmitted: '2026-06-23',
        message: 'I played a game in store. My 1a Skaven list has an assassin adept. I added 4 experience to the hero, and a popup showed what stats I can add. Strength and a few other stats were greyed out so that I could select them. This could be because there is a roll involved which i did in store, but cannot manually select? I have checked the skaven stat max, and the hero should be able to get the +1 strength.',
        status: 'completed',
        notes: '--6/23/2026--\nThe Assassin Adept has a starting stat line of M6 WS4 BS4 ST4 T3 W1 I5 A1 LD7. The racial maximums for Skaven are M6 WS6 BS6 ST4 T4 W3 I7 A4 LD7. This means that Movement, Strength and Leadership are already at the racial maximums for this fighter and that is why the application has them disabled at advancement.\n\nhttps://mordheimer.net/docs/campaigns/experience#racial-maximum-characteristics\nhttps://mordheimer.net/docs/warbands/grade-1a-warbands/skaven-eshin#1-assassin-adept\n\nI have added a house rule toggle under options that will override the Racial Maxiumns and allow for the stats to go beyond those defined maximums.'
    },
    {
        id: 'feedback_1782244546890_wo7db4rr3',
        subject: 'Missing 2a Warband Nipponese Expedition',
        dateSubmitted: '2026-06-23',
        message: 'This is a website Ive been using to keep track of Mordheim rulesets for a while. https://mordheimer.net/docs/warbands You seem to be missing some of the Warbands here and there but not others. At least for 2a. Specifically I was hoping you could maybe look into getting Nipponese Expedition set up.',
        status: 'completed',
        notes: '--6/23/2026--\nI try to stay in line with mordheimer but admittedly miss things. Thank you for pointing this one out, I will add The Nipponese Expedition\n--6/25/2026--\nWarband has been added. Please let me know if I missed or fat fingered something'
    },
    {
        id: 'feedback_1782303765952_rcnxk6rsl',
        subject: 'Additional warbands (Asrai Wayfarers)',
        dateSubmitted: '2026-06-24',
        message: 'Hi there, having just found your online warband roster management tool I was quite excited to transfer my warband to it, only to discover the warband I am running for a campaign isn’t included (Wood Elves, Asrai Wayfarers). Is there any way for me to upload the data myself? Many thanks',
        status: 'completed',
        notes: '--6/24/2026--\nI would need to add the warband to the application. I will work on adding them after the request I have for adding Nipponese Expedition.\n--6/28/2026--\nStarted on adding them\n--7/1/2026--\nThat took a bit longer than expected. Please let me know if I messed anything up.'
    },
    {
        id: 'feedback_1782664497528_p7fex1zh9',
        subject: 'Lahmian Warband addition',
        dateSubmitted: '2026-06-28',
        message: 'Just another request for a warband to be added in. There is the Lahmian Warband in this set. When you get the chance it would be cool to get them in. https://broheim.net/warbands.html',
        status: 'completed',
        notes: '--6/28/2026--\nI will work on adding them after the request I have for adding Asrai Wayfarer.\n--7/1/2026--\nStarting on these next.\n--7/26/2026--\nStill working on this. I have added the logic for the Location selection which is done in the Game Phase Section (under management tab on mobile). Still need to do some testing, however warband is now visible in warband selection menu.\n--7/27/2026--\nThere is alot happening with this warband in terms of logic that is not part of the base game. In addition to the location option I have now also added logic to allow for the Demi-Vampire special rule to be used during an advancement if the Lamhia Vampire dies. I will not be implementing logic for the Thralls Favoured special rule as all it does it add one Leadership to the statline if it is not already 8 during the Thralls advancement. This can be done using the existing logic in the application. Nothing else about the fighter appears to change (unlike the blood sister which goes through a transformation to vampire with special rules and full stat line change)\n\nPlease let me know if I messed something up in the implementation.'
    },
    {
        id: 'feedback_1783017733014_pmf3l05i9',
        subject: 'Local storage warbands inaccessible on login and cannot be transferred to account',
        dateSubmitted: '2026-07-02',
        message: 'There doesnt appear to be any way to transfer an existing warband from the non-account Local Storage onto an created account. Once you log in, you lose access to the local storage warbands entirely until you log out. I imagine there are others like me who have created a warband first to test the site before finding it good and useful with a lot of promise, deciding then to create an account, only to find the warband cannot be moved and is stuck in local storage. Alternatively, any means of exporting/importing warbands to and from a file should resolve this.',
        status: 'on-hold',
        notes: '--7/02/2026--\nThat is correct they are currently separated. The integartion was in my list of nice to haves. I have moved it up and into my to do list.'
    },
    {
        id: 'feedback_1783459845911_h8ljvnbyf',
        subject: 'Magic Tome and Arcane Lore',
        dateSubmitted: '2026-07-07',
        message: 'When you get the Magic Tome item and combine it on a hero with Arcane Lore. You dont seem to get any of the features for adding new spells to the hero. When you select a spell when you open the character up you can click the box and save but when you go back it doesnt list that the spell was select. Then when you advance you cannot choose to get any new spells. Am I misunderstanding the rules around this item or is this just a bit of odd functionality.',
        status: 'completed',
        notes: '--7/08/2026--\nThank you for bringing this up. You are correct this was a bug. The magic selection should now save and spells should be an available selection in advancement.'
    },
    {
        id: 'feedback_1783537676664_j42bzedzk',
        subject: 'Pistol Brace costed wrong',
        dateSubmitted: '2026-07-08',
        message: 'The Pistol Brace when being purchased for my pistolier under a Gunnery School of Nuln warband list showed as 30gp. Should have been 20gp. Custom amount worked as a workaround."',
        status: 'completed',
        notes: '--7/08/2026--\nThank you for pointing this out, the pistol Brace is now 20gc for the Gunnery School of Nuln'
    },
    {
        id: 'feedback_1783538065643_noskookzh',
        subject: 'Weapons not available to Andanti by default',
        dateSubmitted: '2026-07-08',
        message: 'When creating a Dreamwalkers warband and adding an Andanti hero, the rapier and main gauche are restricted. Have to use the remove restriction option to add them, which works as a work around.',
        status: 'completed',
        notes: '--7/08/2026--\nThank you for pointing this out, I have unlocked the Rapier and Main Gauche for the Andanti'
    },
    {
        id: 'feedback_1783621204842_qnn4371ca',
        subject: 'Dark Elves Strong Build Issues',
        dateSubmitted: '2026-07-09',
        message: 'When you select the skill Strong Build for the Dark Elf warband, it doesnt properly update the available skill trees for the hero so it can take strength skills.',
        status: 'completed',
        notes: '--7/10/2026--\nI was not able to reproduce this on the Dark Elf Warband or the Shadow Warrior Warband. Strong Build is not a skill in the system and Powerful Build is working for these two warbands. I also checked the Dark Elf Assassin and it was working there as well. I will keep looking though. If you are on the Mordheim Discord there is a Grimheim section, if you can drop more details there that would be helpful, or submit another feedback if you have any additional info that might be helpful.\n--7/21/2026--\nI have not been able to reproduce this.'
    },
    {
        id: 'feedback_1784034721326_7mwy4gjxy',
        subject: 'I do not see Mutations in the pulldown for equipment when starting a Cult of the Posessed warband.',
        dateSubmitted: '2026-07-14',
        message: 'I am starting a Cult of the Possessed warband. When I pick a Possessed or a Mutant fighter, I have tried to chose starting mutations. In the pulldown menu for equipment, I expected to see Mutations as an option. It is not there. If I remove all equipment restrictions, I see it, but it should be there when the starting equipment restriction package is active. Thanks.',
        status: 'completed',
        notes: '--7/14/2026--\nThank you for bringing this up. Multiple issues have been fixed with Mutations for Possessed and Mutants.<br><br>Mutations are now visible when adding the fighters.<br>Mutation costs are now doubled after the first.<br>Mutations can be added to a fighter if the warband is still in pre-game build phase and the equipment list toggle is set to starting in the select equipment screen.'
    },
    {
        id: 'feedback_1784044925261_fvs1xzl3y',
        subject: 'Skaven of clan pestilence use wrong max. racial template',
        dateSubmitted: '2026-07-14',
        message: 'Clan pestilence skaven have another max racial characteristic than normal Skaven. Their toughness can go up to 5 and their movement is capped at 5',
        status: 'completed',
        notes: '--7/14/2026--\nThank you for pointing this out. Updated Skaven of Clan Pestilence to use Skaven of Clan Pestilence Racial Profile. This change is not retroactive and the fighters will need to be readded.'
    },
    {
        id: 'feedback_1784086573125_ilcbkmol9',
        subject: 'Arabian Tomb Raiders Mystic Bug',
        dateSubmitted: '2026-07-14',
        message: 'Ive made an Arabian Tomb Raiders warband. The Elemental Magic skill doesnt seem to grant access to spells, or allow you to pick any spells at advancement.',
        status: 'completed',
        notes: '--7/15/2026--\nI had a typo in the Magic reference. The Nomadic Mystic will need to be removed and readded to the warband for the change to work.'
    },
    {
        id: 'feedback_1784114398649_ozbf8dlii',
        subject: 'Blunderbuss for Gunnery school of nuln',
        dateSubmitted: '2026-07-15',
        message: 'The blunderbuss normally cost 30 gc. But for nuln it cost 20 gc. But it says 30 gc even if you play as nuln',
        status: 'completed',
        notes: '--7/15/2026--\nPrice corrected for the blunderbuss. I was using the data in Mordheimer which has it at 30. Warband PDF on Broheim lists 20.'
    },
    {
        id: 'feedback_1784427140748_ue29f2spm',
        subject: 'Saurus Braves are double-cost',
        dateSubmitted: '2026-07-18',
        message: 'Hey, sorry to bother you. Im basing my numbers off of Mordheimer -- they should be 40 gold each, but youve listed them as 80. I think javelins are similar -- 10gp on Mordheimer, listed as 5 here. Thanks!',
        status: 'completed',
        notes: '--7/21/2026--\nFixed price for Saurus Braves, working on Javalines.\n--7/22/2026--\nJavelines are now 10gc when in pregame mode and using starting setting in equipment selector.'
    },
    {
        id: 'feedback_1784427970907_9g3rjp4q0',
        subject: 'Cost of Merchant Wagons is off',
        dateSubmitted: '2026-07-18',
        message: 'Very simple- for Merchant Caravans(and technically others), the Merchant Wagon is listed as only 100 gold, when the official cost is 180. This could be considered technically correct since the cart does come with two draft horses(worth 40 each), but then the menu for the cart does not give an easy way to attach two draft horses to the cart. Thank you for this great tool!',
        status: 'in-progress',
        notes: ''
    },
    {
        id: 'feedback_1784663639119_bjw6s5t6h',
        subject: 'Tomb Guardians No EXP rule',
        dateSubmitted: '2026-07-21',
        message: 'It seems like there is an issue where the Tomb Guardian heroes all have the no experience rule, and the Tomb Guard henchmen also have the no experience rule(albeit that seems to be an optional interpretation). https://mordheimer.net/docs/warbands/grade-1b-warbands/tomb-guardians Just something to look at when you get the chance. Thanks!',
        status: 'completed',
        notes: '--7/21/2026--\nThank you for pointing this out, I re-read the inconsistencies section. The heros now have access to advancement. To be on the safe side I also enabled advancement for the guardians.'
    },
    {
        id: 'feedback_1784738655896_t031ty0ha',
        subject: 'Senior Gunnery Officer leader trait',
        dateSubmitted: '2026-07-22',
        message: 'The radius for Nulns leader trait is incorrect. Should be 12 instead of 6',
        status: 'completed',
        notes: '--7/22/2026--\nUpdated Senior Gunnery Officer Leader Trait to use expanded rule.'
    },
    {
        id: 'feedback_1785058017585_nztfu3ruj',
        subject: 'Missing Ostermark in mercenarie options',
        dateSubmitted: '2026-07-26',
        message: 'Missing Ostermark in mercenarie options',
        status: 'completed',
        notes: '--7/30/2026--\nWarband added.'
    },
    {
        id: 'feedback_1785971255915_ln5ign3kh',
        subject: 'Skaven Specific skills not available',
        dateSubmitted: '2026-08-05',
        message: 'Im trying to set up a Skaven warband, and i cant add the specific Skaven skills to any heroes, only the generic ones like combat / strength/academic.',
        status: 'completed',
        notes: '--8/05/2026--\nThank you for pointing this out. There was a reference error in the supporting json file. This is fixed now.'
    },
    {
        id: 'feedback_1786039725651_65ui9nlwc',
        subject: 'Skryre Warband',
        dateSubmitted: '2026-08-06',
        message: 'In Broheim Warbands there is a 3a list roster for a Clan Skryre warband.  Would you be able to add that to this app?  Thank you!',
        status: 'completed',
        notes: '--8/06/2026--\nAdded Clan Skryre to 3a. Included logic for Initiates The Lads Got Talent special rule in the advancement section.'
    },
    {
        id: 'feedback_1786173401293_56dmpvg28',
        subject: 'No max stats for were creature for notes explorers',
        dateSubmitted: '2026-08-08',
        message: 'There is actually 2 errors on this firstly there is no max stats for werecreatures only human so when selecting ulfwerenar his speed is capped at 4 like a human even though his starting speed stat is higher. secondly the 1c for that hero has movement 6 and wounds 2 which is inconsistent with the entry here which has 7 and 1 respectively.',
        status: 'completed',
        notes: '--8/08/2026--\nThank you for pointing this out, I have fixed the stats and included a racial max profile for Werecreatures.'
    },
    {
        id: 'feedback_1786408108466_kumkipxrr',
        subject: 'Pricing on Bretonnian Marksmen',
        dateSubmitted: '2026-08-10',
        message: 'The Marksmen Henchmen in the Bretonnian Warband is erroniously priced at 15. They should be priced at 20',
        status: 'completed',
        notes: '--8/10/2026--\nThank you for pointing this out, I have updated the Bowmen to a cost of 20'
    },
    {
        id: 'feedback_1786462745062_hav87gjjk',
        subject: 'Special Skills Necrarch Warband',
        dateSubmitted: '2026-08-11',
        message: 'The Necrarch 2a Warband doesnt seem to have access to special skills in advacnement. While there I would make sure that the skill that adds the additional spell school is working. Thanks!',
        status: 'completed',
        notes: '--8/11/2026--\nThank you for pointing this out, I have made it so that the special skills are visible during advancement. The skill that adds the additional spell school will need a bit more time for me to implement.\n--8/15/2026--\nI have added the logic that makes it so that selecting the skill during advancement will make another window pop up to show a spell selection list. Additionally adding the skill adds the ability for the fighter to take the Dreaded Scrolls of Nagash spells going forward.'
    },
    {
        id: 'feedback_1786553466784_0syez15c0',
        subject: 'Marauders of Chaos Racial maximum not an option',
        dateSubmitted: '2026-08-12',
        message: 'Marauders of Chaos is not available in the drop-down menu Racial maximums. Thank you',
        status: 'completed',
        notes: '--8/12/2026--\nI made some updates to the Marauders of Chaos warbands. For existing fighters try removing the fighter and readding them or try adding a new one, the Marauder of Chaose racial profile should be available now.\n--8/15/2026--\nI have done more testing and believe the issue is related to a warband that was created prior to the new implementations. If this is not the case, please reach out to me on the Mordheim Discord, there is a Grimheim channel under the List Builders section.'
    },
    {
        id: 'feedback_1786553932064_htyljkoen',
        subject: 'Warhound of Chaos gained experience',
        dateSubmitted: '2026-08-12',
        message: 'Despite having the Do not gain experience rule, my Warhound of Chaos that survived the battle gained experience. Thank you!',
        status: 'completed',
        notes: '--8/12/2026--\nThank you, I have updated the End Battle phase to show 0 experience for those fighters and also display a small note that they have the Do Not Gain Experience special rule.'
    },
    {
        id: 'feedback_1786805056114_rslv3incb',
        subject: 'Override Option for Hired Sword and Dramatis Personea',
        dateSubmitted: '2026-08-15',
        message: 'Is it possible to add an override for Dramatis Persona and Hired Swords to allow a warband to take one they otherwise not have available?  Something that could facilitate special campaign related circumstances.',
        status: 'completed',
        notes: '--8/15/2026--\nThis feature already exists in the House Rules section which can be found in the Options menu. The house rule is called Universal Hiring Access.'
    },
    {
        id: 'feedback_1787016034570_7zjkc2ytr',
        subject: 'Sorcerous Society Untrained Skill Advance',
        dateSubmitted: '2026-08-17',
        message: 'The Untrained has the rule Harnessed: Should an Untrained roll a “Lads Got Talent” roll, they immediately gain the “Wizard” skill. They may choose to either forgo their additional advancement and randomly generate a spell, or may roll as the Hero advancement dictates. Upon gaining Lads Got Talent it doesnt seem to gain the wizard trait or access to any spell schools.',
        status: 'completed',
        notes: '--8/17/2026--\nFunny Ive been working my way through the skill and special rules identifying these types of logic flows and implementing them, I just got done with Apt Revivalist. I jumped ahead and took care of this one.\nImplemented Harnessed rule support during Lads Got Talent advancement. When an Untrained selects LGT, they now gain Lesser Magic and all four Elemental Lore special rules appended to their existing rules, and can choose a spell, skill, or stat increase as their hero advancement.'
    },
    {
        id: 'feedback_1787094208784_lwiihksbg',
        subject: 'In ostlander warband jaegers have master swordsman',
        dateSubmitted: '2026-08-18',
        message: 'Amazing work, thank you for doing this, its awesome. I did notice one thing, and that was as said, the jaegers have an extra skill they shouldnt have, but keep up the amazing work',
        status: 'completed',
        notes: '--8/18/2026--\nOops, thank you for pointing that out, copy and paste error. I have removed the special rule, existing henchmen will need to be removed and added again.'
    },
    {
        id: 'feedback_1787209591170_3ujjliq6f',
        subject: 'Weapon selection for pirate warband',
        dateSubmitted: '2026-08-20',
        message: 'The Pirate warband I wasnt able to select a single pistol for a gunner henchman. Only dueling pistol was an option.',
        status: 'completed',
        notes: '--8/20/2026--\nThank you for pointing this out, I accidentally listed dueling pistols twice, it is fixed now.'
    },
    {
        id: 'feedback_1787572112309_glopqizs0',
        subject: 'Slaanesh Devot no longer shows mutations',
        dateSubmitted: '2026-08-24',
        message: 'Slaanesh list.  The Hero Devot no longer shows mutations under Equipment.',
        status: 'completed',
        notes: '--8/24/2026--\nThere was a recent change to how mutations are being assigned to fighters. Im assuming you mean the battle view. In this case, I accidentally had the mutations showing up under Special Rules. I fixed that, they are back under Equipment again.\nIf that is not what you meant then try removing the fighter and adding them back to the warband. If this is an established fighter with lots of data, the other option is to go into Edit for that fighter then Select Equipment, then use the Override Equipment Restrictions checkbox. This will allow you to add the mutation to the fighter.'
    },
    {
        id: 'feedback_1787591998621_zsg7seezh',
        subject: 'High Sea Patrol Warband Addition',
        dateSubmitted: '2026-08-24',
        message: 'Would you be able to add the High Elf Sea Patrol warband to this application? You can find the link here. https://broheim.net/downloads/warbands/supplement/sartosa/Lothern%20Sea%20Patrol.pdf Thanks!',
        status: 'completed',
        notes: '--8/24/2026--\nYes I can add them.\n--9/3/2026--\nWow that took longer to implement than I anticipated. The honours had all sorts of special rules that required new logic to be added. To make them fit in the current configuration of the application I added them as section in equipment.'
    },
    {
        id: 'feedback_1787690500778_c61ch8oos',
        subject: 'Skill Type Override',
        dateSubmitted: '2026-08-25',
        message: 'Would it be possible to add a skill type override where you add access to a skill type for a hero when they advance.  For example X hero normally has access to strength, combat and speed but for whatever reason you want to have a custom effect that adds academic to their skill choices.  Does that already exist, and if not is it possible to add?',
        status: 'completed',
        notes: '--8/25/2026--\nTechnically it does already exist sort of. When you go to edit a fighter there is the Skill Override button that gives you access to all skills in the game. However, I added that as an option to override a mistake or something that went wrong, it doesnt work well with the Advancement flow. I will add an override button to the bottom of the edit fighter screen in the Available Skill Tables section. This will set the skill options for that fighter and allow for customizations to work in the advancement flow.\nThank you for the feedback!\n\n--8/31/2026--\nAdded the Skill Access Override button to the Available Skill Tables section at the bottom of the edit fighter view.'
    },
    {
        id: 'feedback_1788529873354_xudoroi85',
        subject: 'How do I add mutations to my cult of the possessed mutants?',
        dateSubmitted: '2026-09-04',
        message: 'I am trying to create a Cult of the Possessed gang, but I cant find where to add the mutations to either my Possessed or my Mutants. Any help would be appreciated.',
        status: 'completed',
        notes: '--9/04/2026--\nThank you for pointing this out. It looks like I broke something with one of my changes. I have fixed it and you should now be able to purchase Mutations via the Select Equipment option in the fighters Select Equipment section. The Mutations are available when adding a fighter, or when the warband is in pre-game mode or if the Select Equipment list toggle is set to Starting.'
    },
    {
        id: 'feedback_1788611386761_vsq2ctnjt',
        subject: 'Implement Lizardmen 1b Sacred Markings',
        dateSubmitted: '2026-09-05',
        message: 'Could the sacred markings be implemented for the Lizardmen (1b) gang? They are considered equipment, and I couldnt find them in the lists. They are oversized jaws,poison glands, and mark of the old ones. If the poisoned weapons work differently, they could also be added.',
        status: 'completed',
        notes: '--9/05/2026--\nCouple of things are happening here.\n1. Until I get this sorted the Sacred Markings can be added using the Overried Equipment Restrictions checkbox at the top of the Select Equipment menu.\n2. These are already in the application but are only avaialble when the fighter is first added. The logic is not respecting the Starting equipment or pre-game settings so I will need fix that.\n3. All of the poisons were not available when adding a new fighter, but were available when you go back and edit the fighter. I have updated it so that the poisons can also be purchased when adding the fighters.\n4. Some of the poisons were assigned to the wrong fighters so I straightened that out.\n--9/08/2026--\nUpdated the logic so that the Sacred Marking equipment logic respects the pre-game build phase and Starting Equipment toggle states.'
    },
    {
        id: 'feedback_1788711718160_ct2hgj6hm',
        subject: 'Splitting units or hero Delete into Kill and Refund',
        dateSubmitted: '2026-09-06',
        message: 'Im setting up a warband for the first time in this (great!) tool and trying stuff in and out. I realized when I Delete a unit, the cost does get refunded, which makes sense when narratively the unit has been killed. However, I have not found a way to remove the unit just because you want to cancel the addition because you changed your mind and want to edit the team in a different way. Would be great being able to choose which case it is when editing the warband to avoid having to keep track of coins to refund manually. Other than that - many thanks for the great job building this, super easy to use and very feature complete!',
        status: 'completed',
        notes: '--9/06/2026--\nThank you for the kind words and the feedback. Im assuming you meant that the cost doesnt get refunded when a unit is deleted. Making it so that you can delete the unit and get a refund for its value is a good idea and will make list building easier. I will implement it.\n--9/10/2026--\nI have implemented the Refund and Delete button. This option is availabe from the Edit view as an option after the delete button is selected. The button will only be visible if the warband is in the pre-game build phase. Selecting the Refund and Delete will refund the current value of the fighter(s). It is intended to be used during the build phase.'
    },
    {
        id: 'feedback_1788743797736_f4k5sixnt',
        subject: 'Witch hunters allow dark mage as hired sword',
        dateSubmitted: '2026-09-06',
        message: 'Witch hunters allow dark mage as hired sword. but in the PDF they arent',
        status: 'completed',
        notes: '--9/09/2026--\nThank you for pointing this out, I have updated the restriction for that hired sword.'
    },
    {
        id: 'feedback_1789635578915_34j3ce2td',
        subject: 'Black Dwarfs incorrect Informer and Bull Centaur data',
        dateSubmitted: '2026-09-17',
        message: 'Hi I found several issues with the Grade 1c Black Dwarfs warband when checking it against the Black Dwarfs PDF:<br><br>Informer cost<br><br>Grimheim lists Informers at 10gc. The PDF states that they cost 15gc.<br><br>Informer racial maximums<br><br>Informer starting characteristics are correct, but the Race field only shows Dwarf or provides no usable racial maximum. The PDF states that Informers are a mixture of races, half-breeds and mutants and must use the human maximum characteristics from the Mordheim rulebook.<br><br>Bull Centaur starting Toughness<br>Grimheim gives the Bull Centaur T3. Its correct starting profile is:<br>M8, WS4, BS3, S4, T4, W1, I3, A2, Ld9.<br><br>Bull Centaur maximum characteristics<br>The Bull Centaur does not appear to have its correct separate maximum profile. The PDF gives:<br>M8, WS7, BS6, S5, T5, W4, I6, A5, Ld10.<br><br>Bull Centaur warband rating<br><br>My completed nine-model warband has 46 starting Experience and Grimheim displays a rating of 91. This is simply 9 × 5 + 46 and does not apply the Bull Centaur’s Large Target rating rule.<br><br>Under the standard large-creature calculation, the Bull Centaur should count as 20 points instead of the normal 5, making the rating 106. The Black Dwarfs PDF also specifically states that the Bull Centaur adds +20 to the warband’s rating.<br><br>Alignment default<br>Black Dwarfs initially default to Good alignment when creating the warband. It would make more sense for them to default to Evil.<br><br>Thanks',
        status: 'completed',
        notes: '--9/17/2026--\nThank you for the detailed feedback! Most of this was all fat finger mistakes and incorrect references on my part so easy fixes, however the change may require that the fighter be removed and added back to the warband to reflect the changes.\n\nI have updated the cost of the informers they are now 15\n\nCreated a new racial maximum entry for the Black Dwarf Centaur because it is different than the existing one.\n Fixed the toughness for the Centaur.\n\nThe Large Target was actually an application wide issue, I have updated the code to use 20 for any fighter that has the large target special rule.\n\nUpdated the alignment to default to Evil.\nMade it so that more racial options are available, including Human for the Informers'
    },
    {
        id: 'feedback_1789896060731_at343malx',
        subject: 'Adding henchmen does not increase cost',
        dateSubmitted: '2026-09-20',
        message: 'When I added henchmen ( gunnery school of nuln war band) via manage. it still only cost 25 gc.  It does not increase.  So I can get 5 henchmen for 25 gc when it should be 125 gc.',
        status: 'completed',
        notes: '--9/20/2026--\nI am not able to reproduce this. I tried using Sons of the Guns from Gunnery School of Nuln. Selecting 5 of them and then hitting save fighter shows a message at the bottom that 125gc was subtracted and the total gold in the warband was updated along with the ledger. I will start looking at potential edge cases.\n--9/25/2026--\nI have updated the logic to require that modifying the henchmen group size via the edit view requires the use of the manager now. The manager manages the cost of adding a fighter. Updated the backend logic to update the ledger and cost breakdown when the manager is used.'
    },
    {
        id: 'feedback_1790954279161_323vyrcad',
        subject: 'Forest Goblin Gigantic Spider',
        dateSubmitted: '2026-10-02',
        message: 'The price for the gigantic spider is incorrect; it should be 200G instead of 125G as i couldnt find any changes to its price anywhere.',
        status: 'completed',
        notes: '--10/02/2026--\nThank you for pointing this out! I have updated the price for the gigantic spider to 200G. I never got the chance to buy one in my last campaign so I missed that cost error, hopefully you have more luck with the Forest Goblins than I did.'
    },
    {
        id: 'feedback_1791003777122_wo245gbjf',
        subject: 'Save modifier for Warplock pistol should be -3',
        dateSubmitted: '2026-10-03',
        message: 'The save modifier pop-up (link) for the Warplock pistol, says the save modifier for the normal pistol -2 (it even says 4 strength), when it should be -3 for the Warplock pistol (as well as 5 strength).',
        status: 'completed',
        notes: '--10/03/2026--\nThank you for pointing this out, I have updated the description fields.'
    },
    {
        id: 'feedback_1791020227674_ex13g3p5h',
        subject: 'Warband Notes Issue',
        dateSubmitted: '2026-10-03',
        message: 'The warband notes are not showing up on the printed warband sheet. Notes for characters are working perfectly fine though. And Thanks you for this awesome website, and Ive not had a chance to look yet but if you have a public repository Id be happy to upload bug fixes that my group encounters as we play our campaign.',
        status: 'completed',
        notes: '--10/03/2026--\nI have added a new check box for Warband Notes. Enabling it will print a third sheet that contains all the notes from the warband.\nThank you much appreciated, and thank you for the offer but I dont have a public repository. Which makes me very aware that if my computer dies, its taking this whole project with it... Ill look into.'
    },
    {
        id: 'feedback_1791049459931_8v4wfii0t',
        subject: 'Print version and champ caps do not work',
        dateSubmitted: '2026-10-03',
        message: 'For orc boyz the type of characters dont cap so you can add too many of the orc champions. Also please make a way to auto populate and print a paper copy. This is an amazing resource and I love it.',
        status: 'on-hold',
        notes: '--10/03/2026--\nThank you, the application at this time does not limit the addition of fighters based on caps. Its something that I plan on implementing in the future. There is currently a very basic print feature availabe via Options -> Print Warband.'
    },
    {
        id: 'feedback_1792249538010_ury2pz2u6',
        subject: 'Drag the order of equipment',
        dateSubmitted: '2026-10-17',
        message: 'Hi, just found your website, looks amazing but have some points for easier use (especially for those of us with OCD). it would be great if you could switch the order of equipment instead of being stuck to the order in which you bought it.<br><br>Also, maybe I am not seeing it correctly but is there a way to get your custom cards made in the card builder? I love the way they look but I have terrible hand writing so would love to be able to generate cards for my warband and maybe even separate equipment cards with the rules on them.\nKeep up the good work!',
        status: 'completed',
        notes: '--10/21/2026--\nThank you for the feedback. I have added the ability to change the order of the equipment.\n\nIf you go into Build Cards while viewing a warband (between the Change Order and Advancement button) it will populate the cards based on the warband and include things like equipment, skills, special rules, etc. The card builder on the main menu does not have the feature to add equipment, skills, special rules, etc. It is something that I will be adding in future releases.'
    }
];

// Status options for feedback entries
export const FEEDBACK_STATUS_OPTIONS = [
    { id: 'new', name: 'New', color: 'yellow', bgColor: 'bg-yellow-600' },
    { id: 'in-progress', name: 'In Progress', color: 'blue', bgColor: 'bg-blue-600' },
    { id: 'completed', name: 'Completed', color: 'green', bgColor: 'bg-green-600' },
    { id: 'rejected', name: 'Rejected', color: 'red', bgColor: 'bg-red-600' },
    { id: 'on-hold', name: 'On-Hold', color: 'orange', bgColor: 'bg-orange-600' }
];

// Helper function to format dates
export const formatFeedbackDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    // Parse the date string and format it in the local timezone without timezone conversion
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString(undefined, options);
};

// Helper function to get status styling
export const getStatusStyling = (statusId) => {
    const status = FEEDBACK_STATUS_OPTIONS.find(s => s.id === statusId);
    return status || { id: 'new', name: 'New', color: 'yellow', bgColor: 'bg-yellow-600' };
};

// Helper function to get entries by status
export const getEntriesByStatus = (status) => {
    if (status === 'all') return FEEDBACK_ENTRIES;
    return FEEDBACK_ENTRIES.filter(entry => entry.status === status);
};

// Helper function to get entry by ID
export const getEntryById = (id) => {
    return FEEDBACK_ENTRIES.find(entry => entry.id === id);
};
