interface Window {
    google?: {
        accounts: {
            id: {
                initialize: (input: { client_id: string, callback: (response: { credential: string }) => void }) => void;
                renderButton: (element: HTMLElement, options: { theme: string, size: string }) => void;
                prompt: () => void;
            }
        }
    }
}