export type FolloweeResponse = {
    email: string;
    followeeId: number;
    followeeList: {
        followeeId: number;
        followeeEmail: string;
    }[];
};

export type FollowerResponse = {
    email: string;
    followerId: number;
    followerList: {
        followerId: number;
        followerEmail: string;
    }[];
};
