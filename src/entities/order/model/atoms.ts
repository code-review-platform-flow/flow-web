import { atom } from 'recoil';

interface OrderData {
    orderId: number;
    customerKey: string;
    tossOrderId: string;
}

export const orderDataState = atom<OrderData | null>({
    key: 'orderDataState',
    default: null,
});
