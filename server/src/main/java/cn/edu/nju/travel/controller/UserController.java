package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.constant.RoleTypeCode;
import cn.edu.nju.travel.form.AccountApproveForm;
import cn.edu.nju.travel.form.AttendActivityForm;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.form.UserForm;
import cn.edu.nju.travel.service.AuthService;
import cn.edu.nju.travel.service.UserService;
import cn.edu.nju.travel.vo.StudentAuthInfo;
import cn.edu.nju.travel.vo.UserAuthVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import cn.edu.nju.travel.vo.UserInfoVOWrapper;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@RestController
@RequestMapping("/user/")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    @Autowired
    UserInfoVOWrapper userInfoVOWrapper;

    @ApiOperation(value = "用户学生认证申请", response = SimpleResponse.class)
    @PostMapping("application/auth")
    public SimpleResponse authStudent(HttpSession httpSession, @RequestBody AccountApproveForm accountApproveForm){
        Integer userId = (Integer)httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            UserAuthVO vo = authService.uploadAuthInfo(userId,accountApproveForm.getAttachmentUrl(),
                    accountApproveForm.getContext());
            return SimpleResponse.ok(vo);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }

    }

    @ApiOperation(value = "更改自己的认证信息", response = SimpleResponse.class)
    @PostMapping("application/update")
    public SimpleResponse updateStudentAuthInfo(HttpSession httpSession, @RequestBody AccountApproveForm accountApproveForm){
        return authStudent(httpSession,accountApproveForm);
    }


    @ApiOperation(value = "获取当前认证信息", response = StudentAuthInfo.class)
    @GetMapping("application/info")
    public SimpleResponse getAuthInfo(HttpSession httpSession){
        Integer userId = (Integer)httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        UserAuthVO vo = authService.getAuthInfo(userId);
        return SimpleResponse.ok(vo);
    }


    @ApiOperation(value = "更新", response = SimpleResponse.class, notes = "对用户数据进行修改")
    @PostMapping("update")
    public SimpleResponse update(HttpSession httpSession, @RequestBody UserForm userForm){
        Integer userId = (Integer)httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            UserInfoVO vo = userService.modifyInfo(userId,userForm.getMobile(),userForm.getMail()
                    ,userForm.getLogoUrl());
            return SimpleResponse.ok(vo);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "修改密码", response = SimpleResponse.class, notes = "修改密码")
    @PostMapping("changePassword")
    public SimpleResponse updatePwd(HttpSession httpSession, @RequestParam String oldPassword,
            @RequestParam String newPassword){
        Integer userId = (Integer)httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            userService.changePassword(userId,oldPassword,newPassword);
            return new SimpleResponse(ResponseCode.OK);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "获取用户基本信息", response = SimpleResponse.class, notes = "获取用户基本信息")
    @GetMapping("info")
    public SimpleResponse getInfo(HttpSession httpSession){
        Integer userId = (Integer)httpSession.getAttribute("userId");
        int type = (int)httpSession.getAttribute("userType");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            UserInfoVO vo = userService.findUser(userId, RoleTypeCode.getTypeByIndex(type));
            return SimpleResponse.ok(vo);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "获取普通用户主页信息", response = UserInfoVO.class, notes = "获取用户主页信息")
    @GetMapping("homeInfo/{userId}")
    public SimpleResponse getOtherInfo(HttpSession httpSession, @PathVariable("userId")int userId){
        Integer selfId = (Integer)httpSession.getAttribute("userId");
        try{
            UserInfoVO vo = userService.findUser(userId, RoleTypeCode.USER);
            return SimpleResponse.ok(userInfoVOWrapper.wrapWithConcernInfo(selfId, vo));
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "搜索用户", response = UserInfoVO.class, notes = "返回List<UserInfoVO>, "
            + "根据关键词(匹配用户名和手机号)搜索用户, size为每页大小，lastId为上一页最后一个用户id，如为首页不传或传入0即可" )
    @GetMapping("searchList")
    public SimpleResponse searchUser(HttpSession httpSession, @RequestParam String keyword,
            @RequestParam int size, @RequestParam(required = false) Integer lastId){
        Integer userId = (Integer)httpSession.getAttribute("userId");
        if(lastId == null){
            lastId = 0;
        }
        try{
            List<UserInfoVO> voList = userService.searchUsers(keyword, size, lastId);
            return SimpleResponse.ok(userInfoVOWrapper.wrapListWithConcernInfo(userId, voList));
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }
}
