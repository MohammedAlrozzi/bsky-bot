// import { env } from "node:process";
// import { z } from "zod";
// import type { AtpAgentLoginOpts } from "@atproto/api";

// const envSchema = z.object({
//   BSKY_HANDLE: z.string().nonempty(),
//   BSKY_PASSWORD: z.string().nonempty(),
//   BSKY_SERVICE: z.string().nonempty().default("https://bsky.social"),
// });

// const parsed = envSchema.parse(env);

// export const bskyAccount: AtpAgentLoginOpts = {
//   identifier: parsed.BSKY_HANDLE,
//   password: parsed.BSKY_PASSWORD,
// };

// export const bskyService = parsed.BSKY_SERVICE;
export const twitterConfig = {
  consumer_key: 'zmEna2xd5pwakykKhJvMGWujc',
  consumer_secret: 'UtByzhHArs0bR0j5QqxZ3bA3JSqmzG2SyT43LRtXLL2eeAyPy4',
  access_token: '243448555-PfPPClWzgU2raJdu5DJgzMAjTgpDGzyO0ZLPropk',
  access_token_secret: 'bQNa0osgnLPhOEtPPn60XGT8dgab2u5S63SL8SfkmhixO'
};