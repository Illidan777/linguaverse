import {useParams} from "react-router";
import DashboardPageLayout from "../../../components/layout";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";

const ModuleItemPage = () => {

    const {id} = useParams();

    return (
        <DashboardPageLayout
            grayBackground
            header={
                <>
                    <StyledText
                        as="h2"
                        size={FONT_SIZES.TITLE_MEDIUM}
                        weight={FONT_WEIGHTS.SUPER_BOLD}
                    >
                        Current module
                    </StyledText>
                </>
            }
            content={
                <StyledText
                    as="h2"
                    size={FONT_SIZES.TITLE_MEDIUM}
                    weight={FONT_WEIGHTS.SUPER_BOLD}
                >
                    Test content and module id is {id}
                </StyledText>
            }
        />
    )
}

export default ModuleItemPage