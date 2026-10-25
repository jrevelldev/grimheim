// Blog posts data for the Mordheim Roster Manager
export const BLOG_POSTS = [
    {
        id: 'welcome',
        title: 'Welcome to Mordheim Roster Manager',
        date: '2026-01-15',
        category: 'announcement',
        tags: ['welcome', 'introduction'],
        content: `
            <h3>Welcome to Mordheim Roster Manager!</h3>
            <p>If I sent you this link, thanks for checking it out, if not, then I wonder how you found this. Either way you're here now so check it out.</p>
            
            <h4>How This Started</h4>
            <p>This app started with the Turn Order feature for Mordheim, I wanted something to help remember all the skills, abilities, etc especially for long running campaigns. It's turned into a lot more since then.</p>
            <p>I built this application late at night, without the assistance of caffeine (since I had to get up the next morning for work) so I exepct there to be errors. I added in all the Mordheim Warbands from Core to 2A along with the hired swords.</p>
            
            <h4>Feedback Welcome</h4>
            <p>I fully expect there to be errors and mistakes, and sometimes things that just don't make sense. If you come across them let me know please. If you have recommendations, let me know.</p>
        `
    },
    {
        id: 'features-overview',
        title: 'Feature Overview - What Can You Do?',
        date: '2026-01-20',
        category: 'tutorial',
        tags: ['features', 'tutorial', 'guide'],
        content: `
            <h3>Complete Warband Management</h3>
            <p>The Mordheim Roster Manager provides comprehensive tools for managing your warbands throughout campaigns:</p>
            
            <h4>Core Features</h4>
            <ul>
                <li><strong>Warband Creation:</strong> Create and manage multiple warbands</li>
                <li><strong>Full Roster Management:</strong> Add heroes, henchmen, hired swords, and even vehicles</li>
                <li><strong>Equipment System:</strong> Comprehensive equipment management with storage, selling, and transferring</li>
                <li><strong>Advancement System:</strong> Complete hero and henchman advancement tracking</li>
                <li><strong>Turn Order Tracker:</strong> Never forget when your skills activate during the turn</li>
            </ul>
            
            <h4>Advanced Features</h4>
            <ul>
                <li><strong>House Rules:</strong> Toggle various house rules for your campaign</li>
                <li><strong>Injury Tracking:</strong> Permanent injury management with full rules integration</li>
                <li><strong>Magic System:</strong> Complete magic implementation with spell selection</li>
                <li><strong>Treasury Management:</strong> Track and manage your warband's wealth</li>
                <li><strong>Campaign Notes:</strong> Keep detailed notes about your campaign progress</li>
            </ul>
            
            <h4>Getting Started</h4>
            <p>You can create a warband without creating an account but the information is stored locally in your browser and might get lost if you clear your browser data or use a different device. If you want to be able to save and access your warband from different devices then create an account.</p>
        `
    },
    {
        id: 'a-small-update',
        title: 'A Small Update',
        date: '2026-02-27',
        category: 'announcement',
        tags: ['update'],
        content: `
            <h3>Just some thoughts</h3>
            <p>I can't believe this site has been up for over a month already. I started working on this application back in September of last year. It has grown far beyond what I originally intended. Last year as my group was wrapping up a 9 month long campaign one of the things I heard a lot and experienced myself was having trouble keeping track of everything during the game. I only get to play once a month and maybe it's cause im getting old but after 8 months of skill additions, injuries, one time use equipment and special rules I kept finding that during the game I was forgetting things. "Oh man I should have used my lucky charm" or "Oh no they can all move 4 inches excpet this guy with a leg injury sorry let me move him back". I guess the latter could have been fixed if i modeled a character with a peg leg, but who has time for that?</p>
            <p>Anyways the turn order tracker turned into a full roster manager and here we are. I still can't find the site on Google when I search for it. Not that I'm complaining, it is certainly still in alpha mode. I wont pull it into beta until I feel reasonably comfortable that its stable and wont break after I make a minor change.</p>
            <h4>A Bit About the Rules</h4>
            <p>Mordheim is an old game, and if you follow any of the social media sites you may notice to this day a lot of discussions about the rules. One person or group may interpret it one way and another a completely different way. One of the things I don't want this application to do is force people to follow one interpretation or another. So to that end I'm either making it so that what the application does can be overridden or instead of coding in something I'm just leaving an explanation and the user can decide how something works. This keeps me out of the line of fire, the internet can be a mean place so instead of getting into the middle of some of these heated discussions I'm just going to show you the options, you can choose.</p>
            <h4>What Comes Next</h4>
            <p>I'm wrapping up the Dramatis Personae now and they should be done in a week or two. After that I have some core things I need to go back and fix. For example the upkeep costs for hired swords and dramatis personae needs to be displayed along with who they will work for. I also want to implement the ability to pay for the ones that dont get paid in gold to get paid in whatever currency, usually warpstone, it is they accept.</p>
            <p>The first real test of this application will come next month when my gaming group starts its next campaign. I'll be using this application to see how well it works before, after and during. I think that will give me some valuable data points.</p>
        `
    },
    {
        id: 'first-trial-run',
        title: 'First Trial Run',
        date: '2026-03-20',
        category: 'announcement',
        tags: ['update'],
        content: `
            <h3>A Developer I am Not</h3>
            <p>My Mordheim group played the first two games of our campaign last Saturday. The night before I had created my warband using the browser on my desktop, double checked everything with the book and all looked good to go. Come game day I opened the app and during the first battle things were going relatively well. The first thing I realized was that the Warband Members view was not efficient on the phone. Next thing I realized, the magic spells did not show the difficulty. I also found myself wishing I could mark the number of kills for my heros. But other than that the game went great. Then the post game hit. I went to level up my characters and the up and down arrows for experience that I see in the desktop browser were not there, and I couldn't enter a number into the field. Bummer, good thing I had a hard copy of my warband. Up until now I’ve done all my testing using the desktop browser.</p>
            <p>I learned a lot in that first game and first post game about what I want the app to do in battle. Up until now it's all been creation, setup and list building. The Turn Actions was nice and worked as I hoped it would, other than it would have been nicer if it was easier to get to from the phone browser layout.</p>
            <h4>Back to the Lab</h4>
            <p>So yeah, the first thing I did when I got home was start coding up the Battle View. This view is meant to be used during battle, simplified and focused. From this view you can select the phase and the different relevant abilities are listed and can be expanded and collapsed. The Warband member cards show information needed during battle and track kills and casualties. Everything that I wish I had last weekend. I also fixed the UI issue for entering experience.</p>
            <p>Since I was at it and tracking kills I added an end battle button, this will allow us to assign injuries, remove the dead from the roster and then calculate that sweet sweet experience and apply it to the fighters. The leveling up will still need to be done from the Warband Members screen though.</p>
            <h4>Summary of the Changes</h4>
            <p>I finished implementing the alignment data and logic for who can hire what Hired Sword and Dramatis Personae depending on the alignment and individual rules on who they will work for. The edit fighter screen now also shows the upkeep cost. Because of the time I spent on the battle view I didn't get a chance to incorporate the special costs that some of the Hired Swords and Dramatis Personae have.</p>
            <p>I also added a house rule that ignores the Hired Sword and Dramatis Personae constraints, just in case a group didn't want to be held to them, or I made a mistake in my logic.</p>
            <p>Another small thing I added was the beginnings of a ledger. Currently it's more of a simple log of income and expenses. In the end I want to make it so that it shows the income and expenses along with tracking the upkeep costs. I plan on adding a single button that will pay all the upkeeps and make it look more like a ledger and less like a simple log.</p>
            <h4>What Comes Next</h4>
            <p>Well I'm torn between doing the Hired Sword and Dramatis Personae unique upkeep cost which I need to do if I want to continue on the ledger or taking the end battle phase to the next step and including the exploration phase. I have a family coming into town next week so I probably won't have as much time to work on this so next Friday's update will most likely be some minor behind the scenes updates.</p>
            <p>One final closing note, the app is now showing up in Google Searches (yay!). I did some minor SEO work and some registration. The hosting dashboard is showing some web traffic already. Just to make sure everyone knows this is still in Alpha I changed the color and size of the Alpha Build text in the banner.</p>
        `
    },
    {
        id: 'Customers Yay',
        title: 'Feedback',
        date: '2026-04-20',
        category: 'announcement',
        tags: ['update'],
        content: `
            <h3>Feedback Section</h3>
            <p>They say its the small things in life. I added the feedback section a couple weeks back and this week I had two people provide feedback! I was so excited that I actually stayed up late and fixed the issues and pushed the fix the next day. I added it into my weekly change log for this week. Which is happening a day early because I won't be able to make the push on Friday.</p>
            <p>I need to update the feedback section to also provide some feedback to the users that submit feedback. Let them know that I have acknowledged their feedback, rather than them having to wait until the end of the week to find out if I pushed something, and only to learn that I did an out of band push earlier in the week.</p>
            <h4>New Home</h4>
            <p>With the feedback and the traffic I am seeing hitting the site I felt like it was time to secure a real domain so I got Rosterheim.net. That is the new home for this app, the web.app still shows up in Google Search so I need to figure out some SEO stuff.</p>
            <h4>Round 2</h4>
            <p>My local club is meeting again for a campaign day this weekend so I look forward to running this app through another practical exercise. Last month I got a lot of good data points, so I'm hoping to get more this time. Though I will still be taking a paper roster as backup.</p>
            <h4>Ledger</h4>
            <p>I made some changes the ledger, for example being able to pay the upkeeps with a single button.</p>
            <h4>Battle and Post Battle</h4>
            <p>I've been making updates to the Battle Tracking portion of the app, one notable thing is the ability to track Rabbit Foot usage.</p>
            <p>I also started expanding upon the post battle sequence and going into the Exploration phase. There are a lot of skill and special rules that get used during that phase and since I took the time to note those I think it would be worth using that information to help people step through that phase.</p>
            <h4>What Comes Next</h4>
            <p>Something less cool and less fun unfortunately. I need to fix the json data that is being used to save warbands. The structure has gotten messy, I really didn't do proper planning and just kept adding.</p>
            <p>I'm also still going to keep working on the exploration phase, I started to create the json structure for the exploration chart and added the sickness logic for the Well (double ones).</p>
        `
    },
    {
        id: 'The Dread',
        title: 'The Dread',
        date: '2026-05-09',
        category: 'announcement',
        tags: ['update'],
        content: `
            <h3>V2 Save File</h3>
            <p>I finally did it, I updated the format for how warbands are saved in the database. I've been dreading doing this for over a month and I finally got it all working. The big thing that made this complicated was keeping backwards compatability. Granted, the application is in Alpha mode and I could have done what lots of early access Steam games are doing and made the pervious saves invalid. It would have been alot easier, but peronsally I hate when they do that (though I can see why) I on the other hand saw it as a challenge, only time will tell if I got it right though.</p>
            <p></p>
            <h4>Mobile Access</h4>
            <p>I plan on spending some time to make the application more mobile phone friendly. Thats going to include moving more things under menus and tightening the visuals up so they look better on a smaller screen.</p>
            <p>I also started making format changes to the help text. Currenlty if you select a piece of equipment, skill or special rule its one large block of text. I have started making updates that format the text to make it easier to read.</p>
            <h4>Feedback</h4>
            <p>I want to say thank you for those of you that have been submitting feedback and also to those of you who have added kind words to the feedback. When I get feedback I do make those items a top priority and now with the save file changes done I should be able to get future feedback requests implemented quicker.</p>
            <p>A quick note about the feedback system. It is not an automated system. When you submit the feedback the application does not automatically update the Feedback Status page. Rather I see the feedback data and then publish an update to the Feedback Status page. This does mean that there could be a day or two delay before you see your feedback in the status page.</p>
            <h4>Exploration Page</h4>
            <p>I made the Exploration page its own standalone page in the top menu. This way you don't have to go through the end battle steps to roll exploration. I plan on making more helper modules going forward, little things like calculating how many henchmen you can buy with your veterans dice for example.</p>
        `
    },
    {
        id: 'Year One',
        title: 'Year One',
        date: '2026-10-10',
        category: 'announcement',
        tags: ['update'],
        content: `
            <h3>It's Been One Year</h3>
            <p>Wow  I can't believe its been a year since I started work on this application. My groups current campaign for this year is coming to an end. I used this app for the whole campaign, learned what worked and did not work and I think its in a pretty good place now. Last month was the first month where I came home and didn't immediately jump on my computer to start making changes. I still get feedback and I am very grateful to those of you that take the time to send the feedback and bugs. I'm just one person, and I use the app the way I designed it, so of course to me it works, and I don't see some of these issues and edge cases others see. Especially for warbands that I'm not actively using, so the feedback I've gotten has been amazing and valuable. I also want to thank those of you that have left kind words. I was very hesitant to put this app on the internet, but for the most part everyone has been really nice. </p>
            <p></p>
            <h4>Card Builder</h4>
            <p>I had a restless night the other week and was sitting at my desk looking over some of my MtG cards and had the thought that it might be cool to have the warbands in card format. The card studio will allow you to print your warband in card format and slide them into the sleeves like those used for MtG cards. I also made it available for people that don't have an account or a warband setup. The card studio allows you to create a warband right there in the studio, though without going through the actual roster builder you wont get equipment and skills, they will just be blank lines. If it turns out I get a lot of people using this then in the future I'll make it so that you can add equipment and skills to the cards directly.</p>
            <p></p>
            <h4>The Future</h4>
            <p>The card builder studio was a fun side project. As far as the future of Rosterheim is concerned I have gotten very few technical bugs in the past couple months. Most of what I am getting now are because I can't copy and paste right, or I copy and paste and don't change values. Yes contrary to what you might think, all of the .json files that contain the information driving this application were hand jammed!! None of them were generated by AI. Not for the lack of trying, but damn, you ask it to do more than two hero's or two henchmen groups and all of a sudden its making up a new game with unique weapons and skills that don't exist. The feedback I'm getting now is because I can't copy and paste or I fat finger a number. For example all the equipment is in one .json and the warbands reference the ID of the equipment in their warband .json. So when your Undead Vampire has access to a warplock pistol its because I referenced the wrong ID when I typed up the warband. I think the application is ready to move out of Alpha and into Beta. This represents that the underlying architecture that drives it won't be changed anymore unless there is some major issue that still hasn't cropped up. I want to leave it as Beta so that people keep an eye out for some of the things I might have missed, like the cost of a Giant Spider being 125 instead of 200. I will also continue to make visual updates, add new features and make quality of life improvements.</p>
            <p></p>
            <h4>Campaign Manager</h4>
            <p>With Rosterheim going into beta and no more architectural changes planned, I have started to think about the campaign manager. The question keeps coming up if I plan on making one. The answer is yes and its in planning.</p>
            <p></p>
            <p>Than you for your support.</p>
        `
    }
];

// Blog categories for filtering
export const BLOG_CATEGORIES = [
    { id: 'all', name: 'All Posts', icon: 'fas fa-list' },
    { id: 'announcement', name: 'Announcements', icon: 'fas fa-bullhorn' },
    { id: 'tutorial', name: 'Tutorials', icon: 'fas fa-graduation-cap' },
    { id: 'update', name: 'Updates', icon: 'fas fa-sync-alt' }
];

// Helper function to format dates
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to get posts by category
export const getPostsByCategory = (category) => {
    if (category === 'all') return BLOG_POSTS;
    return BLOG_POSTS.filter(post => post.category === category);
};

// Helper function to get post by ID
export const getPostById = (id) => {
    return BLOG_POSTS.find(post => post.id === id);
};
