import { atom } from 'recoil';

export const sharedEmailState = atom({
    key: 'sharedEmailState',
    default: {
        hostEmail: undefined as string | undefined,
        visitorEmail: undefined as string | undefined,
    },
});
