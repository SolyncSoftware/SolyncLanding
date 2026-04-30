export interface TransformedMember {
    realName: string;
    username: string;
    bio: string;
    bluesky: string;
    github: string;
    avatarSrc: string;
    showUser: boolean;
}
export declare function GET(): Promise<Response>;
