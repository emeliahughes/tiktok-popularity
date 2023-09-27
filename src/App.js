import React from 'react';
import './App.css';
//import Signup from './Components/Signup';
import QuizSection from './Components/QuizSection';

function App() {
  let videos = [
    {
      "vidID": 1,
      "numViews": "4,200,000",
      "numLikes": "644,000",
      "category": "rainforest-cafe",
      "link": "https://www.tiktok.com/@jaedank/video/7277721287672302890?is_from_webapp=1&sender_device=pc&web_id=7283217475364652574",
      "embedCode": "<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@jaedank/video/7277721287672302890\" data-video-id=\"7277721287672302890\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"@jaedank\" href=\"https://www.tiktok.com/@jaedank?refer=embed\">@jaedank</a> <p>More like the deforestation cafe. Knucks.  🤜🤛 (The rainforest cafe every 20 minutes)</p> <a target=\"_blank\" title=\"♬ original sound - Jaedan Knight\" href=\"https://www.tiktok.com/music/original-sound-7277721303472147242?refer=embed\">♬ original sound - Jaedan Knight</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>"
    },
    {
      "vidID": 2,
      "numViews": "4,800,000",
      "numLikes": "985,900",
      "category": "rainforest-cafe",
      "link": "https://www.tiktok.com/@carbon_.based._lifeform/video/7250668800541084971?is_from_webapp=1&sender_device=pc&web_id=7283217475364652574",
      "embedCode": "<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@carbon_.based._lifeform/video/7250668800541084971\" data-video-id=\"7250668800541084971\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"@carbon_.based._lifeform\" href=\"https://www.tiktok.com/@carbon_.based._lifeform?refer=embed\">@carbon_.based._lifeform</a> <p>rainforest cafe 😍</p> <a target=\"_blank\" title=\"♬ original sound - Unknown_fnaf_fan\" href=\"https://www.tiktok.com/music/original-sound-7059193493859896111?refer=embed\">♬ original sound - Unknown_fnaf_fan</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>"
    },
    {
      "vidID": 3,
      "numViews": "197,700",
      "numLikes": "14,900",
      "category": "rainforest-cafe",
      "link": "https://www.tiktok.com/@sayyyydeeee/video/7208612613729701162?is_from_webapp=1&sender_device=pc&web_id=7283217475364652574",
      "embedCode": "<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@sayyyydeeee/video/7208612613729701162\" data-video-id=\"7208612613729701162\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"@sayyyydeeee\" href=\"https://www.tiktok.com/@sayyyydeeee?refer=embed\">@sayyyydeeee</a> we are rainforest cafe girls at heart <a title=\"rainforestcafe\" target=\"_blank\" href=\"https://www.tiktok.com/tag/rainforestcafe?refer=embed\">#rainforestcafe</a> <a title=\"galveston\" target=\"_blank\" href=\"https://www.tiktok.com/tag/galveston?refer=embed\">#galveston</a> <a title=\"galvestontx\" target=\"_blank\" href=\"https://www.tiktok.com/tag/galvestontx?refer=embed\">#galvestontx</a> <a title=\"fyp\" target=\"_blank\" href=\"https://www.tiktok.com/tag/fyp?refer=embed\">#fyp</a> <a title=\"foryou\" target=\"_blank\" href=\"https://www.tiktok.com/tag/foryou?refer=embed\">#foryou</a> <a target=\"_blank\" title=\"♬ The Lion Sleeps Tonight - Vittorio Fraja\" href=\"https://www.tiktok.com/music/The-Lion-Sleeps-Tonight-6717468942622787585?refer=embed\">♬ The Lion Sleeps Tonight - Vittorio Fraja</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>"
    },
    {
      "vidID": 4,
      "numViews": "56,000",
      "numLikes": "5324",
      "category": "pledgetok",
      "link": "https://www.tiktok.com/@wittlekittens69/video/7281432827374161195?is_from_webapp=1&sender_device=pc&web_id=7283217475364652574",
      "embedCode": "<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@wittlekittens69/video/7281432827374161195\" data-video-id=\"7281432827374161195\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"@wittlekittens69\" href=\"https://www.tiktok.com/@wittlekittens69?refer=embed\">@wittlekittens69</a> classy dancers <a title=\"pledgetok\" target=\"_blank\" href=\"https://www.tiktok.com/tag/pledgetok?refer=embed\">#pledgetok</a> <a title=\"texastech\" target=\"_blank\" href=\"https://www.tiktok.com/tag/texastech?refer=embed\">#texastech</a> <a target=\"_blank\" title=\"♬ You Should Be Dancing - Bee Gees\" href=\"https://www.tiktok.com/music/You-Should-Be-Dancing-6917508330751690753?refer=embed\">♬ You Should Be Dancing - Bee Gees</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>"
    },
    {
      "vidID": 5,
      "numViews": "729,600",
      "numLikes": "127,900",
      "category": "pledgetok",
      "link": "https://www.tiktok.com/@m0nkeysandbananas/video/7280263565259410719?is_from_webapp=1&sender_device=pc&web_id=7283217475364652574",
      "embedCode": "<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@m0nkeysandbananas/video/7280263565259410719\" data-video-id=\"7280263565259410719\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"@m0nkeysandbananas\" href=\"https://www.tiktok.com/@m0nkeysandbananas?refer=embed\">@m0nkeysandbananas</a> dancin yea<a title=\"pledgetok\" target=\"_blank\" href=\"https://www.tiktok.com/tag/pledgetok?refer=embed\">#pledgetok</a> <a target=\"_blank\" title=\"♬ You Should Be Dancing - Bee Gees\" href=\"https://www.tiktok.com/music/You-Should-Be-Dancing-6917508330751690753?refer=embed\">♬ You Should Be Dancing - Bee Gees</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>"
    },
    {
      "vidID": 6,
      "numViews": "1,500,000",
      "numLikes": "351,800",
      "category": "pledgetok",
      "link": "https://www.tiktok.com/@m0nkeysandbananas/video/7281368514198261035?is_from_webapp=1&sender_device=pc&web_id=7283217475364652574",
      "embedCode": "<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@m0nkeysandbananas/video/7281368514198261035\" data-video-id=\"7281368514198261035\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"@m0nkeysandbananas\" href=\"https://www.tiktok.com/@m0nkeysandbananas?refer=embed\">@m0nkeysandbananas</a> your newest members of pitch perfect🗣️ <a title=\"pledgetok\" target=\"_blank\" href=\"https://www.tiktok.com/tag/pledgetok?refer=embed\">#pledgetok</a> <a target=\"_blank\" title=\"♬ original sound - monkeys&#38;bananas\" href=\"https://www.tiktok.com/music/original-sound-7281368537367595818?refer=embed\">♬ original sound - monkeys&#38;bananas</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>"
    },
    {
      "vidID": 7,
      "numViews": "2,900,000",
      "numLikes": "489,700",
      "category": "pledgetok",
      "link": "https://www.tiktok.com/@notjadenaraiza/video/7277734487268658462?is_from_webapp=1&sender_device=pc&web_id=7283217475364652574",
      "embedCode": "<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@notjadenaraiza/video/7277734487268658462\" data-video-id=\"7277734487268658462\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"@notjadenaraiza\" href=\"https://www.tiktok.com/@notjadenaraiza?refer=embed\">@notjadenaraiza</a> <a title=\"pledgetok\" target=\"_blank\" href=\"https://www.tiktok.com/tag/pledgetok?refer=embed\">#pledgetok</a> <a title=\"sdfc\" target=\"_blank\" href=\"https://www.tiktok.com/tag/sdfc?refer=embed\">#sdfc</a> <a target=\"_blank\" title=\"♬ original sound - Eggs Tyrone\" href=\"https://www.tiktok.com/music/original-sound-7272922391293037343?refer=embed\">♬ original sound - Eggs Tyrone</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>"
    },
    {
      "vidID": 8,
      "numViews": "902,100",
      "numLikes": "193,200",
      "category": "pledgetok",
      "link": "https://www.tiktok.com/@daytondito/video/7281055425745800478?is_from_webapp=1&sender_device=pc&web_id=7283217475364652574",
      "embedCode": "<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@daytondito/video/7281055425745800478\" data-video-id=\"7281055425745800478\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"@daytondito\" href=\"https://www.tiktok.com/@daytondito?refer=embed\">@daytondito</a> We love TikTok <a title=\"pledgetok\" target=\"_blank\" href=\"https://www.tiktok.com/tag/pledgetok?refer=embed\">#pledgetok</a> <a title=\"fyp\" target=\"_blank\" href=\"https://www.tiktok.com/tag/fyp?refer=embed\">#fyp</a> <a target=\"_blank\" title=\"♬ original sound - Dayton\" href=\"https://www.tiktok.com/music/original-sound-7281059065663458079?refer=embed\">♬ original sound - Dayton</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>"
    }];

  let pairs = [
    {
      "pairID": 1,
      "category": "rainforest-cafe",
      "video1": 1,
      "video2": 2
    },
    {
      "pairID": 2,
      "category": "rainforest-cafe",
      "video1": 1,
      "video2": 3
    },
    {
      "pairID": 3,
      "category": "rainforest-cafe",
      "video1": 2,
      "video2": 3
    },
    {
      "pairID": 4,
      "category": "pledgetok",
      "video1": 4,
      "video2": 5
    },
    {
      "pairID": 5,
      "category": "pledgetok",
      "video1": 4,
      "video2": 6
    },
    {
      "pairID": 6,
      "category": "pledgetok",
      "video1": 4,
      "video2": 7
    },
    {
      "pairID": 7,
      "category": "pledgetok",
      "video1": 4,
      "video2": 8
    },
    {
      "pairID": 8,
      "category": "pledgetok",
      "video1": 5,
      "video2": 6
    },
    {
      "pairID": 9,
      "category": "pledgetok",
      "video1": 5,
      "video2": 7
    },
    {
      "pairID": 10,
      "category": "pledgetok",
      "video1": 5,
      "video2": 8
    },
    {
      "pairID": 11,
      "category": "pledgetok",
      "video1": 6,
      "video2": 7
    },
    {
      "pairID": 12,
      "category": "pledgetok",
      "video1": 6,
      "video2": 8
    },
    {
      "pairID": 13,
      "category": "pledgetok",
      "video1": 7,
      "video2": 8
    }];

    for (let i = 0; i < pairs.length; i++){
      pairs[i].video1 = videos[pairs[i].video1 - 1];
      pairs[i].video2 = videos[pairs[i].video2 - 1];
    }

    let shuffled = pairs.sort(function(){ return 0.5 - Math.random() });
    let selectedPairs = shuffled.slice(0,5);
    
  return (
    <div className="App container text-center">
      <h1>Hot or not? Rate the TikTok</h1>
      <QuizSection pairs={selectedPairs}/>
    </div>
  );
}

export default App;

