'use client'
import React from "react";
import FlexWrapper from "./ui/FlexWrapper";
import { ColumnWrapper } from "@/widgets/wrapper/ColumnWrapper";
import UserSummaryContainer from "./ui/UserSummaryContainer";
import UserSchoolContainer from "./ui/UserSchoolContainer";
import UserCareerContainer from "./ui/UserCareerContainer";
import UserPostContainer from "./ui/UserPostContainer";
import { PageWrapper } from "@/widgets/wrapper/PageWrapper";
import { SizedBox } from "@/widgets/wrapper/SizedBox";



const UserPage: React.FC = () => {
    
    return (
        <PageWrapper padding="5%">
            <FlexWrapper>
                <UserSummaryContainer/>
                <SizedBox width="70%"/>
                <ColumnWrapper gap="1em">
                    <UserSchoolContainer/>
                    <UserCareerContainer/>
                    <UserPostContainer/>
                </ColumnWrapper>
            </FlexWrapper>
        </PageWrapper>
    );
}

export default UserPage;



