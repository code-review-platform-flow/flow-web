'use client'
import { PageWrapper } from "@/widgets/wrapper/PageWrapper";
import React from "react";
import PostCategoryContainer from "./ui/PostCategoryContainer";
import PostTitleContainer from "./ui/PostTitleContainer";
import PostTagContainer from "./ui/PostTagContainer";
import MarkDownContainer from "./ui/MarkDownContainer";
import SubmitButton from "./ui/SubmitButton";

const PostWritePage: React.FC = () => {
    
    return (
        <PageWrapper gap="0.875em">
            <PostCategoryContainer/>
            <PostTagContainer/>
            <PostTitleContainer/>
            <MarkDownContainer/>
            <SubmitButton/>
        </PageWrapper>
    );
}

export default PostWritePage;

