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
}