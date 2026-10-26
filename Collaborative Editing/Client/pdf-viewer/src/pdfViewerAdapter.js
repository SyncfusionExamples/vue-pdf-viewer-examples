import {
    CollaborativeEditingHandler
} from '@syncfusion/ej2-pdfviewer';

export class PdfViewerAdapter {

    constructor(viewer, serviceUrl, currentUser) {
        this.viewer = viewer;
        this.serviceUrl = serviceUrl;
        this.currentUser = currentUser;

        this.collaborativeEditingHandler =
            new CollaborativeEditingHandler(viewer, currentUser);

        this.fileName = '';
        this.currentRoomName = '';
        this.isDocumentLoaded = false;
        this.pendingOperations = null;
    }

    async loadFromServer(fileName) {
        this.isDocumentLoaded = false;
        this.fileName = fileName || 'document.pdf';

        const roomName = this.getRoomName();
        this.currentRoomName = roomName;

        try {
            const response = await fetch(
                `${this.serviceUrl}api/CollaborativeEditing/ImportFile`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        roomName: roomName,
                        fileName: this.fileName,
                        currentUser: this.currentUser
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to join collaboration room: ${response.statusText}`
                );
            }

            const responseText = await response.text();

            await this.open(responseText, roomName);

            return roomName;
        } catch (error) {
            console.error(
                '[PdfViewerAdapter] Error loading from server:',
                error
            );
            throw error;
        }
    }

    async open(responseText, roomName) {
        try {
            const data = JSON.parse(responseText);

            const version =
                data.version ||
                data.currentVersion ||
                0;

            this.collaborativeEditingHandler.updateRoomInfo(
                roomName,
                version,
                `${this.serviceUrl}api/CollaborativeEditing/`
            );

            this.pendingOperations = data.operations;

            if (data.operations && data.operations.length > 0) {
                for (const op of data.operations) {
                    this.collaborativeEditingHandler.applyRemoteAction(
                        op.type,
                        op
                    );
                }
            }

            this.isDocumentLoaded = true;
        } catch (error) {
            console.error(
                '[PdfViewerAdapter] Error initializing document:',
                error
            );
            throw error;
        }
    }

    async sendActionToServer(operations) {
        try {
            if (!operations || operations.length === 0) {
                console.warn(
                    '[PdfViewerAdapter] No operations to send'
                );
                return;
            }

            await this.collaborativeEditingHandler.sendActionToServer(
                operations
            );
        } catch (error) {
            console.error(
                '[PdfViewerAdapter] Error sending operations:',
                error
            );
            throw error;
        }
    }

    applyRemoteAction(action, data) {

        const avatars = {
            RIO: 'https://ej2.syncfusion.com/demos/src/avatar/images/pic01.png',
            JOHN: 'https://ej2.syncfusion.com/demos/src/avatar/images/pic03.png',
            MAXY: 'https://ej2.syncfusion.com/demos/src/avatar/images/pic02.png',
            SHAI: 'https://ej2.syncfusion.com/demos/src/avatar/images/pic04.png'
        };

        if (action === 'addUser') {

            if (
                data.payload &&
                Array.isArray(data.payload) &&
                data.payload.length > 0
            ) {
                data.payload.forEach((user) => {
                    if (avatars[user.currentUser]) {
                        user.image = avatars[user.currentUser];
                    }
                });
            }
            else if (data.payload) {
                if (avatars[data.payload.currentUser]) {
                    data.payload.image =
                        avatars[data.payload.currentUser];
                }
            }
        }
        else if (action === 'connectionId') {

            let image = '';

            if (avatars[this.currentUser]) {
                image = avatars[this.currentUser];
            }

            data.payload = {
                payload: data.payload,
                image: image
            };
        }

        this.collaborativeEditingHandler.applyRemoteAction(
            action,
            data.payload
        );
    }

    getRoomName() {

        if (typeof window !== 'undefined') {

            const queryString = window.location.search;

            const urlParams =
                new URLSearchParams(queryString);

            let roomId = urlParams.get('id');

            if (!roomId) {
                roomId = Math.random()
                    .toString(32)
                    .slice(2);

                window.history.replaceState(
                    {},
                    '',
                    `?id=${roomId}`
                );
            }

            return roomId;
        }

        return Math.random()
            .toString(32)
            .slice(2);
    }

    updatePendingOperations() {

        if (
            this.pendingOperations &&
            this.pendingOperations.length > 0
        ) {
            for (const op of this.pendingOperations) {
                this.collaborativeEditingHandler.applyRemoteAction(
                    op.type,
                    op
                );
            }
        }
    }
}