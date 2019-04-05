package cn.edu.nju.travel.vo;

import cn.edu.nju.travel.service.InteractionService;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Component;

/**
 * Created on 2019/4/5
 */
@Component
public class CommentVOWrapper {

    @Resource
    InteractionService interactionService;

    public CommentVO wrapVOWithSelfInfo(Integer userId, CommentVO vo){
        if(userId != null){
            vo.setMyself(interactionService.isUserComment(userId, vo.getId()));
        }
        return vo;
    }

    public List<CommentVO> wrapListWithSelfInfo(Integer userId, List<CommentVO> voList){
        voList.forEach(vo-> wrapVOWithSelfInfo(userId, vo));
        return voList;
    }
}
