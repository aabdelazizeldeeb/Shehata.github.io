// Centralized Data Layer for the Birthday Website

export const siteData = {
    hero: {
        title: "HAPPY BIRTHDAY",
        name: "MOHAMMED",
        age: 38,
        dateRange: "September 13, 1988 — September 13, 2026",
        subtitle: "A story worth remembering."
    },
    images: [
        // Category 1 - MOHAMMED (Individual Photos)
        {
            id: "m-1", url: "assets/images/mohammed/515506616_10223615397852937_2992065909485038410_n.webp",
            category: "mohammed", featured: true, title: "The Hero", caption: "" // Selected as hero
        },
        {
            id: "m-hero", url: "assets/images/mohammed/487356715_10222469533327040_1319109118907427260_n.webp",
            category: "mohammed", featured: true, title: "The Hero", caption: "" 
        },
        {
            id: "m-2", url: "assets/images/mohammed/489676545_10222564310936421_819507619697740194_n.webp",
            category: "mohammed", featured: false, title: "", caption: "A moment worth remembering."
        },
        {
            id: "m-3", url: "assets/images/mohammed/493881134_10222728398638511_5816944751845292814_n.webp",
            category: "mohammed", featured: false, title: "", caption: ""
        },
        {
            id: "m-4", url: "assets/images/mohammed/494592817_10222752535961929_9059785292728913788_n.webp",
            category: "mohammed", featured: false, title: "", caption: ""
        },
        {
            id: "m-5", url: "assets/images/mohammed/497598895_10222852741106995_7303651973941927984_n.webp",
            category: "mohammed", featured: false, title: "", caption: ""
        },
        {
            id: "m-6", url: "assets/images/mohammed/499917612_10222982142741955_3197052693400676928_n.webp",
            category: "mohammed", featured: false, title: "", caption: ""
        },
        {
            id: "m-7", url: "assets/images/mohammed/515569288_10223615396252897_8276760267282577665_n.webp",
            category: "mohammed", featured: false, title: "", caption: ""
        },
        {
            id: "m-8", url: "assets/images/mohammed/515673949_10223573371562306_7124567009904461252_n.webp",
            category: "mohammed", featured: false, title: "", caption: ""
        },
        {
            id: "m-9", url: "assets/images/mohammed/516468789_10223614287265173_7399541227833910804_n.webp",
            category: "mohammed", featured: false, title: "", caption: ""
        },
        {
            id: "m-10", url: "assets/images/mohammed/FB_IMG_1759512462333.webp",
            category: "mohammed", featured: false, title: "", caption: ""
        },
        {
            id: "m-11", url: "assets/images/mohammed/FB_IMG_1759512523386.webp",
            category: "mohammed", featured: false, title: "", caption: ""
        },
        {
            id: "m-12", url: "assets/images/mohammed/FB_IMG_1759513420014.webp",
            category: "mohammed", featured: true, title: "", caption: "Still one of my favorites."
        },

        // Category 2 - US (Mohammed and Ahmed)
        {
            id: "u-1", url: "assets/images/us/IMG20250604144720.webp",
            category: "us", featured: true, title: "", caption: "One for the memories."
        },
        {
            id: "u-2", url: "assets/images/us/IMG20250821202119.webp",
            category: "us", featured: false, title: "", caption: "This moment still makes me smile."
        },
        {
            id: "u-3", url: "assets/images/us/IMG_20260318_100448.webp",
            category: "us", featured: false, title: "", caption: ""
        },
        {
            id: "u-4", url: "assets/images/us/IMG_3684.webp",
            category: "us", featured: false, title: "", caption: ""
        },
        {
            id: "u-5", url: "assets/images/us/IMG_3685.webp",
            category: "us", featured: false, title: "", caption: "We really thought that was a good idea. 😂"
        },
        {
            id: "u-6", url: "assets/images/us/IMG_3702.webp",
            category: "us", featured: false, title: "", caption: "The good old days."
        },

        // Category 2 - Memories
        { id: "mem-1", url: "assets/images/memories/IMG20250821202122.webp", category: "memories", featured: false, title: "", caption: "" },
        { id: "mem-2", url: "assets/images/memories/IMG20250821202343.webp", category: "memories", featured: false, title: "", caption: "" },
        { id: "mem-3", url: "assets/images/memories/IMG20250821213427.webp", category: "memories", featured: false, title: "", caption: "" },
        { id: "mem-4", url: "assets/images/memories/IMG20260101202609.webp", category: "memories", featured: false, title: "", caption: "" },
        { id: "mem-5", url: "assets/images/memories/IMG20260101202612.webp", category: "memories", featured: false, title: "", caption: "We definitely need more moments like this." },
        { id: "mem-6", url: "assets/images/memories/IMG20260101202643.webp", category: "memories", featured: false, title: "", caption: "" },
        { id: "mem-7", url: "assets/images/memories/IMG20260101202649.webp", category: "memories", featured: false, title: "", caption: "" },
        { id: "mem-8", url: "assets/images/memories/IMG20260101202651.webp", category: "memories", featured: false, title: "", caption: "" },

        // Category 2 - Featured
        { id: "feat-1", url: "assets/images/featured/IMG20260622180120.webp", category: "featured", featured: false, title: "", caption: "" },
        { id: "feat-2", url: "assets/images/featured/IMG20260622180122.webp", category: "featured", featured: false, title: "", caption: "" },
        { id: "feat-3", url: "assets/images/featured/IMG20260622180126.webp", category: "featured", featured: false, title: "", caption: "" },
        { id: "feat-4", url: "assets/images/featured/IMG20260622212432.webp", category: "featured", featured: false, title: "", caption: "" },
        { id: "feat-5", url: "assets/images/featured/IMG20260622212439.webp", category: "featured", featured: false, title: "", caption: "" },
        { id: "feat-6", url: "assets/images/featured/IMG20260622212755.webp", category: "featured", featured: false, title: "", caption: "" },
        { id: "feat-7", url: "assets/images/featured/IMG20260622212759.webp", category: "featured", featured: false, title: "", caption: "" },
        { id: "feat-8", url: "assets/images/featured/IMG20260622212804.webp", category: "featured", featured: false, title: "", caption: "" }
    ],
    videos: [], // Removed as requested
    audio: {
        url: "assets/audio/background-music.mp3" // Optional audio can stay if provided later
    }
};
