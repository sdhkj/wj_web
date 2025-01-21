import request from "@/utils/request";

export default{
    addSurvey(survey){
        return request({
            method: "post",
            url: `/survey`,
            data: survey
        });
    }
}