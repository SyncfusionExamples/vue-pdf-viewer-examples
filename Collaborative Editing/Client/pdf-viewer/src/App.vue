<template>
  <div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
    <!-- Collaboration Status Bar -->
    <div style="
      padding: 10px 15px;
      backgroundColor: #f0f0f0;
      borderBottom: 1px solid #ddd;
      fontSize: 12px;
      display: flex;
      justifyContent: space-between;
      alignItems: center;
    ">
      <div>
        <strong>User:</strong> {{ currentUser }} |
        <strong> Status:</strong> 
        <span :style="{ color: statusColor }">
          {{ collaborationStatus }}
        </span> |
        <strong> Room:</strong> {{ roomName || 'N/A' }}
      </div>
      <div>
        <strong>Connected Users:</strong> {{ connectedUsers.join(', ') || 'None' }}
      </div>
    </div>

    <!-- PDF Viewer -->
    <div style="flex: 1; overflow: hidden;">
      <ejs-pdfviewer
        ref="pdfViewerRef"
        id="pdfViewer"
        :resourceUrl="resourceUrl"
        :enableCollaborativeEditing="true"
        @resourcesLoaded="handleResourcesLoaded"
        @documentChanged="handleDocumentChanged"
        @created="handleViewerCreated"
        style="height: 100%; width: 100%;"
      >
      </ejs-pdfviewer>
    </div>
  </div>
</template>

<script>
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
           ThumbnailView, Print, TextSelection, Annotation, TextSearch, FormFields, FormDesigner,
           PageOrganizer } from '@syncfusion/ej2-vue-pdfviewer';
import { CollaborationClient } from '@syncfusion/ej2-collaborator';
import { PdfViewerAdapter } from './pdfViewerAdapter';

// Available user list for demo purposes
const userList = ['RIO', 'JOHN', 'MAXY', 'SHAI', 'SRI'];
const SERVICE_URL = 'http://localhost:8081/';

