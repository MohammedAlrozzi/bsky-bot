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
import { bskyAccount, bskyService } from "./config.js";
import type {
  AtpAgentLoginOpts,
  AtpAgentOpts,
  AppBskyFeedPost,
} from "@atproto/api";
import atproto from "@atproto/api";
const { BskyAgent, RichText } = atproto;

type BotOptions = {
  service: string | URL;
  dryRun: boolean;
};

export default class Bot {
  #agent;

  static defaultOptions: BotOptions = {
    service: bskyService,
    dryRun: false,
  } as const;

  constructor(service: AtpAgentOpts["service"]) {
    this.#agent = new BskyAgent({ service });
  }

  login(loginOpts: AtpAgentLoginOpts) {
    return this.#agent.login(loginOpts);
  }

  async post(
    text:
      | string
      | (Partial<AppBskyFeedPost.Record> &
          Omit<AppBskyFeedPost.Record, "createdAt">)
  ) {
    // Check if text is a string and process for URLs
    if (typeof text === "string") {
      const richText = new RichText({ text });
      await richText.detectFacets(this.#agent);

      // Detect URLs and add them as facets
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      let match;
      const urlFacets = [];

      while ((match = urlRegex.exec(text)) !== null) {
        const url = match[0];
        const start = match.index;
        const end = start + url.length;

        // Convert character positions to byte positions
        const byteStart = Buffer.byteLength(text.slice(0, start), "utf-8");
        const byteEnd = byteStart + Buffer.byteLength(url, "utf-8");

        urlFacets.push({
          index: { byteStart, byteEnd },
          features: [{ type: "link", uri: url }],
        });
      }

      // Append URL facets to richText facets if any
      richText.facets = [...(richText.facets || []), ...urlFacets];

      const record = {
        text: richText.text,
        facets: richText.facets,
      };

      return this.#agent.post(record);
    } else {
      return this.#agent.post(text);
    }
  }

  static async run(
    getPostText: () => Promise<string>,
    botOptions?: Partial<BotOptions>
  ) {
    const { service, dryRun } = botOptions
      ? Object.assign({}, this.defaultOptions, botOptions)
      : this.defaultOptions;
    const bot = new Bot(service);
    await bot.login(bskyAccount);
    const text = await getPostText();
    if (!dryRun) {
      await bot.post(text);
    }
    return text;
  }
}
