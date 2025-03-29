import {FlexCol} from "../../../../components/layout/wrapper/position/style";
import PracticeModesPlate from "../../../practice/components/practiceModesPlate";
import React from "react";
import {useGetModuleUserPracticeQuery, useResetPracticeMutation} from "../../api";
import {PRACTICE_FLASHCARDS_TYPE} from "../../../../constants/practice";
import useApiQueryResponse from "../../../../hook/api/useApiQueryResponse";
import ControllableErrorBoundary from "../../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import {BaseFallbackComponent} from "../../../../components/layout/wrapper/boundary/fallback/base";
import FlashCardPractice from "../../../practice/components/flashcards/flashCardPractice";
import TermsProgressTable from "./progressTable";
import LoadingBoundary from "../../../../components/layout/wrapper/boundary/loadingBoundary";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useDispatch, useSelector} from "react-redux";
import {toggleFinishedPractice} from "../../../practice/state/practiceSlice";

const ModuleProfileContent = ({moduleId}) => {
    return (
        <FlexCol gap="50px">
            <PracticeModesPlate/>
            <Practice moduleId={moduleId}/>
        </FlexCol>
    )
}

const Practice = ({moduleId}) => {
    const dispatch = useDispatch();
    const {finished} = useSelector(state => state.practice);

    const queryResult = useGetModuleUserPracticeQuery({id: moduleId, type: PRACTICE_FLASHCARDS_TYPE});
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    const [resetPractice] = useApiMutationResponse(useResetPracticeMutation(), {
        showSuccessToast: false
    });

    const onResetPractice = async () => {
        try {
            await resetPractice(moduleId);
            dispatch(toggleFinishedPractice())
        } catch (error) {
            console.error("Error resetting practice:", error);
        }
    }

    const {
        termsCount,
        inProgressTerms,
        learnedTerms,
    } = data ? data : {};

    return (
        <LoadingBoundary isLoading={isFetching}>
            <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent/>}>
                <FlashCardPractice
                    moduleId={moduleId}
                    data={data ? data : {}}
                    finished={finished}
                    onFinishPractice={onResetPractice}
                />
                <TermsProgressTable moduleId={moduleId} termsCount={termsCount} inProgressTerms={inProgressTerms} learnedTerms={learnedTerms}/>
            </ControllableErrorBoundary>
        </LoadingBoundary>
    );
}


export default ModuleProfileContent;