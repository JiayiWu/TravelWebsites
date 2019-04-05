package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.form.BlogForm;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.service.BlogService;
import cn.edu.nju.travel.vo.BlogVO;
import cn.edu.nju.travel.vo.BlogVOWrapper;
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
 * Created on 2019/4/5
 */
@RestController
@RequestMapping("/blog/")
public class BlogController {

    @Resource
    BlogService blogService;
    @Resource
    BlogVOWrapper blogVOWrapper;

    @ApiOperation(value = "发布朋友圈", response = BlogVO.class, notes = "发布朋友圈")
    @PostMapping("release")
    public SimpleResponse release(HttpSession httpSession, @RequestBody BlogForm blogForm){
        Integer userId = (Integer) httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            BlogVO vo = blogService.releaseBlog(userId, blogForm);
            return SimpleResponse.ok(blogVOWrapper.wrapVOWithSelfInfo(userId, vo));
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "删除朋友圈", response = SimpleResponse.class, notes = "删除朋友圈，id：要删除的朋友圈id")
    @DeleteMapping("delete/{id}")
    public SimpleResponse delete(HttpSession httpSession, @PathVariable("id") int id){
        Integer userId = (Integer) httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            blogService.deleteBlog(userId, id);
            return new SimpleResponse(ResponseCode.OK);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "获取某用户所有朋友圈", response = BlogVO.class, notes = "返回List<BlogVO>, "
            + "userId对应的用户发布的所有朋友圈, size:每页大小， lastTime上一页最后一条朋友圈的时间，如为首页则不传或者传入0")
    @GetMapping("getOneUser")
    public SimpleResponse getUserBlogs(HttpSession httpSession, @RequestParam int userId,
            @RequestParam int size, @RequestParam(required = false) Long lastTime){
        if(lastTime == null || lastTime==0){
            lastTime = Long.MAX_VALUE;
        }
        Integer selfId = (Integer) httpSession.getAttribute("userId");
        try{
            List<BlogVO> voList = blogService.getUserBlogs(userId, size, lastTime);
            return SimpleResponse.ok(blogVOWrapper.wrapListWithSelfInfo(selfId, voList));
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "获取我的朋友圈", response = BlogVO.class, notes =
            "返回List<BlogVO>, 我的朋友圈，按时间最新排序; size:每页大小， lastTime上一页最后一条朋友圈的时间，如为首页则不传或者传入0")
    @GetMapping("myFriendsBlogs")
    public SimpleResponse myFriendsBlogs(HttpSession httpSession, @RequestParam int size,
            @RequestParam(required = false) Long lastTime){
        if(lastTime == null || lastTime==0){
            lastTime = Long.MAX_VALUE;
        }
        Integer userId = (Integer) httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            List<BlogVO> voList = blogService.getConcernUsersBlogs(userId, size, lastTime);
            return SimpleResponse.ok(blogVOWrapper.wrapListWithSelfInfo(userId, voList));
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }


}
