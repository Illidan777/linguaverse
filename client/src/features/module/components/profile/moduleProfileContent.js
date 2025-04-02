// React and Redux imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// API hooks and custom hooks for query and mutation handling
import { useGetModuleUserPracticeQuery, useResetPracticeMutation } from "../../api";
import useApiQueryResponse from "../../../../hook/api/useApiQueryResponse";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";

// Constants
import { PRACTICE_FLASHCARDS_TYPE } from "../../../../constants/practice";

// Layout and boundary components for error handling and loading states
import LoadingBoundary from "../../../../components/layout/wrapper/boundary/loadingBoundary";
import ControllableErrorBoundary from "../../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import { BaseFallbackComponent } from "../../../../components/layout/wrapper/boundary/fallback/base";

// Custom components
import { FlexCol } from "../../../../components/layout/wrapper/position/style";
import PracticeModesPlate from "../../../practice/components/practiceModesPlate";
import FlashCardPractice from "../../../practice/components/flashcards/flashCardPractice";
import TermsProgressTable from "./progressTable";

// Redux actions and selectors
import { toggleFinishedPractice } from "../../../practice/state/practiceSlice";

/**
 * Module profile content component
 * Displays practice modes and the practice content for a specific module
 * @param {Object} props - The props for the component
 * @param {string} props.moduleId - The ID of the module for which practice content is shown
 * @returns {JSX.Element} - The rendered component
 */
const ModuleProfileContent = ({ moduleId }) => {
    return (
        <FlexCol gap="50px">
            <PracticeModesPlate />
            <Practice moduleId={moduleId} />
        </FlexCol>
    );
};

/**
 * Practice component
 * Handles fetching and displaying flashcards and progress for a given module
 * @param {Object} props - The props for the component
 * @param {string} props.moduleId - The ID of the module for which practice is being displayed
 * @returns {JSX.Element} - The rendered component
 */
const Practice = ({ moduleId }) => {
    const dispatch = useDispatch();
    const { finished } = useSelector((state) => state.practice);

    // Fetch practice data for the module
    const queryResult = useGetModuleUserPracticeQuery({ id: moduleId, type: PRACTICE_FLASHCARDS_TYPE });
    const { data, isError, isFetching } = useApiQueryResponse(queryResult);

    // Mutation for resetting practice data
    const [resetPractice] = useApiMutationResponse(useResetPracticeMutation(), {
        showSuccessToast: false,
    });

    /**
     * Resets practice progress (table and current slide) for the given module
     */
    const onResetPractice = async () => {
        try {
            await resetPractice(moduleId);
            dispatch(toggleFinishedPractice());  // Toggle the finished practice state in Redux
        } catch (error) {
            console.error("Error resetting practice:", error);
        }
    };

    // Destructure terms-related data from the response
    const { termsCount, inProgressTerms, learnedTerms } = data || {};

    return (
        <LoadingBoundary isLoading={isFetching}>
            <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent />}>
                <FlashCardPractice
                    moduleId={moduleId}
                    data={data || {}}
                    finished={finished}
                    onFinishPractice={onResetPractice}
                />
                <TermsProgressTable
                    moduleId={moduleId}
                    termsCount={termsCount}
                    inProgressTerms={inProgressTerms}
                    learnedTerms={learnedTerms}
                />
            </ControllableErrorBoundary>
        </LoadingBoundary>
    );
};

export default ModuleProfileContent;
