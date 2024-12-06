export interface CoffeeChatState {
    sender: {
        email: string;
        name: string;
        photo: string;
    };
    receiver: {
        email: string;
        name: string;
        photo: string;
    };
    content: string;
}
