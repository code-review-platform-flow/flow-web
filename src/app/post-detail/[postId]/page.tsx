import PostDetailPage from '@/features/post-detail';

export default function Page({ params }: { params: { postId: string } }) {
    return <PostDetailPage postId={params.postId} />;
}
