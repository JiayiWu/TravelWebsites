package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.constant.LikeEntityType;
import cn.edu.nju.travel.form.CommentForm;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.service.InteractionService;
import cn.edu.nju.travel.vo.CommentVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import cn.edu.nju.travel.vo.UserInfoVOWrapper;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @Resource
    private UserInfoVOWrapper userInfoVOWrapper;

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

    @ApiOperation(value = "进行评论", response = CommentVO.class)
    @PostMapping("comment")
    public SimpleResponse comment(HttpSession httpSession, @RequestBody CommentForm commentForm){
        Integer userId = (Integer) httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            CommentVO vo = interactionService.addComment(userId, commentForm);
            return SimpleResponse.ok(vo);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "获取评论", response = CommentVO.class, notes =
            "获取主体的所有评论，返回List<CommentVO>;referId为被评论主体id;type为被评论的主体类型 1：活动 2：朋友圈")
    @GetMapping("allComments")
    public SimpleResponse getComments(HttpSession httpSession, @RequestParam int referId,
            @RequestParam int type){
        try{
            List<CommentVO> voList = interactionService.getComments(referId, LikeEntityType
                    .getTypeByValue(type));
            return SimpleResponse.ok(voList);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "删除评论", response = SimpleResponse.class, notes = "删除评论； id为评论id")
    @DeleteMapping("deleteComment")
    public SimpleResponse comment(HttpSession httpSession, @RequestParam int id){
        Integer userId = (Integer) httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            if(interactionService.isUserComment(userId, id)){
                interactionService.deleteComment(id);
                return new SimpleResponse(ResponseCode.OK);
            }else{
                return new SimpleResponse(ResponseCode.Error, "无权删除他人的评论");
            }
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value="关注用户", response = SimpleResponse.class, notes = "关注用户：userId为被关注人的id")
    @PostMapping("concern/{userId}")
    public SimpleResponse concern(HttpSession httpSession, @PathVariable("userId") int userId){
        Integer selfId = (Integer) httpSession.getAttribute("userId");
        if(selfId == null){
            return SimpleResponse.error("请先登录");
        }
        interactionService.concernUser(selfId, userId);
        return new SimpleResponse(ResponseCode.OK);
    }

    @ApiOperation(value="取消关注用户", response = SimpleResponse.class, notes = "取消关注：userId为被关注人的id")
    @DeleteMapping("unConcern/{userId}")
    public SimpleResponse unConcern(HttpSession httpSession, @PathVariable("userId") int userId){
        Integer selfId = (Integer) httpSession.getAttribute("userId");
        if(selfId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            interactionService.unConcern(selfId, userId);
            return new SimpleResponse(ResponseCode.OK);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value="获取已关注用户列表", response = UserInfoVO.class, notes =
            "获取已关注用户列表, lastUserId为上一页最后一个被关注用户的id，若为首页则不传或者传入0")
    @GetMapping("concernList")
    public SimpleResponse getConcernUsers(HttpSession httpSession, @RequestParam int size,
            @RequestParam(required = false) Integer lastUserId){
        Integer selfId = (Integer) httpSession.getAttribute("userId");
        if(selfId == null){
            return SimpleResponse.error("请先登录");
        }
        if(lastUserId == null){
            lastUserId = 0;
        }
        try{
            List<UserInfoVO> voList = interactionService.getConcernUserList(selfId, size,
                    lastUserId);
            return SimpleResponse.ok(userInfoVOWrapper.wrapListWithConcernInfo(selfId, voList));
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

}
