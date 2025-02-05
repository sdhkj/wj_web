import request from "@/utils/request";

export default{
    addSurvey(survey){
        return request({
            method: "post",
            url: `/survey`,
            data: survey
        });
    },
    getSurveyById(id){
        return request({
            method: "get",
            url: `/survey/${id}`
        });
    },
    updateSurvey(survey){
        return request({
            method: "put",
            url: `/survey`,
            data: survey
        });
    },
    addSurveyQuestion(surveyQuestion){
        return request({
            method: "post",
            url: `/survey/question`,
            data: surveyQuestion
        });
    },

    getExamineeList(surveyId){
        return request({
            method: "get",
            url: `/survey/examinee/${surveyId}`
        });
    },

    deleteSurveyQuestion(id){
        return request({
            method: "delete",
            url: `/survey/question/${id}`
        });
    },

    // 考生信息列表调序
    updateSurveyQuestionOrder(surveyId,questionId,questionType,oldOrder,newOrder){
        return request({
            method: "put",
            url: `/survey/question/order`,
            params: {
                surveyId,questionId,questionType,oldOrder,newOrder
            }
        });
    },
    // 更新问卷问题
    updateSurveyQuestion(surveyQuestion){
        if(Array.isArray(surveyQuestion.correctAnswer)){
            surveyQuestion.correctAnswer = surveyQuestion.correctAnswer.join(",")
        }
        return request({
            method: "put",
            url: `/survey/question`,
            data: surveyQuestion
        });
    },

    // 更新单选选项
    updateSurveyQuestionOption(surveyQuestionOption){
        return request({
            method: "put",
            url: `/survey/question/option`,
            data: surveyQuestionOption
        });
    },

    // 新增单选选项
    addSurveyQuestionOption(surveyQuestionOption){
        return request({
            method: "post",
            url: `/survey/question/option`,
            data: surveyQuestionOption
        });
    },

    // 查询单选选项
    getSurveyQuestionOptionList(questionId){
        return request({
            method: "get",
            url: `/survey/question/option`,
            params: {
                questionId
            }
        });
    },
    // 删除单选选项
    deleteSurveyQuestionOption(optionId){
        return request({
            method: "delete",
            url: `/survey/question/option/${optionId}`,

        });
    },
    // 查询试题列表单选题
    getQuestionList(surveyId){
        return request({
            method: "get",
            url: `/survey/question/${surveyId}`
        });
    },


    // 试卷编辑
    getQuestionById(questionId){
        return request({
            method: "get",
            url: `/survey/question`,
            params: {
                questionId
            }
        });
    },
    // 复制试卷
    copyQuestionById(srcQuestionId){
        return request({
            method: "get",
            url: `/survey/question/copy`,
            params: {
                srcQuestionId
            }
        });
    },

}