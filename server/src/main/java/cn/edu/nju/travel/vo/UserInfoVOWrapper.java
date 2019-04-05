package cn.edu.nju.travel.vo;

import cn.edu.nju.travel.service.ActivityService;
import cn.edu.nju.travel.service.InteractionService;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Component;

/**
 * Created on 2019/4/3
 */
@Component
public class UserInfoVOWrapper {

    @Resource
    private InteractionService interactionService;
    @Resource
    private ActivityService activityService;


    public UserInfoVO wrapWithConcernInfo(Integer userId, UserInfoVO vo){
        if(userId != null){
            vo.setConcerned(interactionService.isUserConcerned(userId, vo.getId()));
        }
        vo.setConcernNum(interactionService.getConcernNum(vo.getId()));
        vo.setActivityNum(activityService.getCreateActivityNum(vo.getId()));
        return vo;
    }

    public List<UserInfoVO> wrapListWithConcernInfo(Integer userId, List<UserInfoVO> voList){
        voList.forEach(userInfoVO -> wrapWithConcernInfo(userId, userInfoVO));
        return voList;
    }

}
