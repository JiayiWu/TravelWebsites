package cn.edu.nju.travel.vo;

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

    public UserInfoVO wrapWithConcernInfo(Integer userId, UserInfoVO vo){
        if(userId != null){
            vo.setConcerned(interactionService.isUserConcerned(userId, vo.getId()));
        }
        return vo;
    }

    public List<UserInfoVO> wrapListWithConcernInfo(Integer userId, List<UserInfoVO> voList){
        if(userId != null){
            voList.forEach(vo-> vo.setConcerned(interactionService.isUserConcerned(userId, vo.getId())));
        }
        return voList;
    }

}
