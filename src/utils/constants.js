export const MESSAGE_PREFIX = `You must sign this message to prove ownership of your wallet address.\nBy signing this message, you agree to Lazy Butt's Terms of Service and acknowledge that we use cookies to keep you logged in.\n`;
export const BUTTS_CONTRACT_ADDRESS =
  import.meta.env.VITE_ENV === "dev"
    ? import.meta.env.VITE_BUTTS_CONTRACT_ADDRESS_TEST
    : import.meta.env.VITE_BUTTS_CONTRACT_ADDRESS;
export const ALCHEMY_API_KEY =
  import.meta.env.VITE_ENV === "dev"
    ? import.meta.env.VITE_ALCHEMY_API_KEY_TEST
    : import.meta.env.VITE_ALCHEMY_API_KEY;
