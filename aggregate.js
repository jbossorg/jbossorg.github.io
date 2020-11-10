const fs = require('fs');
const YAML = require('yaml');
const FeedParser = require('feedparser');
const fetch = require('node-fetch'); // for fetching the feed
const {htmlToText} = require('html-to-text');
const dateFormat = require('dateformat');

const configFile = 'src/data/aggregator-feeds.yaml';
const contentOutDir = 'src/content/posts-aggregator/';
const maxPosts = 20;

// Error handling
const logErrorAndExit = (message, err) => {
    console.error("ERROR " + message + " error=" + err);
    process.exit(1);
}
process.on('uncaughtException', err => logErrorAndExit("", err))

// process feed promise function. The result of this promise is array of posts objects
const processFeed = (url) => {
    return new Promise((resolve, reject) => {
        let fetchedPosts = [];

        let feedparser = new FeedParser([{
            addmeta: false
        }]);
        fetch(url).then(res => {
            if (res.status !== 200) {
                reject('Response return not 200, code=' + res.status + ' feed_url=' + url + ' response_text=' + res.statusText);
            } else {
                // The response `body` -- res.body -- is a stream
                res.body.pipe(feedparser);
            }
        }).catch(err => reject(err));

        feedparser.on('error', (err) => reject(err));

        feedparser.on('readable', function () {
            let stream = this; // `this` is `feedparser`, which is a stream
            let item;

            while (item = stream.read()) {
                fetchedPosts.push(item);
            }
        });

        feedparser.on('end', () => resolve(fetchedPosts));
    })
};

// Start the aggregation process
console.log("Going to read the config file %s", configFile);
const config = fs.readFileSync(configFile, 'utf8');
const feedsJson = YAML.parseDocument(config, {schema: 'core'}).toJSON();

let allPosts = [];
let feedsProcessed = 0;

const start = new Date(), feedsCount = feedsJson.length;

console.log("Going to read %s feeds and store all blog posts to memory", feedsCount);
feedsJson.forEach((item, index) => {
    let feedNumber = index + 1;
    let feedStart = new Date();
    console.log("Feed Process #%s START feeds_started=[%s/%s] feed_url=%s", feedNumber, feedNumber, feedsCount, item);

    processFeed(item).then(fetchedPosts => {
        feedsProcessed++;
        const duration = new Date() - feedStart;

        fetchedPosts.forEach(item => allPosts.push(item));

        console.log("Feed Process #%s END fetch_duration=%sms feeds_finished=[%s/%s] feed_url=%s", feedNumber, duration, feedsProcessed, feedsCount, item);
    }).then(() => {
        if (feedsProcessed === feedsJson.length) {
            const duration = new Date() - start;
            console.log("ALL FEEDS FETCHED feeds_count=%s blog_posts_count=%s execution_time=%sms", feedsProcessed, allPosts.length, duration);
            allPostsFetched(allPosts);
        }
    }).catch(err => logErrorAndExit("Cannot parse feed. feed_url=" + item, err));
});

// All feeds and their blog posts fetched. Pick last 20 and store them

function allPostsFetched(posts) {
    // sort posts by pubdate DESC. in case that pubdate is equal compare based on title ASC
    let postsToSave = sortPosts(posts, 'pubdate', 'title');
    postsToSave = removeDuplicates(postsToSave);
    postsToSave = postsToSave.slice(0, maxPosts);

    console.log("Going to store last %s blog posts", postsToSave.length);
    postsToSave.forEach((dom, i) => {
        const filename = contentOutDir + (i + 1) + ".json";
        const doc = convertBlogPost(dom);

        fs.writeFile(filename, JSON.stringify(doc, null, 2), 'utf-8', err => {
            if (err) {
                logErrorAndExit("Cannot save blog post.", err);
            }
            console.log('Blog post saved file=%s pubdate=%s link=%s', filename, dateFormat(doc.date, "yyyy-mm-dd"), doc.link);
        });
    });
}

function convertBlogPost(dom) {
    let contentPreview = getContentPreview(dom.description);
    let item = {
        title: dom.title,
        id: dom.id,
        link: dom.link,
        author: [
            {
                name: dom.author,
            }
        ],
        date: dom.pubdate,
        feed_title: dom.meta.title,
        // image: dom.image,
        content: contentPreview,
        // category: []
    };
    // categories not used
    // dom.categories.forEach(function (c) {
    //     item.category.push({
    //         name: c
    //     });
    // })
    return item;
}

function getContentPreview(html) {
    let str = htmlToText(html, {
        tags: {
            'a': {format: 'skip'},
            'p': {options: {leadingLineBreaks: 0, trailingLineBreaks: 0}},
            'pre': {options: {leadingLineBreaks: 0, trailingLineBreaks: 0}},
            'img': {format: 'skip'}
        }
    });
    return str.split('\n').join(' ');
}

function removeDuplicates(array) {
    return array.filter(function (value, index, self) {
        // find the first item
        let item = array.find(o => o.link === value.link);
        // if the index is not same it's duplicate
        return self.indexOf(item) === index;
    });
}

function sortPosts(array, attr1, attr2) {
    return array.sort((a, b) => {
        const x = a[attr1];
        const y = b[attr1];

        let compare = x < y ? 1 : (x > y ? -1 : 0);
        if (compare === 0) {
            const x2 = b[attr2];
            const y2 = a[attr2];
            compare = x2 < y2 ? 1 : (x2 > y2 ? -1 : 0);
        }
        return compare;
    });
}
