
import makeWASocket, {
    WASocket,
    Browsers,
    DisconnectReason,
    fetchLatestWaWebVersion,
    makeCacheManagerAuthState,
    makeInMemoryStore,
    isJidBroadcast,
    CacheStore,
    useMultiFileAuthState
} from "@whiskeysockets/baileys";

import qrcode from 'qrcode-terminal';

import MAIN_LOGGER from "@whiskeysockets/baileys/lib/Utils/logger";

import { Boom } from "@hapi/boom";


const loggerBaileys = MAIN_LOGGER.child({});
loggerBaileys.level = "error";

export const initWASocket = async () => {

    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    })

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

            if (shouldReconnect) {
                initWASocket()
            }
        } else if (connection === 'open') {
            console.log('Connected to WA');
        }

        if (qr) {
            qrcode.generate(qr, { small: true });
        }
    });

    sock.ev.on('messages.upsert', async m => {
        console.log(JSON.stringify(m, undefined, 2))

        console.log('replying to', m.messages[0].key.remoteJid)
        // await sock.sendMessage(m.messages[0].key.remoteJid!, { text: 'Hello there!' })
    })
};


