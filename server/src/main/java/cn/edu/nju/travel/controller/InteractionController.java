package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.constant.LikeEntityType;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.service.InteractionService;
import io.swagger.annotations.ApiOperation;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created on 2019/3/27
 */
@RestController
@RequestMapping("/interaction/")
public class InteractionController {

    @Resource
    private InteractionService interactionService;

    @ApiOperation(value = "点赞操作", response = Integer.class, notes = "为活动或朋友圈点赞，返回该实体被赞数"
            + "referId为被点赞实体对应的id，type为被点赞实体类型, 1为活动，2为朋友圈")
    @PostMapping("like")
    public SimpleResponse likeIt(HttpSession httpSession, @RequestParam("referId")int referId,
            @RequestParam("type")int type){
        Integer userId = (Integer) httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            int number = interactionService.like(userId, referId, LikeEntityType.getTypeByValue(type));
            return SimpleResponse.ok(number);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }

    }

    @ApiOperation(value = "取消点赞", response = Integer.class, notes = "取消已赞，返回该实体被赞数"
            + "referId为被点赞实体对应的id，type为被点赞实体类型, 1为活动，2为朋友圈")
    @PostMapping("unlike")
    public SimpleResponse unlike(HttpSession httpSession, @RequestParam("referId")int referId,
            @RequestParam("type")int type){
        Integer userId = (Integer) httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            int number = interactionService.unlike(userId, referId, LikeEntityType.getTypeByValue(type));
            return SimpleResponse.ok(number);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }

    }

}
