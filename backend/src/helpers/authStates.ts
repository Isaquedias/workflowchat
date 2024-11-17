
import type {
    AuthenticationCreds,
    AuthenticationState,
    SignalDataTypeMap
} from '@whiskeysockets/baileys';
import { BufferJSON, initAuthCreds, proto } from '@whiskeysockets/baileys';

const KEY_MAP: { [T in keyof SignalDataTypeMap]: string } = {
    "pre-key": "preKey",
    session: "session",
    "sender-key": "senderKey",
    "app-state-sync-key": "appStateSyncKey",
    "app-state-sync-version": "appStateSyncVersion",
    "sender-key-memory": "senderKeyMemory",
}

const authState = async (
    whatsapp: any
): Promise<{ state: AuthenticationState; saveState: () => void }> => {

    let creds: AuthenticationCreds;
    let keys: any = {};

    const saveState = async () => {
        try {

        } catch (error) {

        }

    }

    if (whatsapp.session && whatsapp.session !== null) {
        const result = JSON.parse(whatsapp.session, BufferJSON.reviver);
        creds = result.creds;
        keys = result.keys;
    } else {
        creds = initAuthCreds();
        keys = {};
    }

    return {
        state: {
            creds,
            keys: {
                get: (type, ids) => {
                    const key = KEY_MAP[type];
                    return ids.reduce((dict: any, id) => {
                        let value = keys[key]?.[id];
                        if (value) {
                            if (type === "app-state-sync-key") {
                                value = proto.Message.AppStateSyncKeyData.fromObject(value);
                            }
                            dict[id] = value;
                        }
                        return dict;
                    }, {})
                },
                set: (data: any) => {
                    for (const i in data) {
                        const key = KEY_MAP[i as keyof SignalDataTypeMap];
                        keys[key] = keys[key] || {};
                        Object.assign(keys[key], data[i]);
                    }
                    saveState();
                }
            }
        },
        saveState
    }
}