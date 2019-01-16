package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.form.AccountApproveForm;
import cn.edu.nju.travel.form.AttendActivityForm;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.form.UserForm;
import cn.edu.nju.travel.service.AuthService;
import cn.edu.nju.travel.service.UserService;
import cn.edu.nju.travel.vo.StudentAuthInfo;
import cn.edu.nju.travel.vo.UserAuthVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    @ApiOperation(value = "获取用户基本信息", response = SimpleResponse.class, notes = "获取用户基本信息")
    @GetMapping("info")
    public SimpleResponse getInfo(HttpSession httpSession){
        Integer userId = (Integer)httpSession.getAttribute("userId");
        if(userId == null){
            return SimpleResponse.error("请先登录");
        }
        try{
            UserInfoVO vo = userService.findById(userId);
            return SimpleResponse.ok(vo);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }
}