export default {
  name: 'App',

  components: {
    "ejs-pdfviewer": PdfViewerComponent
  },

  data() {
    return {
      resourceUrl: "https://cdn.syncfusion.com/ej2/34.1.29/dist/ej2-pdfviewer-lib",
      isDocumentLoaded: false,
      collaborationStatus: 'initializing',
      currentUser: userList[Math.floor(Math.random() * userList.length)],
      connectedUsers: [],
      roomName: '',
      
      // Persistent references for collaboration
      adapter: null,
      client: null,
      roomNameRef: '',
      viewerInstance: null
    };
  },

  computed: {
    statusColor() {
      switch(this.collaborationStatus) {
        case 'connected':
          return '#28a745';
        case 'error':
          return '#dc3545';
        default:
          return '#ffc107';
      }
    }
  },

  provide() {
    return {
      PdfViewer: [ Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
                   BookmarkView, ThumbnailView, Print, TextSelection, TextSearch,
                   FormFields, FormDesigner, PageOrganizer ]
    };
  },

  methods: {
    /**
     * Get the Syncfusion PdfViewer instance from the template ref
     * @returns {Object} The PdfViewer instance or null
     */
    getViewer() {
      return this.$refs.pdfViewerRef?.ej2Instances || null;
    },

    /**
     * Called when the viewer component is created
     * Stores reference to the actual Syncfusion PdfViewer instance
     */
    handleViewerCreated() {
      console.log('[App] Viewer created event triggered');
      this.viewerInstance = this.getViewer();
      if (this.viewerInstance) {
        console.log('[App] Viewer instance stored:', this.viewerInstance);
      } else {
        console.warn('[App] Could not access viewer instance from component');
      }
    },

    /**
     * Loads a PDF blob into the viewer
     */
    async loadPDFBlobIntoViewer(pdfBlob) {
      try {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            try {
              const arrayBuffer = reader.result;
              const uint8Array = new Uint8Array(arrayBuffer);

              // Use the simple getter method
              const viewer = this.getViewer();
              if (!viewer) {
                reject(new Error('Viewer instance not available'));
                return;
              }

              // Attempt to load using viewer.load() with Uint8Array
              if (typeof viewer.load === 'function') {
                viewer.load(uint8Array, '');
                console.log('[App] Loaded PDF using viewer.load(Uint8Array)');
                resolve();
                return;
              }

              // Fallback: Try loading via data URL
              const dataReader = new FileReader();
              dataReader.onload = () => {
                try {
                  const dataUrl = dataReader.result;

                  if (typeof viewer.load === 'function') {
                    viewer.load(dataUrl, '');
                    console.log('[App] Loaded PDF using viewer.load(dataUrl)');
                    resolve();
                  } else {
                    console.error('[App] Viewer does not support load method');
                    reject(new Error('Viewer load method not available'));
                  }
                } catch (error) {
                  reject(error);
                }
              };

              dataReader.onerror = () => {
                reject(new Error('Failed to read blob as data URL'));
              };

              dataReader.readAsDataURL(pdfBlob);

            } catch (error) {
              reject(error);
            }
          };

          reader.onerror = () => {
            reject(new Error('Failed to read blob as array buffer'));
          };

          reader.readAsArrayBuffer(pdfBlob);
        });

      } catch (error) {
        console.error('[App] Error loading PDF blob:', error);
        throw error;
      }
    },

    /**
     * Fetches the current collaborative document from the server and loads it into the viewer
     */
    async fetchAndLoadPDFDocument() {
      try {
        console.log(`[App] Fetching PDF from room: ${this.roomNameRef}`);

        const queryParams = new URLSearchParams({
          roomName: this.roomNameRef || 'default'
        });

        const response = await fetch(
          `${SERVICE_URL}api/CollaborativeEditing/GetPDFDocument?${queryParams.toString()}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(`Server error: ${result.error}`);
        }

        console.log(`[App] PDF retrieved successfully - Size: ${result.contentLength} bytes`);

        // Decode Base64 content to binary string
        const binaryString = atob(result.content);

        // Convert binary string to Uint8Array
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Create Blob from Uint8Array
        const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
        console.log(`[App] Converted to Blob - Size: ${pdfBlob.size} bytes`);

        // Load the PDF into the viewer
        await this.loadPDFBlobIntoViewer(pdfBlob);
        console.log('[App] PDF loaded into viewer');

      } catch (error) {
        console.error('[App] Error fetching PDF document:', error);
        throw error;
      }
    },

    /**
     * Handler for viewer.resourcesLoaded event
     * 
     * This event fires when the PdfViewer has initialized all resources.
     * We use it to:
     * 1. Initialize the collaboration adapter and client
     * 2. Load the document from the collaboration service
     * 3. Join the collaboration room
     * 4. Fetch and load the current PDF state
     */
    async handleResourcesLoaded() {
      console.log('[App] Viewer resourcesLoaded event triggered');

      if (!this.isDocumentLoaded) {
        try {
          console.log(`[App] Initializing collaboration - User: ${this.currentUser}, Service: ${SERVICE_URL}`);

          this.collaborationStatus = 'loading';
          this.isDocumentLoaded = true;

          // Initialize collaboration asynchronously
          (async () => {
            try {
              // Step 1: Initialize PdfViewerAdapter
              const viewer = this.getViewer();
              if (!viewer) {
                throw new Error('Viewer instance not initialized. Make sure resourcesLoaded is called after viewer creation.');
              }
              
              console.log('[App] Viewer instance available:', viewer);
              
              const adapter = new PdfViewerAdapter(viewer, SERVICE_URL, this.currentUser);
              this.adapter = adapter;
              console.log('[App] PdfViewerAdapter initialized');

              // Step 2: Create and configure CollaborationClient
              const client = new CollaborationClient(adapter, {
                serviceUrl: SERVICE_URL,
                connectionType: 'websocket',
                currentUser: this.currentUser,
                onUserJoined: (user) => {
                  console.log('[App] User joined collaboration:', user);
                  const userName = user.userName || user.currentUser;
                  if (!this.connectedUsers.includes(userName)) {
                    this.connectedUsers.push(userName);
                  }
                },
                onUserLeft: (user) => {
                  console.log('[App] User left collaboration:', user);
                  const userName = user.userName || user.currentUser;
                  this.connectedUsers = this.connectedUsers.filter(u => u !== userName);
                }
              });
              this.client = client;

              console.log('[App] CollaborationClient initialized');

              // Step 3: Load from server (gets room name and pending operations)
              const roomName = await adapter.loadFromServer();
              this.roomNameRef = roomName;
              this.roomName = roomName;
              console.log(`[App] Loaded from server - Room: ${roomName}`);

              // Step 4: Join the collaboration room with the client
              await client.joinRoomAsync(roomName);
              console.log(`[App] Joined collaboration room: ${roomName}`);

              // Step 5: Fetch and load the current PDF document state
              await this.fetchAndLoadPDFDocument();
              console.log('[App] PDF document loaded successfully');

              this.collaborationStatus = 'connected';
              if (!this.connectedUsers.includes(this.currentUser)) {
                this.connectedUsers = [this.currentUser];
              }

            } catch (error) {
              console.error('[App] Error during collaboration initialization:', error);
              this.collaborationStatus = 'error';
              // Fallback: Load default document
              console.log('[App] Falling back to default document');
            }
          })();

        } catch (error) {
          console.error('[App] Error initializing collaboration:', error);
          this.collaborationStatus = 'error';
        }
      }
    },

    /**
     * Handler for viewer.documentChanged event
     * 
     * This event fires when the user makes changes to:
     * - Annotations (add, modify, delete)
     * - Form fields (add, modify, delete)
     * - Page organizer (reorder, insert, delete pages)
     * 
     * We package these changes as operations and send them to the server
     * for broadcast to other collaborators.
     */
    handleDocumentChanged(args) {
      try {
        // Handle AnnotationChangedEventArgs
        if (args && 'annotationId' in args) {
          console.log('[App] Annotation changed:', args.annotationId);

          let operations = [];
          if (args.action) {
            operations = [{
              action: args.action,
              annotation: args.annotationId,
              type: 'annotation',
              isRedacted: args.isRedacted
            }];
          } else {
            operations = [{
              type: 'removeUser',
              currentUser: this.currentUser
            }];
          }

          console.log('[App] Annotation operation:', operations);
          if (this.adapter && this.adapter.sendActionToServer) {
            this.adapter.sendActionToServer(operations).catch(err =>
              console.error('[App] Error sending annotation operation:', err)
            );
          }
        }
        // Handle FormFieldChangedEventArgs
        else if (args && 'formField' in args && !('fieldName' in args)) {
          console.log('[App] Form field changed:', args.formField);

          const operations = [{
            action: args.action,
            formField: args.formField,
            type: 'formField'
          }];

          console.log('[App] Form field operation:', operations);
          if (this.adapter && this.adapter.sendActionToServer) {
            this.adapter.sendActionToServer(operations).catch(err =>
              console.error('[App] Error sending form field operation:', err)
            );
          }
        }
        // Handle FormFieldFocusOutEventArgs (form field value updates)
        else if (args && 'fieldName' in args) {
          console.log('[App] Form field updated:', args.fieldName);

          const operations = [{
            action: 'formFieldUpdate',
            data: args,
            type: 'formField'
          }];

          console.log('[App] Form field update operation:', operations);
          if (this.adapter && this.adapter.sendActionToServer) {
            this.adapter.sendActionToServer(operations).catch(err =>
              console.error('[App] Error sending form field update:', err)
            );
          }
        }
        // Handle PageOrganizerSavedEventArgs
        else if (args && 'organizePageActions' in args) {
          console.log('[App] Page organizer changed');

          const eventData = args;
          const actionDetails = args.organizePageActions && typeof args.organizePageActions === 'string'
            ? JSON.parse(args.organizePageActions)
            : "";

          let operations = [];

          if (eventData && eventData.savedDocument === null && actionDetails.action && actionDetails.action === 'applyCancelled') {
            // User cancelled the page organizer operation
            operations = [{
              type: 'removeUser',
              currentUser: this.currentUser
            }];
            console.log('[App] Page organizer operation cancelled');
          }
          else if (eventData && eventData.savedDocument !== null && actionDetails.length > 0 && actionDetails[0].action !== 'applyCancelled') {
            // Page organizer operation applied successfully
            operations = [{
              action: 'pageOrganizerUpdate',
              data: args.organizePageActions,
              type: 'pageOrganizer'
            }];
            console.log('[App] Page organizer operation:', operations);
          } else {
            console.log('[App] No valid page organizer operation to send');
            return;
          }

          if (this.adapter && this.adapter.sendActionToServer) {
            this.adapter.sendActionToServer(operations).catch(err =>
              console.error('[App] Error sending page organizer operation:', err)
            );
          }
        }

      } catch (error) {
        console.error('[App] Error processing document change:', error);
      }
    }
  },

  beforeUnmount() {
    // Cleanup collaboration resources on unmount
    if (this.client) {
      console.log('[App] Cleaning up collaboration client');
    }
  }
};
</script>

<style>
  @import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pdfviewer/index.css';
</style>
