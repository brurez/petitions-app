// returns true if the current execution is happening on the server and not in the browser
export const isServer = () => !process.browser;
