package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.service.AuthService;
import cn.edu.nju.travel.service.UserService;
import cn.edu.nju.travel.vo.AuthenticationActivityInfoListVO;
import cn.edu.nju.travel.vo.AuthenticationInfoListVO;
import cn.edu.nju.travel.vo.UserAuthVO;
import io.swagger.annotations.ApiOperation;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * 该审批用AuthenticationEntity表
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@RestController
@RequestMapping("/admin/")
public class AdminController {

    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    @ApiOperation(value = "审批用户加入申请", response = SimpleResponse.class,notes = "需要校验当前登录用户是否有审批权限 0 新申请审批，还未处理 1 审批通过  2  审批拒绝")
    @RequestMapping(value = "application/check/{activityId}/user/{userId}/result/{result}", method = RequestMethod.POST)
    public SimpleResponse checkApplication(HttpSession httpSession, @PathVariable int activityId, @PathVariable int userId, @PathVariable int result){
        //todo
        return null;
    }

    @ApiOperation(value = "新申请活动审批列表", response = AuthenticationActivityInfoListVO.class,notes = "state -1获取该用户可以看见的所有审批，0 查看待处审批 1 查看审批通过申请  2  查看审批拒绝的申请")
    @RequestMapping(value = "application/list/{state}", method = RequestMethod.GET)
    public SimpleResponse applicationList(HttpSession httpSession,@PathVariable int state){
        //todo
        return null;
    }

    @ApiOperation(value = "认证用户", response = UserAuthVO.class,notes = "进行用户认证, state: 1 通过 2 "
            + "拒绝")
    @PostMapping("application/authUser")
    public SimpleResponse authUser(HttpSession httpSession,@RequestParam("applierId")int applierId,
            @RequestParam("state")int authState){
        Integer userId = (Integer)httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        if(!userService.isAdmin(userId)){
            return SimpleResponse.error("非管理员无权认证用户");
        }
        try{
            UserAuthVO vo = authService.authUser(applierId, ApproveStateCode.getStateByIndex
                    (authState));
            return SimpleResponse.ok(vo);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "获取待认证用户列表", response = UserAuthVO.class,notes = "state "
            + "不传则获取该用户可以看见的所有审批，0 查看待处审批 1 查看审批通过申请  2  查看审批拒绝的申请;"
            + "lastId 上一页的最后一个id，传0则表示第一页")
    @PostMapping("application/userList")
    public SimpleResponse getUserList(HttpSession httpSession,@RequestParam(value = "lastId") int
            lastId, @RequestParam(value = "state", required = false) Integer state){
        Integer userId = (Integer)httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        if(!userService.isAdmin(userId)){
            return SimpleResponse.error("非管理员查看待认证用户列表");
        }
        try{
            List<UserAuthVO> userAuthVOList;
            if(state == null){
                userAuthVOList = authService.getAuthInfoOnePage(lastId);
            }else{
                userAuthVOList = authService.getAuthInfoOnePageByState(lastId,ApproveStateCode
                        .getStateByIndex(state));
            }
            return SimpleResponse.ok(userAuthVOList);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }
}
