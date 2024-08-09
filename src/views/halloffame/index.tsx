'use client'
import BackButton from "@/widgets/button/BackButton";
import { PageWrapper } from "@/widgets/wrapper/PageWrapper";
import HallOfFameUserContainer from "./ui/HallOfFameUserContainer";
import HallOfFameFrame from "./ui/HallOfFameFrame";
import Link from "next/link";

export default function HallOfFamePage() {

    return (
        <PageWrapper padding="15%">
            <HallOfFameFrame>
                    <BackButton href="/" label="🏆 명예의 전당!" />
                <HallOfFameUserContainer/>
            </HallOfFameFrame>
        </PageWrapper>
    );
    }

