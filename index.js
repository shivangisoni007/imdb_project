const requestPromises = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

const URL = [
    {
        url: 'https://www.imdb.com/title/tt0111161/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=GKNW2W76RZ0AZY0CB64Y&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_1',
        id: 'the_shawshank_redemption'
    },
    {
        url: 'https://www.imdb.com/title/tt0068646/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=GKNW2W76RZ0AZY0CB64Y&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_2',
        id: 'the_godfather'
    },
    {
         url: 'https://www.imdb.com/title/tt0071562/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=93JNTMVJPRXFNMS3VGAT&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_3',
         id: 'the_godfather_2'
     },
    {
        url: 'https://www.imdb.com/title/tt0468569/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=93JNTMVJPRXFNMS3VGAT&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_4',
        id: 'The_dark_knight'
    },
    {
        url: 'https://www.imdb.com/title/tt0050083/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=93JNTMVJPRXFNMS3VGAT&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_5',
        id: '12_angry_men'
    },
    {
        url: 'https://www.imdb.com/title/tt0108052/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=93JNTMVJPRXFNMS3VGAT&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_6',
        id: 'schindler_list'
    },
    {
        url: 'https://www.imdb.com/title/tt0167260/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=93JNTMVJPRXFNMS3VGAT&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_7',
        id: 'The_lord_of_rings'
    },
    {
        url: 'https://www.imdb.com/title/tt0110912/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=93JNTMVJPRXFNMS3VGAT&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_8',
        id: 'pulp_fiction'
    },
    {
        url: 'https://www.imdb.com/title/tt0060196/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=93JNTMVJPRXFNMS3VGAT&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_9',
        id: 'the_good_the_bad_and_the_ugly'
    },
    {
        url: 'https://www.imdb.com/title/tt0120737/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=93JNTMVJPRXFNMS3VGAT&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_10',
        id: 'The_lord_of_rings_2'
    },

        ];

(async () => {

    let moviesData = [];

    for(let movie of URL){
    const response = await requestPromises({
        uri: movie.url,
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'referer': 'https://www.imdb.com/title/tt0102926/?ref_=nv_sr_1',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
            'sec-ch-ua-mobile': '?0',
            'sec-fetch-dest': 'iframe',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
        },
        gzip: true
    });

    let $ = cheerio.load(response);

    let title = $('div.title_wrapper > h1').text().trim();
    let rating = $('div.ratingValue > strong > span').text();
    let totalRatings = $('div.imdbRating > a').text();
    let poster = $('div.poster > a > img').attr('src');
    let releaseDate = $('a[title="See more release dates"]').text().trim();
    let storyLine = $('div.inline.canwrap > p > span').text().trim();
    let time = $('div[class="subtext"] > time').text().trim();
    let summary = $('div.plot_summary > div.summary_text').text().trim();
    let trailerLink = $('div.slate > a').attr('href');

    let creators = [];
    $('div[class="credit_summary_item"] a[href^="/name/"]').each((i,ele) =>{
        let creator = $(ele).text();

        creators.push(creator);
    });

    let achievements = [];
    $('span.awards-blurb').each((i,ele) => {
        let achievement = $(ele).text().trim().replace('\n','').replace('\n','');


        achievements.push(achievement);
    });

    let types = [];
    $('div[class="title_wrapper"] a[href^="/search/title?genres="]').each((i,ele) => {
        let type = $(ele).text();

        types.push(type);
    });

    moviesData.push({
        title,
        rating,
        totalRatings,
        poster,
        releaseDate,
        storyLine,
        time,
        summary,
        trailerLink,
        creators,
        achievements,
        types
    });

    let file = fs.createWriteStream(`${movie.id}.jpeg`);
    await new Promise((res, rej) => {
        let stream = request({
            uri: poster,
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'referer': 'https://www.imdb.com/title/tt0102926/?ref_=nv_sr_1',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'iframe',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
            },
            gzip: true
        })
        .pipe(file)
        .on('finish', () => {
            console.log(`${movie.id} finished downloading.`);
            res();
        })
        .on('err', () => {
            rej(err);
        })
    })
    .catch(err => {
        console.log(`${movie.id} has an error ${err}`);
    });
    
}

fs.writeFileSync('./Moviedata1.json', JSON.stringify(moviesData), 'utf-8');

})()
