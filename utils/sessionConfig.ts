interface Sessions {
  [sessionId: string]: { [key: string]: any };
}

let sessions: Sessions = {};

export default {
  start: (sessionId: string, callback: () => void): void => {
    // initialize current session if it doesn't exist
    // this is called by menu.run()
    if (!(sessionId in sessions)) sessions[sessionId] = {};
    callback();
  },
  end: (sessionId: string, callback: () => void): void => {
    // clear current session
    // this is called by menu.end()
    delete sessions[sessionId];
    callback();
  },
  set: (sessionId: string, key: string, value: any, callback: () => void): void => {
    // store key-value pair in the current session
    sessions[sessionId][key] = value;
    callback();
  },
  get: (sessionId: string, key: string, callback: (error: Error | null, value?: any) => void): void => {
    // retrieve value by key in the current session
    let value = sessions[sessionId][key];
    callback(null, value);
  },
};
