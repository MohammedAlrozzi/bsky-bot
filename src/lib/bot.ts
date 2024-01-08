// import { bskyAccount, bskyService } from "./config.js";
// import type {
//   AtpAgentLoginOpts,
//   AtpAgentOpts,
//   AppBskyFeedPost,
// } from "@atproto/api";
// import atproto from "@atproto/api";
// const { BskyAgent, RichText } = atproto;

// type BotOptions = {
//   service: string | URL;
//   dryRun: boolean;
// };

// export default class Bot {
//   #agent;

//   static defaultOptions: BotOptions = {
//     service: bskyService,
//     dryRun: false,
//   } as const;

//   constructor(service: AtpAgentOpts["service"]) {
//     this.#agent = new BskyAgent({ service });
//   }

//   login(loginOpts: AtpAgentLoginOpts) {
//     return this.#agent.login(loginOpts);
//   }

//   async post(
//     text:
//       | string
//       | (Partial<AppBskyFeedPost.Record> &
//           Omit<AppBskyFeedPost.Record, "createdAt">)
//   ) {
//     if (typeof text === "string") {
//       const richText = new RichText({ text });
//       await richText.detectFacets(this.#agent);
//       const record = {
//         text: richText.text,
//         facets: richText.facets,
//       };
//       return this.#agent.post(record);
//     } else {
//       return this.#agent.post(text);
//     }
//   }

//   static async run(
//     getPostText: () => Promise<string>,
//     botOptions?: Partial<BotOptions>
//   ) {
//     const { service, dryRun } = botOptions
//       ? Object.assign({}, this.defaultOptions, botOptions)
//       : this.defaultOptions;
//     const bot = new Bot(service);
//     await bot.login(bskyAccount);
//     const text = await getPostText();
//     if (!dryRun) {
//       await bot.post(text);
//     }
//     return text;
//   }
// }
import Twit from 'twit';
import { twitterConfig } from './config.js';

type BotOptions = {
  dryRun: boolean;
};

export default class Bot {
  #twit;

  static defaultOptions: BotOptions = {
    dryRun: false,
  } as const;

  constructor() {
    this.#twit = new Twit(twitterConfig);
  }

  async post(text: string) {
    return new Promise((resolve, reject) => {
      if (!Bot.defaultOptions.dryRun) {
        this.#twit.post('statuses/update', { status: text }, (err, data, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      }
    });
  }
  
  static async run(getPostText: () => Promise<string>, botOptions?: Partial<BotOptions>) {
    const { dryRun } = botOptions
      ? Object.assign({}, Bot.defaultOptions, botOptions)
      : Bot.defaultOptions;
    const bot = new Bot();
    const text = await getPostText();
    if (!dryRun) {
      await bot.post(text);
    }
    return text;
  }
}